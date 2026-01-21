import { NextRequest, NextResponse } from 'next/server';
import { getActiveHeroImages } from '@/lib/db';
import { parseKeyFromUrl, getPresignedGetUrl, PRIVATE_BUCKET } from '@/lib/r2';

/**
 * GET /api/home/hero-images
 * Fetch all active hero images
 */
export async function GET(request: NextRequest) {
  try {
    const images = await getActiveHeroImages();

    // For images stored in a private R2 bucket, generate short-lived presigned GET URLs
    const enhanced = await Promise.all(
      images.map(async (img: any) => {
        const image_url = img.image_url || img.url || '';
        const mobile_url = img.mobile_image_url || img.mobile_url || '';
        const parsed = parseKeyFromUrl(image_url);
        const out: any = { ...img };
        if (parsed && parsed.key) {
          try {
            const bucket = parsed.bucket || PRIVATE_BUCKET;
            const signedUrl = await getPresignedGetUrl(parsed.key, 3600, bucket || undefined);
            out.signedUrl = signedUrl;
          } catch (err) {
            console.error('Failed to generate presigned URL for', parsed, err);
          }
        }
        // also generate signed thumbnail/medium URLs if available (prefer smaller thumb for fast LCP)
        const thumbUrl = img.thumbnail_url || img.thumb_url || '';
        if (thumbUrl) {
          try {
            const p = parseKeyFromUrl(thumbUrl);
            const bucket = p.bucket || PRIVATE_BUCKET;
            if (p && p.key) {
              out.signedThumbUrl = await getPresignedGetUrl(p.key, 3600, bucket || undefined);
            }
          } catch (err) {
            console.error('Failed to generate presigned thumbnail URL', err);
          }
        }

        const mediumUrl = img.medium_url || img.mediumUrl || '';
        if (mediumUrl) {
          try {
            const pm = parseKeyFromUrl(mediumUrl);
            const bucket = pm.bucket || PRIVATE_BUCKET;
            if (pm && pm.key) {
              out.signedMediumUrl = await getPresignedGetUrl(pm.key, 3600, bucket || undefined);
            }
          } catch (err) {
            console.error('Failed to generate presigned medium URL', err);
          }
        }
        // generate signed mobile urls if mobile-specific fields exist
        if (mobile_url) {
          try {
            const pm = parseKeyFromUrl(mobile_url);
            if (pm && pm.key) {
              const bucket = pm.bucket || PRIVATE_BUCKET;
              out.signedMobileUrl = await getPresignedGetUrl(pm.key, 3600, bucket || undefined);
            }
          } catch (err) {
            console.error('Failed to generate presigned mobile URL', err);
          }
        }

        const mobileThumb = img.mobile_thumbnail_url || img.mobile_thumb_url || '';
        if (mobileThumb) {
          try {
            const pmt = parseKeyFromUrl(mobileThumb);
            const bucket = pmt.bucket || PRIVATE_BUCKET;
            if (pmt && pmt.key) {
              out.signedMobileThumbUrl = await getPresignedGetUrl(pmt.key, 3600, bucket || undefined);
            }
          } catch (err) {
            console.error('Failed to generate presigned mobile thumbnail URL', err);
          }
        }

        const mobileMedium = img.mobile_medium_url || img.mobileMediumUrl || '';
        if (mobileMedium) {
          try {
            const pmm = parseKeyFromUrl(mobileMedium);
            const bucket = pmm.bucket || PRIVATE_BUCKET;
            if (pmm && pmm.key) {
              out.signedMobileMediumUrl = await getPresignedGetUrl(pmm.key, 3600, bucket || undefined);
            }
          } catch (err) {
            console.error('Failed to generate presigned mobile medium URL', err);
          }
        }

        return out;
      })
    );

    return NextResponse.json({
      success: true,
      data: enhanced,
      count: enhanced.length
    });
  } catch (error) {
    console.error('Error in GET /api/home/hero-images:', error);
    
    // Return fallback images if database fails
    const fallbackImages = [
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/01.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/1.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10%281%29.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10a.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/11.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/11a.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/12.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/13.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/14.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/15.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/16.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/17.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/18.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/2.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/3.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/4.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/5.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/6.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/7.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/8.jpg",
      "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/9.jpg"
    ];
    
    return NextResponse.json({
      success: true,
      data: fallbackImages.map((url, index) => ({
        id: index + 1,
        image_url: url,
        display_order: index + 1,
        is_active: true
      })),
      count: fallbackImages.length,
      fallback: true
    });
  }
}
