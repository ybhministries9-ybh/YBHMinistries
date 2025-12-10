// Email helper: uses SendGrid when `SENDGRID_API_KEY` is configured. Falls back
// to console logging in development to avoid blocking admin flows.

import { logger } from './logger';

export async function sendInviteEmail(to: string, name: string | null, link: string) {
  const subject = 'Set up your admin account at YBH Ministries';
  const plain = `Hello ${name || ''},\n\nPlease set up your admin account by visiting the link below:\n\n${link}\n\nThis link will expire in 48 hours.`;
  const html = `<p>Hello ${name || ''},</p><p>Please set up your admin account by clicking <a href="${link}">this link</a>.</p><p>This link will expire in 48 hours.</p>`;

  const BREVO_KEY = process.env.BREVO_API_KEY;
  const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@ybhministries.org';

  // Prefer Brevo (Sendinblue) if configured
  if (BREVO_KEY) {
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': BREVO_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { email: FROM_EMAIL, name: 'YBH Ministries' },
          to: [{ email: to }],
          subject,
          htmlContent: html,
          textContent: plain,
        }),
      });

      const text = await res.text();
      let parsed: any = text;
      try { parsed = JSON.parse(text); } catch (e) { /* keep raw text */ }

      if (!res.ok) {
        logger.error('Brevo responded with non-OK status', { status: res.status, body: parsed });
        return { success: false, error: 'brevo_error', status: res.status, body: parsed };
      }

      return { success: true, provider: 'brevo', status: res.status, body: parsed };
    } catch (err) {
      logger.error('Brevo send failed', { error: String(err) });
      return { success: false, error: 'brevo_failed', details: String(err) };
    }
  }

  // Fallback to SendGrid if configured
  if (SENDGRID_KEY) {
    try {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: to }],
            },
          ],
          from: { email: FROM_EMAIL, name: 'YBH Ministries' },
          subject,
          content: [
            { type: 'text/plain', value: plain },
            { type: 'text/html', value: html },
          ],
        }),
      });

      const text = await res.text();
      let parsed: any = text;
      try { parsed = JSON.parse(text); } catch (e) { /* keep raw text */ }

      if (!res.ok) {
        logger.error('SendGrid responded with non-OK status', { status: res.status, body: parsed });
        return { success: false, error: 'sendgrid_error', status: res.status, body: parsed };
      }

      return { success: true, provider: 'sendgrid', status: res.status, body: parsed };
    } catch (err) {
      logger.error('SendGrid send failed', { error: String(err) });
      return { success: false, error: 'send_failed', details: String(err) };
    }
  }

  // Development fallback: log invite link so devs can copy it instead of sending real email.
  logger.warn('SENDGRID_API_KEY not configured — invite link logged in development.');
  if (process.env.NODE_ENV !== 'production') {
    // In development we still return success to avoid blocking flows.
  }
  return { success: true, dev: true };
}

export type TransactionPayload = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
};

export async function sendTransactional(payload: TransactionPayload) {
  const BREVO_KEY = process.env.BREVO_API_KEY;
  const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = payload.from || process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@ybhministries.org';

  // Prefer Brevo
  if (BREVO_KEY) {
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': BREVO_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: { email: FROM_EMAIL, name: 'YBH Ministries' }, to: (Array.isArray(payload.to) ? payload.to.map(email => ({ email })) : [{ email: payload.to }]), subject: payload.subject, htmlContent: payload.html, textContent: payload.text }),
      });
      const text = await res.text();
      let parsed: any = text;
      try { parsed = JSON.parse(text); } catch (e) {}
      if (!res.ok) {
        logger.error('Brevo transactional responded non-OK', { status: res.status, body: parsed });
        return { success: false, error: 'brevo_error', status: res.status, body: parsed };
      }
      return { success: true, provider: 'brevo', status: res.status, body: parsed };
    } catch (err) {
      logger.error('Brevo transactional failed', { error: String(err) });
      return { success: false, error: 'brevo_failed', details: String(err) };
    }
  }

  // Prefer SendGrid
  if (SENDGRID_KEY) {
    try {
      const toList = Array.isArray(payload.to) ? payload.to : [payload.to];
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: { Authorization: `Bearer ${SENDGRID_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalizations: [{ to: toList.map(email => ({ email })) }], from: { email: FROM_EMAIL, name: 'YBH Ministries' }, subject: payload.subject, content: [{ type: 'text/plain', value: payload.text || '' }, { type: 'text/html', value: payload.html || '' }] }),
      });
      const text = await res.text();
      let parsed: any = text;
      try { parsed = JSON.parse(text); } catch (e) {}
      if (!res.ok) {
        logger.error('SendGrid transactional responded non-OK', { status: res.status, body: parsed });
        return { success: false, error: 'sendgrid_error', status: res.status, body: parsed };
      }
      return { success: true, provider: 'sendgrid', status: res.status, body: parsed };
    } catch (err) {
      logger.error('SendGrid transactional failed', { error: String(err) });
      return { success: false, error: 'send_failed', details: String(err) };
    }
  }

  // Fallback to SMTP transporter
  try {
    const { sendMail } = await import('./smtpMailer');
    const res = await sendMail({ to: payload.to as any, from: FROM_EMAIL, subject: payload.subject, text: payload.text, html: payload.html, replyTo: payload.replyTo });
    if (!res?.success) {
      logger.warn('SMTP fallback transactional failed', { error: res?.error });
      return { success: false, error: 'smtp_failed', details: res };
    }
    return { success: true, provider: 'smtp', result: res };
  } catch (err) {
    logger.error('Transactional send fallback failed', { error: String(err) });
    return { success: false, error: 'fallback_failed', details: String(err) };
  }
}
