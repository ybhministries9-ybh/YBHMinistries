import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getVisibleApprovedStories } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, headObject, getPublicUrl } from '@/lib/r2';
import { sanitizeInput, requireJson, checkBodySize, rateLimit, verifyRecaptcha, isHoneypotFilled } from '@/lib/security';
import { logger } from '@/lib/logger';
import { storySchema } from '@/lib/schemas';

// Force Node.js runtime - nodemailer requires Node.js APIs (TCP sockets) not available in Edge runtime
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Use targeted DB query to fetch only public-facing stories.
    const stories = await getVisibleApprovedStories();
    // convert thumbnail_url (r2:// refs) to signed URLs or public URLs for client display
    const enhanced = await Promise.all(stories.map(async (s: any) => {
      if (!s?.thumbnail_url) return s;
      const raw = s.thumbnail_url;
      if (raw.startsWith('http://') || raw.startsWith('https://')) return { ...s, thumbnail_url: raw };
      const parsed = parseKeyFromUrl(raw);
      if (!parsed?.key) return { ...s };
      try {
        const head = await headObject(parsed.key, parsed.bucket || undefined);
        if (!head) return { ...s };
        const url = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
        return { ...s, thumbnail_url: url };
      } catch (e) {
        try {
          const pub = getPublicUrl(parsed.key, parsed.bucket || undefined);
          if (pub && !pub.startsWith('r2://')) return { ...s, thumbnail_url: pub };
        } catch (err) {}
        return { ...s };
      }
    }));
    // Remove contact fields (email, phone) from public response to avoid exposing private data
    const publicResponse = enhanced.map(({ email, phone, ...rest }: any) => rest);
    return NextResponse.json({ success: true, data: publicResponse });
  } catch (err) {
    logger.error('GET /api/stories error', { error: String(err) });
    return NextResponse.json({ success: false, error: 'Failed to fetch stories' }, { status: 500 });
  }
}

// Public submission endpoint for testimonies
export async function POST(request: Request) {
  try {
    if (!requireJson(request)) return NextResponse.json({ success: false, error: 'Content-Type must be application/json' }, { status: 400 });
    if (!checkBodySize(request, 128 * 1024)) return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const rl = await rateLimit(`stories:${ip}`, 10, 60 * 60 * 1000);
    if (!rl.ok) return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 });

    const body = await request.json();

    // Honeypot check
    if (isHoneypotFilled(body)) return NextResponse.json({ success: false, error: 'bot detected' }, { status: 400 });

    // reCAPTCHA verification when configured – log failures but do not block
    try {
      const token = body?.recaptchaToken || body?.recaptcha_token;
      const rc = await verifyRecaptcha(token);
      if (!rc.ok && !rc.skipped) {
        try { const { logger } = await import('@/lib/logger'); logger.warn('reCAPTCHA verification failed for stories submission', { details: rc }); } catch (_) {}
      }
    } catch (e) {
      try { const { logger } = await import('@/lib/logger'); logger.warn('reCAPTCHA verification error for stories', { error: String(e) }); } catch (_) {}
    }
    // Basic server-side validation & sanitization
    const name = sanitizeInput(body.name, 100);
    const email = sanitizeInput(body.email, 254);
    const phone = sanitizeInput(body.phone, 10);
    const role = sanitizeInput(body.role, 100);
    const categoryKey = sanitizeInput(body.category, 50);
    const location = sanitizeInput(body.location, 100);
    const testimony = sanitizeInput(body.testimony, 5000);
    const thumbnailUrl = typeof body.thumbnail_url === 'string' ? body.thumbnail_url.trim().slice(0, 500) : null;

    const parsed = storySchema.safeParse({ name, email: email || undefined, phone: phone || undefined, role, category: categoryKey, location, testimony });
    if (!parsed.success) return NextResponse.json({ success: false, error: 'validation_error', details: parsed.error.format() }, { status: 400 });
    // email optional but validate if present
    if (email) {
      const emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRe.test(email)) return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    }
    // phone optional but validate characters/length if present
    if (phone) {
      const phoneRe = /^[0-9+()\-\.\s]+$/;
      if (!phoneRe.test(phone) || phone.length < 7 || phone.length > 10) return NextResponse.json({ success: false, error: 'Invalid phone' }, { status: 400 });
    }
    if (!role || role.length < 2) return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
    if (!categoryKey) return NextResponse.json({ success: false, error: 'Category is required' }, { status: 400 });
    if (!location || location.length < 2) return NextResponse.json({ success: false, error: 'Invalid location' }, { status: 400 });
    // Validate textual length (strip HTML tags) so rich text still meets min length
    const testimonyText = String(testimony || '').replace(/<[^>]*>/g, '').trim();
    if (!testimonyText || testimonyText.length < 4) return NextResponse.json({ success: false, error: 'Testimony is too short' }, { status: 400 });

      // Map category (incoming key or raw string) to a canonical display name.
      // Normalize incoming value to tolerate variations like 'hallelconference',
      // 'Hallel Conference', or the key 'international'.
      const TAB_TO_CATEGORY_NORMALIZED: Record<string, string> = {
        guinness: 'Guinness World Records',
        guinnessworldrecords: 'Guinness World Records',
        onlineschool: 'Online School',
        ingenious: 'Ingenious Charm World Record',
        lcmclasses: 'LCM Classes',
        songbooks: 'Song Books',
        bibleschool: 'Bible School Training',
        summercamp: 'Summer Camp',
        hallelconference: 'Hallel Conference',
        hallelconferences: 'Hallel Conference'
      };

      const normalize = (s?: string) => (s || '').toString().toLowerCase().replace(/[\s_\-]+/g, '').replace(/[^a-z0-9]/g, '');
      const normKey = normalize(categoryKey as string);
      let category = TAB_TO_CATEGORY_NORMALIZED[normKey];
      if (!category) {
        // Fallback: try to title-case a human readable incoming value (replace dashes/underscores)
        const human = (categoryKey || '').toString().replace(/[_\-]+/g, ' ').trim();
        category = human.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || categoryKey || '';
      }

    // reCAPTCHA removed: not enforced

    // Insert into DB with prepared statements (sql tagged template) and mark as In-Review and text media
    const date = new Date().toISOString().split('T')[0];
    const { rows } = await sql`
      INSERT INTO stories (title, date, location, category, role, body, media_type, video_url, thumbnail_url, status, is_visible, email, phone, created_by, updated_by)
      VALUES (
        ${name}, ${date}, ${location}, ${category}, ${role}, ${testimony}, 'text', NULL, ${thumbnailUrl || null}, 'Submitted', false, ${email || null}, ${phone || null}, 'admin', 'admin'
      ) RETURNING *
    `;

    const created = rows[0];

    // Send a confirmation email to the submitter with only the filled fields.
    // Must await to ensure it completes before serverless function terminates.
    if (email) {
      try {
        const { sendMail } = await import('@/lib/smtpMailer');
        const { logger } = await import('@/lib/logger');

        const fields: Array<{ label: string; value: string }> = [];
        const titleCase = (s: string) => s.replace(/[_\-]/g, ' ').split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        const pushIf = (label: string, val: any) => {
          if (val === undefined || val === null) return;
          const v = Array.isArray(val) ? val.filter(Boolean).join(', ') : String(val);
          if (v && v.trim().length > 0) fields.push({ label: titleCase(label), value: v });
        };

        pushIf('name', name);
        pushIf('email', email);
        pushIf('phone', phone);
        pushIf('location', location);
        pushIf('category', category);
        pushIf('role', role);
        pushIf('testimony', testimony);

        // Use public logo URL and MSO-safe header/footer so clients like Outlook render correctly
        const logoUrl = 'https://pub-4aa39e08f95c43bd82cfca8220114a91.r2.dev/logo/ybh.png';
        let storyImageUrl = '';
        try {
          const raw = thumbnailUrl || '';
          if (raw.startsWith('http://') || raw.startsWith('https://')) {
            storyImageUrl = raw;
          } else if (raw) {
            const parsed = parseKeyFromUrl(raw);
            if (parsed?.key) {
              try {
                const head = await headObject(parsed.key, parsed.bucket || undefined);
                if (head) {
                  storyImageUrl = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
                }
              } catch {
                const pub = getPublicUrl(parsed.key, parsed.bucket || undefined);
                if (pub && !pub.startsWith('r2://')) storyImageUrl = pub;
              }
            }
          }
        } catch {}

        const plainLines = [`Dear ${name || ''},`, '', 'Thank you for sharing your testimony with YBH Ministries. Below are the details you submitted:', ''];
        for (const f of fields) plainLines.push(`${f.label}: ${f.value}`);
        plainLines.push('', 'We will review your submission and contact you if we need more information.');
        const plain = plainLines.join('\n');

        // Build stacked block layout like get-in-touch confirmation
        const htmlFields = fields.map(f => `
          <div style="margin-bottom:12px;">
            <div style="font-weight:600; color:#333;">${f.label}</div>
            <div style="color:#555;">${f.value}</div>
          </div>`).join('');

        const html = `
          <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color: #111; padding: 9px;">
              <div style="text-align:center; background-color:#000000; padding:20px;">
                ${logoUrl ? `<img src="${logoUrl}" alt="YBH Ministries" width="120" style="display:block;margin:0 auto;border:0;"/>` : ''}
              </div>
              <div style="margin-top:24px;">
                <h2 style="margin:0 0 12px 0; font-size:20px; color:#111;">Hi ${name || ''},</h2>
                <p style="margin:0 0 12px 0; color:#333; font-size:15px; line-height:1.5;">Thank you for sharing your testimony with <strong>YBH Ministries</strong>. Below are the details you submitted.</p>
                ${storyImageUrl ? `
                <div style="margin:0 0 16px 0;">
                  <img src="${storyImageUrl}" alt="Story image" width="160" style="display:block; max-width:160px; height:auto; border-radius:12px; border:1px solid #ddd;" />
                </div>` : ''}

                ${htmlFields}

                <p style="margin:16px 0 0 0;color:#333;">We will review your submission and contact you if we need more information.</p>
                <p style="margin:8px 0 0 0; color:#555; font-size:13px; font-style:italic;">Note:- This is a system-generated confirmation of your message. Please do not reply to this email.</p>
              </div>
          </div>`;

        const subject = `YBH Ministries — We received your testimony`;

        const res = await sendMail({
          from: process.env.EMAIL_FROM || undefined,
          to: email,
          replyTo: process.env.SMTP_USER || undefined,
          subject,
          text: plain,
          html,
        });

        if (res?.success) {
          logger.info('Stories confirmation email sent', { to: email });
        } else {
          logger.error('Stories confirmation email failed', { to: email, error: res?.error });
        }
      } catch (e) {
        try { const { logger } = await import('@/lib/logger'); logger.error('Failed sending stories email', { error: (e as any)?.message || e }); } catch (_) {}
      }
    }

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    console.error('POST /api/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to create story' }, { status: 500 });
  }
}
