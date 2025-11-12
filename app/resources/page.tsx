import { Metadata } from 'next';
import { ResourcesPage } from '@/components/ResourcesPage';
import { ClientLayout } from '../ClientLayout';

export const metadata: Metadata = {
  title: 'Resources & Materials',
  description: 'Access worship resources, teaching materials, and educational content from Yeshua Beth Hallel Ministries.',
  openGraph: {
    title: 'YBH Ministries Resources',
    description: 'Worship resources, teaching materials, and educational content for your spiritual growth.',
  },
};

export default function Resources() {
  return (
    <ClientLayout>
      <ResourcesPage />
    </ClientLayout>
  );
}
