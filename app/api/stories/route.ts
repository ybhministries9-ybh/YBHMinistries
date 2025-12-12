import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getVisibleApprovedStories } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, headObject, getPublicUrl } from '@/lib/r2';
import { sanitizeInput, requireJson, checkBodySize, rateLimit } from '@/lib/security';
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
    return NextResponse.json({ success: true, data: enhanced });
  } catch (err) {
    console.error('GET /api/stories error', err);
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
    // Basic server-side validation & sanitization
    const name = sanitizeInput(body.name, 100);
    const email = sanitizeInput(body.email, 254);
    const phone = sanitizeInput(body.phone, 15);
    const role = sanitizeInput(body.role, 100);
    const categoryKey = sanitizeInput(body.category, 50);
    const location = sanitizeInput(body.location, 100);
    const testimony = sanitizeInput(body.testimony, 5000);

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
      if (!phoneRe.test(phone) || phone.length < 7 || phone.length > 15) return NextResponse.json({ success: false, error: 'Invalid phone' }, { status: 400 });
    }
    if (!role || role.length < 2) return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
    if (!categoryKey) return NextResponse.json({ success: false, error: 'Category is required' }, { status: 400 });
    if (!location || location.length < 2) return NextResponse.json({ success: false, error: 'Invalid location' }, { status: 400 });
    if (!testimony || testimony.length < 50) return NextResponse.json({ success: false, error: 'Testimony is too short' }, { status: 400 });

    // Map category key to display name (server-side canonical mapping)
    const TAB_TO_CATEGORY: Record<string, string> = {
      guinness: 'Guinness World Records',
      asian: 'Asian Book of Records',
      ingenious: 'Ingenious Charm World Record',
      songwriting: 'Song Writing Classes',
      bibleschool: 'Bible School Training',
      hallel: 'Hallel Summer Kids Training'
    };

    const category = TAB_TO_CATEGORY[categoryKey] || categoryKey;

    // reCAPTCHA removed: not enforced

    // Insert into DB with prepared statements (sql tagged template) and mark as In-Review and text media
    const date = new Date().toISOString().split('T')[0];
    const { rows } = await sql`
      INSERT INTO stories (title, date, location, category, role, body, media_type, video_url, thumbnail_url, status, is_visible, email, phone, created_by, updated_by)
      VALUES (
        ${name}, ${date}, ${location}, ${category}, ${role}, ${testimony}, 'text', NULL, NULL, 'Submitted', false, ${email || null}, ${phone || null}, 'admin', 'admin'
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

        const plainLines = [`Dear ${name || ''},`, '', 'Thank you for sharing your testimony with YBH Ministries. Below are the details you submitted:', ''];
        for (const f of fields) plainLines.push(`${f.label}: ${f.value}`);
        plainLines.push('', 'We will review your submission and contact you if we need more information.');
        const plain = plainLines.join('\n');

        const htmlFields = fields.map(f => `<tr><td style="padding:10px 12px;border-bottom:1px solid #eee;background:#fafafa;font-weight:600;width:40%;">${f.label}</td><td style="padding:10px 12px;border-bottom:1px solid #eee;background:#ffffff;color:#555;">${f.value}</td></tr>`).join('');

        const html = `
          <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color: #111; background-color: #f7f7f7; padding: 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
              <tr>
                <td bgcolor="#000000" style="padding:20px 24px; text-align:center; background-color:#000000;">
                  <!--[if mso]>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background-color:#000000;padding:20px 24px;text-align:center;">
                  <![endif]-->
                  ${logoUrl ? `<img src="${logoUrl}" alt="YBH Ministries" width="120" style="display:block;margin:0 auto;border:0;"/>` : ''}
                  <!--[if mso]>
                    </td></tr></table>
                  <![endif]-->
                </td>
              </tr>
              <tr>
                <td style="padding:24px;">
                  <h2 style="margin:0 0 12px 0; color:#333; font-size:15px; line-height:1.5;">Dear ${name || ''},</h2>
                  <p style="margin:0 0 12px 0; color:#333; font-size:15px; line-height:1.5;">Thank you for sharing your testimony with <strong>YBH Ministries</strong>. Below are the details you submitted.</p>

                  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; margin-top:18px;">
                    ${htmlFields}
                  </table>

                  <p style="margin:24px 0 0 0; color:#333; font-size:15px;">We will review your submission and contact you if we need more information.</p>

                  <p style="margin:18px 0 0 0; color:#333; font-size:15px;">Regards,<br/><span style="color:#333; font-size:15px;">YBH Ministries</span></p>
                  <p style="margin:12px 0 0 0; color:#555; font-size:13px; font-style:italic;">Note:- This is a system‑generated confirmation of your message. Please do not reply to this email.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 24px; text-align:center; background:#101010; color:#fff; font-size:12px;">
                  <div style="max-width:560px;margin:0 auto;">&copy; ${new Date().getFullYear()} YBH Ministries. All rights reserved.</div>
                </td>
              </tr>
            </table>
          </div>
        `;

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
