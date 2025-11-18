"use client";
import { useState } from 'react';

export default function AcceptInvitePage() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!token) return setStatus('Token is required');
    if (!password || password.length < 8) return setStatus('Password must be 8+ characters');
    if (password !== confirm) return setStatus('Passwords do not match');

    try {
      const resp = await fetch('/api/invite/accept', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, password }) });
      const j = await resp.json();
      if (!j.success) {
        setStatus(j.error || 'Failed to set password');
      } else {
        setStatus('Password set — you can now sign in');
      }
    } catch (err) {
      console.error(err);
      setStatus('Unexpected error');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Set your password</h1>
      <form onSubmit={submit} className="space-y-4 bg-black p-6 rounded border border-gray-700">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Invite Token</label>
          <input value={token} onChange={(e) => setToken(e.target.value)} className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded" placeholder="Paste the token from your email or the link" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Confirm Password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded" />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 bg-[#FDB813] text-black rounded">Set Password</button>
        </div>
        {status && <div className="text-sm text-gray-300 mt-2">{status}</div>}
      </form>
    </div>
  );
}
