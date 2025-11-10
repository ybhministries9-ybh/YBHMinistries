import { useState, useEffect } from 'react';
import { Image, MessageCircle, LogOut, Home, FileText, Users, AlertCircle, Book, Newspaper, DollarSign, Info, Menu } from 'lucide-react';
import { GalleryManager } from './GalleryManager';
import { ResourceManager } from './ResourceManager';
import { UserManager } from './UserManager';
import { HomeManager } from './HomeManager';
import { AboutManager } from './AboutManager';
import { MinistriesManager } from './MinistriesManager';
import { NewsManager } from './NewsManager';
import { StoriesManager } from './StoriesManager';
import { DonateManager } from './DonateManager';
import { MenuManager } from './MenuManager';
import logoImage from 'figma:asset/cd2fc9bd6bd07bb38fb0580a09181a9d7c9157c1.png';

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
              <button
                onClick={handleBackToSite}
                className="flex items-center gap-2 px-4 py-2 bg-[#FDB813] hover:bg-[#e5a711] text-black rounded-lg transition-colors cursor-pointer"
                aria-label="Back to main site"
              >
                <Home size={20} />
                <span className="hidden sm:inline">Main Site</span>
              </button>
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
        {/* Backend Notice */}
        <div className="mb-6 bg-[#2E2E2E] border-l-4 border-[#FDB813] p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-[#FDB813] flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-[#FDB813] mb-1">Preview Mode</h3>
              <p className="text-gray-300 text-sm">
                No backend storage configured. All managers use static fallback data. 
                Changes made here will not persist after page refresh.
              </p>
            </div>
          </div>
        </div>
        
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
              {activeSection === 'home' && <HomeManager />}
              {activeSection === 'about' && <AboutManager />}
              {activeSection === 'ministries' && <MinistriesManager />}
              {activeSection === 'gallery' && <GalleryManager token={token} />}
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
    </div>
  );
}
