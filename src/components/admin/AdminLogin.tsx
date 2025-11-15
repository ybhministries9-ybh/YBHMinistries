import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Hardcoded login for demo purposes (no backend)
      // Default credentials: admin@ybhministries.org / admin123
      
      const data: any = { success: false, message: 'Backend not configured' };

      if (data.success) {
        localStorage.setItem('admin_token', data.access_token);
        onLogin(data.access_token);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to sign in. Please try again.');
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
              src="https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/logo/YBH.jpg" 
              alt="YBH Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
          <h1 className="text-3xl text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400 text-sm">Yeshua Beth Hallel Ministries</p>
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
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#FDB813] text-black rounded-xl hover:bg-[#e5a711] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium text-center"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Need an account?{' '}
            <button
              type="button"
              onClick={() => setShowSetup(!showSetup)}
              className="text-[#FDB813] hover:text-[#e5a711] underline"
            >
              {showSetup ? 'Hide setup' : 'First time setup'}
            </button>
          </p>
        </div>

        {showSetup && (
          <div className="mt-6">
            <SetupHelper />
          </div>
        )}
      </div>
    </div>
  );
}
