#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
// Use the global AbortController available in Node 18+

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'app');
const OUTPUT = path.join(ROOT, 'logs');
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

function findRouteFiles(dir) {
  const out = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      out.push(...findRouteFiles(full));
    } else if (/^route\.(t|j)sx?$/.test(it.name)) {
      out.push(full);
    }
  }
  return out;
}

function filePathToUrl(filePath) {
  // filePath like /.../app/api/foo/bar/route.ts
  const rel = path.relative(APP_DIR, path.dirname(filePath)).replace(/\\/g, '/');
  return '/' + rel.replace(/(^\/|\/$)/g, '');
}

function makePayloads() {
  const largeText = 'X'.repeat(1_500_000);
  const largeJson = { big: 'Y'.repeat(1_500_000) };
  let deep = {};
  let cur = deep;
  for (let i = 0; i < 400; i++) { cur.n = {}; cur = cur.n; }
  // RSC-like crafted payload (simplified)
  const rscPayload = JSON.stringify({ $$typeof: 'RSC', body: '<!-- RSC_PAYLOAD -->', data: Array(1000).fill('a') });
  const payloads = [
    { ct: 'application/json', body: JSON.stringify({ test: 'ok' }) },
    { ct: 'application/json', body: JSON.stringify(largeJson) },
    { ct: 'application/json', body: '{ malformed: true,' },
    { ct: 'text/plain', body: largeText },
    { ct: 'application/octet-stream', body: Buffer.alloc(1_200_000, 0x41) },
    { ct: 'application/json', body: JSON.stringify(deep) },
    { ct: 'application/json', body: rscPayload },
    // multipart placeholder (form-data simulated as text) — true multipart requires boundary building
    { ct: 'multipart/form-data; boundary=----WebKitFormBoundaryTest', body: '------WebKitFormBoundaryTest\r\nContent-Disposition: form-data; name="file"; filename="test.txt"\r\nContent-Type: text/plain\r\n\r\ndata\r\n------WebKitFormBoundaryTest--' },
  ];
  return payloads;
}

async function fetchWithTimeout(url, opts = {}, timeout = 15_000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

async function run() {
  if (!fs.existsSync(APP_DIR)) {
    console.error('app directory not found — cannot discover App Router routes');
    process.exit(1);
  }

  const routeFiles = findRouteFiles(APP_DIR);
  if (!routeFiles.length) {
    if (process.env.NODE_ENV !== 'production') console.log('No route.* files discovered in app/ — nothing to test');
    process.exit(0);
  }

  const endpoints = Array.from(new Set(routeFiles.map(f => filePathToUrl(f))));
  if (process.env.NODE_ENV !== 'production') console.log('Discovered endpoints:', endpoints.length);

  const payloads = makePayloads();
  const results = [];
  const base = process.env.TARGET_BASE || 'http://localhost:3000';

  for (const ep of endpoints) {
    const url = base + (ep === '/' ? '/' : '/' + ep.replace(/^\//, ''));
    if (process.env.NODE_ENV !== 'production') console.log('\nTesting', url);
    for (const method of ['GET', 'POST']) {
      for (const p of payloads) {
        const start = Date.now();
        try {
          const headers = { 'Accept': '*/*' };
          if (method !== 'GET') headers['Content-Type'] = p.ct;
          const body = method === 'GET' ? undefined : p.body;
          const res = await fetchWithTimeout(url, { method, headers, body }, 15000);
          const text = await res.text().catch(() => '<no-body>');
          const time = Date.now() - start;
          if (process.env.NODE_ENV !== 'production') console.log(`${method} ${p.ct} -> ${res.status} (${time}ms)`);
          results.push({ url, method, contentType: p.ct, status: res.status, time, bodySample: String(text).slice(0, 200) });
        } catch (e) {
          const time = Date.now() - start;
          if (process.env.NODE_ENV !== 'production') console.warn(`${method} ${p.ct} -> ERROR (${e && e.name}) (${time}ms)`);
          results.push({ url, method, contentType: p.ct, error: String(e && e.message), time });
        }
      }
    }
  }

  const outFile = path.join(OUTPUT, `fuzz-results-${Date.now()}.json`);
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  if (process.env.NODE_ENV !== 'production') console.log('\nFuzz run complete — results written to', outFile);
}

run().catch(e => { console.error('Fatal error running fuzz tests:', e); process.exit(1); });
