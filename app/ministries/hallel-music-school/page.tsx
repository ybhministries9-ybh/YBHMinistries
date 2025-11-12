import { Metadata } from 'next';
import { HMSPage } from '@/components/ministries/HMSPage';
import { ClientLayout } from '../../ClientLayout';
import { BreadcrumbStructuredData, EducationalOrganizationStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Hallel Music School',
  description: 'Hallel Music School provides professional worship music training in vocals, instruments, and music theory. Learn to worship through music.',
  keywords: ['Hallel Music School', 'worship music training', 'music education', 'vocal training', 'instrument lessons', 'Christian music school'],
  openGraph: {
    title: 'Hallel Music School - YBH Ministries',
    description: 'Professional worship music training in vocals, instruments, and music theory.',
  },
};

export default function HMSPageRoute() {
  return (
    <ClientLayout>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://ybhministries.org' },
          { name: 'Ministries', url: 'https://ybhministries.org/ministries' },
          { name: 'Hallel Music School' },
        ]}
      />
      <EducationalOrganizationStructuredData
        name="Hallel Music School"
        url="https://ybhministries.org/ministries/hallel-music-school"
        description="Professional worship music training in vocals, instruments, and music theory."
      />
      <HMSPage />
    </ClientLayout>
  );
}
