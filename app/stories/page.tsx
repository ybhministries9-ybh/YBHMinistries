import { Metadata } from 'next';
import { StoriesPage } from '@/components/StoriesPage';
import { ClientLayout } from '../ClientLayout';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';

export const metadata: Metadata = {
  title: 'Testimonies & Stories',
  description: 'Read inspiring testimonies and stories of transformation from the YBH Ministries community. Discover how faith has changed lives.',
  openGraph: {
    title: 'YBH Ministries Testimonies',
    description: 'Inspiring stories of faith, transformation, and God\'s work in our community.',
  },
};

export default async function Stories() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return (
    <ClientLayout>
      <StoriesPage />
    </ClientLayout>
  );
}
