import type { SendMailOptions } from 'nodemailer';

let _transporter: any = null;

function parseEnvList(raw?: string) {
  if (!raw) return [];
  return String(raw)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

async function getTransporter() {
  if (_transporter) return _transporter;
  const nodemailer = await import('nodemailer');
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpSecure = (process.env.SMTP_SECURE || 'true') === 'true';
  const smtpUser = typeof process.env.SMTP_USER === 'string' ? process.env.SMTP_USER.trim() : process.env.SMTP_USER;
  const smtpPassRaw = typeof process.env.SMTP_PASS === 'string' ? process.env.SMTP_PASS.trim() : process.env.SMTP_PASS;
  const smtpPass = smtpPassRaw ? String(smtpPassRaw).replace(/\s+/g, '') : smtpPassRaw;

  if (!smtpUser || !smtpPass) {
    console.warn('[smtpMailer] SMTP credentials not configured - SMTP_USER or SMTP_PASS missing');
    return null;
  }

  try {
    _transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Connection timeout settings for serverless environments
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    await _transporter.verify();
    console.log('[smtpMailer] SMTP transporter verified successfully');
  } catch (e: any) {
    console.error('[smtpMailer] SMTP transporter verification failed:', e?.message || e);
    // Keep transporter anyway - send may still work in some cases
  }

  return _transporter;
}

export type MailPayload = {
  to?: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
};

export async function sendMail(payload: MailPayload) {
  const transporter = await getTransporter();
  const fromAddress = (payload.from || process.env.EMAIL_FROM || process.env.SMTP_USER) as string;
  const replyTo = payload.replyTo || process.env.SMTP_USER;

  // combine env-level CC/BCC
  const envCc = parseEnvList(process.env.EMAIL_CC);
  const envBcc = parseEnvList(process.env.EMAIL_BCC);

  const ccList = ([] as string[])
    .concat(Array.isArray(payload.cc) ? payload.cc : (payload.cc ? String(payload.cc).split(',') : []))
    .map(s => String(s).trim())
    .filter(Boolean)
    .concat(envCc);

  const bccList = ([] as string[])
    .concat(Array.isArray(payload.bcc) ? payload.bcc : (payload.bcc ? String(payload.bcc).split(',') : []))
    .map(s => String(s).trim())
    .filter(Boolean)
    .concat(envBcc);

  const mailOptions: SendMailOptions = {
    from: fromAddress,
    to: payload.to,
    replyTo,
    cc: ccList.length ? ccList.join(',') : undefined,
    bcc: bccList.length ? bccList.join(',') : undefined,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  };

  if (!transporter) {
    // No SMTP configured — return a dev-friendly result
    return { success: false, error: 'no_smtp', mailOptions };
  }

  try {
    const result = await transporter.sendMail(mailOptions as any);
    return { success: true, result };
  } catch (err: any) {
    return { success: false, error: String(err?.message || err), details: err };
  }
}

export default { sendMail };
