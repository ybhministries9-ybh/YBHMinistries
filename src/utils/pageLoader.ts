export function showPageLoader() {
  try {
    if (typeof document === 'undefined') return;
    if (document.getElementById('global-page-loader')) return;

    const loader = document.createElement('div');
    loader.id = 'global-page-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.right = '0';
    loader.style.bottom = '0';
    loader.style.zIndex = '99999';
    loader.style.display = 'flex';
    loader.style.alignItems = 'center';
    loader.style.justifyContent = 'center';
    loader.style.background = 'rgba(0,0,0,0.45)';
    loader.style.transition = 'opacity 200ms ease';
    loader.style.opacity = '1';

    const spinner = document.createElement('div');
    spinner.style.width = '48px';
    spinner.style.height = '48px';
    spinner.style.borderRadius = '9999px';
    spinner.style.border = '4px solid rgba(255,255,255,0.15)';
    spinner.style.borderTopColor = '#FDB813';
    spinner.style.animation = 'gcp-spin 1s linear infinite';

    const styleTag = document.createElement('style');
    styleTag.innerHTML = `@keyframes gcp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;

    loader.appendChild(styleTag);
    loader.appendChild(spinner);
    document.body.appendChild(loader);

    // Safety fallback: remove loader after 10s if something went wrong
    const fallback = window.setTimeout(() => {
      try { hidePageLoader(); } catch (e) {}
    }, 10000);
    // store timeout id so hidePageLoader can clear it
    (loader as any).__gcpFallback = fallback;
  } catch (e) {
    // ignore
  }
}

export function hidePageLoader() {
  try {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('global-page-loader');
    if (!el) return;
    // clear fallback timer if present
    const to = (el as any).__gcpFallback;
    if (to) {
      try { window.clearTimeout(to); } catch (e) {}
    }

    // fade out then remove
    el.style.opacity = '0';
    setTimeout(() => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, 220);
  } catch (e) {
    // ignore
  }
}

export default { showPageLoader, hidePageLoader };
