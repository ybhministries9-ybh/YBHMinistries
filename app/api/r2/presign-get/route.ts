import { NextResponse } from "next/server";
import { getPresignedGetUrl } from "@/lib/r2";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, expiresIn, bucket: requestedBucket } = body || {};
    if (!key) return NextResponse.json({ error: "missing key" }, { status: 400 });
    const category = body?.category as string | undefined;
    const isLogo = category && typeof category === 'string' && category.toLowerCase().includes('logo');
    // If caller provided a bucket explicitly, prefer it. Otherwise infer from category or env.
    const bucket = requestedBucket
      || (isLogo ? process.env.NEXT_PUBLIC_R2_PUBLIC_BUCKET || process.env.CF_R2_BUCKET : process.env.R2_PRIVATE_BUCKET || process.env.R2_BUCKET || process.env.CF_R2_BUCKET);
    const url = await getPresignedGetUrl(key, typeof expiresIn === 'number' ? expiresIn : 3600, bucket);
    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("/api/r2/presign-get error", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
