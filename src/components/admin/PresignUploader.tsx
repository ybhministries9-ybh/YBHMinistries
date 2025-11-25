"use client";
import React, { useState } from 'react';
import usePresignUpload from '@/hooks/usePresignUpload';

export default function PresignUploader({ prefix = 'gallery' }: { prefix?: string }) {
  const { upload, progress, error } = usePresignUpload({ prefix });
  const [selected, setSelected] = useState<File | null>(null);
  const [category, setCategory] = useState('uploads');
  const [title, setTitle] = useState('');
  const [result, setResult] = useState<any>(null);

  async function handleUpload() {
    if (!selected) return;
    const res = await upload(selected, undefined, { category, title: title || selected.name });
    if (res.ok) setResult(res.data);
    else setResult({ error: res.error });
  }

  return (
    <div className="p-4 border rounded-md">
      <div className="mb-2">
        <label className="block text-sm font-medium">File</label>
        <input type="file" onChange={(e) => setSelected(e.target.files?.[0] || null)} className="mt-1" />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Category</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full" />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full" />
      </div>
      <div className="flex gap-2">
        <button onClick={handleUpload} className="px-3 py-1 bg-[#FDB813] text-black rounded disabled:opacity-60" disabled={!selected}>
          Upload
        </button>
        <button onClick={() => { setSelected(null); setResult(null); setTitle(''); }} className="px-3 py-1 border rounded">Clear</button>
      </div>

      {progress !== null && <div className="mt-2">Uploading: {progress}%</div>}
      {error && <div className="mt-2 text-red-600">Error: {error}</div>}
      {result && (
        <div className="mt-2">
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          {result.data?.url && (
            <a href={result.data.url} target="_blank" rel="noreferrer" className="text-blue-600">Open uploaded item</a>
          )}
        </div>
      )}
    </div>
  );
}
