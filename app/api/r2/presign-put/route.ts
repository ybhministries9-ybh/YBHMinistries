import { NextResponse } from "next/server";
import { getPresignedPutUrl, isValidObjectKey } from "@/lib/r2";
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from "@/lib/sessions";

export async function POST(req: Request) {
  try {
    // Admin-only: prevent anonymous clients from generating upload URLs.
    const authHeader = req.headers.get('authorization') || '';
    const sessionInfo = await resolveSessionAndActorFromAuthHeader(authHeader);
    if (!sessionInfo) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // Viewers are read-only — no upload URL generation.
    const denied = readOnlyResponse(sessionInfo);
    if (denied) return denied;

    const body = await req.json().catch(() => null);
    const { key, contentType, expiresIn } = body || {};
    if (!isValidObjectKey(key)) return NextResponse.json({ error: "invalid key" }, { status: 400 });
    if (contentType !== undefined && (typeof contentType !== 'string' || contentType.length > 128)) {
      return NextResponse.json({ error: "invalid contentType" }, { status: 400 });
    }
    // Allow client to suggest a category so server can decide which bucket to sign for
    const category = body?.category as string | undefined;
    // Determine bucket: logos/categories containing 'logo' are public; others use private bucket
    const isLogo = category && typeof category === 'string' && category.toLowerCase().includes('logo');
    const bucket = isLogo ? process.env.NEXT_PUBLIC_R2_PUBLIC_BUCKET || process.env.CF_R2_BUCKET : process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET || process.env.CF_R2_BUCKET;
    // Cap presigned URL lifetime between 1 minute and 1 hour.
    const exp = typeof expiresIn === 'number' ? Math.min(Math.max(expiresIn, 60), 3600) : 3600;
    const url = await getPresignedPutUrl(key, contentType || "application/octet-stream", exp, bucket);
    // Return the presigned PUT URL along with bucket/key so the client can record an r2:// reference
    const usedBucket = bucket || process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET || process.env.CF_R2_BUCKET;
    return NextResponse.json({ url, bucket: usedBucket, key });
  } catch (err: any) {
    console.error("/api/r2/presign-put error", err);
    return NextResponse.json({ error: 'Failed to generate URL' }, { status: 500 });
  }
}
