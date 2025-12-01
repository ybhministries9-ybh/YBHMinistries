type RateEntry = { count: number; windowStart: number };

// Simple in-memory rate limiter. Not suitable for multi-instance production,
// but provides immediate protection for development and single-instance hosts.
const RATE_LIMIT_STORE: Map<string, RateEntry> = (globalThis as any).__RATE_LIMIT_STORE ||= new Map();

export function sanitizeInput(input: any, maxLength = 2000) {
  if (input === undefined || input === null) return null;
  let s = String(input);
  // Basic HTML tag stripping (remove <...>), collapse whitespace and trim.
  // This is intentionally simple and avoids introducing a new dependency.
  s = s.replace(/<[^>]*>/g, '');
  s = s.replace(/\s+/g, ' ').trim();
  if (maxLength && s.length > maxLength) s = s.substring(0, maxLength);
  return s;
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
      console.warn('Upstash rateLimit error, falling back to in-memory', e);
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
