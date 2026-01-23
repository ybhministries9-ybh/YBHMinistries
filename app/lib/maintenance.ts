import { sql } from '@vercel/postgres';
import fs from 'fs/promises';

async function readFlagFromFile() {
  try {
    const raw = await fs.readFile(process.cwd() + '/data/maintenance.json', 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { enabled: false };
  }
}

export async function isMaintenanceEnabled(): Promise<boolean> {
  try {
    const r = await sql`SELECT bool_value FROM site_settings WHERE key = 'maintenance' LIMIT 1`;
    if (r && r.rows && r.rows.length) {
      const v = r.rows[0].bool_value;
      return v === true || v === 't' || v === 'true' || v === 1 || v === '1';
    }
  } catch (e) {
    // ignore and fall back to file
  }
  const file = await readFlagFromFile();
  const fv = file && file.enabled;
  return fv === true || fv === 't' || fv === 'true' || fv === 1 || fv === '1';
}

export default isMaintenanceEnabled;
