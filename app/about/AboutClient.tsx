'use client';

import { AboutPage } from '@/components/AboutPage';
import { ClientLayout } from '../ClientLayout';
import { LanguageAwareSEO } from '@/components/seo/LanguageAwareSEO';

export default function AboutClient() {
  return (
    <ClientLayout>
      <LanguageAwareSEO pageKey="about" />
      <AboutPage />
    </ClientLayout>
  );
}
