#!/usr/bin/env node
// Simple script to process pending hero images by calling the processing API.
// Run this periodically (cron) or manually: node scripts/process_hero_queue.js

const fetch = require('node-fetch');

const BASE = process.env.BASE_URL || 'http://localhost:3000';

async function processOne() {
  const res = await fetch(`${BASE}/api/admin/home/process-hero-image`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
  const j = await res.json();
  // dev logging removed
}

(async function() {
  try {
    const iterations = 10;
    for (let i = 0; i < iterations; i++) {
      await processOne();
    }
  } catch (err) {
    console.error(err);
  }
})();
