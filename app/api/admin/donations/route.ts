import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { del } from '@vercel/blob';
import { verifySession, getActorName } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json({ success: false, error: 'Type parameter is required' }, { status: 400 });
    }

    let result;

    switch (type) {
      case 'upi':
        result = await sql`SELECT * FROM donations_upi ORDER BY sort_order, id`;
        break;
      case 'bank':
        result = await sql`SELECT * FROM donations_bank ORDER BY sort_order, id`;
        break;
      // 'info' removed; content is hardcoded and not managed via admin
      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error in GET /api/admin/donations:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch donations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    if (!type) return NextResponse.json({ success: false, error: 'type param required' }, { status: 400 });

    const data = await request.json();
    // verify session and resolve actor
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const actor = await getActorName(token);
    let result;

    switch (type) {
      case 'upi':
        result = await sql`
          INSERT INTO donations_upi (label, upi_id, qr_image_url, visible, sort_order, created_by)
          VALUES (${data.label}, ${data.upi_id}, ${data.qr_image_url}, ${data.visible || true}, ${data.sort_order || 0}, ${actor})
          RETURNING *
        `;
        break;
      case 'bank':
        result = await sql`
          INSERT INTO donations_bank (
            account_name, account_number, bank_name, branch_name, ifsc_code, swift_code, upi_id, visible, sort_order, created_by
          ) VALUES (
            ${data.account_name}, ${data.account_number}, ${data.bank_name}, ${data.branch_name}, ${data.ifsc_code}, ${data.swift_code}, ${data.upi_id}, ${data.visible || true}, ${data.sort_order || 0}, ${actor}
          ) RETURNING *
        `;
        break;
      // 'info' removed; content is hardcoded and not managed via admin
      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/donations:', error);
    return NextResponse.json({ success: false, error: 'Failed to create donation item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    if (!type || !id) return NextResponse.json({ success: false, error: 'type & id required' }, { status: 400 });

    const data = await request.json();
    // verify session and resolve actor
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const actor = await getActorName(token);
    let result;

    switch (type) {
      case 'upi':
        result = await sql`
          UPDATE donations_upi SET
            label = ${data.label}, upi_id = ${data.upi_id}, qr_image_url = ${data.qr_image_url},
            visible = ${data.visible}, sort_order = ${data.sort_order || 0}, updated_by = ${actor}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;
      case 'bank':
        result = await sql`
          UPDATE donations_bank SET
            account_name = ${data.account_name}, account_number = ${data.account_number}, bank_name = ${data.bank_name},
            branch_name = ${data.branch_name}, ifsc_code = ${data.ifsc_code}, swift_code = ${data.swift_code},
            upi_id = ${data.upi_id}, visible = ${data.visible}, sort_order = ${data.sort_order || 0}, updated_by = ${actor}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;
      // 'info' removed; content is hardcoded and not managed via admin
      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }

    if (!result.rows.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error in PUT /api/admin/donations:', error);
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    if (!type || !id) return NextResponse.json({ success: false, error: 'type & id required' }, { status: 400 });

    // verify session for delete
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth || null;
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    let result;
    switch (type) {
      case 'upi':
        // When deleting UPI entry, delete the QR blob if present
        try {
          const selectRes = await sql`SELECT qr_image_url FROM donations_upi WHERE id = ${id}`;
          const row = selectRes.rows[0];
          if (row && row.qr_image_url && typeof row.qr_image_url === 'string' && row.qr_image_url.includes('blob.vercel-storage.com')) {
            try {
              await del(row.qr_image_url);
            } catch (err) {
              console.error(`Failed to delete QR blob for UPI ${id}:`, err);
            }
          }
        } catch (err) {
          console.error('Error while attempting to delete UPI QR blob:', err);
        }

        result = await sql`DELETE FROM donations_upi WHERE id = ${id} RETURNING id`;
        break;
      case 'bank':
        result = await sql`DELETE FROM donations_bank WHERE id = ${id} RETURNING id`;
        break;
      // 'info' removed; content is hardcoded and not managed via admin
      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }

    if (!result.rows.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/donations:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
