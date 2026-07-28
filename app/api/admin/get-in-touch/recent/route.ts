import { NextResponse } from 'next/server';

// Admin-only endpoint to fetch recent Get In Touch submissions.
// Protected by TEST_EMAIL_KEY header to avoid exposing data.
export async function GET(request: Request) {
  try {
    // Require a valid admin session — this endpoint returns PII (names, emails, phones).
    const { resolveSessionAndActorFromAuthHeader } = await import('@/lib/sessions');
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

    const { getGetInTouch } = await import('@/lib/db');
    const result = await getGetInTouch({ limit: 10 });
    // Return only non-sensitive fields (email is safe here for debugging)
    const mapped = result.rows.map((r: any) => ({ id: r.id, name: r.name, email: r.email, phone: r.phone, hear_about_us: r.hear_about_us, other_hear_about_us: r.other_hear_about_us, message: r.message, created_at: r.created_at }));
    return NextResponse.json({ success: true, data: mapped });
  } catch (err: any) {
    try { const { logger } = await import('@/lib/logger'); logger.error('GET /api/admin/get-in-touch/recent error', { error: String(err) }); } catch {}
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
