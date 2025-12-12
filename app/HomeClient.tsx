'use client';

import { Home } from '@/components/Home';
import { ClientLayout } from './ClientLayout';

interface Props {
  initialHeroImages?: string[];
}

export default function HomeClient({ initialHeroImages }: Props) {
  return (
    <ClientLayout>
      <Home initialHeroImages={initialHeroImages} />
    </ClientLayout>
  );
}
