import { Metadata } from 'next';
import { AwardsPage } from '@/components/AwardsPage';
import { ClientLayout } from '../ClientLayout';

export const metadata: Metadata = {
  title: 'Awards & Recognition',
  description: 'View the awards, recognitions, and achievements of Yeshua Beth Hallel Ministries and our community members.',
  openGraph: {
    title: 'YBH Ministries Awards',
    description: 'Recognition and achievements of our ministry and community.',
  },
};

export default function Awards() {
  return (
    <ClientLayout>
      <AwardsPage />
    </ClientLayout>
  );
}
