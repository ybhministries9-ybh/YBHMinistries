'use client';

import React from 'react';
import { HeaderNext } from '@/components/HeaderNext';
import { FooterNext } from '@/components/FooterNext';
import { ScrollToTop } from '@/components/ScrollToTop';
import { EventScrollBanner } from '@/components/EventScrollBanner';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNext />
      <EventScrollBanner />
      <main>{children}</main>
      <FooterNext />
      <ScrollToTop />
    </>
  );
}
