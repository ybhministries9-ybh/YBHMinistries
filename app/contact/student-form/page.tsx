import { Metadata } from 'next';
import { ContactsPage } from '@/components/ContactsPage';
import { ClientLayout } from '../../ClientLayout';
import MaintenancePage from '../../maintenance/page';
import { isMaintenanceEnabled } from '../../lib/maintenance';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Yeshua Beth Hallel Ministries. Contact us for inquiries about our Bible college, music school, church services, or ministry programs.',
  openGraph: {
    title: 'Contact YBH Ministries',
    description:
      'Reach out to us for inquiries about our programs, services, and ministry opportunities.',
  },
};

export default async function ContactStudentForm() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return (
    <ClientLayout>
      <ContactsPage initialTab="student-form" />
    </ClientLayout>
  );
}

