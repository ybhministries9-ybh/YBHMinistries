import { useState } from 'react';
import { AlertCircle, CheckCircle, Copy } from 'lucide-react';

export function SetupHelper() {
  const [email, setEmail] = useState('admin@ybhministries.org');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('Admin');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d8da5020/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          message: 'Account created successfully! You can now close this dialog and login.',
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to create account',
        });
      }
    } catch (error) {
      console.error('Account creation error:', error);
      setResult({
        success: false,
        message: 'Failed to create account. Please check your connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#2E2E2E] border border-[#FDB813] rounded-lg p-6 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="text-[#FDB813] flex-shrink-0" size={24} />
        <div>
          <h3 className="text-lg text-white mb-2">First Time Setup</h3>
          <p className="text-sm text-gray-300 mb-4">
            Create your first admin account to get started. This account will have full access to manage all content.
          </p>
        </div>
      </div>

      <form onSubmit={handleCreateAccount} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-black border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-black border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-black border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDB813]"
            placeholder="Choose a strong password"
            required
            minLength={6}
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
        </div>

        {result && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg ${
              result.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            }`}
          >
            {result.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <p className="text-sm">{result.message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (result?.success ?? false)}
          className="w-full py-3 bg-[#FDB813] text-black rounded-lg hover:bg-[#e5a711] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Create Admin Account'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-2">
          <strong>Note:</strong> Keep your credentials safe. You'll need them to login to the admin panel.
        </p>
      </div>
    </div>
  );
}
