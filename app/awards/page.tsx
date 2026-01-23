import { Metadata } from 'next';
import { AwardsPage } from '@/components/AwardsPage';
import { ClientLayout } from '../ClientLayout';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';

export const metadata: Metadata = {
  title: 'Awards & Recognition',
  description: 'View the awards, recognitions, and achievements of Yeshua Beth Hallel Ministries and our community members.',
  openGraph: {
    title: 'YBH Ministries Awards',
    description: 'Recognition and achievements of our ministry and community.',
  },
};

export default async function Awards() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return (
    <ClientLayout>
      <AwardsPage />
    </ClientLayout>
  );
}
