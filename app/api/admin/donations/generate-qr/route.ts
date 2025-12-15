import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { del } from '@/lib/vercelBlob';
import { put } from '@/lib/vercelBlob';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return NextResponse.json({ success: false, error: 'Server config: BLOB_READ_WRITE_TOKEN missing' }, { status: 500 });

    const { id, upi_id } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
    if (!upi_id) return NextResponse.json({ success: false, error: 'upi_id is required' }, { status: 400 });

    // Build the UPI string: basic required fields
    const upiString = `upi://pay?pa=${encodeURIComponent(upi_id)}&pn=${encodeURIComponent('YBH Ministries')}&cu=INR`;

    // Delete existing qr_image_url blob if present to avoid orphans
    try {
      const existing = await sql`SELECT qr_image_url FROM donations_upi WHERE id = ${id}`;
      const row = existing.rows[0];
      if (row && row.qr_image_url && typeof row.qr_image_url === 'string' && row.qr_image_url.includes('blob.vercel-storage.com')) {
        try {
          await del(row.qr_image_url);
        } catch (err) {
          console.error('Failed to delete existing QR blob:', err);
        }
      }
    } catch (err) {
      console.error('Failed to check existing QR image for deletion:', err);
    }

    // Generate PNG data URL for QR code
    const dataUrl = await QRCode.toDataURL(upiString, { type: 'image/png', margin: 1, scale: 6 });
    const base64 = dataUrl.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');

    // Store generated QR image in Vercel Blob under donations/upi/<id>/generated.png
    const filename = `qr_${Date.now()}.png`;
    const pathname = `donations/upi/${id}/${filename}`;
    const blob = await put(pathname, buffer, {
      access: 'public',
      contentType: 'image/png',
      token,
    });

    // Update row in DB with generated QR URL
    const result = await sql`UPDATE donations_upi SET qr_image_url = ${blob.url}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id} RETURNING *`;
    if (!result.rows.length) {
      return NextResponse.json({ success: false, error: 'UPI entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, url: blob.url, row: result.rows[0] });
  } catch (error: any) {
    console.error('Error generating QR:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to generate QR' }, { status: 500 });
  }
}
