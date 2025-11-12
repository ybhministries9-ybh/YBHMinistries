import { Metadata } from 'next';
import { MinistriesPage } from '@/components/ministries/MinistriesPage';
import { ClientLayout } from '../ClientLayout';

export const metadata: Metadata = {
  title: 'Our Ministries',
  description: 'Explore YBH Ministries programs including Hallel Bible College, Hallel Music School, Hallel Church, worship conferences, and summer training programs.',
  keywords: [
    'Hallel Bible College',
    'Hallel Music School',
    'Hallel Church',
    'Hallel Conferences',
    'Hallel Worship Day',
    'Bible School',
    'Christian education',
    'worship training',
  ],
  openGraph: {
    title: 'YBH Ministries Programs',
    description: 'Discover our diverse ministry programs designed to equip and empower believers in worship, faith, and service.',
  },
};

export default function MinistriesIndex() {
  return (
    <ClientLayout>
      <MinistriesPage />
    </ClientLayout>
  );
}
