import { Metadata } from 'next';
import { HMSSummerTraining } from '@/components/ministries/HMSSummerTraining';
import { ClientLayout } from '../../ClientLayout';

export const metadata: Metadata = {
  title: 'Hallel Music School Summer Training',
  description: 'Intensive summer worship music training program. Develop your musical skills and worship leadership during our summer intensive.',
  keywords: ['summer music training', 'worship training', 'music intensive', 'summer music program', 'Hallel Music School'],
  openGraph: {
    title: 'HMS Summer Training - YBH Ministries',
    description: 'Intensive summer program for worship music training and leadership development.',
  },
};

export default function HMSSummerTrainingPage() {
  return (
    <ClientLayout>
      <HMSSummerTraining />
    </ClientLayout>
  );
}
