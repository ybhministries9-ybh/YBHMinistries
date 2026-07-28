import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';
import { hashPassword } from '@/lib/password';
import { rateLimit, buildRateKey } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Rate limit: invite tokens must not be brute-forceable.
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip') || 'unknown';
    const rl = await rateLimit(buildRateKey('invite-accept', ip), 10, 60 * 60 * 1000);
    if (!rl.ok) return NextResponse.json({ success: false, error: 'Too many attempts. Try again later.' }, { status: 429 });

    const body = await request.json().catch(() => null);
    const token = typeof body?.token === 'string' ? body.token : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!token || !password) return NextResponse.json({ success: false, error: 'token & password required' }, { status: 400 });
    if (password.length < 8 || password.length > 256) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

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
      RETURNING id, name, email, role, status
    `;

    return NextResponse.json({ success: true, data: u.rows[0] });
  } catch (err) {
    console.error('Error in POST /api/invite/accept', err);
    return NextResponse.json({ success: false, error: 'Failed to accept invite' }, { status: 500 });
  }
}
