import { useState, useEffect, useCallback } from 'react';
import { Book, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminUser } from '@/hooks/useAdminUser';

interface Ministry {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}

export function MinistriesManager() {
  const { isViewer } = useAdminUser();
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<{ [key: number]: boolean }>({});

  const fetchMinistries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/ministries');
      
      if (!response.ok) {
        throw new Error('Failed to fetch ministries');
      }
      
      const data = await response.json();
      // Ensure data is an array
      if (Array.isArray(data)) {
        setMinistries(data);
      } else if (data && Array.isArray(data.ministries)) {
        setMinistries(data.ministries);
      } else {
        console.error('Invalid data format:', data);
        setMinistries([]);
        toast.error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching ministries:', error);
      toast.error('Failed to load ministries');
      setMinistries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMinistries();
  }, [fetchMinistries]);

  const handleToggleActive = useCallback(async (ministry: Ministry) => {
    try {
      setUpdatingStatus(prev => ({ ...prev, [ministry.id]: true }));
      // prepare auth headers
      let token = '';
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('admin_token') || '';
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            token = parsed?.token || raw;
          } catch (e) {
            token = raw;
          }
        }
      }

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch('/api/admin/ministries', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ id: ministry.id, is_active: !ministry.is_active }),
      });

      if (!response.ok) throw new Error('Failed to update ministry');

      const data = await response.json();
      const updatedMinistry = data.ministry || data;
      
      // Optimistic update
      setMinistries(prev =>
        prev.map(m => (m.id === ministry.id ? { ...m, ...updatedMinistry } : m))
      );
      
      toast.success(
        ministry.is_active
          ? `${ministry.name} has been hidden`
          : `${ministry.name} is now visible`
      );
    } catch (error) {
      console.error('Error updating ministry:', error);
      toast.error('Failed to update ministry status');
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [ministry.id]: false }));
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#FDB813]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-black min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Ministries Management</h2>
          <p className="text-gray-400 text-sm mt-1">
            Control which ministries are visible on the website
          </p>
        </div>
      </div>

      <div className="bg-[#2E2E2E] border border-[#3a3a3a] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-[#FDB813] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <p className="font-medium mb-1 text-white">Manage Ministry Visibility:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Click "Show" or "Hide" to control which ministries appear on the website</li>
              <li>Hidden ministries will have a red status bar and won't appear to visitors</li>
              <li>Visible ministries will have a green status bar and appear in the navigation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {ministries.map((ministry) => (
          <div
            key={ministry.id}
            className="bg-[#2E2E2E] rounded-lg shadow-lg overflow-hidden border-2 border-[#3a3a3a] transition-all hover:border-[#FDB813]/50"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Book className="h-6 w-6 text-[#FDB813]" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {ministry.name}
                    </h3>
                    <p className="text-sm text-gray-400">/{ministry.slug}</p>
                  </div>
                </div>
                
                {/* Show/Hide Toggle */}
                <button
                  onClick={() => handleToggleActive(ministry)}
                  disabled={updatingStatus[ministry.id] || isViewer}
                  className={`px-4 py-2 rounded transition-all cursor-pointer font-medium text-sm flex items-center gap-2 ${
                    ministry.is_active
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-[#FDB813] hover:bg-[#e5a610] text-black'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {updatingStatus[ministry.id] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : ministry.is_active ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Show
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Status Bar at Bottom */}
            <div className={`px-6 py-3 flex items-center justify-center gap-2 font-bold text-sm ${
              ministry.is_active 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
            }`}>
              {ministry.is_active ? (
                <>
                  <Eye className="h-4 w-4" />
                  VISIBLE
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4" />
                  HIDDEN
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {ministries.length === 0 && (
        <div className="text-center py-12 bg-[#2E2E2E] border border-[#3a3a3a] rounded-lg">
          <Book className="h-12 w-12 text-gray-500 mx-auto mb-3" />
          <p className="text-white">No ministries found</p>
          <p className="text-sm text-gray-400 mt-1">
            Run the database schema to create default ministries
          </p>
        </div>
      )}
    </div>
  );
}
