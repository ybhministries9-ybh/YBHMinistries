// Send a test invite to a specified email using the app's admin invite flow.
// Usage: node scripts/send-test-email.js recipient@example.com

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const waitMs = (ms) => new Promise((r) => setTimeout(r, ms));
const devLog = (...args) => { if (process.env.NODE_ENV !== 'production') console.debug(...args); };
const devWarn = (...args) => { if (process.env.NODE_ENV !== 'production') console.warn(...args); };

async function waitForServer(retries = 40, interval = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${BASE}/api/admin/users`);
      if (res.ok) return true;
    } catch (e) {}
    await waitMs(interval);
  }
  return false;
}

async function main() {
  const target = process.argv[2] || process.env.TARGET_EMAIL;
  if (!target) {
    console.error('Usage: node scripts/send-test-email.js recipient@example.com');
    process.exit(2);
  }

  devLog('Waiting for dev server at', BASE);
  const ready = await waitForServer();
  if (!ready) {
    console.error('Server did not become ready');
    process.exit(3);
  }

  const user = { name: 'Manual Test', email: target, role: 'Viewer' };
  devLog('Creating user:', target);
  const createRes = await fetch(`${BASE}/api/admin/users`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user)
  });
  const createBody = await createRes.text();
  let created;
  try { created = JSON.parse(createBody); } catch (e) { console.error('Invalid JSON from create:', createBody); process.exit(4); }
  if (!createRes.ok || !created?.data?.id) {
    console.error('Create failed:', createRes.status, created);
    process.exit(5);
  }

  const id = created.data.id;
  devLog('User created id', id, '- sending invite');

  const inviteRes = await fetch(`${BASE}/api/admin/users/invite`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id })
  });
  const inviteBody = await inviteRes.text();
  let inviteJson;
  try { inviteJson = JSON.parse(inviteBody); } catch (e) { console.error('Invalid JSON from invite:', inviteBody); process.exit(6); }

  devLog('Invite response:', inviteRes.status, inviteJson);
  if (inviteJson?.providerResponse) devLog('Provider response body:', inviteJson.providerResponse);
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(10); });
