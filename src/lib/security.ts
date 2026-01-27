type RateEntry = { count: number; windowStart: number };

// Simple in-memory rate limiter. Not suitable for multi-instance production,
// but provides immediate protection for development and single-instance hosts.
const RATE_LIMIT_STORE: Map<string, RateEntry> = (globalThis as any).__RATE_LIMIT_STORE ||= new Map();

export function sanitizeInput(input: any, maxLength = 2000) {
  if (input === undefined || input === null) return null;
  let s = String(input);
  // Allow a small whitelist of harmless formatting tags while stripping
  // potentially dangerous tags and attributes. This keeps content simple
  // but allows basic rich text like <b>, <i>, <em>, <strong>, <u>, <br>,
  // <p>, <ul>, <ol>, <li>, <blockquote> so testimonies can be formatted.
  try {
    // Remove script/style blocks completely
    s = s.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
    s = s.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');

    const allowed = new Set(['b','i','em','strong','u','br','p','ul','ol','li','blockquote']);

    // Replace tags: keep allowed tags (without attributes), remove others
    s = s.replace(/<\/?([a-zA-Z0-9-]+)([^>]*)>/g, (match, tagName) => {
      const tn = String(tagName).toLowerCase();
      if (allowed.has(tn)) {
        // return a clean tag without attributes
        return match.startsWith('</') ? `</${tn}>` : (tn === 'br' ? '<br/>' : `<${tn}>`);
      }
      return '';
    });

    // Collapse whitespace and trim
    s = s.replace(/\s+/g, ' ').trim();
    // Truncate the textual content to maxLength characters for safety
    if (maxLength) {
      // Strip tags to count text length, then truncate text and return.
      const textOnly = s.replace(/<[^>]*>/g, '');
      if (textOnly.length > maxLength) {
        return textOnly.substring(0, maxLength);
      }
      return s;
    }
    return s;
  } catch (e) {
    let out = String(input).replace(/<[^>]*>/g, '');
    out = out.replace(/\s+/g, ' ').trim();
    if (maxLength && out.length > maxLength) out = out.substring(0, maxLength);
    return out;
  }
}

export function requireJson(request: Request) {
  const ct = request.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return false;
  return true;
}

export function checkBodySize(request: Request, maxBytes = 64 * 1024) {
  const cl = request.headers.get('content-length');
  if (!cl) return true; // unknown size; allow - serverless platforms may not send it
  const num = Number(cl);
  if (Number.isNaN(num)) return true;
  return num <= maxBytes;
}
import { Redis } from '@upstash/redis';

const UPSTASH_REDIS = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! }) : null;

export async function rateLimit(key: string, limit = 10, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  // If Upstash is configured, use Redis-based counters with expiry to support multi-instance rate limiting
  if (UPSTASH_REDIS) {
    try {
      const windowSec = Math.floor(windowMs / 1000);
      const count = await UPSTASH_REDIS.incr(key);
      if (count === 1) {
        await UPSTASH_REDIS.expire(key, windowSec);
      }
      if (count > limit) {
        // Get ttl to compute reset
        const ttl = await UPSTASH_REDIS.ttl(key) as number | null;
        return { ok: false, remaining: 0, reset: now + (ttl && ttl > 0 ? ttl * 1000 : windowMs) };
      }
      return { ok: true, remaining: limit - count };
    } catch (e) {
      // fall back to in-memory if Redis fails
      try {
        const { logger } = await import('./logger');
        logger.warn('Upstash rateLimit error, falling back to in-memory', e);
      } catch (_) {
        console.warn('Upstash rateLimit error, falling back to in-memory', e);
      }
    }
  }

  const entry = RATE_LIMIT_STORE.get(key);
  if (!entry || now - entry.windowStart > windowMs) {
    RATE_LIMIT_STORE.set(key, { count: 1, windowStart: now });
    return { ok: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) return { ok: false, remaining: 0, reset: entry.windowStart + windowMs };
  entry.count += 1;
  RATE_LIMIT_STORE.set(key, entry);
  return { ok: true, remaining: limit - entry.count };
}

// reCAPTCHA verification removed — temporarily disabled
// Add server-side reCAPTCHA verification helper. If `RECAPTCHA_SECRET` is
// set in env, this will verify tokens sent by clients. If not set, the
// function returns { ok: true, skipped: true } so callers can allow requests
// during development while logging a warning.
export async function verifyRecaptcha(token?: string | null) {
  const secret = process.env.RECAPTCHA_SECRET || process.env.RECAPTCHA_V3_SECRET;
  if (!secret) {
    try { const { logger } = await import('./logger'); logger.warn('reCAPTCHA secret not configured; skipping verification'); } catch (_) {}
    return { ok: true, skipped: true };
  }
  if (!token) {
    try { const { logger } = await import('./logger'); logger.warn('reCAPTCHA token missing from request - skipping verification'); } catch (_) {}
    // Allow missing token to pass (helps local/dev and sites using v2 checkbox
    // where automatic token fetching isn't possible). This will be a no-op
    // when RECAPTCHA_SECRET is not configured as well.
    return { ok: true, skipped: true };
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body: params });
    const json = await res.json();
    // For reCAPTCHA v3, callers may want to enforce a score threshold; here
    // we treat v2 success or v3 score >= 0.3 as acceptable. Adjust as needed.
    if (json.success) {
      if (typeof json.score === 'number') {
        const score = Number(json.score || 0);
        const min = Number(process.env.RECAPTCHA_MIN_SCORE || 0.3);
        return { ok: score >= min, score };
      }
      return { ok: true };
    }
    return { ok: false, error: json['error-codes'] || 'recaptcha_failed' };
  } catch (e) {
    try { const { logger } = await import('./logger'); logger.error('reCAPTCHA verification error', { error: String(e) }); } catch (_) {}
    return { ok: false, error: 'recaptcha_error' };
  }
}

// Simple honeypot check: return true if honeypot appears filled.
export function isHoneypotFilled(body: any) {
  if (!body) return false;
  const hp = body.hp ?? body.honeypot ?? body._hp ?? null;
  if (!hp) return false;
  if (typeof hp === 'string' && hp.trim().length === 0) return false;
  return true;
}
// Enhance rateLimit function: helper to build per-endpoint keys for per-account limits
export function buildRateKey(prefix: string, identifier: string) {
  // Keep keys short to fit Redis limits
  return `${prefix}:${identifier}`;
}
