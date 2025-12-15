import { NextRequest, NextResponse } from 'next/server';
import { del } from '@/lib/vercelBlob';
import { withApiGuard, safeParseJson } from '@/lib/apiGuard';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/blob
 * Body: { urls: string[] }
 * Deletes one or more Vercel Blob URLs (only deletes URLs that include blob.vercel-storage.com)
 */
export const POST = withApiGuard(async (request: NextRequest) => {
  const body = await safeParseJson(request, 200 * 1024);
  const urls: string[] = body?.urls || (body?.url ? [body.url] : []);

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ success: false, error: 'No urls provided' }, { status: 400 });
  }

  const results: Array<any> = [];

  for (const url of urls) {
    try {
      if (typeof url !== 'string') {
        results.push({ url, skipped: true, reason: 'invalid_url' });
        continue;
      }

      if (!url.includes('blob.vercel-storage.com')) {
        results.push({ url, skipped: true, reason: 'not_vercel_blob' });
        continue;
      }

      // Attempt deletion
      try {
        await del(url);
        results.push({ url, deleted: true });
      } catch (err: any) {
        console.error(`Failed to delete blob ${url}:`, err && err.message ? err.message : err);
        results.push({ url, deleted: false, error: 'delete_failed' });
      }
    } catch (e: any) {
      results.push({ url: url, deleted: false, error: 'invalid_url' });
    }
  }

  return NextResponse.json({ success: true, results });
});
