import { Metadata } from 'next';
import { DirectorsPage } from '@/components/DirectorsPage';
import { ClientLayout } from '../ClientLayout';

export const metadata: Metadata = {
  title: 'Our Directors',
  description: 'Meet the leadership team of Yeshua Beth Hallel Ministries. Learn about our directors and their vision for the ministry.',
  openGraph: {
    title: 'YBH Ministries Leadership',
    description: 'Meet our dedicated directors leading the ministry with faith and vision.',
  },
};

export default function Directors() {
  return (
    <ClientLayout>
      <DirectorsPage />
    </ClientLayout>
  );
}
