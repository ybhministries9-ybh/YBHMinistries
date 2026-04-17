"use client";
import React from 'react';
import '@/i18n/config';
import { Home, ExternalLink, Clock, LogOut, Image, FileText, MessageCircle, Book, Newspaper, DollarSign, Users, Info, Star } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';
import Link from 'next/link';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    try { localStorage.removeItem('admin_token'); } catch (e) {}
    router.push('/admin');
  };

  const handleBackToSite = () => {
    window.location.href = '/';
  };

  const searchParams = useSearchParams();

  const menuItems = [
    { href: '/admin', key: 'welcome', label: 'Welcome', icon: Star },
    { href: '/admin/home', key: 'home', label: 'Home', icon: Home },
    { href: '/admin/about', key: 'about', label: 'About', icon: Info },
    { href: '/admin/ministries', key: 'ministries', label: 'Ministries', icon: Book },
    { href: '/admin/gallery', key: 'gallery', label: 'Gallery', icon: Image },
    { href: '/admin/news', key: 'news', label: 'News', icon: Newspaper },
    { href: '/admin/resources', key: 'resources', label: 'Resources', icon: FileText },
    { href: '/admin/stories', key: 'stories', label: 'Stories', icon: MessageCircle },
    { href: '/admin/donate', key: 'donate', label: 'Donate', icon: DollarSign },
    { href: '/admin/contacts', key: 'contacts', label: 'Contacts', icon: MessageCircle },
    { href: '/admin/users', key: 'users', label: 'Users', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[#2E2E2E] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center gap-4 min-w-0">
              <img 
                src={`${R2_BASE}/logo/ybh.png`} 
                alt="YBH Ministries" 
                className="h-12 w-auto object-contain" 
              />
              <div>
                <h1 className="text-2xl md:text-3xl truncate">Admin Portal</h1>
                <p className="text-sm text-gray-300 truncate">Yeshua Beth Hallel Ministries</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <button onClick={handleBackToSite} className="flex items-center gap-2 px-4 py-2 bg-[#FDB813] hover:bg-[#e5a711] text-black rounded-lg transition-colors cursor-pointer">
                <Home size={20} />
                <span className="hidden sm:inline">Main Site</span>
                <ExternalLink size={14} className="ml-1 opacity-90" />
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-[#FDB813] hover:bg-[#e5a711] text-black rounded-lg transition-colors cursor-pointer">
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
          <aside className="lg:col-span-1">
            <div className="bg-[#2E2E2E] rounded-lg shadow-md p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon as any;
                // compute active: match by pathname for dedicated pages (/admin/contacts),
                // or when at /admin read ?section=key to highlight the requested section
                const sectionParam = searchParams?.get('section') || '';
                const active = (() => {
                  if (!pathname) return false;
                  // Special-case the root /admin menu item: only active when
                  // the pathname is exactly /admin (or when a section query is present
                  // and matches this item's key). This avoids marking Welcome active
                  // for every /admin/... route.
                  if (item.href === '/admin') {
                    if (pathname === '/admin') {
                      return sectionParam ? sectionParam === item.key : true;
                    }
                    return false;
                  }
                  // if we're at /admin with a section query, honor that
                  if (pathname === '/admin' && sectionParam) return sectionParam === item.key;
                  return pathname.startsWith(item.href);
                })();

                // For items that don't have a dedicated app route, link to /admin?section=key
                const linkHref = item.href === '/admin/contacts' || item.href === '/admin' ? item.href : `/admin?section=${item.key}`;

                return (
                  <Link key={item.href} href={linkHref} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-[#FDB813] text-black' : 'text-gray-300 hover:bg-black'}`}>
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4">
            <div className="bg-[#2E2E2E] rounded-lg shadow-md p-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminShell;
