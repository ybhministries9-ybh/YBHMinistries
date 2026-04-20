import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sql } from '@vercel/postgres';
import { resolveSessionAndActorFromAuthHeader } from '@/lib/sessions';

import fs from 'fs/promises';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'data', 'flash-news.json');

function toBool(v: unknown): boolean {
  return v === true || v === 't' || v === 'true' || v === 1 || v === '1';
}

async function readFlagFromFile() {
  try {
    const raw = await fs.readFile(FILE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    const enabled = toBool(parsed?.enabled);
    const videoUrl = typeof parsed?.videoUrl === 'string' ? parsed.videoUrl : '';
    return { enabled, videoUrl };
  } catch (e) {
    return { enabled: false, videoUrl: '' };
  }
}

async function writeFlagToFile(data: { enabled: boolean; videoUrl?: string }) {
  try {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
    await fs.writeFile(FILE_PATH, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }, null, 2), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

export async function GET(_: NextRequest) {
  try {
    const r = await sql`SELECT bool_value, message, created_by, created_at, updated_by, updated_at FROM site_settings WHERE key = 'flash_news'`;
    if (r?.rows?.length) {
      const row = r.rows[0] as {
        bool_value: unknown;
        message: unknown;
        created_by: unknown;
        created_at: unknown;
        updated_by: unknown;
        updated_at: unknown;
      };
      const enabled = toBool(row.bool_value);
      return NextResponse.json({
        enabled,
        videoUrl: typeof row.message === 'string' ? row.message : '',
        created_by: row.created_by,
        created_at: row.created_at,
        updated_by: row.updated_by,
        updated_at: row.updated_at,
      });
    }
  } catch (e) {
    // ignore and fallback to file
  }

  return NextResponse.json(await readFlagFromFile());
}

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    if (typeof body !== 'object' || body === null) return NextResponse.json({ error: 'invalid json' }, { status: 400 });
    const enabled = (body as { enabled?: unknown }).enabled;
    const videoUrl = (body as { videoUrl?: unknown }).videoUrl;

    if (typeof enabled !== 'boolean') return NextResponse.json({ error: 'enabled must be boolean' }, { status: 422 });
    if (videoUrl != null && typeof videoUrl !== 'string') return NextResponse.json({ error: 'videoUrl must be string' }, { status: 422 });
    const safeVideoUrl = typeof videoUrl === 'string' ? videoUrl : '';

    let updatedBy: string | null = null;
    let createdBy: string | null = null;
    try {
      const auth = req.headers.get('authorization') || '';
      const resolved = await resolveSessionAndActorFromAuthHeader(auth).catch(() => null);
      if (resolved) {
        updatedBy = resolved.actor;
        createdBy = resolved.actor;
      }
    } catch (e) {
      // ignore resolution errors and continue
    }

    try {
      await sql`
        INSERT INTO site_settings (key, bool_value, message, updated_by, updated_at, created_by, created_at)
        VALUES ('flash_news', ${enabled}, ${safeVideoUrl}, ${updatedBy}, now(), ${createdBy}, now())
        ON CONFLICT (key) DO UPDATE
        SET bool_value = EXCLUDED.bool_value,
            message = EXCLUDED.message,
            updated_by = COALESCE(EXCLUDED.updated_by, site_settings.updated_by),
            updated_at = now();
      `;
      return NextResponse.json({ success: true });
    } catch (dbErr) {
      const ok = await writeFlagToFile({ enabled, videoUrl: safeVideoUrl });
      if (!ok) return NextResponse.json({ error: 'failed to write flag' }, { status: 500 });
      return NextResponse.json({ success: true, fallback: true });
    }
  } catch (e) {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }
}
