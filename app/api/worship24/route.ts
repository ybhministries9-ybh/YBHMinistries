import { NextResponse } from 'next/server';
import { createWorship24 } from '../../../src/lib/db';
import validateEmail from '../../../src/lib/validateEmail';
import { sanitizeInput, requireJson, checkBodySize, rateLimit, verifyRecaptcha, isHoneypotFilled, getRateLimits } from '../../../src/lib/security';

export const runtime = 'nodejs';

function isSecondSaturdayDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return false;
  if (d.getDay() !== 6) return false;
  const first = new Date(d.getFullYear(), d.getMonth(), 1);
  const firstSatOffset = (6 - first.getDay() + 7) % 7;
  const firstSatDate = 1 + firstSatOffset;
  return d.getDate() === firstSatDate + 7;
}

export async function POST(request: Request) {
  try {
    if (!requireJson(request)) return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 });
    if (!checkBodySize(request, 128 * 1024)) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const { limit, windowMs } = getRateLimits(20, 60 * 60 * 1000);
    const rl = await rateLimit(`worship24:${ip}`, limit, windowMs);
    if (!rl.ok) {
      const resetMs = rl.reset ?? (Date.now() + windowMs);
      const resetSeconds = Math.max(1, Math.ceil((resetMs - Date.now()) / 1000));
      return NextResponse.json({ error: 'Too many requests', reset: resetMs }, { status: 429, headers: { 'Retry-After': String(resetSeconds) } });
    }

    let body: any = null;
    try { body = await request.json(); } catch (e) { return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }); }

    // Honeypot check
    if (isHoneypotFilled(body)) return NextResponse.json({ error: 'bot detected' }, { status: 400 });

    // reCAPTCHA verification when configured
    try {
      const token = body?.recaptchaToken || body?.recaptcha_token;
      const rc = await verifyRecaptcha(token);
      if (!rc.ok) return NextResponse.json({ error: 'recaptcha_failed', details: rc }, { status: 403 });
    } catch (e) {
      return NextResponse.json({ error: 'recaptcha_error' }, { status: 500 });
    }

    const name = sanitizeInput(body?.name, 200);
    const emailRaw = body?.email ? String(body.email).trim() : undefined;
    const email = emailRaw ? sanitizeInput(emailRaw, 254) : undefined;
    const phone = sanitizeInput(body?.phone, 50);
    const location = sanitizeInput(body?.location, 200);
    const message = sanitizeInput(body?.message, 4000);
    const booking_date = sanitizeInput(body?.date, 20);
    const timeslot = sanitizeInput(body?.timeslot, 200);
    const facebook_link = sanitizeInput(body?.facebook, 300);

    if (!name || name.length < 2) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    if (!phone || phone.length < 7) return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    const phoneRe = /^[0-9+()\-\.\s]+$/;
    if (!phoneRe.test(phone)) return NextResponse.json({ error: 'Phone contains invalid characters' }, { status: 400 });
    // Message is optional for Worship24; do not enforce a minimum length here.
    if (!booking_date) return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    if (!isSecondSaturdayDate(booking_date)) return NextResponse.json({ error: 'Date must be the 2nd Saturday of the month' }, { status: 400 });

    // ensure month/year not before current
    const d = new Date(booking_date + 'T00:00:00');
    const now = new Date();
    if (d.getFullYear() < now.getFullYear() || (d.getFullYear() === now.getFullYear() && d.getMonth() < now.getMonth())) {
      return NextResponse.json({ error: 'Previous months are not allowed' }, { status: 400 });
    }

    // timeslot validation: basic presence
    if (!timeslot) return NextResponse.json({ error: 'Timeslot is required' }, { status: 400 });

    // email optional but validate if present
    let emailVal: string | null = null;
    if (email && email.length > 0) {
      const v = validateEmail(email, { allowInternational: false });
      if (!v.valid) return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
      emailVal = v.normalized || null;
    }

    const userAgent = request.headers.get('user-agent') || null;

    let saved;
    try {
      saved = await createWorship24({
        name,
        email: emailVal,
        phone,
        location,
        message,
        booking_date,
        timeslot,
        facebook_link: facebook_link || null,
        user_agent: userAgent,
      });
    } catch (dbErr: any) {
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    // Send confirmation to submitter (if email provided) and notify admin
    try {
      const { sendTransactional } = await import('../../../src/lib/email');
      const logoUrl = 'https://pub-4aa39e08f95c43bd82cfca8220114a91.r2.dev/logo/ybh.png';

      const fields: Array<{ label: string; value: string }> = [];
      const push = (label: string, val?: any) => { if (val !== undefined && val !== null) fields.push({ label, value: String(val) }); };
      // Format booking date for human-friendly emails: MMM DD, YYYY
      const bookingDateFormatted = (() => {
        try {
          const dt = new Date(String(booking_date) + 'T00:00:00');
          if (isNaN(dt.getTime())) return String(booking_date || '');
          return dt.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        } catch (e) { return String(booking_date || ''); }
      })();

      push('Full name', name);
      push('Email', emailVal || '');
      push('Phone', phone);
      push('Location', location || '');
      push('Booking date', bookingDateFormatted);
      push('Timeslot', timeslot);
      push('Facebook', facebook_link || '');
      push('Message', message || '');

      const htmlFields = fields.map(f => `
                    <div style="margin-bottom:12px;">
                      <div style="font-weight:600; color:#333;">${f.label}</div>
                      <div style="color:#555;">${f.value}</div>
                    </div>`).join('');

      const html = `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111;padding:9px;">
              <div style="text-align:center;background:#000;padding:20px;color:#fff;">
                ${logoUrl ? `<img src="${logoUrl}" alt="YBH" width="110" style="display:block;margin:0 auto;"/>` : ''}
              </div>
              <div style="margin-top:24px;">
                <h2 style="margin:0 0 8px 0;">Hi ${name || ''},</h2>
                <p style="margin:0 0 12px 0;color:#333;">Thanks for booking a slot for <strong>24 Hours Worship</strong>. We received your booking and will review it shortly.</p>

                ${htmlFields}

                <p style="margin:16px 0 0 0;color:#333;">Regards,<br/>YBH Ministries</p>
                <p style="margin:8px 0 0 0; color:#555; font-size:13px; font-style:italic;">Note:- This is a system-generated confirmation of your message. Please do not reply to this email.</p>            
              </div>
          </div>`;

      // Confirmation for submitter
      if (emailVal) {
        const subject = `YBH Ministries — 24 Hours Worship booking received`;
        const plainLines = [`Hi ${name || ''},`, '', 'Thanks for booking a slot for 24 Hours Worship. We received your booking and will review it shortly.', '', 'Booking details:', ''];
        for (const f of fields) plainLines.push(`${f.label}: ${f.value}`);
        plainLines.push('', 'Regards,', 'YBH Ministries');
        const plain = plainLines.join('\n');


        try {
          await sendTransactional({ to: emailVal, subject, text: plain, html, from: process.env.EMAIL_FROM });
        } catch (e) {
          try { const { logger } = await import('../../../src/lib/logger'); logger.error('worship24: failed to send confirmation', { error: String(e) }); } catch (_) {}
        }
      }

      // NOTE: admin notification removed — only send confirmation to submitter.
    } catch (err) {
      try { const { logger } = await import('../../../src/lib/logger'); logger.error('worship24: email send failed', { error: String(err) }); } catch (_) {}
    }

    const resetEpoch = Math.ceil((rl.reset ?? (Date.now() + windowMs)) / 1000);
    return NextResponse.json({ success: true, id: (saved as any).id }, { headers: { 'X-RateLimit-Limit': String(limit), 'X-RateLimit-Remaining': String(rl.remaining ?? 0), 'X-RateLimit-Reset': String(resetEpoch) } });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
