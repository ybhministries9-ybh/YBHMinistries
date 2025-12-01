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
