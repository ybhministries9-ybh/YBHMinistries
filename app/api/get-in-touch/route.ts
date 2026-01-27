import { NextResponse } from 'next/server';
import { createGetInTouch } from '../../../src/lib/db';
import validateEmail from '../../../src/lib/validateEmail';
import { sanitizeInput, requireJson, checkBodySize, rateLimit, verifyRecaptcha, isHoneypotFilled, getRateLimits } from '../../../src/lib/security';
import { getInTouchSchema } from '../../../src/lib/schemas';

// Force Node.js runtime - nodemailer requires Node.js APIs (TCP sockets) not available in Edge runtime
export const runtime = 'nodejs';

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
    const { limit, windowMs } = getRateLimits(20, 60 * 60 * 1000);
    const rl = await rateLimit(`get-in-touch:${ip}`, limit, windowMs);
    if (!rl.ok) {
      const resetMs = rl.reset ?? (Date.now() + windowMs);
      const resetSeconds = Math.max(1, Math.ceil((resetMs - Date.now()) / 1000));
      return NextResponse.json({ error: 'Too many requests', reset: resetMs }, { status: 429, headers: { 'Retry-After': String(resetSeconds) } });
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
    const { name, email, message, phone, hearAboutUs, otherHearAboutUs } = body || {};

    // Honeypot: simple bot trap. Reject requests with the honeypot field filled.
    if (isHoneypotFilled(body)) {
      return NextResponse.json({ error: 'bot detected' }, { status: 400 });
    }

    // Verify reCAPTCHA when configured. Clients should send `recaptchaToken`.
    try {
      const token = body?.recaptchaToken || body?.recaptcha_token;
      const rc = await verifyRecaptcha(token);
      if (!rc.ok) return NextResponse.json({ error: 'recaptcha_failed', details: rc }, { status: 403 });
    } catch (e) {
      // If recaptcha verification fails unexpectedly, treat as a server error
      return NextResponse.json({ error: 'recaptcha_error' }, { status: 500 });
    }

    // Sanitize inputs early
    const nameClean = sanitizeInput(name, 100);
    const messageClean = sanitizeInput(message, 4000);
    const phoneClean = sanitizeInput(phone, 50);
    const locationClean = sanitizeInput(body?.location, 200);
    const hearAboutUsClean = sanitizeInput(hearAboutUs, 50);
    const otherHearAboutUsClean = sanitizeInput(otherHearAboutUs, 20);

    const parsed = getInTouchSchema.safeParse({
      name: nameClean,
      email: email ? sanitizeInput(String(email).trim(), 254) : undefined,
      phone: phoneClean,
      message: messageClean,
      location: locationClean,
      hearAboutUs: hearAboutUsClean,
      otherHearAboutUs: otherHearAboutUsClean,
    });
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
        hearAboutUs: hearAboutUsClean,
        otherHearAboutUs: hearAboutUsClean === 'Other' ? otherHearAboutUsClean : null,
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

    // Send confirmation email - must await to ensure it completes before function terminates
    if (emailVal) {
      try {
        const { sendTransactional } = await import('../../../src/lib/email');
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
        // Include the 'How did you hear about us' field (show other text when provided)
        const hearVal = hearAboutUsClean ? (hearAboutUsClean === 'Other' ? `Other: ${otherHearAboutUsClean || ''}` : hearAboutUsClean) : '';
        if (hearVal && hearVal.trim()) {
          fields.push({ label: 'How did you hear about us?', value: hearVal });
        }
        pushIf('Message', messageClean ? messageClean.replace(/\n/g, '<br/>') : '');

        const plainLines = [`Hi ${nameClean || ''},`, '', 'Thanks for reaching out to YBH Ministries. We received your message and our team will review it shortly.', '', 'Submission details:', ''];
        for (const f of fields) plainLines.push(`${f.label}: ${f.value}`);
        plainLines.push('', 'Regards,', 'YBH Ministries', '', 'Note:- This is a system-generated confirmation of your message. Please do not reply to this email.');
        const plain = plainLines.join('\n');

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
                <h2 style="margin:0 0 12px 0; font-size:20px; color:#111;">Hi ${nameClean || ''},</h2>
                <p style="margin:0 0 12px 0; color:#333; font-size:15px; line-height:1.5;">Thanks for reaching out to <strong>YBH Ministries</strong>. We received your message and our team will review it shortly.</p>

                ${htmlFields}

                <p style="margin:16px 0 0 0;color:#333;">Regards,<br/>YBH Ministries</p>
                <p style="margin:8px 0 0 0; color:#555; font-size:13px; font-style:italic;">Note:- This is a system-generated confirmation of your message. Please do not reply to this email.</p>
              </div>
          </div>`;

        try {
          const { logger } = await import('../../../src/lib/logger');
          logger.info('get-in-touch: attempting confirmation send', { to: String(emailVal).replace(/(.{2}).+(@.+)/, '$1***$2') });
        } catch (e) {}

        const res = await sendTransactional({
          from: process.env.EMAIL_FROM || undefined,
          to: emailVal,
          replyTo: process.env.SMTP_USER || undefined,
          subject,
          text: plain,
          html,
        });
        const { logger } = await import('../../../src/lib/logger');
        if (res?.success) {
          logger.info('Sent confirmation email for get-in-touch', { to: emailVal });
        } else {
          logger.error('Failed to send confirmation email for get-in-touch', { error: res?.error });
        }
      } catch (emailErr: any) {
        try {
          const { logger } = await import('../../../src/lib/logger');
          logger.error('Failed to send confirmation email for get-in-touch', { error: String(emailErr?.message || emailErr) });
        } catch (_) {
          // ignore
        }
      }
    }

    const resetEpoch = Math.ceil((rl.reset ?? (Date.now() + windowMs)) / 1000);
    return NextResponse.json({ success: true, id: (saved as any).id }, { headers: { 'X-RateLimit-Limit': String(limit), 'X-RateLimit-Remaining': String(rl.remaining ?? 0), 'X-RateLimit-Reset': String(resetEpoch) } });
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
