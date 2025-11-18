import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';
import { hashPassword } from '@/lib/password';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) return NextResponse.json({ success: false, error: 'token & password required' }, { status: 400 });

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const found = await sql`SELECT * FROM users WHERE invite_token_hash = ${tokenHash} AND invite_expires_at > NOW() LIMIT 1`;
    if (!found.rows.length) return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 400 });

    const user = found.rows[0];

    // Hash password and update user
    const passwordHash = hashPassword(password);

    const u = await sql`
      UPDATE users SET
        password_hash = ${passwordHash},
        status = 'Active',
        invite_token_hash = NULL,
        invite_expires_at = NULL,
        is_verified = true,
        updated_at = CURRENT_TIMESTAMP,
        last_login = CURRENT_TIMESTAMP
      WHERE id = ${user.id}
      RETURNING *
    `;

    return NextResponse.json({ success: true, data: u.rows[0] });
  } catch (err) {
    console.error('Error in POST /api/invite/accept', err);
    return NextResponse.json({ success: false, error: 'Failed to accept invite' }, { status: 500 });
  }
}
