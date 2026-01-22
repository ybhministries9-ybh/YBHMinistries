import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Basic security headers
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', "geolocation=(), microphone=()", );

  // HSTS for HTTPS
  if (req.nextUrl.protocol === 'https:') {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

  // Immediate mitigations for RSC/Server Action related deserialization issues (CVE-2025-55184, CVE-2025-55183)
  // - Reject overly large request bodies based on Content-Length header
  // - Require POST bodies to be JSON or multipart/form-data for known upload endpoints
  const contentLength = Number(req.headers.get('content-length') || '0');
  // Per-path max limits (bytes). Default to 1MB; uploads get higher limits.
  const DEFAULT_MAX = 1_000_000; // 1 MB
  const PATH_LIMITS: { [prefix: string]: number } = {
    '/api/admin/upload': 5_000_000,
    '/api/admin/upload/': 5_000_000,
    '/api/admin/home/hero-images': 3_000_000,
    '/api/admin/blob': 2_000_000,
    '/api/admin/hms-students': 200_000,
  };
  let MAX_CONTENT_LENGTH = DEFAULT_MAX;
  for (const p of Object.keys(PATH_LIMITS)) if (req.nextUrl.pathname.startsWith(p)) { MAX_CONTENT_LENGTH = PATH_LIMITS[p]; break; }

  if (contentLength && contentLength > MAX_CONTENT_LENGTH) {
    return new NextResponse('Request body too large', { status: 413 });
  }

  const method = req.method?.toUpperCase() || 'GET';
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    const ct = (req.headers.get('content-type') || '').toLowerCase();
    // Define paths that accept multipart/octet streams (uploads)
    const uploadPaths = ['/api/admin/upload', '/api/admin/upload/', '/api/admin/home/hero-images', '/api/admin/blob', '/api/admin/donations/upload-qr-image'];
    const isUpload = uploadPaths.some(p => req.nextUrl.pathname.startsWith(p));
    if (isUpload) {
      if (!(ct.includes('multipart/form-data') || ct.includes('application/octet-stream') || ct.includes('application/json'))) {
        return new NextResponse('Unsupported content type for upload', { status: 415 });
      }
    } else {
      // For non-upload POSTs require JSON
      if (!ct.includes('application/json')) {
        return new NextResponse('Content-Type must be application/json', { status: 415 });
      }
    }
  }

  // Minimal CSP that allows same-origin scripts/styles and essential inline for legacy. Adjust as needed when adding external CDNs.
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*",
    "connect-src 'self' https://www.google.com https://www.gstatic.com https://*.upstash.io",
    "frame-src 'self' https://www.google.com https://www.gstatic.com",
  ].join('; ');
  res.headers.set('Content-Security-Policy', csp);
  // Maintenance mode: fetch the admin-maintained flag and, if enabled,
  // rewrite all non-admin/non-api requests to the maintenance page.
  try {
    const pathname = req.nextUrl.pathname;
    // Exclude admin and API routes, next internals, and static assets
    const excludedPrefixes = ['/api', '/admin', '/_next', '/favicon.ico', '/robots.txt', '/sitemap.xml', '/manifest', '/apple-icon', '/assets', '/public'];
    if (excludedPrefixes.some(p => pathname.startsWith(p))) return res;

    const origin = req.nextUrl.origin;
    const flagRes = await fetch(`${origin}/api/admin/maintenance`, { cache: 'no-store' });
    if (flagRes.ok) {
      const json = await flagRes.json();
      if (json && json.enabled) {
        // rewrite to the maintenance page (keeps requested URL in address bar)
        return NextResponse.rewrite(new URL('/maintenance', req.url));
      }
    }
  } catch (e) {
    // On errors, fall back to normal behavior.
  }

  return res;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
