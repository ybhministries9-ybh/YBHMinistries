import { Metadata } from 'next';
import { DonatePage } from '@/components/DonatePage';
import { ClientLayout } from '../ClientLayout';

export const metadata: Metadata = {
  title: 'Donate & Support',
  description: 'Support Yeshua Beth Hallel Ministries mission. Your donations help us continue empowering worship, education, and ministry programs.',
  openGraph: {
    title: 'Support YBH Ministries',
    description: 'Make a difference by supporting our worship, education, and ministry programs.',
  },
};

export default function Donate() {
  return (
    <ClientLayout>
      <DonatePage />
    </ClientLayout>
  );
}
