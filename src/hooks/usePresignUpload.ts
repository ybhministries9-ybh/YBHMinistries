import { useState, useCallback } from 'react';
import { logger } from '@/lib/logger';

type UploadResult = { ok: boolean; data?: any; error?: string };

function makeKey(prefix = 'uploads', fileName?: string) {
  const safeName = (fileName || 'file').replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}/${Date.now()}-${rand}-${safeName}`;
}

export function usePresignUpload(opts?: { prefix?: string }) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File, key?: string, extra?: { category?: string; title?: string }) : Promise<UploadResult> => {
    setError(null);
    setProgress(0);

    try {
      const finalKey = key || makeKey(opts?.prefix || 'uploads', file.name);

      // 1) request presigned PUT URL
      const presignResp = await fetch('/api/r2/presign-put', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: finalKey, contentType: file.type, category: extra?.category })
      });
      if (!presignResp.ok) {
        const err = await presignResp.text();
        throw new Error('Presign failed: ' + err);
      }
      const { url } = await presignResp.json();

      // 2) upload file with XHR to track progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            setProgress(Math.round((ev.loaded / ev.total) * 100));
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error('Upload failed: ' + xhr.statusText));
        };
        xhr.onerror = () => reject(new Error('Network error during upload'));
        xhr.send(file);
      });

      setProgress(100);

      // 3) confirm to server (admin endpoint). Attach admin token from localStorage
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : '';
      const confirmResp = await fetch('/api/admin/media/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : '' },
        body: JSON.stringify({ key: finalKey, fileName: file.name, contentType: file.type, size: file.size, mediaType: (file.type || '').startsWith('video/') ? 'video' : 'image', category: extra?.category, title: extra?.title })
      });

      if (!confirmResp.ok) {
        const txt = await confirmResp.text();
        throw new Error('Confirm failed: ' + txt);
      }

      const data = await confirmResp.json();
      return { ok: true, data };
    } catch (err: any) {
      logger.error('usePresignUpload error', err);
      setError(err?.message || String(err));
      setProgress(null);
      return { ok: false, error: err?.message || String(err) };
    }
  }, [opts?.prefix]);

  return { upload, progress, error, setProgress } as const;
}

export default usePresignUpload;
