'use client';

import { Home } from '@/components/Home';
import { ClientLayout } from './ClientLayout';
import FlashNewsOverlay from './FlashNewsOverlay';
import type { FlashNewsSetting } from './lib/flashNews';

interface Props {
  initialHeroImages?: string[];
  flashNews?: FlashNewsSetting;
}

export default function HomeClient({ initialHeroImages, flashNews }: Props) {
  return (
    <ClientLayout>
      <FlashNewsOverlay enabled={Boolean(flashNews?.enabled)} videoUrl={flashNews?.videoUrl || null} />
      <Home initialHeroImages={initialHeroImages} />
    </ClientLayout>
  );
}
