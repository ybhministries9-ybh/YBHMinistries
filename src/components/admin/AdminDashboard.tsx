import { useState, useEffect } from 'react';
import { Image, MessageCircle, LogOut, Home, FileText, Users, AlertCircle, Book, Newspaper, DollarSign, Info, Menu, Calendar, ExternalLink, Clock, Star } from 'lucide-react';
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
import { MenuManager } from './MenuManager';
import { Welcome } from './Welcome';
import { AdminScrollToTop } from './AdminScrollToTop';

const logoImage = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/logo/YBH.jpg';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

type Section = 'welcome' | 'home' | 'about' | 'ministries' | 'gallery' | 'news' | 'resources' | 'stories' | 'donate' | 'menu' | 'users';

export function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  // default to Welcome page
  const [activeSection, setActiveSection] = useState<Section>('welcome');
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

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

  const menuItems = [
    { id: 'welcome' as Section, label: 'Welcome', icon: Star },
    { id: 'home' as Section, label: 'Home', icon: Home },
    { id: 'about' as Section, label: 'About', icon: Info },
    { id: 'ministries' as Section, label: 'Ministries', icon: Book },
    { id: 'gallery' as Section, label: 'Gallery', icon: Image },
    { id: 'news' as Section, label: 'News', icon: Newspaper },
    { id: 'resources' as Section, label: 'Resources', icon: FileText },
    { id: 'stories' as Section, label: 'Stories', icon: MessageCircle },
    { id: 'donate' as Section, label: 'Donate', icon: DollarSign },
    { id: 'users' as Section, label: 'Users', icon: Users },
    { id: 'menu' as Section, label: 'Menu', icon: Menu, hidden: true }, // UI-hidden but code retained
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-[#2E2E2E] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center gap-4 min-w-0">
              <img 
                src="https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/logo/YBH.jpg" 
                alt="YBH Ministries" 
                className="h-12 w-auto object-contain" 
              />
              <div>
                <h1 className="text-2xl md:text-3xl truncate">Admin Portal</h1>
                <p className="text-sm text-gray-300 truncate">Yeshua Beth Hallel Ministries</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">

        <div className="grid lg:grid-cols-5 gap-6">
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
            <div className="bg-[#2E2E2E] rounded-lg shadow-md">
              {activeSection === 'welcome' && <Welcome />}
              {activeSection === 'home' && <HomeContentManager />}
              {activeSection === 'about' && <AboutManager />}
              {activeSection === 'ministries' && <MinistriesManager />}
              {activeSection === 'gallery' && <GalleryManager />}
              {activeSection === 'news' && <NewsManager />}
              {activeSection === 'resources' && <ResourceManager />}
              {activeSection === 'stories' && <StoriesManager />}
              {activeSection === 'donate' && <DonateManager />}
              {activeSection === 'menu' && <MenuManager />}
              {activeSection === 'users' && <UserManager />}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <AdminScrollToTop />
    </div>
  );
}
