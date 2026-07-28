import { NextResponse } from "next/server";
import { uploadBuffer, getPublicUrl, isValidObjectKey } from "@/lib/r2";
import { withApiGuard, streamUploadGuard } from '@/lib/apiGuard';
import { resolveSessionAndActorFromAuthHeader, readOnlyResponse } from "@/lib/sessions";

export const POST = withApiGuard(async (req: Request) => {
  // Admin-only: anonymous clients must not be able to write to R2.
  const auth = req.headers.get('authorization') || '';
  const resolved = await resolveSessionAndActorFromAuthHeader(auth).catch(() => null);
  if (!resolved) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const denied = readOnlyResponse(resolved);
  if (denied) return denied;

  // stream guard
  // @ts-ignore - Next's Request in this runtime supports formData
  await streamUploadGuard(req as any, 5_000_000);
  try {
    const form = await req.formData();
    const file = form.get("file") as any;
    const keyFromBody = form.get("key") as string | null;
    if (!file || typeof file === "string") return NextResponse.json({ error: "missing file" }, { status: 400 });

    const fallbackName = `upload-${Date.now()}`;
    const rawName = keyFromBody || file.name || fallbackName;
    const filename = isValidObjectKey(rawName) ? rawName : fallbackName;
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
