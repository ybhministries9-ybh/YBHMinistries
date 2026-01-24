// Simple test script to create a user and trigger the invite endpoint.
// Usage: node scripts/test-invite.js

const BASE = process.env.BASE_URL || 'http://localhost:3000';
// dev logging removed for scripts
// devWarn removed
const waitMs = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(retries = 40, interval = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${BASE}/api/admin/users`);
      if (res.ok) return true;
    } catch (e) {
      // ignore
    }
    await waitMs(interval);
  }
  return false;
}

async function main() {
  // dev logging removed
  const ready = await waitForServer();
  if (!ready) {
    console.error('Server did not become ready');
    process.exit(2);
  }

  const user = {
    name: 'Invite Test User',
    email: `invite.test+${Date.now()}@example.com`,
    role: 'Viewer',
  };

  // dev logging removed
  const createRes = await fetch(`${BASE}/api/admin/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const createBody = await createRes.text();
  let created;
  try { created = JSON.parse(createBody); } catch (e) { console.error('Invalid JSON from create:', createBody); process.exit(3); }

  if (!createRes.ok || !created?.data?.id) {
    console.error('Create failed:', createRes.status, created);
    process.exit(4);
  }

  const id = created.data.id;
  // dev logging removed

  const inviteRes = await fetch(`${BASE}/api/admin/users/invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  const inviteBody = await inviteRes.text();
  let inviteJson;
  try { inviteJson = JSON.parse(inviteBody); } catch (e) { console.error('Invalid JSON from invite:', inviteBody); process.exit(5); }

  // dev logging removed

  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(10); });
