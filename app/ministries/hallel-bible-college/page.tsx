import { Metadata } from 'next';
import { HallelBibleCollege } from '@/components/ministries/HallelBibleCollege';
import { ClientLayout } from '../../ClientLayout';
import { BreadcrumbStructuredData, EducationalOrganizationStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Hallel Bible College',
  description: 'Hallel Bible College offers comprehensive biblical education and theological training. Equip yourself for ministry and deepen your understanding of God\'s Word.',
  keywords: ['Hallel Bible College', 'Bible college', 'theological education', 'ministry training', 'biblical studies', 'Christian education'],
  openGraph: {
    title: 'Hallel Bible College - YBH Ministries',
    description: 'Comprehensive biblical education and theological training to equip believers for ministry.',
  },
};

export default function HallelBibleCollegePage() {
  return (
    <ClientLayout>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://ybhministries.org' },
          { name: 'Ministries', url: 'https://ybhministries.org/ministries' },
          { name: 'Hallel Bible College' },
        ]}
      />
      <EducationalOrganizationStructuredData
        name="Hallel Bible College"
        url="https://ybhministries.org/ministries/hallel-bible-college"
        description="Comprehensive biblical education and theological training to equip believers for ministry and deepen understanding of God's Word."
      />
      <HallelBibleCollege />
    </ClientLayout>
  );
}
