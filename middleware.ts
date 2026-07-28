import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE: this file MUST live at the project root (next to app/), not inside
// app/ — Next.js ignores app/middleware.ts entirely.

// Cache the maintenance flag briefly so we don't hit the API on every request.
let maintenanceCache: { enabled: boolean; fetchedAt: number } | null = null;
const MAINTENANCE_TTL_MS = 30_000;

const MAINTENANCE_PATHS = [
  '/',
  '/about',
  '/accessibility',
  '/awards',
  '/contact',
  '/donate',
  '/gallery',
  '/news',
  '/resources',
  '/stories',
  '/privacy-policy',
  '/terms-of-service',
  '/maintenance',
  '/directors',
];

function applySecurityHeaders(req: NextRequest, res: NextResponse) {
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  if (req.nextUrl.protocol === 'https:') {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

  // CSP: allow unsafe-eval only in development (needed by React fast refresh).
  const isDev = process.env.NODE_ENV !== 'production';
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com"
    : "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com";
  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*",
    "media-src 'self' blob: https://*",
    "connect-src 'self' https://www.google.com https://www.gstatic.com https://*.upstash.io https://*.r2.cloudflarestorage.com https://*.r2.dev",
    "frame-src 'self' https://www.google.com https://www.gstatic.com https://www.youtube.com https://www.youtube-nocookie.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
  res.headers.set('Content-Security-Policy', csp);
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  applySecurityHeaders(req, res);

  // Reject overly large request bodies based on Content-Length header.
  const contentLength = Number(req.headers.get('content-length') || '0');
  const DEFAULT_MAX = 1_000_000; // 1 MB
  const PATH_LIMITS: { [prefix: string]: number } = {
    '/api/admin/upload': 10_000_000,
    '/api/admin/home/hero-images': 10_000_000,
    '/api/admin/home/video': 120_000_000,
    '/api/admin/about/hero-image': 10_000_000,
    '/api/admin/gallery': 20_000_000,
    '/api/admin/blob': 2_000_000,
    '/api/admin/donations/upload-qr-image': 5_000_000,
    '/api/admin/hms-students': 200_000,
    '/api/r2/upload': 5_000_000,
    '/api/upload': 10_000_000,
    '/api/stories/upload': 5_000_000,
  };
  let MAX_CONTENT_LENGTH = DEFAULT_MAX;
  for (const p of Object.keys(PATH_LIMITS)) if (req.nextUrl.pathname.startsWith(p)) { MAX_CONTENT_LENGTH = PATH_LIMITS[p]; break; }

  if (contentLength && contentLength > MAX_CONTENT_LENGTH) {
    return new NextResponse('Request body too large', { status: 413 });
  }

  const method = req.method?.toUpperCase() || 'GET';
  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && req.nextUrl.pathname.startsWith('/api/')) {
    const ct = (req.headers.get('content-type') || '').toLowerCase();
    const uploadPaths = [
      '/api/admin/upload',
      '/api/admin/home/hero-images',
      '/api/admin/home/video',
      '/api/admin/about/hero-image',
      '/api/admin/gallery',
      '/api/admin/blob',
      '/api/admin/donations/upload-qr-image',
      '/api/r2/upload',
      '/api/upload',
      '/api/stories/upload',
    ];
    const isUpload = uploadPaths.some(p => req.nextUrl.pathname.startsWith(p));
    if (isUpload) {
      if (!(ct.includes('multipart/form-data') || ct.includes('application/octet-stream') || ct.includes('application/json'))) {
        return new NextResponse('Unsupported content type for upload', { status: 415 });
      }
    } else {
      // For non-upload API POSTs require JSON
      if (!ct.includes('application/json')) {
        return new NextResponse('Content-Type must be application/json', { status: 415 });
      }
    }
  }

  // Maintenance mode: only check for public site pages, and cache the flag
  // so we don't call the API on every request.
  try {
    const pathname = req.nextUrl.pathname;
    const isAdminPath = /^\/admin(\/|$)/.test(pathname);
    const isAdminApi = /^\/api\/admin(\/|$)/.test(pathname);
    const isApi = pathname.startsWith('/api/');
    const isStaticOrInternal = pathname.startsWith('/_next')
      || pathname === '/favicon.ico'
      || pathname === '/robots.txt'
      || pathname === '/sitemap.xml'
      || pathname.startsWith('/manifest')
      || pathname.startsWith('/apple-icon')
      || pathname.startsWith('/assets')
      || pathname.startsWith('/public')
      || pathname.startsWith('/maintenance');

    if (isAdminPath || isAdminApi || isApi || isStaticOrInternal) return res;

    const matchesMaintenance = MAINTENANCE_PATHS.some(p => p === '/' ? pathname === '/' : pathname === p || pathname.startsWith(p + '/'));
    if (!matchesMaintenance) return res;

    let enabled = false;
    const now = Date.now();
    if (maintenanceCache && now - maintenanceCache.fetchedAt < MAINTENANCE_TTL_MS) {
      enabled = maintenanceCache.enabled;
    } else {
      const origin = req.nextUrl.origin;
      const flagRes = await fetch(`${origin}/api/admin/maintenance`, { cache: 'no-store' });
      if (flagRes.ok) {
        const json = await flagRes.json();
        const enabledVal = json && json.enabled;
        enabled = enabledVal === true || enabledVal === 't' || enabledVal === 'true' || enabledVal === 1 || enabledVal === '1';
        maintenanceCache = { enabled, fetchedAt: now };
      }
    }

    if (enabled) {
      const rewrite = NextResponse.rewrite(new URL('/maintenance', req.url));
      applySecurityHeaders(req, rewrite);
      return rewrite;
    }
  } catch {
    // On errors, fall back to normal behavior.
  }

  return res;
}

export const config = {
  // Run for everything except Next internals and static files. Admin pages and
  // admin APIs are included so they also get header/body-size protections.
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
