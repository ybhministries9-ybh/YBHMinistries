import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export class ApiError extends Error {
  status: number;
  public sanitizedMessage: string;
  constructor(status: number, message = 'Bad Request') {
    super(message);
    this.status = status;
    this.sanitizedMessage = (status >= 500) ? 'Internal server error' : message;
  }
}

export async function safeParseJson(req: NextRequest, maxBytes = 100 * 1024) {
  // Read body as a stream with a max size and return parsed JSON or throw ApiError
  try {
    const contentType = (req.headers.get('content-type') || '').toLowerCase();
    if (!contentType.includes('application/json')) {
      throw new ApiError(415, 'Content-Type must be application/json');
    }

    // Prefer `req.text()` then limit
    const raw = await req.text();
    if (raw.length > maxBytes) throw new ApiError(413, 'Payload too large');
    try {
      return JSON.parse(raw || '{}');
    } catch (e) {
      throw new ApiError(400, 'Invalid JSON body');
    }
  } catch (e: any) {
    if (e instanceof ApiError) throw e;
    throw new ApiError(400, 'Invalid request');
  }
}

export function validateContentType(req: NextRequest, expected: string[]) {
  const ct = (req.headers.get('content-type') || '').toLowerCase();
  for (const ex of expected) if (ct.includes(ex)) return true;
  throw new ApiError(415, `Unsupported content type`);
}

export function withApiGuard(handler: (req: NextRequest) => Promise<Response | NextResponse> | Response | NextResponse, options?: { maxJsonBytes?: number, allowMultipartPaths?: string[], multipartMaxBytes?: number }) {
  return async function (req: NextRequest) {
    try {
      // Pre-validate content length header
      const cl = Number(req.headers.get('content-length') || '0');
      const path = req.nextUrl.pathname;
      const max = options?.maxJsonBytes || 100 * 1024;
      // per-path adjustment
      if (options?.allowMultipartPaths && options.allowMultipartPaths.some(p => path.startsWith(p))) {
        // allow larger uploads for multipart paths; size configurable via options.multipartMaxBytes
        const multipartMax = options?.multipartMaxBytes || 5_000_000;
        if (cl && cl > multipartMax) throw new ApiError(413, 'Payload too large');
      } else {
        if (cl && cl > max) throw new ApiError(413, 'Payload too large');
      }

      const resp = await handler(req);
      return resp;
    } catch (e: any) {
      // Map known errors to sanitized responses
      if (e instanceof ApiError) {
        return new NextResponse(JSON.stringify({ error: e.sanitizedMessage }), { status: e.status, headers: { 'Content-Type': 'application/json' } });
      }
      // Unexpected errors -> 500 sanitized
      return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  };
}

export async function streamUploadGuard(req: NextRequest, maxBytes = 5_000_000) {
  // Validate Content-Length if present
  const cl = Number(req.headers.get('content-length') || '0');
  if (cl && cl > maxBytes) throw new ApiError(413, 'Upload too large');
  const ct = (req.headers.get('content-type') || '').toLowerCase();
  if (!ct.includes('multipart/form-data') && !ct.includes('application/octet-stream')) {
    throw new ApiError(415, 'Unsupported upload content type');
  }
  // For streaming processing, return the raw body stream consumer (Next.js Request supports .body by design in runtime)
  return req.body;
}
