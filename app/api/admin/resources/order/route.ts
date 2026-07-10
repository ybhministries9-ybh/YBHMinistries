import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

// POST: Bulk update display_order for resources (supports 'worship' and 'sermons')
export async function POST(request: NextRequest) {
  try {
    const resolved = await resolveSessionAndActorFromAuthHeader(request.headers.get('authorization') || '');
    if (!resolved) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const denied = readOnlyResponse(resolved);
    if (denied) return denied;

    const data = await request.json();
    const items: Array<{ id: string | number; display_order: number }> = data?.items || [];
    // optional type to indicate which table to update (default: worship)
    const type: string = (data?.type || 'worship').toString();
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items provided' }, { status: 400 });
    }

    // resolve actor for audit fields
    const actor = resolved.actor;

    // Update items in a simple loop; could be wrapped in a transaction if supported
    for (const it of items) {
      const id = String(it.id);
      const order = Number(it.display_order);
      if (!id || Number.isNaN(order)) continue;
      if (type === 'sermons') {
        await sql`
          UPDATE sermons
          SET display_order = ${order}, updated_by = ${actor}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
        `;
      } else {
        // default to worship
        await sql`
          UPDATE worship
          SET display_order = ${order}, updated_by = ${actor}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating worship order:', err);
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
  }
}
