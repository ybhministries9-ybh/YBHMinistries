'use client';

import { Gallery } from '@/components/Gallery';
import { ClientLayout } from '../ClientLayout';

export const dynamic = 'force-dynamic';

export default function GalleryPage() {
  return (
    <ClientLayout>
      <Gallery />
    </ClientLayout>
  );
}
