'use client';

import { AboutPage } from '@/components/AboutPage';
import { ClientLayout } from '../ClientLayout';
import { LanguageAwareSEO } from '@/components/seo/LanguageAwareSEO';

interface Props {
  initialHeroImageUrl?: string | null;
  initialHeroBlur?: string | null;
}

export default function AboutClient({ initialHeroImageUrl, initialHeroBlur }: Props) {
  return (
    <ClientLayout>
      <LanguageAwareSEO pageKey="about" />
      <AboutPage initialHeroImageUrl={initialHeroImageUrl ?? undefined} initialHeroBlur={initialHeroBlur ?? undefined} />
    </ClientLayout>
  );
}
