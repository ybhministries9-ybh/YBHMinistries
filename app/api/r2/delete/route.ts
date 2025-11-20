import { NextResponse } from "next/server";
import { deleteObject } from "@/lib/r2";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key } = body || {};
    if (!key) return NextResponse.json({ error: "missing key" }, { status: 400 });
    await deleteObject(key);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/r2/delete error", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
