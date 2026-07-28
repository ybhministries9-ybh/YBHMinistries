import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hashPassword, verifyPassword } from '@/lib/password';
import { rateLimit, buildRateKey } from '@/lib/security';

export const dynamic = 'force-dynamic';

const GENERIC_FAIL = { success: false, error: 'Password reset failed. Check your details and try again.' };

export async function POST(request: NextRequest) {
  try {
    // Strict rate limiting: this endpoint can change credentials.
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip') || 'unknown';
    const ipLimit = await rateLimit(buildRateKey('pwreset:ip', ip), 5, 60 * 60 * 1000);
    if (!ipLimit.ok) {
      return NextResponse.json({ success: false, error: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    const data = await request.json().catch(() => null);
    const email = data?.email?.toString().toLowerCase().trim() || '';
    const currentPassword = typeof data?.currentPassword === 'string' ? data.currentPassword : '';
    const newPassword = typeof data?.newPassword === 'string' ? data.newPassword : '';
    if (!email || !newPassword) return NextResponse.json({ success: false, error: 'email & newPassword required' }, { status: 400 });

    // Enforce a minimum password policy server-side
    if (newPassword.length < 8 || newPassword.length > 256) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const acctLimit = await rateLimit(buildRateKey('pwreset:acct', email), 5, 60 * 60 * 1000);
    if (!acctLimit.ok) {
      return NextResponse.json({ success: false, error: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    const res = await sql`SELECT * FROM users WHERE lower(email) = ${email} LIMIT 1`;
    // Do not reveal whether the account exists.
    if (!res.rows.length) return NextResponse.json(GENERIC_FAIL, { status: 401 });
    const user = res.rows[0];

    // If a current password was provided, verify it. Otherwise require
    // must_reset_password to be true (first-time flow after an admin reset/invite).
    if (currentPassword) {
      if (!user.password_hash || !verifyPassword(currentPassword, user.password_hash)) {
        return NextResponse.json(GENERIC_FAIL, { status: 401 });
      }
    } else if (!user.must_reset_password) {
      return NextResponse.json(GENERIC_FAIL, { status: 401 });
    }

    const newHash = hashPassword(newPassword);
    const updated = await sql`
      UPDATE users SET password_hash = ${newHash}, must_reset_password = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${user.id}
      RETURNING id
    `;

    // Invalidate all existing sessions for this user after a password change.
    try {
      await sql`DELETE FROM sessions WHERE user_id = ${user.id}`;
    } catch (err) {
      console.error('Failed to invalidate sessions after password reset', err);
    }

    return NextResponse.json({ success: true, data: { id: updated.rows[0].id } });
  } catch (err) {
    console.error('Error in reset-password', err);
    return NextResponse.json({ success: false, error: 'Failed to reset password' }, { status: 500 });
  }
}
