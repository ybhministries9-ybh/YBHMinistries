'use client';

import React from 'react';
import '@/i18n/config';
import { HeaderNext } from '@/components/HeaderNext';
import { FooterNext } from '@/components/FooterNext';
import { ScrollToTop } from '@/components/ScrollToTop';
import RouteLoaderClient from '@/components/RouteLoaderClient';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteLoaderClient />
      <HeaderNext />
      <main>{children}</main>
      <FooterNext />
      <ScrollToTop />
    </>
  );
}
