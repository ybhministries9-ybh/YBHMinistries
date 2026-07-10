import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Eye, EyeOff, Edit2, Save, Trash2, X, Upload } from 'lucide-react';
import { accentGold } from '../../utils/theme';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { toast } from 'sonner';

export function DonateUpiRow({ u, onChange, onRemove, onGenerate, generating, onRemoveConfirmed, startEditing, onConsumeStartEditing, onSave, onToggleVisible, isViewer } : any) {
  const [editing, setEditing] = useState<boolean>(false);
  const [local, setLocal] = useState<any>(u);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedQrPreview, setUploadedQrPreview] = useState<string | null>(null);
  const [presignedQrUrl, setPresignedQrUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const genTimer = React.useRef<number | null>(null);

  useEffect(() => setLocal(u), [u]);

  // Fetch presigned URL for r2:// QR images
  useEffect(() => {
    const fetchPresignedUrl = async () => {
      const qrUrl = u?.qr_image_url;
      if (qrUrl && typeof qrUrl === 'string' && qrUrl.startsWith('r2://')) {
        try {
          const match = qrUrl.match(/^r2:\/\/([^/]+)\/(.+)$/);
          if (match) {
            const [, bucket, key] = match;
            const resp = await fetch('/api/r2/presign-get', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ key, bucket })
            });
            if (resp.ok) {
              const json = await resp.json();
              if (json.url) {
                setPresignedQrUrl(json.url);
              }
            }
          }
        } catch (err) {
          console.error('Failed to fetch presigned URL for QR:', err);
        }
      } else {
        setPresignedQrUrl(null);
      }
    };
    fetchPresignedUrl();
  }, [u?.qr_image_url]);

  // If parent requests this row to start editing (e.g. Add UPI), honor it once
  useEffect(() => {
    if (startEditing) {
      setEditing(true);
      if (typeof onConsumeStartEditing === 'function') onConsumeStartEditing();
    }
  }, [startEditing, onConsumeStartEditing]);

  const startEdit = () => setEditing(true);
  const cancelEdit = () => {
    // If this row is a new unsaved entry, cancel should remove it entirely
    if (String(u.id).startsWith('new-')) {
      if (typeof onRemove === 'function') onRemove(u.id);
      return;
    }
    setLocal(u);
    setEditing(false);
  };
  const saveEdit = async () => {
    // If there's a pending QR file to upload, we need to save the UPI entry first to get a real ID
    let savedRow = local;
    let uploadedQrUrl: string | null = null;

    // If parent provided onSave, call it to persist immediately and use the server result
    if (typeof (onSave as any) === 'function') {
      try {
        const res = await onSave(local);
        if (res) {
          savedRow = res;
          // If there's a pending QR file, upload it now that we have a real ID
          if (local._pendingQrFile && res.id) {
            uploadedQrUrl = await uploadQrImage(res.id, local._pendingQrFile);
            if (uploadedQrUrl) {
              savedRow = { ...res, qr_image_url: uploadedQrUrl };
            }
          }
          // saved successfully; ensure parent list uses the server-returned row (important to replace temp ids)
          if (typeof onChange === 'function') onChange(savedRow);
          setLocal({ ...savedRow, _pendingQrFile: undefined });
          setUploadedQrPreview(null);
          setEditing(false);
        } else {
          // save failed - keep editor open for user to retry
        }
      } catch (err) {
        console.error('onSave failed', err);
      }
    } else {
      // Update parent state first with optimistic local values
      if (typeof onChange === 'function') onChange(local);
      setEditing(false);
    }
  };

  // Auto-generate QR preview when UPI ID changes (debounced)
  // Only generate if there's no uploaded QR image (r2:// URL) or pending file
  useEffect(() => {
    // Only generate when editing
    if (!editing) return;

    // Don't auto-generate if there's an uploaded QR image or a pending file to upload
    const hasUploadedQr = local?.qr_image_url && typeof local.qr_image_url === 'string' && local.qr_image_url.startsWith('r2://');
    const hasPendingFile = local?._pendingQrFile;
    if (hasUploadedQr || hasPendingFile) return;

    // clear previous timer
    if (genTimer.current) {
      window.clearTimeout(genTimer.current);
      genTimer.current = null;
    }

    if (!local || !local.upi_id) {
      // clear preview if upi_id removed (only clear data: URLs, not r2:// URLs)
      setLocal((l: any) => ({ ...l, qr_image_url: l?.qr_image_url && l.qr_image_url.startsWith('data:') ? null : l.qr_image_url }));
      return;
    }

    genTimer.current = window.setTimeout(async () => {
      try {
        const QR = await import('qrcode');
        const upiString = `upi://pay?pa=${encodeURIComponent(local.upi_id)}&pn=${encodeURIComponent(local.label || 'YBH Ministries')}&cu=INR`;
        const dataUrl: string = await QR.toDataURL(upiString, { type: 'image/png', margin: 1, scale: 6 });
        setLocal((l: any) => ({ ...l, qr_image_url: dataUrl }));
      } catch (err) {
        console.error('Failed to auto-generate QR', err);
      }
    }, 450);

    return () => {
      if (genTimer.current) {
        window.clearTimeout(genTimer.current);
        genTimer.current = null;
      }
    };
  }, [local?.upi_id, local?.label, local?.qr_image_url, local?._pendingQrFile, editing]);

  // Handle QR image file upload
  const handleQrFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PNG and JPG images are allowed');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File too large. Maximum size is 5MB');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setUploadedQrPreview(dataUrl);
      setLocal((l: any) => ({ ...l, qr_image_url: dataUrl, _pendingQrFile: file }));
    };
    reader.readAsDataURL(file);
  };

  // Upload QR image to server when saving
  const uploadQrImage = async (upiId: string | number, file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('id', String(upiId));
      formData.append('file', file);

      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch { token = rawToken }

      const resp = await fetch('/api/admin/donations/upload-qr-image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const json = await resp.json();
      if (!json.success) {
        toast.error(json.error || 'Failed to upload QR image');
        return null;
      }

      toast.success('QR image uploaded successfully');
      return json.url;
    } catch (err) {
      console.error('QR upload error:', err);
      toast.error('Failed to upload QR image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const toggleVisibleImmediate = async (newVal: boolean) => {
    // if this is a new unsaved row, just update locally and let parent save
    if (String(u.id).startsWith('new-')) {
      onChange({ ...u, visible: newVal });
      return;
    }

    // If parent provided an onToggleVisible handler, delegate the persistence to it
    if (typeof onToggleVisible === 'function') {
      // Use the freshest state (local when editing) when delegating
      const itemToSend = (editing ? local : u);
      // optimistic UI update
      onChange({ ...itemToSend, visible: newVal });
      try {
        await onToggleVisible(itemToSend, newVal);
      } catch (err) {
        // delegate error handling to parent; revert optimistic update
        onChange({ ...itemToSend, visible: !newVal });
      }
      return;
    }

    // optimistic UI update
    onChange({ ...u, visible: newVal });

    try {
      // Avoid sending large data URLs in this quick toggle update. If the qr_image_url is a data URL
      // (generated locally but not yet uploaded), omit it from payload — it will be handled on Save.
      const safeQr = typeof u.qr_image_url === 'string' && u.qr_image_url.startsWith('data:') ? null : u.qr_image_url || null;

      const payload = {
        label: u.label,
        upi_id: u.upi_id,
        qr_image_url: safeQr,
        visible: !!newVal,
        sort_order: u.sort_order || 0
      };

      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/admin/donations?type=upi&id=${u.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });
      const j = await res.json();
      if (!j.success) {
        toast.error(j.error || `Failed to update visibility for "${u.label || u.upi_id || 'UPI'}"`);
        // revert on failure
        onChange({ ...u, visible: !newVal });
      } else {
        // Use server returned row to keep local state in sync
        if (j.data) {
          onChange(j.data);
        } else {
          onChange({ ...u, visible: !!newVal });
        }
        toast.success(`Visibility updated for "${u.label || u.upi_id || 'UPI'}"`);
      }
    } catch (err) {
      console.error('Failed to save visible', err);
      toast.error(`Failed to update visibility for "${u.label || u.upi_id || 'UPI'}"`);
      onChange({ ...u, visible: !newVal });
    }
  };

  return (
    <div className="bg-black p-3 rounded-lg border border-gray-600 flex flex-col h-full">
      {!editing ? (
        /* Card view when not editing */
        <>
          <div className="flex-1">
            <div className="font-semibold" style={{ color: accentGold, fontSize: '16px' }}>{u.label || 'UPI'}</div>
            <div className="text-sm text-gray-300 mt-1">UPI Id: <span className="text-white break-all">{u.upi_id || '-'}</span></div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
            <Button
              onClick={() => toggleVisibleImmediate(!u.visible)}
              disabled={isViewer}
              className={`rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white ${!u.visible ? 'opacity-60' : ''}${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
              title={u.visible ? 'Unpublish' : 'Publish'}
              aria-label="Toggle visible"
            >
              {u.visible ? <Eye size={14} /> : <EyeOff size={14} />}
            </Button>
            <Button onClick={startEdit} disabled={isViewer} title="Edit" className={`rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white flex items-center gap-2${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}>
              <Edit2 size={14} />
            </Button>
            <Button onClick={() => setDeleteOpen(true)} disabled={isViewer} title="Delete" className={`bg-transparent rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}>
              <Trash2 size={14} />
            </Button>
            <DeleteConfirmDialog
              open={deleteOpen}
              onOpenChange={setDeleteOpen}
              onConfirm={() => {
                if (typeof onRemoveConfirmed === 'function') {
                  onRemoveConfirmed(u.id);
                } else {
                  onRemove(u.id);
                }
              }}
              title="Delete UPI entry"
              description={`Delete UPI entry ${u.label || u.upi_id}? This action cannot be undone.`}
              itemName={u.label || u.upi_id}
              itemType="UPI"
            />
          </div>
        </>
      ) : (
        /* Edit mode */
        <>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold" style={{ color: accentGold, fontSize: '16px' }}>{local.label || 'New UPI'}</div>
            {!(String(u.id).startsWith('new-')) && (
              <Button
                onClick={() => {
                  const newVal = !local.visible;
                  setLocal({ ...local, visible: newVal });
                  toggleVisibleImmediate(newVal);
                }}
                className={`rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white ${!local.visible ? 'opacity-60' : ''}`}
                title={local.visible ? 'Unpublish' : 'Publish'}
              >
                {local.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label className="text-sm text-gray-300">Full Name</Label>
              <Input value={local.label || ''} onChange={(e) => setLocal({ ...local, label: e.target.value })} placeholder="Full Name" style={{ backgroundColor: '#2e2e2e' }} className="bg-[#2e2e2e] border-gray-600 text-white text-sm" onMouseDown={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} />
            </div>
            <div>
              <Label className="text-sm text-gray-300">UPI ID</Label>
              <Input value={local.upi_id || ''} onChange={(e) => setLocal({ ...local, upi_id: e.target.value })} placeholder="example@bank" style={{ backgroundColor: '#2e2e2e' }} className="bg-[#2e2e2e] border-gray-600 text-white text-sm" onMouseDown={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} />
            </div>
              <div className="flex flex-col items-center">
                <Label className="text-sm text-gray-300 mb-2">QR Code</Label>
                <div className="w-40 h-40 bg-gray-900 border-2 border-dashed border-gray-700 rounded flex items-center justify-center relative overflow-hidden">
                  {(() => {
                    // Determine the QR image source to display
                    // Priority: uploadedQrPreview > presignedQrUrl (for r2://) > data: URLs > nothing
                    const isR2Url = local?.qr_image_url && typeof local.qr_image_url === 'string' && local.qr_image_url.startsWith('r2://');
                    const displayUrl = uploadedQrPreview 
                      || (isR2Url ? presignedQrUrl : null) 
                      || (local?.qr_image_url && !local.qr_image_url.startsWith('r2://') ? local.qr_image_url : null);
                    
                    if (displayUrl) {
                      return <img src={displayUrl} alt="QR preview" className="w-full h-full object-contain bg-white p-1" />;
                    } else if (isR2Url && !presignedQrUrl) {
                      return (
                        <div className="text-center px-3">
                          <div className="text-sm text-gray-400">Loading QR...</div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-center px-3">
                          <div className="text-sm text-gray-400 mb-1">QR preview</div>
                          <div className="text-xs text-gray-500">Auto-generated from UPI ID or upload your own.</div>
                        </div>
                      );
                    }
                  })()}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded">
                      <div className="text-white text-sm">Uploading...</div>
                    </div>
                  )}
                </div>
                {/* Upload QR button - always visible */}
                <div className="mt-3 flex flex-col items-center gap-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={handleQrFileUpload}
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white"
                    title={local?.qr_image_url || uploadedQrPreview ? "Replace QR code image" : "Upload a QR code image"}
                  >
                    <Upload size={12} />
                    <span>{local?.qr_image_url || uploadedQrPreview ? 'Replace QR' : 'Upload QR'}</span>
                  </Button>
                  {local._pendingQrFile && (
                    <div className="text-xs text-green-400 mt-1">Image ready to upload on save</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {local.qr_image_url?.startsWith('r2://') 
                      ? 'Using uploaded QR image' 
                      : local.qr_image_url?.startsWith('data:') && !local._pendingQrFile
                        ? 'Auto-generated (not saved)'
                        : null
                    }
                  </div>
                </div>
              </div>
          </div>

          {/* bottom Visible checkbox removed; control moved to header */}

          {/* Move Save/Cancel to bottom of the edit form and swap order (Cancel then Save) */}
          <div className="flex justify-end gap-2 mt-3">
            <Button onClick={cancelEdit} disabled={uploading} className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white flex items-center gap-2 px-3 py-2 rounded-md">
              <X size={14} />
              <span className="text-sm">Cancel</span>
            </Button>

            <Button onClick={saveEdit} disabled={uploading} className="bg-[#FDB813] hover:bg-[#e5a711] text-black font-semibold flex items-center gap-2 px-3 py-2 rounded-md disabled:opacity-50">
              <Save size={14} />
              <span className="text-sm">{uploading ? 'Uploading...' : 'Save'}</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
