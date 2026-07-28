import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { verifyPassword } from '@/lib/password';
import { rateLimit, buildRateKey } from '@/lib/security';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function clientIp(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Brute-force protection: per-IP and per-account rate limits
    const ip = clientIp(request);
    const ipLimit = await rateLimit(buildRateKey('login:ip', ip), 20, 15 * 60 * 1000);
    if (!ipLimit.ok) {
      return NextResponse.json({ success: false, error: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    const data = await request.json().catch(() => null);
    const email = data?.email?.toString().toLowerCase().trim() || '';
    const password = typeof data?.password === 'string' ? data.password : '';
    if (!email || !password) return NextResponse.json({ success: false, error: 'email & password required' }, { status: 400 });
    if (email.length > 254 || password.length > 256) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const acctLimit = await rateLimit(buildRateKey('login:acct', email), 10, 15 * 60 * 1000);
    if (!acctLimit.ok) {
      return NextResponse.json({ success: false, error: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    const res = await sql`SELECT * FROM users WHERE lower(email) = ${email} LIMIT 1`;
    if (!res.rows.length) return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });

    const user = res.rows[0];
    if (user.status !== 'Active') return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });

    if (!user.password_hash) return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });

    const ok = verifyPassword(password, user.password_hash);
    if (!ok) return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });

    // update last_login timestamp in DB
    try {
      await sql`UPDATE users SET last_login = NOW() WHERE id = ${user.id}`;
    } catch (err) {
      console.error('Failed to update last_login for user', user.id, err);
    }

    // create a server-backed session token and persist it
    const token = crypto.randomBytes(32).toString('hex');
    try {
      const session = await import('@/lib/sessions').then(m => m.createSession(String(user.id), token));
      const expiresAt = session?.expires_at ? new Date(session.expires_at).toISOString() : null;
      return NextResponse.json({ success: true, access_token: token, expiresAt, mustReset: !!user.must_reset_password, user: { id: user.id, name: user.name, email: user.email, role: user.role, last_login: new Date().toISOString() } });
    } catch (err) {
      // Do NOT hand out a token that isn't backed by a server session —
      // the client would appear logged in but every admin API call would 401.
      console.error('Failed to create session', err);
      return NextResponse.json({ success: false, error: 'Login failed. Please try again.' }, { status: 500 });
    }
  } catch (err) {
    console.error('Error in admin login', err);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}
