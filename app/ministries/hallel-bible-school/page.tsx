import { Metadata } from 'next';
import { HallelBibleSchoolMinistry } from '@/components/ministries/HallelBibleSchoolMinistry';
import { ClientLayout } from '../../ClientLayout';

export const metadata: Metadata = {
  title: 'Hallel Bible School',
  description: 'Hallel Bible School offers foundational biblical training for believers. Learn God\'s Word and grow in faith through our Bible school program.',
  keywords: ['Hallel Bible School', 'Bible school', 'biblical training', 'Christian education', 'faith development'],
  openGraph: {
    title: 'Hallel Bible School - YBH Ministries',
    description: 'Foundational biblical training to help believers learn God\'s Word and grow in faith.',
  },
};

export default function HallelBibleSchoolPage() {
  return (
    <ClientLayout>
      <HallelBibleSchoolMinistry />
    </ClientLayout>
  );
}
