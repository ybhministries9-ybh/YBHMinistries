import { Metadata } from 'next';
import { ContactsPage } from '@/components/ContactsPage';
import { ClientLayout } from '../../ClientLayout';
import MaintenancePage from '../../maintenance/page';
import { isMaintenanceEnabled } from '../../lib/maintenance';

export const metadata: Metadata = {
  title: 'Book Your 24 Hours Worship Slot',
  description:
    'Get in touch with Yeshua Beth Hallel Ministries. Contact us for inquiries about our Bible college, music school, church services, or ministry programs.',
  openGraph: {
    title: 'Book Your 24 Hours Worship Slot',
    description:
      'Reach out to us for inquiries about our programs, services, and ministry opportunities.',
  },
};

export default async function ContactWorship24() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return (
    <ClientLayout>
      <ContactsPage initialTab="worship24" />
    </ClientLayout>
  );
}

