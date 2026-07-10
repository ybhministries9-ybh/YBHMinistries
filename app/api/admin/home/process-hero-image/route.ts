import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { parseKeyFromUrl, getPresignedGetUrl, uploadBuffer, PRIVATE_BUCKET } from '@/lib/r2';
import { sql, } from '@vercel/postgres';
import { updateHeroImage } from '@/lib/db';
import processHeroImageById from '@/lib/imageProcessor';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from '@/lib/sessions';

// Simple processing endpoint to process one queue item or a specific hero_image_id.
export async function POST(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const denied = readOnlyResponse(resolved);
    if (denied) return denied;

    const body = await request.json().catch(() => ({}));
    // If hero_image_id provided, process that; otherwise process one pending item
    if (body && body.hero_image_id) {
      try {
        const result = await processHeroImageById(body.hero_image_id);
        return NextResponse.json({ success: true, processed: result });
      } catch (err: any) {
        console.error('Processing failed for provided hero id', body.hero_image_id, err);
        return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 });
      }
    }

    // fetch a single pending item and mark it processing
    const client = await sql.connect();
    let queueRow: any = null;
    try {
      await client.query('BEGIN');
      const sel = await client.query(`SELECT * FROM image_processing_queue WHERE status = 'pending' ORDER BY created_at ASC LIMIT 1 FOR UPDATE SKIP LOCKED`);
      queueRow = sel.rows[0];
      if (!queueRow) {
        await client.query('COMMIT');
        return NextResponse.json({ success: true, message: 'No pending items' });
      }
      await client.query(`UPDATE image_processing_queue SET status='processing', attempts = attempts + 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1`, [queueRow.id]);
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }

    if (!queueRow) return NextResponse.json({ success: false, error: 'No queue item found' }, { status: 404 });

    try {
      const result = await processHeroImageById(queueRow.hero_image_id);
      return NextResponse.json({ success: true, processed: result });
    } catch (err: any) {
      console.error('Processing failed for queue item', queueRow.id, err);
      await sql.query(`UPDATE image_processing_queue SET status='failed', last_error=$1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`, [err?.message || String(err), queueRow.id]);
      return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 });
    }
  } catch (err: any) {
    console.error('Error processing hero image queue:', err);
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 });
  }
}
