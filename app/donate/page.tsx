import { Metadata } from 'next';
import { DonatePage } from '@/components/DonatePage';
import { ClientLayout } from '../ClientLayout';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';

export const metadata: Metadata = {
  title: 'Donate & Support | YBH Ministries',
  description: 'Support Yeshua Beth Hallel Ministries mission. Donate via UPI, QR code, or bank transfer. Your contributions help us continue empowering worship, music education, and ministry programs.',
  keywords: ['donate', 'support', 'YBH Ministries', 'Yeshua Beth Hallel', 'UPI donation', 'bank transfer', 'ministry support', 'Christian ministry', 'music ministry'],
  openGraph: {
    title: 'Support YBH Ministries - Donate Today',
    description: 'Make a difference by supporting our worship, music education, and ministry programs. Donate via UPI, QR code, or bank transfer.',
    type: 'website',
  },
};

export default async function Donate() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return (
    <ClientLayout>
      <DonatePage />
    </ClientLayout>
  );
}
