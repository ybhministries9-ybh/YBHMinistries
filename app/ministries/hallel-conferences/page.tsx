import { Metadata } from 'next';
import { HallelConferences } from '@/components/ministries/HallelConferences';
import { ClientLayout } from '../../ClientLayout';

export const metadata: Metadata = {
  title: 'Hallel Conferences',
  description: 'Join powerful worship conferences and gatherings at YBH Ministries. Experience transformative worship, teaching, and fellowship.',
  keywords: ['Hallel Conferences', 'worship conferences', 'Christian conferences', 'worship gatherings', 'ministry events'],
  openGraph: {
    title: 'Hallel Conferences - YBH Ministries',
    description: 'Powerful worship conferences with transformative teaching and fellowship.',
  },
};

export default function HallelConferencesPage() {
  return (
    <ClientLayout>
      <HallelConferences />
    </ClientLayout>
  );
}
