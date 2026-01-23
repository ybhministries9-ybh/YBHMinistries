import { Metadata } from 'next';
import MaintenancePage from './maintenance/page';
import { isMaintenanceEnabled } from './lib/maintenance';
import { getActiveHeroImages } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, PRIVATE_BUCKET } from '@/lib/r2';
import HomeClient from './HomeClient';

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';
const DEFAULT_HERO_IMAGE = `${R2_BASE}/home/hero/default.jpg`;

export const metadata: Metadata = {
  title: 'YBH Ministries - Yeshua Beth Hallel Ministries | Worship & Faith',
  description: 'Yeshua Beth Hallel Ministries - Empowering worship and transforming lives through faith, music education, and ministry. Join our community of believers.',
  keywords: ['YBH Ministries', 'Yeshua Beth Hallel', 'Christian Ministry', 'Worship', 'Faith', 'Music School', 'Bible College', 'Church'],
  openGraph: {
    title: 'YBH Ministries - Empowering Worship, Transforming Lives',
    description: 'Join Yeshua Beth Hallel Ministries in our mission to spread faith through worship, music education, and community service.',
    type: 'website',
  },
};

// Server-side fetch of hero images for faster initial load
async function getHeroImages(): Promise<string[]> {
  try {
    const images = await getActiveHeroImages();

    if (!images || images.length === 0) {
      return [DEFAULT_HERO_IMAGE];
    }

    // Generate presigned URLs for private R2 images
    const imageUrls = await Promise.all(
      images.map(async (img: any) => {
        const image_url = img.image_url || img.url || '';
        const parsed = parseKeyFromUrl(image_url);
        
        if (parsed && parsed.key) {
          try {
            const bucket = parsed.bucket || PRIVATE_BUCKET;
            const signedUrl = await getPresignedGetUrl(parsed.key, 3600, bucket || undefined);
            return signedUrl;
          } catch (err) {
            // Fallback to original URL if signing fails
            return image_url;
          }
        }
        return image_url;
      })
    );

    const validUrls = imageUrls.filter(Boolean) as string[];
    return validUrls.length > 0 ? validUrls : [DEFAULT_HERO_IMAGE];
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return [DEFAULT_HERO_IMAGE];
  }
}

export default async function HomePage() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  const heroImages = await getHeroImages();
  
  return <HomeClient initialHeroImages={heroImages} />;
}
