import { useState, useEffect, useRef } from 'react';
import { TopBanner } from './TopBanner';
import { navigate } from '../utils/navigate';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  label: string;
  url?: string;
}

export function Header() {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // New menu structure based on client requirements with translations
  const menuItems: MenuItem[] = [
    {
      label: t('header.menu.home'),
      url: '/'
    },
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
      url: '/storiesnew'
    },
    {
      label: t('header.menu.contact'),
      url: '/contact'
    },
    {
      label: t('header.menu.donate'),
      url: '/donate'
    }
  ];

  // Update current path on navigation
  useEffect(() => {
    // Set initial path on mount
    setCurrentPath(window.location.pathname || '/');
    
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    const handleNavigateEvent = (event: CustomEvent) => {
      const path = event.detail.path;
      // Extract pathname without hash for menu highlighting
      const pathname = path.split('#')[0];
      setCurrentPath(pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate' as any, handleNavigateEvent as any);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate' as any, handleNavigateEvent as any);
    };
  }, []);

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
    // Normalize paths - ensure we handle both '/' and empty string
    const normalizedCurrentPath = currentPath || '/';
    const normalizedItemUrl = item.url || '';
    
    // Check if main URL matches
    return normalizedItemUrl === normalizedCurrentPath;
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.url) {
      const target = item.url === '/about' ? `${item.url}#about-hero` : item.url;
      navigate(target);
      setCurrentPath(item.url);
      setIsMenuOpen(false);
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <TopBanner isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      {/* Desktop: Always visible | Mobile: Only visible when menu is open */}
      <nav className={`shadow-md ${isMenuOpen ? 'block' : 'hidden lg:block'}`} style={{ backgroundColor: '#2E2E2E' }}>
        <div className="container mx-auto px-4 py-4 lg:py-2">
          <div className="flex items-center justify-center lg:justify-between">
            {/* Desktop Navigation - All menus evenly distributed */}
            <div className="hidden lg:flex items-center justify-evenly w-full">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item)}
                  className={`px-2 py-1 text-sm ${
                    item.label === 'DONATE'
                      ? 'text-black bg-[#FDB813] hover:bg-[#DAA520] animate-gentle-pulse'
                      : isMenuItemActive(item)
                      ? 'text-yellow-400 bg-gray-800'
                      : 'text-white hover:text-yellow-400 hover:bg-gray-800'
                  } rounded transition-colors cursor-pointer font-bold`}
                >
                  {item.label}
                </button>
              ))}
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
              <button
                key={item.label}
                onClick={() => handleMenuItemClick(item)}
                className={`w-full text-left px-3 py-1.5 mb-1.5 ${
                  item.label === 'DONATE'
                    ? 'text-black bg-[#FDB813] hover:bg-[#DAA520] animate-gentle-pulse'
                    : isMenuItemActive(item)
                    ? 'text-yellow-400 bg-gray-800'
                    : 'text-white hover:bg-gray-800 hover:text-yellow-400'
                } rounded transition-colors cursor-pointer font-bold`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
