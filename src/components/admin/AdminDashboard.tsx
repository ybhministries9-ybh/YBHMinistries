import { useState, useEffect } from 'react';
import { Image, MessageCircle, LogOut, Home, FileText, Users, AlertCircle, Book, Newspaper, DollarSign, Info, Menu, Calendar, ExternalLink } from 'lucide-react';
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
import { AdminScrollToTop } from './AdminScrollToTop';

const logoImage = 'https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/logo/YBH.jpg';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

type Section = 'home' | 'about' | 'ministries' | 'gallery' | 'news' | 'resources' | 'stories' | 'donate' | 'menu' | 'users';

export function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const handleBackToSite = () => {
    window.location.href = '/';
  };

  const menuItems = [
    { id: 'menu' as Section, label: 'Menu', icon: Menu },
    { id: 'home' as Section, label: 'Home', icon: Home },
    { id: 'about' as Section, label: 'About', icon: Info },
    { id: 'ministries' as Section, label: 'Ministries', icon: Book },
    { id: 'gallery' as Section, label: 'Gallery', icon: Image },
    { id: 'news' as Section, label: 'News', icon: Newspaper },
    { id: 'resources' as Section, label: 'Resources', icon: FileText },
    { id: 'stories' as Section, label: 'Stories', icon: MessageCircle },
    { id: 'donate' as Section, label: 'Donate', icon: DollarSign },
    { id: 'users' as Section, label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-[#2E2E2E] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/logo/YBH.jpg" 
                alt="YBH Ministries" 
                className="h-12 w-auto object-contain" 
              />
              <div>
                <h1 className="text-2xl md:text-3xl">Admin Portal</h1>
                <p className="text-sm text-gray-300">Yeshua Beth Hallel Ministries</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-[#FDB813] text-black'
                        : 'text-gray-300 hover:bg-black'
                    }`}
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
