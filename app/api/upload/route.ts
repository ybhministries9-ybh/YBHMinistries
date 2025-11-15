import { NextRequest } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return new Response(JSON.stringify({ error: 'Server configuration error. Please set BLOB_READ_WRITE_TOKEN environment variable.' }), { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'uploads';

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const timestamp = Date.now();
    const originalName = file.name || 'file';
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${sanitizedName}`;
    const pathname = `${folder}/${filename}`;
    const blob = await put(pathname, buffer, {
      access: 'public',
      contentType: file.type || 'application/octet-stream',
      token,
    });
    return new Response(JSON.stringify({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: file.size,
    }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Failed to upload file', details: error?.message || 'Unknown error' }), { status: 500 });
  }
}
