import { NextResponse } from "next/server";
import { getPresignedPutUrl } from "@/lib/r2";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, contentType, expiresIn } = body || {};
    if (!key) return NextResponse.json({ error: "missing key" }, { status: 400 });
    // Allow client to suggest a category so server can decide which bucket to sign for
    const category = body?.category as string | undefined;
    // Determine bucket: logos/categories containing 'logo' are public; others use private bucket
    const isLogo = category && typeof category === 'string' && category.toLowerCase().includes('logo');
    const bucket = isLogo ? process.env.NEXT_PUBLIC_R2_PUBLIC_BUCKET || process.env.CF_R2_BUCKET : process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET || process.env.CF_R2_BUCKET;
    const url = await getPresignedPutUrl(key, contentType || "application/octet-stream", typeof expiresIn === 'number' ? expiresIn : 3600, bucket);
    // Return the presigned PUT URL along with bucket/key so the client can record an r2:// reference
    const usedBucket = bucket || process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET || process.env.CF_R2_BUCKET;
    return NextResponse.json({ url, bucket: usedBucket, key });
  } catch (err: any) {
    console.error("/api/r2/presign-put error", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
