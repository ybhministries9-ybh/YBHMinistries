export async function loadRecaptcha(siteKey: string) {
  if (!siteKey) return false;
  if (typeof window === 'undefined') return false;
  const w: any = window as any;
  if (w.__recaptcha_loaded_for === siteKey && w.grecaptcha) return true;
  return new Promise((resolve) => {
    if (w.grecaptcha) {
      w.__recaptcha_loaded_for = siteKey;
      resolve(true);
      return;
    }
    const s = document.createElement('script');
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      w.__recaptcha_loaded_for = siteKey;
      resolve(true);
    };
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
}

export async function getRecaptchaToken(action = 'submit') {
  const siteKey = (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string) || (window as any).__RECAPTCHA_SITE_KEY || '';
  if (!siteKey) return null;
  const ok = await loadRecaptcha(siteKey);
  if (!ok) return null;
  const w: any = window as any;
  if (!w.grecaptcha || !w.grecaptcha.execute) return null;
  try {
    const token = await w.grecaptcha.execute(siteKey, { action });
    return token;
  } catch (e) {
    return null;
  }
}
