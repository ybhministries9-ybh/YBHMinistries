import { sql } from '@vercel/postgres';
import fs from 'fs/promises';
import { parseKeyFromUrl, getPresignedGetUrl, PRIVATE_BUCKET } from '@/lib/r2';

const FILE_PATH = process.cwd() + '/data/flash-news.json';

export type FlashNewsSetting = {
  enabled: boolean;
  videoUrl: string | null;
  updatedAt?: string | null;
};

async function readFromFile(): Promise<FlashNewsSetting> {
  try {
    const raw = await fs.readFile(FILE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      enabled: parsed?.enabled === true || parsed?.enabled === 't' || parsed?.enabled === 'true' || parsed?.enabled === 1 || parsed?.enabled === '1',
      videoUrl: typeof parsed?.videoUrl === 'string' ? parsed.videoUrl : null,
      updatedAt: typeof parsed?.updatedAt === 'string' ? parsed.updatedAt : null,
    };
  } catch (e) {
    return { enabled: false, videoUrl: null, updatedAt: null };
  }
}

function toBool(v: unknown): boolean {
  return v === true || v === 't' || v === 'true' || v === 1 || v === '1';
}

async function resolveVideoUrl(rawUrl: string | null): Promise<string | null> {
  if (!rawUrl) return null;
  const url = String(rawUrl).trim();
  if (!url) return null;

  const parsed = parseKeyFromUrl(url);
  if (parsed?.key) {
    try {
      const bucket = parsed.bucket || PRIVATE_BUCKET;
      return await getPresignedGetUrl(parsed.key, 3600, bucket || undefined);
    } catch (e) {
      // Fall back to the original value if presigning fails.
      return url;
    }
  }

  return url;
}

export async function getFlashNewsSetting(): Promise<FlashNewsSetting> {
  try {
    const r = await sql`SELECT bool_value, message, updated_at FROM site_settings WHERE key = 'flash_news' LIMIT 1`;
    if (r?.rows?.length) {
      const row = r.rows[0] as {
        bool_value: unknown;
        message: unknown;
        updated_at: unknown;
      };
      const enabled = toBool(row.bool_value);
      const videoUrl = await resolveVideoUrl(typeof row.message === 'string' ? row.message : null);
      return { enabled, videoUrl, updatedAt: row.updated_at != null ? String(row.updated_at) : null };
    }
  } catch (e) {
    // ignore and fall back to file
  }

  const file = await readFromFile();
  return { ...file, videoUrl: await resolveVideoUrl(file.videoUrl) };
}
