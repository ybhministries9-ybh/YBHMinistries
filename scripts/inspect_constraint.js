import fs from 'fs';
import path from 'path';

// Load .env.local manually (simple parser)
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    process.env[key] = val;
  }
}

import { sql } from '@vercel/postgres';

async function inspect() {
  try {
    const { rows } = await sql`
      SELECT conname, pg_get_constraintdef(c.oid) as def
      FROM pg_catalog.pg_constraint c
      WHERE conname = 'chk_get_in_touch_email_format'
    `;
    console.log('rows', rows);
  } catch (err) {
    console.error('inspect error', err);
  }
}

inspect().finally(() => process.exit());
