import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

// Helper to presign r2:// URLs for QR images
async function presignQrUrls(upiRows: any[]): Promise<any[]> {
  try {
    const { parseKeyFromUrl, getPresignedGetUrl } = await import('@/lib/r2');
    
    return await Promise.all(upiRows.map(async (row) => {
      if (row.qr_image_url && typeof row.qr_image_url === 'string' && row.qr_image_url.startsWith('r2://')) {
        try {
          const parsed = parseKeyFromUrl(row.qr_image_url);
          if (parsed?.key) {
            const presignedUrl = await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
            return { ...row, qr_image_url: presignedUrl };
          }
        } catch (e) {
          console.error('Failed to presign QR image URL:', row.id, e);
        }
      }
      return row;
    }));
  } catch (e) {
    console.error('R2 utilities not available, returning raw URLs');
    return upiRows;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    let result;
    let response: NextResponse;
    
    switch (type) {
      case 'upi':
        result = await sql`SELECT * FROM donations_upi WHERE visible = true ORDER BY sort_order, id`;
        const presignedUpi = await presignQrUrls(result.rows);
        response = NextResponse.json({ success: true, data: presignedUpi });
        break;
      case 'bank':
        result = await sql`SELECT * FROM donations_bank WHERE visible = true ORDER BY sort_order, id`;
        response = NextResponse.json({ success: true, data: result.rows });
        break;
      case 'all':
      default:
        const upi = await sql`SELECT * FROM donations_upi WHERE visible = true ORDER BY sort_order, id`;
        const bank = await sql`SELECT * FROM donations_bank WHERE visible = true ORDER BY sort_order, id`;
        const presignedUpiAll = await presignQrUrls(upi.rows);
        response = NextResponse.json({ success: true, data: { upi: presignedUpiAll, bank: bank.rows } });
        break;
    }
    
    // Cache for 10 minutes on CDN, allow stale-while-revalidate for 1 hour
    response.headers.set('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
    
    return response;
  } catch (error) {
    console.error('Error in GET /api/donations:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch donations' }, { status: 500 });
  }
}
