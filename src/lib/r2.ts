import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID || process.env.CF_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || process.env.R2_KEY_ID || process.env.CF_R2_KEY_ID || process.env.CF_R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || process.env.R2_SECRET || process.env.CF_R2_SECRET || process.env.CF_R2_SECRET_ACCESS_KEY;
// Default bucket (legacy). Prefer explicit buckets for public vs private flows.
const BUCKET = process.env.R2_BUCKET || process.env.R2_BUCKET_NAME || process.env.CF_R2_BUCKET || process.env.CF_R2_BUCKET_NAME;
// Public-facing dev URL (client-visible) and optional public bucket name
const NEXT_PUBLIC_R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.NEXT_PUBLIC_R2_PUBLIC_ENDPOINT;
const NEXT_PUBLIC_R2_PUBLIC_BUCKET = process.env.NEXT_PUBLIC_R2_PUBLIC_BUCKET || process.env.NEXT_PUBLIC_R2_PUBLIC_BUCKET_NAME;
// Private bucket env (server-only)
const PRIVATE_BUCKET = process.env.R2_PRIVATE_BUCKET || process.env.R2_PRIVATE_BUCKET_NAME || process.env.R2_BUCKET;

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET) {
  // Fail fast in dev so it's obvious when env is missing.
  // In production you may prefer to throw at call time instead.
  console.warn("R2 configuration incomplete: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, or R2_BUCKET missing");
}

const ENDPOINT = ACCOUNT_ID ? `https://${ACCOUNT_ID}.r2.cloudflarestorage.com` : null;

// Build S3 client options conditionally so tests/branch builds without R2 creds
// don't produce invalid endpoints. Operations will fail later if creds are missing,
// but we avoid producing malformed public URLs like "undefined.r2.cloudflarestorage.com".
const s3Options: any = {
  region: 'auto',
  credentials: {
    accessKeyId: ACCESS_KEY_ID || '',
    secretAccessKey: SECRET_ACCESS_KEY || '',
  },
};
if (ENDPOINT) s3Options.endpoint = ENDPOINT;

const s3 = new S3Client(s3Options);

function encodeKey(key: string) {
  // encode each path segment but preserve slashes
  return key
    .split('/')
    .map((s) => encodeURIComponent(s))
    .join('/');
}

/**
 * Compute a public URL for an object.
 * Priority: if `NEXT_PUBLIC_R2_PUBLIC_URL` is set, use it (optionally with `NEXT_PUBLIC_R2_PUBLIC_BUCKET`).
 * Otherwise fall back to account-based endpoint and provided/default bucket.
 */
export function getPublicUrl(key: string, bucket?: string) {
  const safeKey = encodeKey(key);
  // If a public URL base is provided via NEXT_PUBLIC, prefer that (client-safe)
  if (NEXT_PUBLIC_R2_PUBLIC_URL) {
    const base = NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/$/, '');
    const publicBucket = bucket || NEXT_PUBLIC_R2_PUBLIC_BUCKET || BUCKET || PRIVATE_BUCKET;
    // If the provided public URL already includes a bucket path, avoid duplicating
    if (base.endsWith(publicBucket)) {
      return `${base}/${safeKey}`;
    }
    return `${base}/${publicBucket}/${safeKey}`;
  }

  const usedBucket = bucket || BUCKET || PRIVATE_BUCKET;
  // If account endpoint is not configured, return an `r2://` reference instead
  if (!ENDPOINT) return `r2://${usedBucket}/${safeKey}`;
  return `${ENDPOINT}/${usedBucket}/${safeKey}`;
}

export async function uploadBuffer(key: string, buffer: Buffer, contentType = "application/octet-stream", bucket?: string, cacheControl?: string) {
  const usedBucket = bucket || BUCKET || PRIVATE_BUCKET;
  const cmd = new PutObjectCommand({
    Bucket: usedBucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    CacheControl: cacheControl,
  });
  try {
    await s3.send(cmd);
    return getPublicUrl(key, usedBucket);
  } catch (err: any) {
    // Only attempt presigned fallback for access denied errors — otherwise rethrow
    const isAccessDenied =
      err && (err.name === 'AccessDenied' || err.Code === 'AccessDenied' || err.$metadata?.httpStatusCode === 403 || String(err.message || '').includes('AccessDenied') || String(err.message || '').includes('access denied'));

    if (!isAccessDenied) throw err;

    try {
      const presigned = await getPresignedPutUrl(key, contentType, 3600, usedBucket);
      // Ensure we pass a plain ArrayBuffer to fetch (avoid Node Buffer typing issues)
      const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      const resp = await fetch(presigned, { method: 'PUT', headers: { 'Content-Type': contentType }, body: arrayBuffer as any });
      if (!resp.ok) {
        const txt = await resp.text().catch(() => `status ${resp.status}`);
        throw new Error('Presigned PUT failed: ' + txt);
      }
      return getPublicUrl(key, usedBucket);
    } catch (presignErr) {
      console.error('Presigned PUT fallback failed:', presignErr && (presignErr as any).message ? (presignErr as any).message : presignErr);
      // throw original error to keep root cause in logs
      throw err;
    }
  }
}

export async function getPresignedPutUrl(key: string, contentType = "application/octet-stream", expiresIn = 3600, bucket?: string) {
  const usedBucket = bucket || BUCKET || PRIVATE_BUCKET;
  const cmd = new PutObjectCommand({ Bucket: usedBucket, Key: key, ContentType: contentType });
  const url = await getSignedUrl(s3, cmd, { expiresIn });
  return url;
}

export async function getPresignedGetUrl(key: string, expiresIn = 3600, bucket?: string) {
  const usedBucket = bucket || BUCKET || PRIVATE_BUCKET;
  const cmd = new GetObjectCommand({ Bucket: usedBucket, Key: key });
  const url = await getSignedUrl(s3, cmd, { expiresIn });
  return url;
}

export async function headObject(key: string, bucket?: string) {
  try {
    const usedBucket = bucket || BUCKET || PRIVATE_BUCKET;
    const cmd = new HeadObjectCommand({ Bucket: usedBucket, Key: key });
    const res = await s3.send(cmd);
    return res; // contains ContentLength, ContentType, ETag, etc.
  } catch (err: any) {
    // If not found, AWS SDK throws; return null to indicate absence
    if (err && (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404)) return null;
    throw err;
  }
}

export async function deleteObject(key: string, bucket?: string) {
  const usedBucket = bucket || BUCKET || PRIVATE_BUCKET;
  const cmd = new DeleteObjectCommand({ Bucket: usedBucket, Key: key });
  await s3.send(cmd);
  return true;
}

export default s3;

// Exported for server-side handlers that need to write/read from the private bucket
export { PRIVATE_BUCKET };

/**
 * Try to extract the object key from a public URL previously returned by getPublicUrl().
 * Returns the decoded object key (path within the bucket) or null if it cannot be determined.
 */
export function parseKeyFromUrl(url: string): { bucket: string | null; key: string | null } {
  if (!url) return { bucket: null, key: null };
  try {
    // r2://private-bucket/path/to/object
    if (url.startsWith('r2://')) {
      const rest = url.slice('r2://'.length);
      const parts = rest.split('/').filter(Boolean);
      if (parts.length >= 2) {
        const bucket = parts[0];
        const key = parts.slice(1).join('/');
        return { bucket, key };
      }
      return { bucket: null, key: null };
    }

    const u = new URL(url);
    const pathname = decodeURIComponent(u.pathname || '');

    // Case 1: cloudflare account endpoint patterns
    // - Path-style: https://<account>.r2.cloudflarestorage.com/<bucket>/<key>
    // - Virtual-hosted style: https://<bucket>.<account>.r2.cloudflarestorage.com/<key>
    if (u.host.includes('.r2.cloudflarestorage.com') || u.host.endsWith('.r2.dev')) {
      const parts = pathname.split('/').filter(Boolean);
      // Try path-style first
      if (parts.length >= 2) {
        const bucket = parts[0];
        const key = parts.slice(1).join('/');
        return { bucket, key };
      }
      // Fallback: attempt to extract bucket from subdomain
      const hostParts = u.host.split('.');
      if (hostParts.length >= 4) {
        const maybeBucket = hostParts[0];
        const key = pathname.replace(/^\//, '');
        if (key) return { bucket: maybeBucket, key };
      }
      return { bucket: null, key: null };
    }

    // Case 2: custom NEXT_PUBLIC_R2_PUBLIC_URL base e.g. https://cdn.example.com/<maybe-bucket>/<key>
    if (NEXT_PUBLIC_R2_PUBLIC_URL) {
      const base = NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/$/, '');
      try {
        const baseUrl = new URL(base);
        if (u.origin === baseUrl.origin) {
          // Strip base pathname if present
          let rel = pathname;
          const basePath = baseUrl.pathname.replace(/\/$/, '');
          if (basePath && rel.startsWith(basePath)) rel = rel.slice(basePath.length) || '/';
          const parts = rel.split('/').filter(Boolean);
          const publicBucket = NEXT_PUBLIC_R2_PUBLIC_BUCKET || BUCKET;
          if (parts.length >= 2 && parts[0] === publicBucket) return { bucket: publicBucket, key: parts.slice(1).join('/') };
          if (parts.length >= 1) return { bucket: null, key: parts.join('/') };
          return { bucket: null, key: null };
        }
      } catch (e) {
        // ignore
      }
    }

    return { bucket: null, key: null };
  } catch (err) {
    return { bucket: null, key: null };
  }
}
