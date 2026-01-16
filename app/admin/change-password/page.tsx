"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const e = sessionStorage.getItem('must_reset_email') || '';
      setEmail(e);
    } catch (err) {
      setEmail('');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!newPassword || newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!email) {
      setError('Missing account email. Please go back and sign in first.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, newPassword }) });
      const j = await res.json();
      if (!j.success) {
        setError(j.error || 'Failed to reset password');
        return;
      }

      // Auto-login after successful reset
      const loginRes = await fetch('/api/admin/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: newPassword }) });
      const loginJson = await loginRes.json();
      if (!loginJson.success) {
        // Redirect to admin login to complete flow
        router.push('/admin');
        return;
      }

      try {
        const expiresAt = Date.now() + 60 * 1000; // 1 minute for testing
        localStorage.setItem('admin_token', JSON.stringify({ token: loginJson.access_token, expiresAt }));
        // Suppress the session-expiring warning for the immediate first login after password reset
        // Store a short-lived timestamp until which the warning should be suppressed.
        try { localStorage.setItem('suppress_session_warning_until', String(Date.now() + 15 * 1000)); } catch (e) {}
      } catch (err) {
        try { localStorage.setItem('admin_token', loginJson.access_token); } catch (e) {}
      }

      // Clean up sessionStorage
      try { sessionStorage.removeItem('must_reset_email'); } catch (err) {}

      // Go to admin dashboard
      router.push('/admin');
    } catch (err) {
      console.error('Change password error', err);
      setError('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#2E2E2E] rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md border border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-2xl text-white mb-2">Set New Password</h1>
          <p className="text-gray-400 text-sm">Account: {email || 'unknown'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">New Password</label>
            <input type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded-md" required />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
            <input type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded-md" required />
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <button type="submit" disabled={loading} className="w-full py-2 bg-green-600 text-white rounded-xl">{loading ? 'Setting...' : 'Set New Password'}</button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={() => router.push('/admin')} className="text-sm text-gray-400 underline">Back to Sign In</button>
        </div>
      </div>
    </div>
  );
}
