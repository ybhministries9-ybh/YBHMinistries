import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions'

// Try to use the Postgres table `site_settings` if available. If the
// database is unavailable or the table doesn't exist yet, fall back to
// an in-repo JSON file (keeps previous behavior).
import fs from 'fs/promises'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'data', 'maintenance.json')

async function readFlagFromFile() {
  try {
    const raw = await fs.readFile(FILE_PATH, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return { enabled: false, message: '' }
  }
}

async function writeFlagToFile(data: { enabled: boolean; message?: string }) {
  try {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true })
    await fs.writeFile(FILE_PATH, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }, null, 2), 'utf8')
    return true
  } catch (e) {
    return false
  }
}

export async function GET(_: NextRequest) {
  try {
    const r = await sql`SELECT bool_value, message, created_by, created_at, updated_by, updated_at FROM site_settings WHERE key = 'maintenance'`
    if (r && r.rows && r.rows.length) {
      const row = r.rows[0]
      // Postgres boolean may be returned as true/false or 't'/'f' strings depending on driver.
      const enabled = row.bool_value === true || row.bool_value === 't' || row.bool_value === 'true'
      return NextResponse.json({ enabled, message: row.message || '', created_by: row.created_by, created_at: row.created_at, updated_by: row.updated_by, updated_at: row.updated_at })
    }
  } catch (e) {
    // ignore and fallback to file
  }

  const flag = await readFlagFromFile()
  return NextResponse.json(flag)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (typeof body.enabled !== 'boolean') return NextResponse.json({ error: 'enabled must be boolean' }, { status: 422 })

    // Resolve actor from Authorization header so we can record who made the change.
    // Prefer server-resolved actor; if resolution fails, keep any client-provided value.
    try {
      const auth = req.headers.get('authorization') || ''
      const resolved = await resolveSessionAndActorFromAuthHeader(auth).catch(() => null)
      if (resolved) {
        body.updated_by = resolved.actor
        if (!body.created_by) body.created_by = resolved.actor
      }
    } catch (resolveErr) {
      // ignore resolution errors and continue
    }

    // Try DB upsert first
    try {
      await sql`
        INSERT INTO site_settings (key, bool_value, message, updated_by, updated_at, created_by, created_at)
        VALUES ('maintenance', ${body.enabled}, ${body.message || ''}, ${body.updated_by || null}, now(), ${body.created_by || null}, now())
        ON CONFLICT (key) DO UPDATE
        SET bool_value = EXCLUDED.bool_value,
            message = EXCLUDED.message,
            updated_by = COALESCE(EXCLUDED.updated_by, site_settings.updated_by),
            updated_at = now();
      `
      return NextResponse.json({ success: true })
    } catch (dbErr) {
      // If DB fails (table missing or no DB), fall back to file
      const ok = await writeFlagToFile({ enabled: body.enabled, message: body.message || '' })
      if (!ok) return NextResponse.json({ error: 'failed to write flag' }, { status: 500 })
      return NextResponse.json({ success: true, fallback: true })
    }
  } catch (err) {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
}
