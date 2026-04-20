import { NextResponse } from "next/server";
import { deleteObject } from "@/lib/r2";
import { resolveSessionAndActorFromAuthHeader } from "@/lib/sessions";

export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization') || '';
    const resolved = await resolveSessionAndActorFromAuthHeader(auth).catch(() => null);
    if (!resolved) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { key, bucket } = body || {};
    if (!key) return NextResponse.json({ error: "missing key" }, { status: 400 });
    // Safety: restrict deletions to home video uploads only
    if (typeof key !== 'string' || !key.startsWith('home/video/')) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    await deleteObject(key, typeof bucket === 'string' && bucket ? bucket : undefined);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/r2/delete error", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
