import { useState } from 'react';
const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { SetupHelper } from './SetupHelper';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [mustReset, setMustReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const j = await res.json();
      if (!j.success) {
        setError(j.error || 'Invalid credentials');
        return;
      }
      // If user must reset password, redirect to change-password page
      if (j.mustReset) {
        try {
          sessionStorage.setItem('must_reset_email', email);
        } catch (err) {
          // ignore
        }
        window.location.assign('/admin/change-password');
        return;
      }
      if (j.access_token) {
        try {
          const expiresAt = j.expiresAt || new Date(Date.now() + 60 * 1000).toISOString();
          // ensure stored format is a ms-timestamp number for existing code
          const expiresMs = typeof expiresAt === 'string' ? new Date(expiresAt).getTime() : expiresAt;
          localStorage.setItem('admin_token', JSON.stringify({ token: j.access_token, expiresAt: expiresMs }));
        } catch (err) {
          // ignore storage errors
          localStorage.setItem('admin_token', j.access_token as string);
        }
        onLogin(j.access_token);
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!newPassword || newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, currentPassword: password, newPassword }) });
      const j = await res.json();
      if (!j.success) {
        setError(j.error || 'Failed to reset password');
        return;
      }
      // After successful reset, auto-login with new password
      const loginRes = await fetch('/api/admin/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: newPassword }) });
      const loginJson = await loginRes.json();
      if (!loginJson.success) {
        setError(loginJson.error || 'Failed to login after reset');
        return;
      }
      try {
        const expiresAt = loginJson.expiresAt || new Date(Date.now() + 60 * 1000).toISOString();
        const expiresMs = typeof expiresAt === 'string' ? new Date(expiresAt).getTime() : expiresAt;
        localStorage.setItem('admin_token', JSON.stringify({ token: loginJson.access_token, expiresAt: expiresMs }));
      } catch (err) {
        localStorage.setItem('admin_token', loginJson.access_token);
      }
      onLogin(loginJson.access_token);
    } catch (err) {
      console.error('reset error', err);
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#2E2E2E] rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <div className="w-32 mx-auto mb-6">
            <img 
              src={`${R2_BASE}/logo/ybh.png`} 
              alt="YBH Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
          <h1 className="text-3xl text-white mb-2">Admin Portal</h1>
          <p className="text-white text-2xl">Yeshua Beth Hallel Ministries</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Mail size={20} />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent"
                placeholder="admin@ybhministries.org"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full pl-10 pr-12 py-3 bg-black border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors bg-black px-2 py-1 rounded"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FDB813] text-black rounded-xl hover:bg-[#e5a711] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium text-center"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {mustReset && (
          <form onSubmit={handleReset} className="space-y-4 mt-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded-md" required />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded-md" required />
            </div>
            <div>
              <button type="submit" className="w-full py-3.5 bg-green-600 text-white rounded-xl">Set New Password</button>
            </div>
          </form>
        )}

        {/* First-time setup link removed per UX request */}
      </div>
    </div>
  );
}
