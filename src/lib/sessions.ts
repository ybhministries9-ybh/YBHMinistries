import { sql } from '@vercel/postgres';

export const DEFAULT_SESSION_MINUTES = Number(process.env.ADMIN_SESSION_MINUTES || 1);

export async function createSession(userId: string, token: string, minutes = DEFAULT_SESSION_MINUTES) {
  const expiresAt = new Date(Date.now() + minutes * 60 * 1000).toISOString();
  const res = await sql`
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (${userId}, ${token}, ${expiresAt})
    RETURNING *
  `;
  return res.rows[0];
}

export async function verifySession(token?: string) {
  if (!token) return null;
  const res = await sql`SELECT * FROM sessions WHERE token = ${token} LIMIT 1`;
  if (!res.rows.length) return null;
  const session = res.rows[0];
  if (!session.expires_at || new Date(session.expires_at).getTime() <= Date.now()) {
    // expired
    try {
      await sql`DELETE FROM sessions WHERE id = ${session.id}`;
    } catch (err) {
      console.error('Failed to delete expired session', err);
    }
    return null;
  }
  return session;
}

export async function extendSession(token: string, minutes = DEFAULT_SESSION_MINUTES) {
  const newExpires = new Date(Date.now() + minutes * 60 * 1000).toISOString();
  const res = await sql`
    UPDATE sessions SET expires_at = ${newExpires}, last_used_at = NOW()
    WHERE token = ${token} AND (expires_at IS NULL OR expires_at > NOW())
    RETURNING *
  `;
  return res.rows[0] || null;
}

export async function invalidateSession(token: string) {
  await sql`DELETE FROM sessions WHERE token = ${token}`;
}
