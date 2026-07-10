"use client"

import React, { useEffect, useState } from 'react';
import { Home, Info, Book, Image, Newspaper, FileText, BookOpen, Mail, DollarSign, Users } from 'lucide-react';
import { useAdminUser } from '@/hooks/useAdminUser';

// Each card has a default (write-access) description and a `viewerDescription`
// used when the signed-in user has the read-only Viewer role, since Viewers
// can only look at these sections, not add/edit/delete/export anything in
// them. The Users card is Super Admin / Content Manager only -- Viewers have
// no access to User Management at all, so it's filtered out below rather
// than given a viewer description.
const CARD_CONFIG = [
  { id: 'home', title: 'Home', icon: Home, description: 'Manage hero images and the video.', viewerDescription: 'View hero images and the video.' },
  { id: 'about', title: 'About', icon: Info, description: 'Add / update the hero image.', viewerDescription: 'View the hero image.' },
  { id: 'ministries', title: 'Ministries', icon: Book, description: 'Enable / disable the ministries.', viewerDescription: 'View the ministries.' },
  { id: 'gallery', title: 'Gallery', icon: Image, description: 'Manage the images and videos.', viewerDescription: 'View the images and videos.' },
  { id: 'news', title: 'News', icon: Newspaper, description: 'Manage the Events and reports.', viewerDescription: 'View the Events and reports.' },
  { id: 'resources', title: 'Resources', icon: FileText, description: 'Manage books, videos and sermons.', viewerDescription: 'View books, videos and sermons.' },
  { id: 'stories', title: 'Stories', icon: BookOpen, description: 'Manage the text and video stories.', viewerDescription: 'View the text and video stories.' },
  { id: 'donate', title: 'Donate', icon: DollarSign, description: 'Manage UPI and Bank account details.', viewerDescription: 'View UPI and Bank account details.' },
  { id: 'contacts', title: 'Contacts', icon: Mail, description: 'View the Enrollments and messages.', viewerDescription: 'View the Enrollments and messages.' },
  { id: 'users', title: 'Users', icon: Users, description: 'Manage admin users and permissions.', hideForViewer: true },
  // Video Manager card removed as requested
];

export function Welcome() {
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);
  // Viewers are read-only: they cannot toggle site maintenance mode. The
  // /api/admin/maintenance route also rejects this server-side.
  const { isViewer } = useAdminUser();

  function getAuthHeaders(withContentType = false) {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : '';
    let token = '';
    if (raw) try { token = JSON.parse(raw).token || raw } catch (e) { token = raw }
    const headers: Record<string,string> = withContentType ? { 'Content-Type': 'application/json' } : {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const headers = getAuthHeaders(false);
        const resp = await fetch('/api/admin/maintenance', { headers });
        const j = await resp.json();
        if (mounted) { setMaintenance(Boolean(j.enabled)); setLoading(false); }
      } catch (e) {
        if (mounted) setLoading(false);
      }
    }
    load();

    return () => { mounted = false };
  }, []);

  const setMaintenanceState = async (enabled: boolean) => {
    if (isViewer) return;
    setLoading(true);
    try {
      const headers = getAuthHeaders(true);
      const body: any = { enabled };
      const res = await fetch('/api/admin/maintenance', { method: 'POST', headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error('failed to set maintenance');
      setMaintenance(Boolean(enabled));
    } catch (e) {
      console.error('Failed to update maintenance flag', e);
    } finally { setLoading(false); }
  };
  const handleNavigate = (section: string) => {
    // dispatch a custom event so AdminDashboard can change the active section
    try { window.dispatchEvent(new CustomEvent('admin-navigate', { detail: { section } })); } catch (e) {}
  };

  const onKey = (e: React.KeyboardEvent, section: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate(section);
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="bg-[#2E2E2E] rounded-lg p-6 lg:p-8 relative">
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <span className="text-md text-gray-300 mr-1 hidden sm:inline">Site maintenance:</span>
          <div className="inline-flex items-center rounded-full bg-gray-800 p-1 shadow-sm" role="group" aria-label="Site maintenance toggle">
            <button
              type="button"
              onClick={() => setMaintenanceState(true)}
              disabled={loading || isViewer}
              aria-pressed={maintenance === true}
              title={isViewer ? 'Read-only: your role cannot change site maintenance mode' : undefined}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${maintenance ? 'bg-[#FDB813] text-black' : 'text-gray-300 hover:bg-gray-700'} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
            >
              ON
            </button>
            <button
              type="button"
              onClick={() => setMaintenanceState(false)}
              disabled={loading || isViewer}
              aria-pressed={maintenance === false}
              title={isViewer ? 'Read-only: your role cannot change site maintenance mode' : undefined}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${!maintenance ? 'bg-[#FDB813] text-black' : 'text-gray-300 hover:bg-gray-700'} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
            >
              OFF
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to Admin Dashboard!</h2>
          <p className="text-gray-300 mb-6">Welcome to the Yeshua Beth Hallel Ministries Admin Portal.</p>
          <p className="text-gray-300 mb-1">Tap a card to view/manage each section.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CARD_CONFIG.filter((cfg) => !(cfg.hideForViewer && isViewer)).map((cfg) => {
              const Icon = cfg.icon;
              const description = isViewer && cfg.viewerDescription ? cfg.viewerDescription : cfg.description;
              return (
                <button
                  key={cfg.id}
                  onClick={() => handleNavigate(cfg.id)}
                  onKeyDown={(e) => onKey(e, cfg.id)}
                  aria-label={`${cfg.title} - ${description}`}
                  className="group text-left p-4 rounded-lg border border-gray-700 bg-black hover:bg-[#111] hover:border-[#FDB813] focus:outline-none focus:ring-2 focus:ring-[#FDB813] transition-shadow shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-[#111] p-2 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <Icon className="text-[#FDB813]" size={20} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-semibold truncate text-white">{cfg.title}</div>
                      <div className="text-sm text-gray-300 truncate mt-1">{description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
