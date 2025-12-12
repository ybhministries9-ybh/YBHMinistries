import { Metadata } from 'next';
import { Gallery } from '@/components/Gallery';
import { ClientLayout } from '../ClientLayout';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Photo Gallery | YBH Ministries',
  description: 'Browse photos from YBH Ministries events, worship services, conferences, and ministry activities. Explore our Guinness World Record events, Hallel conferences, and music training programs.',
  keywords: ['YBH Ministries gallery', 'Christian ministry photos', 'worship events', 'Guinness World Record', 'Hallel conference', 'music ministry', 'Christian events India'],
  openGraph: {
    title: 'YBH Ministries Photo Gallery',
    description: 'View photos from our worship services, conferences, Guinness World Record events, and ministry activities.',
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <ClientLayout>
      <Gallery />
    </ClientLayout>
  );
}
