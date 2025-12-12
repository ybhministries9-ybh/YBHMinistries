import { Metadata } from 'next';
import { DirectorsPage } from '@/components/DirectorsPage';
import { ClientLayout } from '../ClientLayout';

export const metadata: Metadata = {
  title: 'Our Directors | YBH Ministries Leadership',
  description: 'Meet Pastor Augustine Dandingi, Guinness World Record holder, and the leadership team of Yeshua Beth Hallel Ministries. Learn about their vision for worship and ministry.',
  keywords: ['Pastor Augustine Dandingi', 'Guinness World Record worship', 'YBH Ministries leadership', 'Christian ministry directors', 'Vijaya Dandingi', 'worship leaders India'],
  openGraph: {
    title: 'YBH Ministries Leadership Team',
    description: 'Meet our dedicated directors leading the ministry with faith and vision, including Pastor Augustine Dandingi.',
    type: 'website',
  },
};

export default function Directors() {
  return (
    <ClientLayout>
      <DirectorsPage />
    </ClientLayout>
  );
}
