import { Metadata } from 'next';
import { NewsPage } from '@/components/newsroom/NewsPage';
import { ClientLayout } from '../ClientLayout';

export const metadata: Metadata = {
  title: 'News & Updates',
  description: 'Stay updated with the latest news, announcements, and events from Yeshua Beth Hallel Ministries. Read about our recent activities and upcoming programs.',
  openGraph: {
    title: 'YBH Ministries News & Updates',
    description: 'Latest news, announcements, and updates from our ministry.',
  },
};

export default function News() {
  return (
    <ClientLayout>
      <NewsPage />
    </ClientLayout>
  );
}
