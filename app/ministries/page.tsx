'use client';

import { MinistriesPage } from '@/components/ministries/MinistriesPage';
import { ClientLayout } from '../ClientLayout';

export default function MinistriesIndex() {
  return (
    <ClientLayout>
      <MinistriesPage />
    </ClientLayout>
  );
}
