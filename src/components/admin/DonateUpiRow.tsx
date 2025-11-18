import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Eye, EyeOff, Edit2, Save, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { ImageUpload } from './ImageUpload';
import { toast } from 'sonner';

export function DonateUpiRow({ u, onChange, onRemove, onGenerate, generating, onRemoveConfirmed, startEditing, onConsumeStartEditing, onSave, onToggleVisible } : any) {
  const [editing, setEditing] = useState<boolean>(false);
  const [local, setLocal] = useState<any>(u);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const genTimer = React.useRef<number | null>(null);

  useEffect(() => setLocal(u), [u]);

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
    // Update parent state first with optimistic local values
    if (typeof onChange === 'function') onChange(local);

    // If parent provided onSave, call it to persist immediately and use the server result
    if (typeof (onSave as any) === 'function') {
      try {
        const res = await onSave(local);
        if (res) {
          // saved successfully; ensure parent list uses the server-returned row (important to replace temp ids)
          if (typeof onChange === 'function') onChange(res);
          setEditing(false);
        } else {
          // save failed - keep editor open for user to retry
        }
      } catch (err) {
        console.error('onSave failed', err);
      }
    } else {
      setEditing(false);
    }
  };

  // Auto-generate QR preview when UPI ID changes (debounced)
  useEffect(() => {
    // Only generate when editing
    if (!editing) return;

    // clear previous timer
    if (genTimer.current) {
      window.clearTimeout(genTimer.current);
      genTimer.current = null;
    }

    if (!local || !local.upi_id) {
      // clear preview if upi_id removed
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
  }, [local?.upi_id, local?.label, editing]);
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
    <div className="bg-black p-2 rounded-lg border border-gray-600">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="font-semibold text-white text-sm">{u.label || 'UPI'}</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            {/* Visible as icon button */}
            {/* Hide visible toggle while editing a new unsaved UPI row; show elsewhere */}
            {!(editing && String(u.id).startsWith('new-')) && (
              <Button
                onClick={() => {
                  const newVal = editing ? !local.visible : !u.visible;
                  if (editing) setLocal({ ...local, visible: newVal });
                  // always call toggle handler so manager updates server for existing rows
                  toggleVisibleImmediate(newVal);
                }}
                className={`bg-[#2E2E2E] text-white ${ (editing ? !!local.visible : !!u.visible) ? '' : 'opacity-60' }`}
                title={(editing ? (!!local.visible ? 'Hide' : 'Show') : (u.visible ? 'Hide' : 'Show'))}
                aria-label="Toggle visible"
              >
                {(editing ? !!local.visible : !!u.visible) ? <Eye size={16} /> : <EyeOff size={16} />}
              </Button>
            )}

            {!editing ? (
              <>
                <Button onClick={startEdit} className="bg-[#FDB813] hover:bg-[#e5a610] text-black flex items-center gap-2">
                  <Edit2 size={14} />
                  <span className="text-sm">Edit</span>
                </Button>
                <Button onClick={() => setDeleteOpen(true)} className="bg-transparent text-white border border-red-500">
                  <Trash2 size={16} />
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
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button onClick={saveEdit} className="bg-[#FDB813] hover:bg-[#e5a610] text-black flex items-center gap-2">
                  <Save size={14} />
                  <span className="text-sm">Save</span>
                </Button>
                <Button onClick={cancelEdit} className="bg-transparent text-white border border-gray-600">Cancel</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {!editing ? (
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-300">{u.upi_id || u.label}</div>
          <div className="flex items-center gap-2">
            {/* Visible moved to header */}
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <Label className="text-sm text-gray-300">Label</Label>
              <Input value={local.label || ''} onChange={(e) => setLocal({ ...local, label: e.target.value })} placeholder="Label" className="bg-black border-gray-600 text-white text-sm" onMouseDown={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} />
            </div>
            <div>
              <Label className="text-sm text-gray-300">UPI ID</Label>
              <Input value={local.upi_id || ''} onChange={(e) => setLocal({ ...local, upi_id: e.target.value })} placeholder="example@bank" className="bg-black border-gray-600 text-white text-sm" onMouseDown={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} />
            </div>
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-900 border-2 border-dashed border-gray-700 rounded flex items-center justify-center">
                  {local?.qr_image_url ? (
                    // show QR image (data URL or blob URL)
                    <img src={local.qr_image_url} alt="QR preview" className="w-36 h-36 object-contain bg-white p-1 rounded" />
                  ) : (
                    <div className="text-center px-3">
                      <div className="text-sm text-gray-400 mb-1">QR preview</div>
                      <div className="text-xs text-gray-500">Will be generated automatically when you enter a UPI ID.</div>
                      <div className="text-xs text-gray-500 mt-2">Saved to storage when you click Save.</div>
                    </div>
                  )}
                </div>
              </div>
          </div>

          {/* bottom Visible checkbox removed; control moved to header */}
        </div>
      )}
    </div>
  );
}
