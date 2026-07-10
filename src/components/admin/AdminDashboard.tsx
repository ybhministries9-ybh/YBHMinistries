import { useState, useEffect } from 'react';
import { Image, MessageCircle, LogOut, Home, FileText, Users, AlertCircle, Book, Newspaper, DollarSign, Info, Menu, Calendar, ExternalLink, Clock, Star, BookOpen, Mail } from 'lucide-react';
import { GalleryManager } from './GalleryManager';
import { ResourceManager } from './ResourceManager';
import { UserManager } from './UserManager';
import { HomeContentManager } from './HomeContentManager';
import { AboutManager } from './AboutManager';
import { MinistriesManager } from './MinistriesManager';
import { NewsManager } from './NewsManager';
import { StoriesManager } from './StoriesManager';
import { SetupHelper } from './SetupHelper';
import { HeroImageManager } from './HeroImageManager';
import { DonateManager } from './DonateManager';
import ContactsManager from './ContactsManager';
import { MenuManager } from './MenuManager';
import { Welcome } from './Welcome';
import { AdminScrollToTop } from './AdminScrollToTop';

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';
const logoImage = `${R2_BASE}/logo/ybh.png`;

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  initialSection?: string;
}

type Section = 'welcome' | 'home' | 'about' | 'ministries' | 'gallery' | 'news' | 'resources' | 'stories' | 'donate' | 'contacts' | 'menu' | 'users';

export function AdminDashboard({ token, onLogout, initialSection }: AdminDashboardProps) {
  // default to Welcome page; allow parent to request an initial section via prop
  const [activeSection, setActiveSection] = useState<Section>((initialSection as Section) || 'welcome');
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
    const [userName, setUserName] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');
    const capitalizeName = (n: string) =>
      n?.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    const truncateWithEllipsis = (s: string, max = 20) => {
      if (!s) return '';
      if (s.length <= max) return s;
      return s.slice(0, max) + '...';
    };

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const update = () => {
      try {
        const raw = localStorage.getItem('admin_token');
        if (!raw) { if (mounted) setRemainingMs(null); return; }
        let parsed: any = null;
        try { parsed = JSON.parse(raw); } catch (e) { parsed = { token: raw, expiresAt: null }; }
        let expiresAt: any = parsed?.expiresAt;
        if (typeof expiresAt === 'string') {
          const asMs = new Date(expiresAt).getTime();
          expiresAt = Number.isNaN(asMs) ? null : asMs;
        }
        if (!expiresAt) { if (mounted) setRemainingMs(null); return; }
        const rem = expiresAt - Date.now();
        if (mounted) setRemainingMs(rem > 0 ? rem : 0);
        if (rem <= 0) {
          // session expired — call logout
          onLogout();
        }
      } catch (err) {
        // ignore
      }
    };

    update();
    timer = setInterval(update, 1000);

    const onExtended = () => update();
    const onStorage = (e: StorageEvent) => { if (e.key === 'admin_token') update(); };
    window.addEventListener('session-extended', onExtended as EventListener);
    window.addEventListener('storage', onStorage);

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
      window.removeEventListener('session-extended', onExtended as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, [onLogout]);

  const formatRemaining = (ms: number | null) => {
    if (ms == null) return '';
    const seconds = Math.max(0, Math.ceil(ms / 1000));
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const handleBackToSite = () => {
    window.location.href = '/';
  };

  // Fetch current user details when token changes
  useEffect(() => {
    let mounted = true;
    async function fetchUser() {
      if (!token) return;
      try {
        const resp = await fetch('/api/admin/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        const j = await resp.json();
        if (j?.success && j.user && mounted) {
          setUserName(j.user.name || '');
          setUserRole(j.user.role || '');
        }
      } catch (err) {
        // ignore
      }
    }
    fetchUser();
    return () => { mounted = false; };
  }, [token]);

  // Listen for admin user updates (cross-tab and same-tab)
  useEffect(() => {
    const onUserUpdated = (e: any) => {
      try {
        const d = e?.detail || null;
        if (d?.name) setUserName(d.name || '');
        if (d?.role) setUserRole(d.role || '');
      } catch (err) {
        // ignore
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'admin_user_updated') return;
      try {
        const val = e.newValue ? JSON.parse(e.newValue) : null;
        if (val?.name) setUserName(val.name);
        if (val?.role) setUserRole(val.role);
      } catch (err) {}
    };

    window.addEventListener('admin-user-updated', onUserUpdated as EventListener);
    window.addEventListener('storage', onStorage as EventListener);
    return () => {
      window.removeEventListener('admin-user-updated', onUserUpdated as EventListener);
      window.removeEventListener('storage', onStorage as EventListener);
    };
  }, []);

  // Listen for 'admin-navigate' events to change the active admin section from within UI cards
  useEffect(() => {
    const onNavigate = (e: any) => {
      try {
        const section = e?.detail?.section;
        if (section) setActiveSection(section);
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener('admin-navigate', onNavigate as EventListener);
    return () => window.removeEventListener('admin-navigate', onNavigate as EventListener);
  }, []);

  // User Management is off-limits to Viewers entirely -- they must not see
  // the menu item or be able to render the section, even if `activeSection`
  // is set directly (e.g. via the `initialSection` prop or the
  // `admin-navigate` event). Other roles (Super Admin, Content Manager)
  // keep their existing access, which UserManager itself further restricts
  // per-action (e.g. Content Manager can only edit their own profile).
  const isViewer = userRole === 'Viewer';

  useEffect(() => {
    if (userRole && activeSection === 'users' && isViewer) {
      setActiveSection('welcome');
    }
  }, [userRole, activeSection, isViewer]);

  const menuItems = [
    { id: 'welcome' as Section, label: 'Welcome', icon: Star },
    { id: 'home' as Section, label: 'Home', icon: Home },
    { id: 'about' as Section, label: 'About', icon: Info },
    { id: 'ministries' as Section, label: 'Ministries', icon: Book },
    { id: 'gallery' as Section, label: 'Gallery', icon: Image },
    { id: 'news' as Section, label: 'News', icon: Newspaper },
    { id: 'resources' as Section, label: 'Resources', icon: FileText },
    { id: 'stories' as Section, label: 'Stories', icon: BookOpen },
    { id: 'donate' as Section, label: 'Donate', icon: DollarSign },
    { id: 'contacts' as Section, label: 'Contacts', icon: Mail },
    { id: 'users' as Section, label: 'Users', icon: Users, hidden: isViewer },
    { id: 'menu' as Section, label: 'Menu', icon: Menu, hidden: true }, // UI-hidden but code retained
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-[#2E2E2E] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-center gap-2 min-w-0 lg:flex-row lg:items-center">
              <img 
                src={logoImage} 
                alt="YBH Ministries" 
                className="h-12 w-auto object-contain" 
              />
              <div>
                <h1 className="text-2xl md:text-3xl truncate">Admin Portal</h1>
                <p className="text-sm text-gray-300 truncate">Yeshua Beth Hallel Ministries</p>
                {/* Mobile-only: show logged-in user's name and role below title */}
                {userName && (
                  <div className="block md:hidden mt-1">
                    <div className="text-sm text-gray-200 font-semibold truncate" style={{ textTransform: 'capitalize' }}>
                      {truncateWithEllipsis(capitalizeName(userName), 20)}
                    </div>
                    {userRole && (
                      <div className="text-xs text-gray-400">{'(' + userRole.toUpperCase() + ')'}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0 justify-center lg:justify-end">
              {/* Session remaining badge - keep beside the site button */}
              {remainingMs != null && (
                <div aria-live="polite" className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#2E2E2E] border border-[#FDB813] text-[#FDB813] text-sm font-medium mr-2">
                  <Clock size={14} />
                  <span>Expires in {formatRemaining(remainingMs)}</span>
                </div>
              )}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#FDB813] hover:bg-[#e5a711] text-black rounded-lg transition-colors cursor-pointer"
                aria-label="Open main site in new tab"
              >
                <Home size={20} />
                <span className="hidden sm:inline">Main Site</span>
                <ExternalLink size={14} className="ml-1 opacity-90" />
              </a>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-[#FDB813] hover:bg-[#e5a711] text-black rounded-lg transition-colors cursor-pointer"
                aria-label="Logout"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
              {/* Display logged in user's name and role if available */}
              {userName && (
                <div className="hidden md:flex flex-col items-end px-3 py-1 rounded bg-transparent text-gray-200 text-sm font-medium">
                  <span className="font-semibold truncate" style={{ textTransform: 'capitalize' }}>{truncateWithEllipsis(capitalizeName(userName), 20)}</span>
                  {userRole && <span className="text-xs text-gray-400">{'(' + userRole.toUpperCase() + ')'}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">

        <div className="grid lg:grid-cols-5 gap-3">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#2E2E2E] rounded-lg shadow-md p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  // preserve the code for all menu items but hide items marked `hidden` in the UI
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      try { window.dispatchEvent(new Event('admin-interaction')); } catch (e) {}
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-[#FDB813] text-black'
                        : 'text-gray-300 hover:bg-black'
                    } ${item.hidden ? 'hidden' : ''}`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeSection === 'gallery' ? (
              <div className="p-4 space-y-4">
                <GalleryManager />
              </div>
            ) : (
              <div className="bg-[#2E2E2E] rounded-lg shadow-md">
                {activeSection === 'welcome' && <Welcome />}
                {activeSection === 'home' && <HomeContentManager />}
                {activeSection === 'about' && <AboutManager />}
                {activeSection === 'ministries' && <MinistriesManager />}
                {activeSection === 'news' && <NewsManager />}
                {activeSection === 'resources' && <ResourceManager />}
                {activeSection === 'stories' && <StoriesManager />}
                {activeSection === 'donate' && <DonateManager />}
                {activeSection === 'contacts' && <ContactsManager />}
                {activeSection === 'menu' && <MenuManager />}
                {activeSection === 'users' && !isViewer && <UserManager />}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <AdminScrollToTop />
    </div>
  );
}
