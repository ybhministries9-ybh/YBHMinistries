import { Metadata } from 'next';
import { HallelChurch } from '@/components/ministries/HallelChurch';
import { ClientLayout } from '../../ClientLayout';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Hallel Church',
  description: 'Join Hallel Church for Spirit-filled worship services, Bible teaching, and fellowship. Experience the presence of God in our community.',
  keywords: ['Hallel Church', 'church services', 'worship service', 'Telugu church', 'Christian fellowship', 'Bible teaching'],
  openGraph: {
    title: 'Hallel Church - YBH Ministries',
    description: 'Spirit-filled worship services, Bible teaching, and fellowship in the presence of God.',
  },
};

export default function HallelChurchPage() {
  return (
    <ClientLayout>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://ybhministries.org' },
          { name: 'Ministries', url: 'https://ybhministries.org/ministries' },
          { name: 'Hallel Church' },
        ]}
      />
      <HallelChurch />
    </ClientLayout>
  );
}
