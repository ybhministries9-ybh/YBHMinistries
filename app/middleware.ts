import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
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
  const MAX_CONTENT_LENGTH = 1_000_000; // 1 MB limit — adjust as needed
  if (contentLength > MAX_CONTENT_LENGTH) {
    return new NextResponse('Request body too large', { status: 413 });
  }

  const method = req.method?.toUpperCase() || 'GET';
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    const ct = (req.headers.get('content-type') || '').toLowerCase();
    const allowMultipart = req.nextUrl.pathname.startsWith('/api/uploads') || req.nextUrl.pathname.startsWith('/api/admin/uploads');
    if (!ct.includes('application/json') && !(allowMultipart && ct.includes('multipart/form-data'))) {
      return new NextResponse('Unsupported content type', { status: 415 });
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

  return res;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
