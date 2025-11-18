import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hashPassword, verifyPassword } from '@/lib/password';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const email = data?.email?.toString().toLowerCase() || '';
    const currentPassword = data?.currentPassword || '';
    const newPassword = data?.newPassword || '';
    if (!email || !newPassword) return NextResponse.json({ success: false, error: 'email & newPassword required' }, { status: 400 });

    const res = await sql`SELECT * FROM users WHERE lower(email) = ${email} LIMIT 1`;
    if (!res.rows.length) return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    const user = res.rows[0];

    // If a current password was provided, verify it. Otherwise require must_reset_password to be true (first-time flow).
    if (currentPassword) {
      if (!user.password_hash || !verifyPassword(currentPassword, user.password_hash)) {
        return NextResponse.json({ success: false, error: 'Current password invalid' }, { status: 401 });
      }
    } else if (!user.must_reset_password) {
      return NextResponse.json({ success: false, error: 'Cannot reset password without current password' }, { status: 403 });
    }

    const newHash = hashPassword(newPassword);
    const updated = await sql`
      UPDATE users SET password_hash = ${newHash}, must_reset_password = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${user.id}
      RETURNING id
    `;

    return NextResponse.json({ success: true, data: { id: updated.rows[0].id } });
  } catch (err) {
    console.error('Error in reset-password', err);
    return NextResponse.json({ success: false, error: 'Failed to reset password' }, { status: 500 });
  }
}
