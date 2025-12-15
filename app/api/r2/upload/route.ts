import { NextResponse } from "next/server";
import { uploadBuffer, getPublicUrl } from "@/lib/r2";
import { withApiGuard, streamUploadGuard, ApiError } from '@/lib/apiGuard';

export const POST = withApiGuard(async (req: Request) => {
  // stream guard
  // @ts-ignore - Next's Request in this runtime supports formData
  await streamUploadGuard(req as any, 5_000_000);
  try {
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
    console.error("/api/r2/upload error", err && err.message ? err.message : err);
    return NextResponse.json({ error: 'Failed to upload' }, { status: 500 });
  }
});
