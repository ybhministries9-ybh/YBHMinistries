'use client';

import { NewsPage } from '@/components/newsroom/NewsPage';
import { ClientLayout } from '../ClientLayout';

export default function News() {
  return (
    <ClientLayout>
      <NewsPage />
    </ClientLayout>
  );
}
