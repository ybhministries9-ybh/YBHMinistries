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
    const raw = localStorage.getItem('admin_token');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.token && parsed.expiresAt && parsed.expiresAt > Date.now()) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('admin_token');
          setIsLoggedIn(false);
        }
      } catch (err) {
        // legacy string token
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
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
