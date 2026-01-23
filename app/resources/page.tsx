import { Metadata } from 'next';
import { ResourcesPage } from '@/components/ResourcesPage';
import { ClientLayout } from '../ClientLayout';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';

export const metadata: Metadata = {
  title: 'Resources & Materials | YBH Ministries',
  description: 'Access worship resources, teaching materials, sermons, and educational content from Yeshua Beth Hallel Ministries. Books, worship songs, and sermon recordings.',
  keywords: ['YBH Ministries resources', 'worship songs', 'Christian sermons', 'Telugu Christian books', 'ministry resources', 'worship materials', 'Christian teaching'],
  openGraph: {
    title: 'YBH Ministries Resources',
    description: 'Worship resources, teaching materials, and educational content for your spiritual growth.',
    type: 'website',
  },
};

export default async function Resources() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return (
    <ClientLayout>
      <ResourcesPage />
    </ClientLayout>
  );
}
