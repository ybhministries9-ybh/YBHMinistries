import { NextResponse } from 'next/server';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';
import { addGalleryItems } from '@/lib/db';
import { getPublicUrl, headObject } from '@/lib/r2';

/**
 * Admin endpoint to confirm an uploaded object in R2 and persist a DB record.
 * Accepts JSON body:
 * { key, fileName, contentType, size, mediaType: 'image'|'video', category?, title? }
 */
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const sessionInfo = await resolveSessionAndActorFromAuthHeader(authHeader);
    if (!sessionInfo) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const actor = sessionInfo.actor;
    const body = await req.json();
    const { key, fileName, contentType, size, mediaType, category, title } = body || {};

    if (!key || !mediaType) return NextResponse.json({ success: false, error: 'Missing key or mediaType' }, { status: 400 });

    // Determine bucket used based on category (logos -> public bucket)
    const isLogo = category && typeof category === 'string' && category.toLowerCase().includes('logo');
    const bucket = isLogo ? (process.env.NEXT_PUBLIC_R2_PUBLIC_BUCKET || process.env.CF_R2_BUCKET) : (process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET || process.env.CF_R2_BUCKET);

    // Verify object exists in R2 and collect metadata via HEAD against the chosen bucket
    let meta: any = null;
    try {
      meta = await headObject(key, bucket);
    } catch (err: any) {
      console.warn('headObject failed for', key, err);
    }

    if (!meta) {
      return NextResponse.json({ success: false, error: 'Uploaded object not found in R2' }, { status: 404 });
    }

    // Compute stored URL using the discovered bucket. For public bucket this will be a stable public URL.
    const url = getPublicUrl(key, bucket);

    // Optionally validate size/content-type if client sent expected values
    if (typeof size === 'number' && meta.ContentLength && Number(meta.ContentLength) !== Number(size)) {
      console.warn('Uploaded size mismatch', { expected: size, actual: meta.ContentLength });
      // Not failing hard; just log. If you want strictness, return 400 here.
    }

    const resolvedMediaType = mediaType === 'video' ? 'video' : 'image';

    // Insert into gallery_items via helper
    const items = await addGalleryItems([
      {
        category: category || 'uploads',
        media_type: resolvedMediaType,
        url,
        title: title || fileName || key,
        date: new Date().toISOString().split('T')[0],
        created_by: actor,
      }
    ], actor);

    return NextResponse.json({ success: true, data: items[0] });
  } catch (err: any) {
    console.error('/api/admin/media/confirm error', err);
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 });
  }
}
