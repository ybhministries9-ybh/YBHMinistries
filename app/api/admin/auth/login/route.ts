import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { verifyPassword } from '@/lib/password';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const email = data?.email?.toString().toLowerCase() || '';
    const password = data?.password || '';
    if (!email || !password) return NextResponse.json({ success: false, error: 'email & password required' }, { status: 400 });

    const res = await sql`SELECT * FROM users WHERE lower(email) = ${email} LIMIT 1`;
    if (!res.rows.length) return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });

    const user = res.rows[0];
    if (user.status !== 'Active') return NextResponse.json({ success: false, error: 'User not active' }, { status: 403 });

    if (!user.password_hash) return NextResponse.json({ success: false, error: 'No password set for user' }, { status: 403 });

    const ok = verifyPassword(password, user.password_hash);
    if (!ok) return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });

    // update last_login timestamp in DB
    try {
      await sql`UPDATE users SET last_login = NOW() WHERE id = ${user.id}`;
    } catch (err) {
      console.error('Failed to update last_login for user', user.id, err);
    }

    // create a server-backed session token and persist it
    const token = crypto.randomBytes(24).toString('hex');
    try {
      const session = await import('@/lib/sessions').then(m => m.createSession(String(user.id), token));
      const expiresAt = session?.expires_at ? new Date(session.expires_at).toISOString() : null;
      return NextResponse.json({ success: true, access_token: token, expiresAt, mustReset: !!user.must_reset_password, user: { id: user.id, name: user.name, email: user.email, role: user.role, last_login: new Date().toISOString() } });
    } catch (err) {
      console.error('Failed to create session', err);
      // fallback to ephemeral token (not persisted)
      return NextResponse.json({ success: true, access_token: token, mustReset: !!user.must_reset_password, user: { id: user.id, name: user.name, email: user.email, role: user.role, last_login: new Date().toISOString() } });
    }
  } catch (err) {
    console.error('Error in admin login', err);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}
