// Email helper: uses SendGrid when `SENDGRID_API_KEY` is configured. Falls back
// to console logging in development to avoid blocking admin flows.

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
        console.error('Brevo responded with non-OK status', res.status, parsed);
        return { success: false, error: 'brevo_error', status: res.status, body: parsed };
      }

      return { success: true, provider: 'brevo', status: res.status, body: parsed };
    } catch (err) {
      console.error('Brevo send failed', err);
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
        console.error('SendGrid responded with non-OK status', res.status, parsed);
        return { success: false, error: 'sendgrid_error', status: res.status, body: parsed };
      }

      return { success: true, provider: 'sendgrid', status: res.status, body: parsed };
    } catch (err) {
      console.error('SendGrid send failed', err);
      return { success: false, error: 'send_failed', details: String(err) };
    }
  }

  // Development fallback: log invite link so devs can copy it instead of sending real email.
  console.warn('SENDGRID_API_KEY not configured — logging invite link to console (development).');
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`Invite email (dev): to=${to}\nSubject=${subject}\n\n${plain}`);
  }
  return { success: true, dev: true };
}
