import { Metadata } from 'next';
import { DirectorsPage } from '@/components/DirectorsPage';
import { ClientLayout } from '../ClientLayout';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';

export const metadata: Metadata = {
  title: 'Our Directors | YBH Ministries Leadership',
  description: 'Meet Pastor Augustine Dandingi, Guinness World Records holder, and the leadership team of Yeshua Beth Hallel Ministries. Learn about their vision for worship and ministry.',
  keywords: ['Pastor Augustine Dandingi', 'Guinness World Records worship', 'YBH Ministries leadership', 'Christian ministry directors', 'Vijaya Dandingi', 'worship leaders India'],
  openGraph: {
    title: 'YBH Ministries Leadership Team',
    description: 'Meet our dedicated directors leading the ministry with faith and vision, including Pastor Augustine Dandingi.',
    type: 'website',
    images: [
      {
        url: '/images/directors/augustine.jpg',
        width: 1200,
        height: 1200,
        alt: 'Pastor Augustine Dandingi - YBH Ministries'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Directors | YBH Ministries Leadership',
    description: 'Meet our leadership team including Pastor Augustine Dandingi.',
    images: ['/images/directors/augustine.jpg']
  }
};

export default async function Directors() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return (
    <ClientLayout>
      <DirectorsPage />
    </ClientLayout>
  );
}
