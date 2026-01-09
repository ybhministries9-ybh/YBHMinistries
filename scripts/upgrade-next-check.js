#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function semverCompare(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}

function main() {
  const root = process.cwd();
  const pkgPath = path.join(root, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.error('package.json not found');
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  let installed = 'none';
  try {
    const installedPkg = require(path.join(root, 'node_modules', 'next', 'package.json'));
    installed = installedPkg.version;
  } catch (e) {
    // not installed in node_modules
  }

  // devLog prints only in non-production environments
  const devLog = (...args) => { if (process.env.NODE_ENV !== 'production') console.log(...args); };

  devLog('Currently installed Next.js:', installed);

  devLog('Querying npm for available Next.js versions...');
  const out = execSync('npm view next versions --json', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  let versions;
  try {
    versions = JSON.parse(out);
  } catch (e) {
    console.error('Failed to parse npm view output');
    process.exit(1);
  }

  // Find latest stable 16.x (exclude canary/prerelease tags)
  const candidates = versions.filter(v => /^16\.\d+\.\d+$/.test(v));
  if (!candidates || candidates.length === 0) {
    devLog('No stable 16.x release found yet.');
    process.exit(0);
  }
  const latest16 = candidates[candidates.length - 1];
  devLog('Latest stable 16.x:', latest16);

  if (installed === latest16) {
    devLog('Already up-to-date with', latest16);
    process.exit(0);
  }

  devLog('Upgrading Next.js to', latest16);
  try {
    execSync(`npm install next@${latest16} --save`, { stdio: 'inherit', shell: true });
    try { execSync('npm audit fix', { stdio: 'inherit', shell: true }); } catch (e) {}

    // Commit changes if any
    try {
      execSync('git add package.json package-lock.json', { stdio: 'inherit', shell: true });
      execSync(`git commit -m "chore(deps): upgrade next to ${latest16} (security patch)" || true`, { stdio: 'inherit', shell: true });
      execSync('git push origin HEAD', { stdio: 'inherit', shell: true });
    } catch (e) {
      console.warn('Git commit/push step failed or nothing to commit');
    }

    devLog('Upgrade attempt complete. Please run your test suite and perform manual validation.');
  } catch (e) {
    console.error('Upgrade failed:', e && e.message ? e.message : e);
    process.exit(1);
  }
}

main();
