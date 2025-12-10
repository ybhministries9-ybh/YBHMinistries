import { NextResponse } from 'next/server';
import { createGetInTouch } from '../../../src/lib/db';
import validateEmail from '../../../src/lib/validateEmail';
import { sanitizeInput, requireJson, checkBodySize, rateLimit } from '../../../src/lib/security';
import { getInTouchSchema } from '../../../src/lib/schemas';

// Server-side API route to accept GET (optional) and POST to store submissions
export async function POST(request: Request) {
  try {
    // Content checks: require JSON and limit body size
    if (!requireJson(request)) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 });
    }
    if (!checkBodySize(request, 64 * 1024)) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    // Simple per-IP rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const rl = await rateLimit(`get-in-touch:${ip}`, 20, 60 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    let body: any = null;
    try {
      body = await request.json();
    } catch (parseErr: any) {
      // Log and return a 400 if the incoming body is not valid JSON
      const { logger } = await import('../../../src/lib/logger');
      logger.error('Invalid JSON body in /api/get-in-touch', { error: parseErr?.message });
      // Try to read raw text for debugging
      let rawBody: string | null = null;
      try {
        rawBody = await request.text();
      } catch (tErr) {
        rawBody = null;
      }
      return NextResponse.json({ error: 'Invalid JSON body', details: parseErr.message, rawBody }, { status: 400 });
    }
    const { name, email, message, phone } = body || {};

    // Sanitize inputs early
    const nameClean = sanitizeInput(name, 100);
    const messageClean = sanitizeInput(message, 4000);
    const phoneClean = sanitizeInput(phone, 50);
    const locationClean = sanitizeInput(body?.location, 200);

    const parsed = getInTouchSchema.safeParse({ name: nameClean, email: email ? sanitizeInput(String(email).trim(), 254) : undefined, phone: phoneClean, message: messageClean, location: locationClean });
    if (!parsed.success) {
      return NextResponse.json({ error: 'validation_error', details: parsed.error.format() }, { status: 400 });
    }

    // Basic server-side validation
    if (!nameClean || nameClean.length < 2) {
      return NextResponse.json({ error: 'Name is required and must be at least 2 characters.' }, { status: 400 });
    }
    // Email is optional; if provided, validate using our validator
    let emailVal: string | null = null;
    if (email !== undefined && email !== null && String(email).trim().length > 0) {
      const emailInput = sanitizeInput(String(email).trim(), 254) || '';
      const v = validateEmail(emailInput, { allowInternational: false });
      if (!v.valid) {
        return NextResponse.json({ error: 'Invalid email address', details: v.errors }, { status: 400 });
      }
      emailVal = v.normalized || null;
    }
    // Log whether an email was provided (obfuscated) to help diagnose delivery issues
    try {
      const { logger } = await import('../../../src/lib/logger');
      const obfuscate = (e: string | null) => {
        if (!e) return null;
        return e.replace(/(.{2}).+(@.+)/, '$1***$2');
      };
      logger.info('get-in-touch: email presence', { hasEmail: !!emailVal, email: obfuscate(emailVal) });
    } catch (e) {
      // ignore logging errors
    }
    if (!messageClean || messageClean.length < 10) {
      return NextResponse.json({ error: 'Message is required and must be at least 10 characters.' }, { status: 400 });
    }

    // Phone (required) - basic validation for presence, length and allowed characters
    if (!phoneClean || phoneClean.length === 0) {
      return NextResponse.json({ error: 'Phone is required.' }, { status: 400 });
    }
    if (phoneClean.length < 7 || phoneClean.length > 30) {
      return NextResponse.json({ error: 'Phone number must be between 7 and 30 characters.' }, { status: 400 });
    }
    const phoneRe = /^[0-9+()\-\.\s]+$/;
    if (!phoneRe.test(phoneClean)) {
      return NextResponse.json({ error: 'Phone number contains invalid characters.' }, { status: 400 });
    }
    const phoneVal = phoneClean;

    // Prefer explicit location from the client; fall back to null.
    const location = locationClean;
    const userAgent = request.headers.get('user-agent') || null;

    // Log the exact payload we will send to DB (only when ENABLE_VERBOSE_LOGS is set)
    try {
      const { logger } = await import('../../../src/lib/logger');
      if (process.env.ENABLE_VERBOSE_LOGS === 'true') {
        logger.info('/api/get-in-touch payload for DB', {
          name: nameClean,
          email: emailVal,
          phone: phoneVal,
          messageLen: messageClean?.length,
          location,
        });
      }
    } catch (e) {
      // ignore logging errors
    }

    let saved;
    try {
      saved = await createGetInTouch({
        name: nameClean,
        email: emailVal,
        message: messageClean,
        phone: phoneVal,
        location,
        user_agent: userAgent,
      });
    } catch (dbErr: any) {
      const { logger } = await import('../../../src/lib/logger');
      logger.error('DB error in createGetInTouch', { error: dbErr?.message });
      // Do not leak internal DB errors to the client. Return a generic message.
      return NextResponse.json({ error: 'DB error', details: 'An internal error occurred while saving the submission.' }, { status: 500 });
    }

    if (!saved || !('id' in saved)) {
      const { logger } = await import('../../../src/lib/logger');
      logger.error('createGetInTouch returned no row or missing id', { saved });
      return NextResponse.json({ error: 'Failed to save submission', details: saved }, { status: 500 });
    }

    // Use reusable SMTP mailer to send email; do not block response if it fails.
    (async () => {
      if (!emailVal) return;
      try {
        const { sendMail } = await import('../../../src/lib/smtpMailer');
        const subject = `YBH Ministries — We received your message`;
        const logoUrl = 'https://pub-4aa39e08f95c43bd82cfca8220114a91.r2.dev/logo/ybh.png';

        // Build fields table similar to HMS email format
        const fields: Array<{ label: string; value: string }> = [];
        const titleCase = (s: string) => String(s || '').replace(/[_\-]/g, ' ').split(/\s+/).map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
        const fmt = (v: any) => {
          if (v === undefined || v === null) return '';
          if (Array.isArray(v)) return v.filter(Boolean).join(', ');
          return String(v);
        };

        const pushIf = (label: string, val: any) => { const fv = fmt(val); if (fv && fv.trim()) fields.push({ label: titleCase(label), value: fv }); };
        pushIf('Full name', nameClean);
        pushIf('Email', emailVal);
        pushIf('Phone', phoneVal);
        pushIf('Location', location);
        pushIf('Message', messageClean ? messageClean.replace(/\n/g, '<br/>') : '');

        const plainLines = [`Hi ${nameClean || ''},`, '', 'Thanks for reaching out to YBH Ministries. We received your message and our team will review it shortly.', '', 'Submission details:', ''];
        for (const f of fields) plainLines.push(`${f.label}: ${f.value}`);
        plainLines.push('', 'Regards,', 'YBH Ministries', '', 'Note:- This is a system-generated confirmation of your message. Please do not reply to this email.');
        const plain = plainLines.join('\n');

        const htmlFields = fields.map(f => `<tr><td style="padding:10px 12px;border-bottom:1px solid #eee;background:#fafafa;font-weight:600;width:40%;">${f.label}</td><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#555;">${f.value}</td></tr>`).join('');

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
                  <h2 style="margin:0 0 12px 0; font-size:20px; color:#111;">Hi ${nameClean || ''},</h2>
                  <p style="margin:0 0 12px 0; color:#333; font-size:15px; line-height:1.5;">Thanks for reaching out to <strong>YBH Ministries</strong>. We received your message and our team will review it shortly.</p>

                  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; margin-top:18px;">
                    ${htmlFields}
                  </table>

                  <p style="margin:24px 0 0 0; color:#333; font-size:15px;">Regards,<br/><span style="color:#333; font-size:15px;">YBH Ministries</span></p>
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

        try {
          const { logger } = await import('../../../src/lib/logger');
          logger.info('get-in-touch: attempting confirmation send', { to: String(emailVal).replace(/(.{2}).+(@.+)/, '$1***$2') });
        } catch (e) {}

        const res = await sendMail({
          from: process.env.EMAIL_FROM || undefined,
          to: emailVal,
          replyTo: process.env.SMTP_USER || undefined,
          subject,
          text: plain,
          html,
        });
        try {
          const { logger } = await import('../../../src/lib/logger');
          if (res?.success) {
            logger.info('Sent confirmation email for get-in-touch', { to: String(emailVal).replace(/(.{2}).+(@.+)/, '$1***$2') });
          } else {
            logger.warn('Confirmation email not sent for get-in-touch', { to: String(emailVal).replace(/(.{2}).+(@.+)/, '$1***$2'), error: res?.error });
          }
          // TEMPORARY DEBUG: log full sendMail result object to help diagnose production issues.
          // Remove this once debugging is complete.
          logger.info('get-in-touch: raw sendMail result', { result: res });
        } catch (e) {}
      } catch (emailErr: any) {
        try {
          const { logger } = await import('../../../src/lib/logger');
          logger.error('Failed to send confirmation email for get-in-touch', { error: String(emailErr?.message || emailErr) });
        } catch (_) {
          // ignore
        }
      }
    })();

    return NextResponse.json({ success: true, id: (saved as any).id });
  } catch (err: any) {
    const { logger } = await import('../../../src/lib/logger');
    logger.error('Error in /api/get-in-touch', { error: err?.message });
    // Avoid returning stack traces or internal error messages to clients.
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
