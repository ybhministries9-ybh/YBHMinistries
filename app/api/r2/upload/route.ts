import { NextResponse } from "next/server";
import { uploadBuffer, getPublicUrl } from "@/lib/r2";

export async function POST(req: Request) {
  try {
    // Use Web FormData API which Next supports in App Router for server runtime
    const form = await req.formData();
    const file = form.get("file") as any;
    const keyFromBody = form.get("key") as string | null;
    if (!file || typeof file === "string") return NextResponse.json({ error: "missing file" }, { status: 400 });

    const filename = keyFromBody || file.name || `upload-${Date.now()}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await uploadBuffer(filename, buffer, file.type || "application/octet-stream");
    const url = getPublicUrl(filename);
    return NextResponse.json({ url, key: filename });
  } catch (err: any) {
    console.error("/api/r2/upload error", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
