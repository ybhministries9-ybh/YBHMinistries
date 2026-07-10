"use client";

import { useEffect, useState } from 'react';

export type AdminUserInfo = {
  id: number | string | null;
  name: string;
  email: string;
  role: string;
  status: string;
};

export const VIEWER_ROLE = 'Viewer';

function getAdminToken(): string | null {
  try {
    const raw = localStorage.getItem('admin_token');
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed?.token || raw;
    } catch {
      return raw;
    }
  } catch {
    return null;
  }
}

/**
 * Shared hook for "who is logged into the admin panel and what can they do".
 * Replaces the pattern (repeated across several admin components) of
 * independently parsing `admin_token` from localStorage and calling
 * `/api/admin/auth/me`.
 *
 * `canWrite` is false for the Viewer role, which is read-only everywhere in
 * the admin panel: no create/update/delete and no export/download, and no
 * access to User Management at all.
 */
export function useAdminUser() {
  const [user, setUser] = useState<AdminUserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const token = getAdminToken();
      if (!token) {
        if (mounted) { setUser(null); setLoading(false); }
        return;
      }
      try {
        const resp = await fetch('/api/admin/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        const json = await resp.json().catch(() => null);
        if (!mounted) return;
        if (json?.success && json.user) {
          setUser({
            id: json.user.id ?? null,
            name: json.user.name || '',
            email: json.user.email || '',
            role: json.user.role || '',
            status: json.user.status || '',
          });
        } else {
          setUser(null);
        }
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();

    // Keep in sync with profile edits made elsewhere (UserManager dispatches
    // this event/localStorage key after a successful self-edit).
    const onUserUpdated = (e: any) => {
      const d = e?.detail;
      if (!d) return;
      setUser((prev) => (prev ? { ...prev, ...d } : prev));
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'admin_user_updated' || !e.newValue) return;
      try {
        const val = JSON.parse(e.newValue);
        setUser((prev) => (prev ? { ...prev, ...val } : prev));
      } catch {}
    };
    window.addEventListener('admin-user-updated', onUserUpdated as EventListener);
    window.addEventListener('storage', onStorage);

    return () => {
      mounted = false;
      window.removeEventListener('admin-user-updated', onUserUpdated as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const role = user?.role || '';
  const isViewer = role === VIEWER_ROLE;
  const canWrite = !!user && !isViewer;
  const canManageUsers = role === 'Super Admin';

  return { user, loading, role, isViewer, canWrite, canManageUsers };
}
