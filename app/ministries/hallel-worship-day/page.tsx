import { Metadata } from 'next';
import { HallelWorshipDay } from '@/components/ministries/HallelWorshipDay';
import { ClientLayout } from '../../ClientLayout';

export const metadata: Metadata = {
  title: 'Hallel Worship Day',
  description: 'Experience powerful worship at Hallel Worship Day. Join us for a day of praise, worship, and encountering God\'s presence.',
  keywords: ['Hallel Worship Day', 'worship event', 'praise and worship', 'worship gathering', 'Christian worship'],
  openGraph: {
    title: 'Hallel Worship Day - YBH Ministries',
    description: 'A day of powerful praise, worship, and encountering God\'s presence.',
  },
};

export default function HallelWorshipDayPage() {
  return (
    <ClientLayout>
      <HallelWorshipDay />
    </ClientLayout>
  );
}
