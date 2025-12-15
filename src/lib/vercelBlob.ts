export async function put(...args: any[]) {
  const name = '@vercel/blob';
  const mod = await import(/* webpackIgnore: true */ name as any).catch(() => null);
  if (!mod || typeof mod.put !== 'function') throw new Error('@vercel/blob is not installed');
  return (mod as any).put(...args);
}

export async function del(...args: any[]) {
  const name = '@vercel/blob';
  const mod = await import(/* webpackIgnore: true */ name as any).catch(() => null);
  if (!mod || typeof mod.del !== 'function') throw new Error('@vercel/blob is not installed');
  return (mod as any).del(...args);
}

export async function list(...args: any[]) {
  const name = '@vercel/blob';
  const mod = await import(/* webpackIgnore: true */ name as any).catch(() => null);
  if (!mod || typeof mod.list !== 'function') throw new Error('@vercel/blob is not installed');
  return (mod as any).list(...args);
}

export default { put, del, list };
