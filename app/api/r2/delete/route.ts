import { NextResponse } from "next/server";
import { deleteObject, isValidObjectKey, isAllowedBucket } from "@/lib/r2";
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from "@/lib/sessions";

export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization') || '';
    const resolved = await resolveSessionAndActorFromAuthHeader(auth).catch(() => null);
    if (!resolved) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // Viewers are read-only — no deletions.
    const denied = readOnlyResponse(resolved);
    if (denied) return denied;

    const body = await req.json().catch(() => null);
    const { key, bucket } = body || {};
    if (!isValidObjectKey(key)) return NextResponse.json({ error: "invalid key" }, { status: 400 });
    // Safety: restrict deletions to home video uploads only
    if (!key.startsWith('home/video/')) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    // Only delete from buckets this deployment owns.
    const usedBucket = typeof bucket === 'string' && bucket
      ? (isAllowedBucket(bucket) ? bucket : null)
      : undefined;
    if (usedBucket === null) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    await deleteObject(key, usedBucket);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/r2/delete error", err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
