import sharp from 'sharp';
import { sql } from '@vercel/postgres';
import { parseKeyFromUrl, getPresignedGetUrl, uploadBuffer } from '@/lib/r2';

export async function processHeroImageById(heroId: number) {
  // fetch hero row
  const { rows } = await sql.query(`SELECT * FROM home_hero_images WHERE id = $1 LIMIT 1`, [heroId]);
  const hero = rows[0];
  if (!hero) throw new Error('hero row not found');

  const parsed = parseKeyFromUrl(hero.image_url || '');
  const bucket = parsed.bucket || process.env.R2_BUCKET || process.env.R2_PRIVATE_BUCKET;
  const key = parsed.key;
  if (!key) throw new Error('could not parse key from image_url');

  // download original via presigned url
  const presigned = await getPresignedGetUrl(key, 300, bucket || undefined);
  const resp = await fetch(presigned);
  if (!resp.ok) {
    const txt = await resp.text().catch(() => 'fetch failed');
    throw new Error('failed to download original: ' + txt);
  }
  const originalBuffer = Buffer.from(await resp.arrayBuffer());

  const baseName = key.split('/').pop() || `img-${Date.now()}`;
  const mediumKey = `home/hero/medium/${Date.now()}-${baseName}.webp`;
  const thumbKey = `home/hero/thumbs/${Date.now()}-${baseName}.webp`;

  const mediumBuffer = await sharp(originalBuffer).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 75 }).toBuffer();
  const thumbBuffer = await sharp(originalBuffer).resize({ width: 400 }).webp({ quality: 60 }).toBuffer();

  await uploadBuffer(mediumKey, mediumBuffer, 'image/webp', bucket || undefined, 'public, max-age=31536000, immutable');
  await uploadBuffer(thumbKey, thumbBuffer, 'image/webp', bucket || undefined, 'public, max-age=31536000, immutable');

  const mediumRef = `r2://${bucket}/${mediumKey}`;
  const thumbRef = `r2://${bucket}/${thumbKey}`;

  await sql.query(`UPDATE home_hero_images SET thumbnail_url = $1, medium_url = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3`, [thumbRef, mediumRef, heroId]);

  // mark any queue rows for this hero as done
  await sql.query(`UPDATE image_processing_queue SET status='done', updated_at = CURRENT_TIMESTAMP WHERE hero_image_id = $1`, [heroId]);

  return { heroId, thumbRef, mediumRef };
}

export default processHeroImageById;
