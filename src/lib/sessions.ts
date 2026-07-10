import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { logger } from './logger';

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
      logger.error('Failed to delete expired session', err);
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

export async function getActorName(token?: string) {
  if (!token) return null;
  try {
    const session = await verifySession(token);
    if (!session) return null;
    const res = await sql`SELECT name, email FROM users WHERE id = ${session.user_id} LIMIT 1`;
    if (!res.rows.length) return null;
    const user = res.rows[0];
    return user.name || user.email || `user_${session.user_id}`;
  } catch (err) {
    const { logger } = await import('./logger');
    logger.error('Failed to resolve actor name from token', { error: (err as any)?.message });
    return null;
  }
}

// Admin user roles. "Viewer" is read-only everywhere in the admin panel:
// no create/update/delete and no export/download of any kind, and no
// access to User Management regardless of how it's reached.
export const ADMIN_ROLES = {
  SUPER_ADMIN: 'Super Admin',
  CONTENT_MANAGER: 'Content Manager',
  VIEWER: 'Viewer',
} as const;

export type AdminRole = (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];

/** Viewers are read-only; every other known role may write. */
export function roleCanWrite(role?: string | null): boolean {
  return String(role || '') !== ADMIN_ROLES.VIEWER;
}

/** Only Super Admin may manage other admin users. */
export function roleCanManageUsers(role?: string | null): boolean {
  return String(role || '') === ADMIN_ROLES.SUPER_ADMIN;
}

/**
 * Resolve session, actor, and role from an Authorization header value.
 * Parses the header, verifies the session, and returns a stable actor
 * (falls back to `user_<id>` when the user has no name/email) along with
 * the user's role so callers can enforce read-only access for Viewers.
 */
export async function resolveSessionAndActorFromAuthHeader(
  authHeader?: string
): Promise<{ session: any; actor: string; token: string | null; role: string | null } | null> {
  const auth = authHeader || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
  const session = await verifySession(token);
  if (!session) return null;
  let name: string | null = null;
  let email: string | null = null;
  let role: string | null = null;
  try {
    const res = await sql`SELECT name, email, role FROM users WHERE id = ${session.user_id} LIMIT 1`;
    if (res.rows.length) {
      name = res.rows[0].name || null;
      email = res.rows[0].email || null;
      role = res.rows[0].role || null;
    }
  } catch (err) {
    logger.error('Failed to resolve user for session', { error: (err as any)?.message });
  }
  const actor = name || email || `user_${session.user_id}`;
  return { session, actor, token, role };
}

/**
 * Returns a 403 JSON response if the resolved session belongs to a Viewer
 * (or has no recognized role), otherwise null. Call this in every mutating
 * admin route (POST/PUT/DELETE/PATCH) and every export/download route,
 * right after resolving the session and before performing the write/export:
 *
 *   const resolved = await resolveSessionAndActorFromAuthHeader(authHeader);
 *   if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
 *   const denied = readOnlyResponse(resolved);
 *   if (denied) return denied;
 */
export function readOnlyResponse(resolved: { role: string | null } | null): NextResponse | null {
  if (!resolved || !roleCanWrite(resolved.role)) {
    return NextResponse.json(
      { success: false, error: 'Read-only access: your role does not permit this action' },
      { status: 403 }
    );
  }
  return null;
}
