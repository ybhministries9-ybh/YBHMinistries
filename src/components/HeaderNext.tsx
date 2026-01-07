'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TopBanner } from './TopBanner';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  label: string;
  url?: string;
}

export function HeaderNext() {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // New menu structure based on client requirements with translations
  // Separate HOME and DONATE from the main menu items for custom positioning
  const homeItem: MenuItem = {
    label: t('header.menu.home'),
    url: '/'
  };

  const donateItem: MenuItem = {
    label: t('header.menu.donate'),
    url: '/donate'
  };

  // Middle menu items (excluding HOME and DONATE)
  const middleMenuItems: MenuItem[] = [
    {
      label: t('header.menu.about'),
      url: '/about'
    },
    {
      label: t('header.menu.ministries'),
      url: '/ministries'
    },
    {
      label: t('header.menu.gallery'),
      url: '/gallery'
    },
    {
      label: t('header.menu.news'),
      url: '/news'
    },
    {
      label: t('header.menu.awards'),
      url: '/awards'
    },
    {
      label: t('header.menu.resources'),
      url: '/resources'
    },
    {
      label: t('header.menu.directors'),
      url: '/directors'
    },
    {
      label: t('header.menu.stories'),
      url: '/stories'
    },
    {
      label: t('header.menu.contact'),
      url: '/contact'
    }
  ];

  // All menu items for mobile (including HOME and DONATE)
  const menuItems: MenuItem[] = [homeItem, ...middleMenuItems, donateItem];

  // Calculate header height on mount and resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Function to check if menu item is active
  const isMenuItemActive = (item: MenuItem): boolean => {
    const normalizedPathname = pathname || '/';
    const normalizedItemUrl = item.url || '';
    return normalizedItemUrl === normalizedPathname;
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <TopBanner isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      {/* Desktop: Always visible | Mobile: Only visible when menu is open */}
      <nav className={`shadow-md ${isMenuOpen ? 'block' : 'hidden lg:block'}`} style={{ backgroundColor: '#2E2E2E' }}>
        <div className="container mx-auto px-4 py-4 lg:py-2">
          <div className="flex items-center justify-center lg:justify-between">
            {/* Desktop Navigation - All items evenly distributed from HOME to DONATE */}
            <div className="hidden lg:flex items-center justify-between w-full">
              {/* HOME */}
              <Link
                href={homeItem.url || '/'}
                className={`px-3 py-1 text-sm ${
                  isMenuItemActive(homeItem)
                    ? 'text-yellow-400 bg-gray-800'
                    : 'text-white hover:text-yellow-400 hover:bg-gray-800'
                } rounded transition-colors cursor-pointer font-bold`}
              >
                {homeItem.label}
              </Link>

              {/* Middle menu items */}
              {middleMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.url === '/about' ? '/about#about-hero' : (item.url || '/')}
                  className={`px-2 py-1 text-sm ${
                    isMenuItemActive(item)
                      ? 'text-yellow-400 bg-gray-800'
                      : 'text-white hover:text-yellow-400 hover:bg-gray-800'
                  } rounded transition-colors cursor-pointer font-bold`}
                >
                  {item.label}
                </Link>
              ))}

              {/* DONATE */}
              <Link
                href={donateItem.url || '/'}
                className="px-3 py-1 text-sm text-black bg-[#FDB813] hover:bg-[#DAA520] animate-gentle-pulse rounded transition-colors cursor-pointer font-bold"
              >
                {donateItem.label}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Fixed Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed left-0 right-0 bg-[#2E2E2E] shadow-lg overflow-y-auto z-40" 
             style={{ top: `${headerHeight}px`, maxHeight: `calc(100vh - ${headerHeight}px)` }}>
          <div className="container mx-auto px-4 py-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.url === '/about' ? '/about#about-hero' : (item.url || '/')}
                onClick={handleMenuItemClick}
                className={`block w-full text-left px-3 py-1.5 mb-1.5 ${
                  item.label === 'DONATE'
                    ? 'text-black bg-[#FDB813] hover:bg-[#DAA520] animate-gentle-pulse'
                    : isMenuItemActive(item)
                    ? 'text-yellow-400 bg-gray-800'
                    : 'text-white hover:bg-gray-800 hover:text-yellow-400'
                } rounded transition-colors cursor-pointer font-bold`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
