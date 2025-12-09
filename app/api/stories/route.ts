import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getVisibleApprovedStories } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, headObject, getPublicUrl } from '@/lib/r2';
import { sanitizeInput, requireJson, checkBodySize, rateLimit } from '@/lib/security';
import { storySchema } from '@/lib/schemas';

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
    const role = sanitizeInput(body.role, 50);
    const categoryKey = sanitizeInput(body.category, 50);
    const location = sanitizeInput(body.location, 100);
    const testimony = sanitizeInput(body.testimony, 5000);

    const parsed = storySchema.safeParse({ name, email: email || undefined, role, category: categoryKey, location, testimony });
    if (!parsed.success) return NextResponse.json({ success: false, error: 'validation_error', details: parsed.error.format() }, { status: 400 });
    // email optional but validate if present
    if (email) {
      const emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRe.test(email)) return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
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
      INSERT INTO stories (title, date, location, category, role, body, media_type, video_url, thumbnail_url, status, is_visible, email, created_by, updated_by)
      VALUES (
        ${name}, ${date}, ${location}, ${category}, ${role}, ${testimony}, 'text', NULL, NULL, 'In-Review', false, ${email || null}, 'admin', 'admin'
      ) RETURNING *
    `;

    const created = rows[0];

    // Send a confirmation email to the submitter with only the filled fields.
    // Non-blocking: do not delay the API response if email sending fails.
    (async () => {
      try {
        if (!email) return;
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
        pushIf('date', new Date().toISOString().split('T')[0]);
        pushIf('location', location);
        pushIf('category', category);
        pushIf('role', role);
        pushIf('testimony', testimony);

        const plainLines = [`Dear ${name || ''},`, '', 'Thank you for sharing your testimony with YBH Ministries. Below are the details you submitted:', ''];
        for (const f of fields) plainLines.push(`${f.label}: ${f.value}`);
        plainLines.push('', 'We will review your submission and contact you if we need more information.');
        const plain = plainLines.join('\n');

        const htmlFields = fields.map(f => `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee; font-size:14px;color:#333;"><strong>${f.label}</strong></td><td style="padding:6px 12px;border-bottom:1px solid #eee; font-size:14px;color:#555;">${f.value}</td></tr>`).join('');
        const html = `
          <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#111; padding:18px;">
            <h2 style="font-size:18px;margin:0 0 12px 0;">Share Your Testimony — Received</h2>
            <p style="margin:0 0 12px 0;color:#333;">Dear ${name || ''},</p>
            <p style="margin:0 0 12px 0;color:#333;">Thank you for sharing your testimony with <strong>YBH Ministries</strong>. Below are the details you submitted.</p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; margin-top:12px; background:#fafafa; border-radius:4px;">
              ${htmlFields}
            </table>
            <p style="margin:12px 0 0 0;color:#333;">We will review your submission and contact you if we need more information.</p>
            <p style="margin:18px 0 0 0;color:#333; font-size:15px;">Regards,<br/>YBH Ministries</p>
            <p style="margin:8px 0 0 0; color:#555; font-size:13px; font-style:italic;">Note:- This is a system‑generated confirmation of your message. Please do not reply to this email.</p>
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

        if (process.env.ENABLE_VERBOSE_LOGS === 'true') logger.info('Stories email send result', { to: email, result: res });
      } catch (e) {
        try { const { logger } = await import('@/lib/logger'); if (process.env.ENABLE_VERBOSE_LOGS === 'true') logger.error('Failed sending stories email', { error: (e as any)?.message || e }); } catch (_) {}
      }
    })();

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    console.error('POST /api/stories error', err);
    return NextResponse.json({ success: false, error: 'Failed to create story' }, { status: 500 });
  }
}
