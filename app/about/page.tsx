import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { getActiveAboutHeroImage } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, headObject, getPublicUrl } from '@/lib/r2';
import sharp from 'sharp';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Yeshua Beth Hallel Ministries, our mission, vision, and commitment to empowering worship and transforming lives through faith-based education and ministry.',
  openGraph: {
    title: 'About YBH Ministries',
    description: 'Discover our mission to empower worship and transform lives through faith, music, and ministry.',
  },
};

/**
 * Server rendered page: fetch the active about hero image server-side and
 * pass the resolved (public or presigned) URL to the client component so the
 * initial render shows the final image without a client-side swap.
 */
async function resolveAccessibleUrl(raw?: string | null) {
  if (!raw) return null;
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
  const parsed = parseKeyFromUrl(raw);
  if (parsed?.key) {
    try {
      const head = await headObject(parsed.key, parsed.bucket || undefined);
      if (!head) return null;
      const url = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
      return url;
    } catch (e) {
      console.warn('presign failed for', raw, e);
      try {
        const pub = getPublicUrl(parsed.key, parsed.bucket || undefined);
        if (pub && !pub.startsWith('r2://')) return pub;
      } catch (err) {
        // ignore
      }
      return null;
    }
  }
  return null;
}
/**
 * Generate a tiny blurred data URL (LQIP) for the provided image URL.
 * Returns `data:image/webp;base64,...` or null on failure.
 */
async function generateBlurDataURL(url?: string | null) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // Create a very small (16px wide) WebP and base64-encode it for placeholder
    const small = await sharp(buffer).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
    return `data:image/webp;base64,${small.toString('base64')}`;
  } catch (e) {
    console.warn('Failed to generate blurDataURL for', url, e);
    return null;
  }
}

export default async function About() {
  try {
    const hero = await getActiveAboutHeroImage();
    const resolved = await resolveAccessibleUrl(hero?.image_url as string | null);
    // If no resolved URL, we intentionally do not provide a fallback image.
    const initialHeroImageUrl = resolved || null;
    const initialHeroBlur = initialHeroImageUrl ? await generateBlurDataURL(initialHeroImageUrl) : null;
    return <AboutClient initialHeroImageUrl={initialHeroImageUrl} initialHeroBlur={initialHeroBlur} />;
  } catch (err) {
    // On error, don't provide a fallback image — let client render the placeholder background
    console.warn('Error resolving initial about hero image on server:', err);
    return <AboutClient />;
  }
}
