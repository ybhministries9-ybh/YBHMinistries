'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(adminLoggedIn);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    router.push('/');
  };

  // TODO: Re-enable authentication later
  // Temporarily bypass login for testing
  // if (!isLoggedIn) {
  //   return <AdminLogin onLogin={handleLogin} />;
  // }

  const token = typeof window !== 'undefined' ? (localStorage.getItem('adminToken') || '') : '';
  return <AdminDashboard token={token} onLogout={handleLogout} />;
}
