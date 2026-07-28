import { NextResponse } from "next/server";
import { getPresignedGetUrl, isValidObjectKey, isAllowedBucket } from "@/lib/r2";
import { rateLimit, buildRateKey } from "@/lib/security";

// Public endpoint (site pages resolve r2:// media references through it),
// but hardened: bucket must be one of our configured buckets, keys are
// validated, expiry is capped, and requests are rate limited per IP.
export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip') || 'unknown';
    const rl = await rateLimit(buildRateKey('r2-presign-get', ip), 300, 60 * 60 * 1000);
    if (!rl.ok) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const body = await req.json().catch(() => null);
    const { key, expiresIn, bucket: requestedBucket } = body || {};
    if (!isValidObjectKey(key)) return NextResponse.json({ error: "invalid key" }, { status: 400 });

    const category = body?.category as string | undefined;
    const isLogo = category && typeof category === 'string' && category.toLowerCase().includes('logo');
    // Only accept an explicitly-requested bucket if it is one of ours.
    const bucket = (typeof requestedBucket === 'string' && isAllowedBucket(requestedBucket))
      ? requestedBucket
      : (isLogo ? process.env.NEXT_PUBLIC_R2_PUBLIC_BUCKET || process.env.CF_R2_BUCKET : process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET || process.env.CF_R2_BUCKET);

    // Cap presigned URL lifetime between 1 minute and 1 hour.
    const exp = typeof expiresIn === 'number' ? Math.min(Math.max(expiresIn, 60), 3600) : 3600;
    const url = await getPresignedGetUrl(key, exp, bucket);
    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("/api/r2/presign-get error", err);
    return NextResponse.json({ error: 'Failed to generate URL' }, { status: 500 });
  }
}
