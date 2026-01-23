import { Metadata } from 'next';
import { NewsPage } from '@/components/newsroom/NewsPage';
import { ClientLayout } from '../ClientLayout';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';

export const metadata: Metadata = {
  title: 'News & Updates - YBH Ministries',
  description: 'Stay updated with the latest news, events, and enrollment reports from Yeshua Beth Hallel Ministries. Explore upcoming conferences, music classes, and ministry activities.',
  keywords: ['YBH news', 'ministry events', 'music school enrollment', 'Hallel conferences', 'church updates', 'Hyderabad ministry'],
  openGraph: {
    title: 'News & Updates - YBH Ministries',
    description: 'Latest news, events, and enrollment reports from Yeshua Beth Hallel Ministries.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Updates - YBH Ministries',
    description: 'Latest news, events, and enrollment reports from Yeshua Beth Hallel Ministries.',
  },
};

export default async function News() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return (
    <ClientLayout>
      <NewsPage />
    </ClientLayout>
  );
}
