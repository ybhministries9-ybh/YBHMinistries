import { Metadata } from 'next';
import { Gallery } from '@/components/Gallery';
import { ClientLayout } from '../ClientLayout';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Browse photos from YBH Ministries events, worship services, conferences, and ministry activities. See our community in action.',
  openGraph: {
    title: 'YBH Ministries Photo Gallery',
    description: 'View photos from our worship services, conferences, and ministry events.',
  },
};

export default function GalleryPage() {
  return (
    <ClientLayout>
      <Gallery />
    </ClientLayout>
  );
}
