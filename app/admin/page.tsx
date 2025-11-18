'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import SessionWarning from '@/components/admin/SessionWarning';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If there's a stored token, validate it with the server before marking logged in.
    const checkStoredToken = async () => {
      const raw = localStorage.getItem('admin_token');
      if (!raw) {
        setIsLoggedIn(false);
        return;
      }

      let token = '';
      try {
        const parsed = JSON.parse(raw);
        token = parsed?.token || '';
      } catch (e) {
        token = raw;
      }

      if (!token) {
        localStorage.removeItem('admin_token');
        setIsLoggedIn(false);
        return;
      }

      try {
        const resp = await fetch('/api/admin/auth/verify', { headers: { Authorization: `Bearer ${token}` } });
        if (resp.ok) {
          setIsLoggedIn(true);
        } else {
          // invalid on server — clear stored token
          localStorage.removeItem('admin_token');
          setIsLoggedIn(false);
        }
      } catch (err) {
        // network error: be conservative and treat as not logged in
        localStorage.removeItem('admin_token');
        setIsLoggedIn(false);
      }
    };

    void checkStoredToken();
  }, []);

  const handleLogin = (token: string) => {
    try {
      const expiresAt = Date.now() + 60 * 1000; // 1 minute for testing
      localStorage.setItem('admin_token', JSON.stringify({ token, expiresAt }));
    } catch (err) {
      localStorage.setItem('admin_token', token);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
    // After logout, show the admin login page
    router.push('/admin');
  };

  // Single auto-logout scheduler — schedules at mount and reschedules on 'session-extended'
  useEffect(() => {
    if (!isLoggedIn) return;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const schedule = () => {
      try {
        const raw = localStorage.getItem('admin_token');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        let expiresAt = parsed?.expiresAt;
        // normalize ISO string -> ms number
        if (typeof expiresAt === 'string') {
          const asMs = new Date(expiresAt).getTime();
          expiresAt = Number.isNaN(asMs) ? undefined : asMs;
        }
        if (expiresAt && expiresAt > Date.now()) {
          if (timer) clearTimeout(timer);
          const ms = expiresAt - Date.now();
          timer = setTimeout(() => handleLogout(), ms);
        }
      } catch (err) {
        // ignore (legacy token format)
      }
    };

    // schedule initially
    schedule();

    // when session is extended elsewhere, reschedule
    const onExtended = () => schedule();
    window.addEventListener('session-extended', onExtended as EventListener);
    // also listen to storage events in case another tab updates the token
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'admin_token') schedule();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('session-extended', onExtended as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, [isLoggedIn]);

  // Reset (extend) session on any user interaction (click) in the admin UI.
  // Throttle requests to avoid spamming the server.
  useEffect(() => {
    if (!isLoggedIn) return;
    let lastExtend = 0;
    const MIN_MS_BETWEEN_EXTENDS = 15 * 1000; // 15s throttle

    const extendSessionOnInteraction = async () => {
      try {
        const raw = localStorage.getItem('admin_token');
        if (!raw) return;
        let token = '';
        try { token = JSON.parse(raw).token || raw; } catch (e) { token = raw; }
        if (!token) return;

        const resp = await fetch('/api/admin/auth/extend', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const j = await resp.json();
        if (j && j.success && j.expiresAt) {
          const expiresMs = typeof j.expiresAt === 'string' ? new Date(j.expiresAt).getTime() : j.expiresAt;
          localStorage.setItem('admin_token', JSON.stringify({ token, expiresAt: expiresMs }));
          try { window.dispatchEvent(new CustomEvent('session-extended', { detail: { expiresAt: expiresMs } })); } catch (e) { try { window.dispatchEvent(new Event('session-extended')); } catch {} }
          try { localStorage.setItem('admin_token_updated', String(Date.now())); localStorage.removeItem('admin_token_updated'); } catch (e) {}
        }
      } catch (err) {
        // ignore network errors silently — do not log too often
      }
    };

    // Monkey-patch window.fetch so that any client-side call to /api/admin/*
    // (except the extend endpoint itself) triggers a throttled session extend.
    let originalFetch: typeof window.fetch | null = null;
    try {
      originalFetch = window.fetch.bind(window);
      window.fetch = async (...args: Parameters<typeof fetch>) => {
        // Call original fetch first so UI continues as normal
        const resp = await originalFetch!(...args);
        try {
          const reqUrl = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
          const absolute = new URL(reqUrl, window.location.origin);
          const path = absolute.pathname;
          if (path.startsWith('/api/admin') && !path.startsWith('/api/admin/auth/extend')) {
            const now = Date.now();
            if (now - lastExtend >= MIN_MS_BETWEEN_EXTENDS) {
              lastExtend = now;
              // fire-and-forget
              void extendSessionOnInteraction();
            }
          }
        } catch (e) {
          // ignore URL parsing errors
        }
        return resp;
      };
    } catch (err) {
      // if fetch monkey-patching fails, ignore and continue
      originalFetch = null;
    }

    const onClick = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastExtend < MIN_MS_BETWEEN_EXTENDS) return;
      lastExtend = now;
      void extendSessionOnInteraction();
    };

    const onKey = (e: KeyboardEvent) => {
      // consider Enter and Space as interaction (buttons/links)
      if (e.key === 'Enter' || e.key === ' ') {
        const now = Date.now();
        if (now - lastExtend < MIN_MS_BETWEEN_EXTENDS) return;
        lastExtend = now;
        void extendSessionOnInteraction();
      }
    };

    const onPop = () => {
      const now = Date.now();
      if (now - lastExtend < MIN_MS_BETWEEN_EXTENDS) return;
      lastExtend = now;
      void extendSessionOnInteraction();
    };

    const onNavigate = () => onPop();

    const onSubmit = (e: Event) => {
      const now = Date.now();
      if (now - lastExtend < MIN_MS_BETWEEN_EXTENDS) return;
      lastExtend = now;
      void extendSessionOnInteraction();
    };

    // capture phase so clicks on buttons/links are caught early
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKey, true);
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    // some codebases dispatch a custom 'navigate' event when changing routes
    window.addEventListener('navigate', onNavigate as EventListener);
    document.addEventListener('submit', onSubmit, true);

    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onPop);
      window.removeEventListener('navigate', onNavigate as EventListener);
      document.removeEventListener('submit', onSubmit, true);
      // restore original fetch
      try {
        if (originalFetch) (window.fetch as any) = originalFetch;
      } catch (e) {
        // ignore
      }
    };
  }, [isLoggedIn]);

  // When the admin tab is closed, try to invalidate the server session immediately.
  // Use navigator.sendBeacon for reliability during unload.
  useEffect(() => {
    if (!isLoggedIn) return;

    const sendLogoutBeacon = () => {
      try {
        const raw = localStorage.getItem('admin_token');
        if (!raw) return;
        let token = '';
        try { token = JSON.parse(raw).token || raw; } catch (e) { token = raw; }
        if (!token) return;
        // remove stored token locally so a reopened tab doesn't auto-login
        try { localStorage.removeItem('admin_token'); } catch {}

        // send as URL-encoded form data string — sendBeacon accepts a string/Blob
        const body = new URLSearchParams();
        body.append('token', token);
        // sendBeacon returns boolean; we don't care about the result here
        if (navigator && typeof navigator.sendBeacon === 'function') {
          navigator.sendBeacon('/api/admin/auth/logout', body.toString());
        } else {
          // fallback: synchronous XHR (best-effort)
          try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/admin/auth/logout', false); // synchronous
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(body.toString());
          } catch (e) {
            // ignore
          }
        }
      } catch (err) {
        // ignore
      }
    };

    const onBeforeUnload = () => sendLogoutBeacon();
    window.addEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('unload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('unload', onBeforeUnload);
    };
  }, [isLoggedIn]);

  // TODO: Re-enable authentication later
  // Temporarily bypass login for testing
  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const token = typeof window !== 'undefined' ? (() => {
    const raw = localStorage.getItem('admin_token');
    if (!raw) return '';
    try {
      const parsed = JSON.parse(raw);
      return parsed?.token || '';
    } catch (err) {
      return raw;
    }
  })() : '';

  return (
    <>
      <AdminDashboard token={token} onLogout={handleLogout} />
      <SessionWarning onLogout={handleLogout} />
    </>
  );
}
