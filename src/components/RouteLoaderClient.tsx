'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { showPageLoader, hidePageLoader } from '@/utils/pageLoader';

export function RouteLoaderClient() {
  const pathname = usePathname();

  // Hide loader when pathname changes (Next.js app-router completed navigation)
  useEffect(() => {
    try {
      hidePageLoader();
    } catch (e) {}
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Patch history methods to show loader on SPA navigations
    const origPush = history.pushState;
    const origReplace = history.replaceState;

    (history as any).pushState = function (...args: any[]) {
      try { showPageLoader(); } catch (e) {}
      // Call original
      return origPush.apply(this, args);
    };

    (history as any).replaceState = function (...args: any[]) {
      try { showPageLoader(); } catch (e) {}
      return origReplace.apply(this, args);
    };

    // Show loader on relevant anchor clicks (client links)
    const clickHandler = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const anchor = (target.closest && target.closest('a')) as HTMLAnchorElement | null;
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href) return;
        if (anchor.target && anchor.target !== '' && anchor.target !== '_self') return;
        if (href.startsWith('#')) return;
        // External link? skip
        try {
          const url = new URL(href, window.location.href);
          if (url.origin !== window.location.origin) return;
        } catch (err) {
          // If URL parsing fails, skip
        }
        showPageLoader();
      } catch (e) {}
    };

    document.addEventListener('click', clickHandler, true);

    // Hide loader when a full navigation completes
    const hideHandler = () => hidePageLoader();
    window.addEventListener('load', hideHandler);
    window.addEventListener('popstate', hideHandler);

    return () => {
      (history as any).pushState = origPush;
      (history as any).replaceState = origReplace;
      document.removeEventListener('click', clickHandler, true);
      window.removeEventListener('load', hideHandler);
      window.removeEventListener('popstate', hideHandler);
    };
  }, []);

  return null;
}

export default RouteLoaderClient;
