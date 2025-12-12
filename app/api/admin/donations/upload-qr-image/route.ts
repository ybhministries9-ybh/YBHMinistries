import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { uploadBuffer, deleteObject, parseKeyFromUrl, PRIVATE_BUCKET } from '@/lib/r2';
import { verifySession } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

/**
 * Upload a QR code image file to R2 private bucket under /Donate/<upi_id>/
 * This endpoint accepts FormData with:
 * - id: UPI entry ID
 * - file: Image file (PNG/JPG)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const id = formData.get('id');
    const file = formData.get('file');

    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedMime = ['image/png', 'image/jpeg', 'image/jpg'];
    const fileType = file.type || '';
    const fileName = file.name || '';
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    const allowedExt = ['png', 'jpg', 'jpeg'];
    const mimeOk = allowedMime.includes(fileType.toLowerCase());
    const extOk = allowedExt.includes(ext);
    
    if (!mimeOk && !extOk) {
      return NextResponse.json({ success: false, error: 'Unsupported file type. Only PNG and JPG images are allowed.' }, { status: 415 });
    }

    // Validate file size (max 5MB)
    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json({ success: false, error: `File too large. Maximum allowed size is ${maxSizeMB}MB.` }, { status: 413 });
    }

    // Check if UPI entry exists
    const existingRes = await sql`SELECT id, qr_image_url FROM donations_upi WHERE id = ${String(id)}`;
    if (existingRes.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'UPI entry not found' }, { status: 404 });
    }

    const existingRow = existingRes.rows[0];

    // Delete existing QR image from R2 if present
    if (existingRow.qr_image_url && typeof existingRow.qr_image_url === 'string') {
      const oldUrl = existingRow.qr_image_url;
      // Handle r2:// URLs
      if (oldUrl.startsWith('r2://')) {
        try {
          const parsed = parseKeyFromUrl(oldUrl);
          if (parsed.key) {
            await deleteObject(parsed.key, parsed.bucket || undefined);
          }
        } catch (err) {
          console.error('Failed to delete existing QR image from R2:', err);
        }
      }
    }

    // Prepare file for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const finalFilename = `qr_${timestamp}_${sanitizedName}`;
    
    // Store under /Donate/<id>/ folder
    const key = `Donate/${id}/${finalFilename}`;
    const bucket = PRIVATE_BUCKET || process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET;

    // Upload to R2
    await uploadBuffer(key, buffer, file.type || 'image/png', bucket as string);

    // Create r2:// URL for storage in DB
    const r2Url = `r2://${bucket}/${key}`;

    // Update database with new QR image URL
    const result = await sql`
      UPDATE donations_upi 
      SET qr_image_url = ${r2Url}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${String(id)} 
      RETURNING *
    `;

    if (!result.rows.length) {
      return NextResponse.json({ success: false, error: 'Failed to update UPI entry' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      url: r2Url, 
      row: result.rows[0] 
    });
  } catch (error: any) {
    console.error('Error uploading QR image:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to upload QR image' }, { status: 500 });
  }
}
