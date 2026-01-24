import fs from 'fs';

const payload = JSON.parse(fs.readFileSync('payload.json', 'utf8'));
const devLog = (...args) => { if (process.env.NODE_ENV !== 'production') console.debug(...args); };

async function post() {
  const res = await fetch('http://localhost:3001/api/get-in-touch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  devLog('status', res.status);
  const data = await res.json();
  devLog('body', data);
}

post().catch(err => { console.error(err); process.exit(1); });
