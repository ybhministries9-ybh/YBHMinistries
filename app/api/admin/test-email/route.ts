import { NextResponse } from 'next/server';

// Admin-only test email endpoint. Protect by setting TEST_EMAIL_KEY in env
// and providing it in the header `x-admin-test-key` when calling.
export async function POST(request: Request) {
  try {
    const key = request.headers.get('x-admin-test-key') || '';
    if (!process.env.TEST_EMAIL_KEY || String(process.env.TEST_EMAIL_KEY) !== key) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const to = body.to || process.env.SMTP_USER || process.env.EMAIL_BCC || null;
    const subject = body.subject || 'YBH Ministries — Test email';
    const text = body.text || 'This is a test email sent from the admin test endpoint.';
    const html = body.html || `<p>${text}</p>`;

    if (!to) return NextResponse.json({ error: 'no_recipient_configured' }, { status: 400 });

    const { sendMail } = await import('@/lib/smtpMailer');
    const res = await sendMail({ to, subject, text, html });

    // Minimal logging for debugging (logger may be unavailable in some runtimes)
    try {
      const { logger } = await import('@/lib/logger');
      if (res?.success) logger.info('Admin test-email sent', { to });
      else logger.warn('Admin test-email failed', { to, error: res?.error });
    } catch (_) {}

    return NextResponse.json({ success: !!res?.success, result: res });
  } catch (err: any) {
    try { const { logger } = await import('@/lib/logger'); logger.error('POST /api/admin/test-email error', { error: String(err) }); } catch (_) {}
    return NextResponse.json({ error: 'failed', details: String(err) }, { status: 500 });
  }
}
