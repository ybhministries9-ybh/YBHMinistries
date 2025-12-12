import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { getActiveAboutHeroImage } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, headObject, getPublicUrl } from '@/lib/r2';
import sharp from 'sharp';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import s3 from '@/lib/r2';

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
    // If URL maps to an R2 object key we can use the SDK to fetch it directly
    const parsed = parseKeyFromUrl(url);
    let buffer: Buffer | null = null;
    if (parsed?.key) {
      try {
        const usedBucket = parsed.bucket || undefined;
        const cmd = new GetObjectCommand({ Bucket: usedBucket, Key: parsed.key });
        const resp = await s3.send(cmd);
        if (resp.Body) {
          // stream to buffer
          const stream = resp.Body as any;
          const chunks: Buffer[] = [];
          for await (const chunk of stream) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          buffer = Buffer.concat(chunks);
        }
      } catch (sdkErr) {
        // fallback to using fetch below (silent in dev, only log in production)
        if (process.env.NODE_ENV === 'production') {
          console.warn('SDK GetObject failed, falling back to fetch for', url);
        }
        buffer = null;
      }
    }

    // If we couldn't get object via SDK, try fetch with retries+timeout
    if (!buffer) {
      const maxAttempts = 3;
      const timeoutMs = 15000; // 15s per attempt
      let attempt = 0;
      let lastErr: any = null;
      while (attempt < maxAttempts) {
        attempt += 1;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeoutMs);
        try {
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(id);
          if (!res.ok) {
            lastErr = new Error(`fetch failed status=${res.status}`);
            // small backoff then retry
            await new Promise((r) => setTimeout(r, 300 * attempt));
            continue;
          }
          const arrayBuffer = await res.arrayBuffer();
          buffer = Buffer.from(arrayBuffer);
          break;
        } catch (fetchErr) {
          clearTimeout(id);
          lastErr = fetchErr;
          // Abort vs other errors will be handled the same; backoff and retry
          await new Promise((r) => setTimeout(r, 500 * attempt));
        }
      }
      if (!buffer) {
        console.warn('All attempts to fetch image failed for blur generation', url, lastErr);
        return null;
      }
    }
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
