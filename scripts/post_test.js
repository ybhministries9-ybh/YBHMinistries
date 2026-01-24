import fs from 'fs';

const payload = JSON.parse(fs.readFileSync('payload.json', 'utf8'));
// dev logging removed for scripts

async function post() {
  const res = await fetch('http://localhost:3001/api/get-in-touch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  // dev logging removed
  const data = await res.json();
  // dev logging removed
}

post().catch(err => { console.error(err); process.exit(1); });
