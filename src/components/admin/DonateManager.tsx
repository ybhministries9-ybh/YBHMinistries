import React, { useEffect, useState } from 'react';
import { QrCode, Edit2, Eye, EyeOff, Trash2, X, Plus, Save } from 'lucide-react';
import { DonateUpiRow } from './DonateUpiRow';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { accentGold } from '../../utils/theme';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { DiscardConfirmDialog } from './DiscardConfirmDialog';
import { useAdminUser } from '@/hooks/useAdminUser';

type UpiItem = {
  id: string | number;
  label?: string;
  upi_id?: string;
  qr_image_url?: string | null;
  visible?: boolean;
  sort_order?: number;
};

type BankItem = {
  id: string | number;
  account_name?: string;
  account_number?: string;
  bank_name?: string;
  branch_name?: string;
  ifsc_code?: string;
  swift_code?: string;
  upi_id?: string;
  visible?: boolean;
  sort_order?: number;
};

export function DonateManager(): React.ReactElement {
  const { isViewer } = useAdminUser();
  const [upiList, setUpiList] = useState<UpiItem[]>([]);
  const [bankList, setBankList] = useState<BankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<null | { type: 'upi' | 'bank'; id: string | number; name?: string }>(null);
  const [startEditId, setStartEditId] = useState<string | null>(null);
  const [editingBankId, setEditingBankId] = useState<string | null>(null);
  const [expandedBankId, setExpandedBankId] = useState<string | null>(null);
  const [discardDialog, setDiscardDialog] = useState<null | 'upi' | 'bank'>(null);

  const doRemove = async (type: 'upi' | 'bank', id: string | number) => {
    try {
      // If this is a new unsaved entry, just remove it locally without calling the server
      if (String(id).startsWith('new-')) {
        if (type === 'upi') {
          setUpiList((s) => s.filter((u) => String(u.id) !== String(id)));
          toast.success('UPI removed');
        } else {
          setBankList((s) => s.filter((b) => String(b.id) !== String(id)));
          toast.success('Bank removed');
        }
        return;
      }

      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const res = await fetch(`/api/admin/donations?type=${type}&id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      const json = await res.json();
      if (json.success) {
        toast.success(type === 'upi' ? 'UPI removed' : 'Bank removed');
        await loadAll();
      } else {
        toast.error(json.error || `Failed to delete ${type}`);
      }
    } catch (err) {
      console.error(err);
      toast.error(`Failed to delete ${type}`);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
      const [uRes, bRes] = await Promise.all([
        fetch('/api/admin/donations?type=upi', { headers }),
        fetch('/api/admin/donations?type=bank', { headers })
      ]);
      const ujson = await uRes.json().catch(() => ({ success: false }));
      const bjson = await bRes.json().catch(() => ({ success: false }));
      if (ujson && ujson.success) setUpiList(ujson.data || []);
      else setUpiList([]);
      if (bjson && bjson.success) setBankList(bjson.data || []);
      else setBankList([]);
    } catch (err) {
      console.error('Failed to load donations', err);
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const addNewUpi = () => {
    const id = `new-${Date.now()}`;
    setUpiList((s) => [{ id, label: '', upi_id: '', qr_image_url: null, visible: true, sort_order: 0 }, ...s]);
    // request the new row to open in edit mode
    setStartEditId(id);
  };

  const handleAddNewUpi = () => {
    const hasUnsaved = upiList.some(x => String(x.id).startsWith('new-'));
    if (hasUnsaved) {
      setDiscardDialog('upi');
      return;
    }
    addNewUpi();
  };

  const handleAddNewBank = () => {
    const hasUnsaved = bankList.some(x => String(x.id).startsWith('new-'));
    if (hasUnsaved) {
      setDiscardDialog('bank');
      return;
    }
    addNewBank();
  };

  const removeUpi = async (id: string | number) => {
    if (String(id).startsWith('new-')) {
      setUpiList((s) => s.filter((u) => u.id !== id));
      return;
    }
    const u = upiList.find((x) => x.id === id);
    setDeleteTarget({ type: 'upi', id, name: u?.label || u?.upi_id });
    setDeleteDialogOpen(true);
  };

  const onGenerateQr = async (item: UpiItem) => {
    if (!item.upi_id) return toast.error('UPI ID required to generate QR');
    let realId = item.id;
    try {
      // If it's a new unsaved entry, create it first so we have a real id to attach the QR to.
      if (String(item.id).startsWith('new-')) {
        const createPayload = { label: item.label, upi_id: item.upi_id, qr_image_url: item.qr_image_url, visible: typeof item.visible === 'boolean' ? item.visible : true, sort_order: item.sort_order || 0 };
        const rawToken = localStorage.getItem('admin_token');
        let token = '';
        if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
        const resp = await fetch('/api/admin/donations?type=upi', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(createPayload) });
        const j = await resp.json();
        if (!j.success) {
          toast.error('Failed to create UPI before generating QR');
          return;
        }
        realId = j.data.id;
        // Replace the temporary entry in our list with the new id and preserve the user's typed values
        setUpiList((s) => s.map((x) => x.id === item.id ? { ...x, id: realId, label: item.label, upi_id: item.upi_id, qr_image_url: item.qr_image_url } : x));
      }

      // Generate QR locally as a data URL (do not upload to blob yet)
      setGenerating(String(realId));
      const QR = await import('qrcode');
      const upiString = `upi://pay?pa=${encodeURIComponent(item.upi_id)}&pn=${encodeURIComponent('YBH Ministries')}&cu=INR`;
      const dataUrl: string = await QR.toDataURL(upiString, { type: 'image/png', margin: 1, scale: 6 });

      // Store the generated data URL locally in the list (will be uploaded on Save). Match by the real id.
      setUpiList((s) => s.map((x) => String(x.id) === String(realId) ? { ...x, qr_image_url: dataUrl } : x));
      // keep edit mode open for this row
      setStartEditId(String(realId));
      toast.success('QR generated (preview)');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate QR');
    } finally {
      setGenerating(null);
    }
  };

  // Save a single UPI row (used for per-row Save). Returns the saved row or null on failure.
  const saveSingleUpi = async (u: UpiItem) : Promise<any | null> => {
    try {
      // Always persist only label and upi_id (QR preview is for display only and should not be saved)
      if (String(u.id).startsWith('new-')) {
        const createPayload: any = { label: u.label, upi_id: u.upi_id, visible: typeof u.visible === 'boolean' ? u.visible : true, sort_order: u.sort_order || 0 };

        const rawToken = localStorage.getItem('admin_token');
        let token = '';
        if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
        const resp = await fetch('/api/admin/donations?type=upi', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(createPayload) });
        const j = await resp.json();
        if (!j.success) {
          toast.error('Failed to create UPI');
          return null;
        }
        const newRow = j.data;
        toast.success(`UPI saved${newRow.label ? `: ${newRow.label}` : ''}`);
        return newRow;
      } else {
        const payload = { label: u.label, upi_id: u.upi_id, visible: !!u.visible, sort_order: u.sort_order || 0 };
        const rawToken5 = localStorage.getItem('admin_token');
        let token5 = '';
        if (rawToken5) try { token5 = JSON.parse(rawToken5).token || rawToken5 } catch (e) { token5 = rawToken5 }
        const putResp = await fetch(`/api/admin/donations?type=upi&id=${u.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token5}` }, body: JSON.stringify(payload) });
        const putJ = await putResp.json();
        if (!putJ.success) {
          toast.error('Failed to update UPI');
          return null;
        }
        toast.success(`UPI saved${putJ.data.label ? `: ${putJ.data.label}` : ''}`);
        return putJ.data;
      }
    } catch (err) {
      console.error('saveSingleUpi failed', err);
      toast.error('Save failed');
      return null;
    }
  };

  // Save a single Bank row (used for per-row Save on new entries). Returns saved row or null.
  const saveSingleBank = async (b: BankItem): Promise<any | null> => {
    try {
      // basic client-side validation
      const validate = (row: BankItem) => {
        if (!row.account_name || String(row.account_name).trim().length === 0) return 'Account name is required';
        if (!row.account_number || String(row.account_number).trim().length === 0) return 'Account number is required';
        // account number must be digits only and not negative
        if (!/^\d+$/.test(String(row.account_number))) return 'Account number must contain digits only (no signs or letters)';
        if (!row.bank_name || String(row.bank_name).trim().length === 0) return 'Bank name is required';
        // disallow digits in textual name fields
        if (/\d/.test(String(row.account_name))) return 'Account name must not contain numbers';
        if (/\d/.test(String(row.bank_name))) return 'Bank name must not contain numbers';
        if (row.branch_name && /\d/.test(String(row.branch_name))) return 'Branch name must not contain numbers';
        if (row.account_name && String(row.account_name).length > 200) return 'Account name too long';
        if (row.account_number && String(row.account_number).length > 100) return 'Account number too long';
        if (row.bank_name && String(row.bank_name).length > 200) return 'Bank name too long';
        if (row.branch_name && String(row.branch_name).length > 200) return 'Branch name too long';
        if (row.ifsc_code && String(row.ifsc_code).length > 50) return 'IFSC too long';
        if (row.swift_code && String(row.swift_code).length > 100) return 'SWIFT too long';
        if (row.upi_id && String(row.upi_id).length > 200) return 'UPI ID too long';
        return null;
      };

      const err = validate(b);
      if (err) {
        toast.error(err);
        return null;
      }

      const payload = {
        account_name: b.account_name,
        account_number: b.account_number,
        bank_name: b.bank_name,
        branch_name: b.branch_name || null,
        ifsc_code: b.ifsc_code || null,
        swift_code: b.swift_code || null,
        upi_id: b.upi_id || null,
        visible: !!b.visible,
        sort_order: b.sort_order || 0
      } as any;

      if (String(b.id).startsWith('new-')) {
        const rawToken = localStorage.getItem('admin_token');
        let token = '';
        if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
        const resp = await fetch('/api/admin/donations?type=bank', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
        const j = await resp.json();
        if (!j.success) {
          toast.error(j.error || 'Failed to create bank');
          return null;
        }
        toast.success('Bank saved');
        return j.data;
      } else {
        const rawToken2 = localStorage.getItem('admin_token');
        let token2 = '';
        if (rawToken2) try { token2 = JSON.parse(rawToken2).token || rawToken2 } catch (e) { token2 = rawToken2 }
        const resp = await fetch(`/api/admin/donations?type=bank&id=${b.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token2}` }, body: JSON.stringify(payload) });
        const j = await resp.json();
        if (!j.success) {
          toast.error(j.error || 'Failed to update bank');
          return null;
        }
        toast.success('Bank updated');
        return j.data;
      }
    } catch (err) {
      console.error('saveSingleBank failed', err);
      toast.error('Save failed');
      return null;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save all UPI rows sequentially using saveSingleUpi so each entry is persisted and the manager state updated
      for (const u of upiList) {
        const saved = await saveSingleUpi(u);
        if (saved) {
          // replace local state entry with saved DB row (ensure ids and qr urls are correct)
          setUpiList((s) => s.map((x) => (String(x.id) === String(u.id) ? { ...x, ...saved } : x)));
        }
      }

      // Banks unchanged
      for (const b of bankList) {
        const payload = {
          account_name: b.account_name,
          account_number: b.account_number,
          bank_name: b.bank_name,
          branch_name: b.branch_name,
          ifsc_code: b.ifsc_code,
          swift_code: b.swift_code,
          upi_id: b.upi_id,
          visible: !!b.visible,
          sort_order: b.sort_order || 0
        };
        if (String(b.id).startsWith('new-')) {
          const rawToken = localStorage.getItem('admin_token');
          let token = '';
          if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
          await fetch('/api/admin/donations?type=bank', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
        } else {
          const rawToken2 = localStorage.getItem('admin_token');
          let token2 = '';
          if (rawToken2) try { token2 = JSON.parse(rawToken2).token || rawToken2 } catch (e) { token2 = rawToken2 }
          await fetch(`/api/admin/donations?type=bank&id=${b.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token2}` }, body: JSON.stringify(payload) });
        }
      }

      toast.success('Saved');
      await loadAll();
    } catch (err) {
      console.error('Save failed', err);
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const addNewBank = () => {
    const id = `new-${Date.now()}`;
    setBankList((s) => [{ id, account_name: '', account_number: '', bank_name: '', branch_name: '', ifsc_code: '', swift_code: '', upi_id: '', visible: true, sort_order: 0 }, ...s]);
  };

  const removeBank = async (id: string | number) => {
    if (String(id).startsWith('new-')) {
      setBankList((s) => s.filter(b => b.id !== id));
      return;
    }
    const b = bankList.find((x) => x.id === id);
    setDeleteTarget({ type: 'bank', id, name: b?.account_name });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;
    await doRemove(type, id);
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  // Toggle visibility for a bank row (optimistic update)
  const toggleVisibleBank = async (b: BankItem) => {
    const newVisible = !b.visible;

    // Optimistic UI update
    setBankList((s) => s.map((x) => (String(x.id) === String(b.id) ? { ...x, visible: newVisible } : x)));

    // If this is a new unsaved entry, nothing to persist
    if (String(b.id).startsWith('new-')) return;

    try {
      const payload = {
        account_name: b.account_name,
        account_number: b.account_number,
        bank_name: b.bank_name,
        branch_name: b.branch_name || null,
        ifsc_code: b.ifsc_code || null,
        swift_code: b.swift_code || null,
        upi_id: b.upi_id || null,
        visible: !!newVisible,
        sort_order: b.sort_order || 0
      } as any;

      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const resp = await fetch(`/api/admin/donations?type=bank&id=${b.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
      const j = await resp.json();
      if (!j.success) {
        toast.error(j.error || 'Failed to update visibility');
        // revert optimistic update
        setBankList((s) => s.map((x) => (String(x.id) === String(b.id) ? { ...x, visible: b.visible } : x)));
        return;
      }

      toast.success(`Visibility ${j.data.visible ? 'enabled' : 'disabled'}`);
      // ensure server row synced
      setBankList((s) => s.map((x) => (String(x.id) === String(b.id) ? { ...x, ...j.data } : x)));
    } catch (err) {
      console.error('toggleVisibleBank failed', err);
      toast.error('Failed to update visibility');
      setBankList((s) => s.map((x) => (String(x.id) === String(b.id) ? { ...x, visible: b.visible } : x)));
    }
  };

  // Toggle visibility for an UPI row (optimistic update). Called by DonateUpiRow via prop.
  const toggleVisibleUpi = async (u: UpiItem, newVisible?: boolean) => {
    const newVal = typeof newVisible === 'boolean' ? newVisible : !u.visible;

    // Optimistic UI update already applied by caller; perform server update
    if (String(u.id).startsWith('new-')) return;

    try {
      const payload = {
        label: u.label,
        upi_id: u.upi_id,
        qr_image_url: typeof u.qr_image_url === 'string' && u.qr_image_url.startsWith('data:') ? null : u.qr_image_url || null,
        visible: !!newVal,
        sort_order: u.sort_order || 0
      } as any;

      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
      const resp = await fetch(`/api/admin/donations?type=upi&id=${u.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
      const j = await resp.json();
      if (!j.success) {
        toast.error(j.error || 'Failed to update visibility');
        // revert optimistic update
        setUpiList((s) => s.map((x) => (String(x.id) === String(u.id) ? { ...x, visible: u.visible } : x)));
        return;
      }

      toast.success(`Visibility ${j.data.visible ? 'enabled' : 'disabled'}`);
      // ensure server row synced
      setUpiList((s) => s.map((x) => (String(x.id) === String(u.id) ? { ...x, ...j.data } : x)));
    } catch (err) {
      console.error('toggleVisibleUpi failed', err);
      toast.error('Failed to update visibility');
      setUpiList((s) => s.map((x) => (String(x.id) === String(u.id) ? { ...x, visible: u.visible } : x)));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#111] z-30">
        <div>
          <h1 className="text-white font-bold text-3xl">Donate Management</h1>
          <p className="text-sm text-gray-400 mb-1">Manage donation methods and entries.</p>
        </div>
      </div>

      <section className="mb-6">
        <div className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <QrCode className="text-[#FDB813]" size={18} />
            <h3 className="text-white">UPI / QR Codes</h3>
          </div>

          <div className="mb-3 flex justify-between items-center">
            <div className="text-white font-medium">UPI Entries</div>
            <Button onClick={handleAddNewUpi} disabled={isViewer} className={`flex items-center gap-2 px-3 py-2 rounded-md border border-[#FDB813] bg-[#111] text-white hover:bg-[#3E3E3E]${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}>
              <Plus size={14} />
              <span className="font-medium">Add UPI</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading ? (
              <div className="text-gray-400 col-span-full">Loading...</div>
            ) : upiList.length === 0 ? (
              <div className="text-gray-400 col-span-full">No UPI entries yet.</div>
            ) : (
              upiList.map((u) => (
                <DonateUpiRow
                  key={u.id}
                  u={u}
                  onChange={(next: UpiItem) => setUpiList((s) => {
                    // Prefer exact id match
                    const byIdIndex = s.findIndex(x => String(x.id) === String(next.id));
                    if (byIdIndex !== -1) {
                      const copy = [...s];
                      copy[byIdIndex] = next;
                      return copy;
                    }

                    // If no id match (e.g. temp `new-` id replaced by server id), try to match by upi_id
                    if (next.upi_id) {
                      const byUpi = s.findIndex(x => x.upi_id && String(x.upi_id) === String(next.upi_id));
                      if (byUpi !== -1) {
                        const copy = [...s];
                        copy[byUpi] = next;
                        return copy;
                      }
                    }

                    // As a last resort, replace the first temporary new-* entry (most likely the one being edited)
                    const newIndex = s.findIndex(x => String(x.id).startsWith('new-'));
                    if (newIndex !== -1) {
                      const copy = [...s];
                      copy[newIndex] = next;
                      return copy;
                    }

                    // No match, return original list
                    return s;
                  })}
                  onSave={(item: UpiItem) => saveSingleUpi(item)}
                  onRemove={(id: string | number) => removeUpi(id)}
                  onRemoveConfirmed={(id: string | number) => doRemove('upi', id)}
                  startEditing={startEditId === String(u.id)}
                  onConsumeStartEditing={() => setStartEditId(null)}
                  onGenerate={(item: UpiItem) => onGenerateQr(item)}
                  generating={generating === String(u.id)}
                  onToggleVisible={(item: UpiItem, newVal: boolean) => toggleVisibleUpi(item, newVal)}
                  isViewer={isViewer}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-white">Bank Accounts</h3>
          </div>

          <div className="mb-3 flex justify-between items-center">
            <div className="text-white font-medium">Bank Entries</div>
            <Button onClick={handleAddNewBank} disabled={isViewer} className={`flex items-center gap-2 px-3 py-2 rounded-md border border-[#FDB813] bg-[#111] text-white hover:bg-[#3E3E3E]${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}>
              <Plus size={14} />
              <span className="font-medium">Add Bank</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bankList.length === 0 ? (
              <div className="text-gray-400 col-span-full">No bank accounts yet.</div>
            ) : (
              bankList.map((b) => (
                <div key={b.id} className="bg-black p-3 rounded-lg border border-gray-600 flex flex-col">
                  {/* If this is a new row or currently being edited, show the edit form */}
                  {String(b.id).startsWith('new-') || editingBankId === String(b.id) ? (
                    <div className="col-span-full">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <Label className="text-gray-300 mb-1">Account Name <span className="text-red-400">*</span></Label>
                          <Input
                            placeholder="e.g. John Doe Foundation"
                            maxLength={200}
                            value={b.account_name || ''}
                            onChange={(e) => {
                              const sanitized = String(e.target.value).replace(/\d+/g, '');
                              setBankList((s) => s.map(x => x.id === b.id ? { ...x, account_name: sanitized } : x));
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            onDoubleClick={(e) => e.stopPropagation()}
                            style={{ backgroundColor: '#2e2e2e' }}
                            className="bg-[#2e2e2e] border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-1">Account Number <span className="text-red-400">*</span></Label>
                          <Input
                            placeholder="e.g. 12345678901234"
                            maxLength={100}
                            inputMode="numeric"
                            pattern="\d*"
                            value={b.account_number || ''}
                            onChange={(e) => {
                              const sanitized = String(e.target.value).replace(/[^0-9]/g, '');
                              setBankList((s) => s.map(x => x.id === b.id ? { ...x, account_number: sanitized } : x));
                            }}
                            style={{ backgroundColor: '#2e2e2e' }}
                            className="bg-[#2e2e2e] border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-1">Bank Name <span className="text-red-400">*</span></Label>
                          <Input
                            placeholder="e.g. State Bank of India"
                            maxLength={200}
                            value={b.bank_name || ''}
                            onChange={(e) => {
                              const sanitized = String(e.target.value).replace(/\d+/g, '');
                              setBankList((s) => s.map(x => x.id === b.id ? { ...x, bank_name: sanitized } : x));
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            onDoubleClick={(e) => e.stopPropagation()}
                            style={{ backgroundColor: '#2e2e2e' }}
                            className="bg-[#2e2e2e] border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                        <div>
                          <Label className="text-gray-300 mb-1">Branch Name</Label>
                          <Input
                            placeholder="e.g. MG Road Branch"
                            maxLength={200}
                            value={b.branch_name || ''}
                            onChange={(e) => {
                              const sanitized = String(e.target.value).replace(/\d+/g, '');
                              setBankList((s) => s.map(x => x.id === b.id ? { ...x, branch_name: sanitized } : x));
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            onDoubleClick={(e) => e.stopPropagation()}
                            style={{ backgroundColor: '#2e2e2e' }}
                            className="bg-[#2e2e2e] border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-1">IFSC Code</Label>
                          <Input
                            placeholder="e.g. SBIN0001234"
                            maxLength={50}
                            value={b.ifsc_code || ''}
                            onChange={(e) => setBankList((s) => s.map(x => x.id === b.id ? { ...x, ifsc_code: e.target.value } : x))}
                            style={{ backgroundColor: '#2e2e2e' }}
                            className="bg-[#2e2e2e] border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-1">SWIFT Code</Label>
                          <Input
                            placeholder="e.g. HDFCINBBXXX"
                            maxLength={100}
                            value={b.swift_code || ''}
                            onChange={(e) => setBankList((s) => s.map(x => x.id === b.id ? { ...x, swift_code: e.target.value } : x))}
                            style={{ backgroundColor: '#2e2e2e' }}
                            className="bg-[#2e2e2e] border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 items-center">
                        <div>
                          <Label className="text-gray-300 mb-1">UPI ID</Label>
                          <Input
                            placeholder="e.g. johndoe@bank"
                            maxLength={200}
                            value={b.upi_id || ''}
                            onChange={(e) => setBankList((s) => s.map(x => x.id === b.id ? { ...x, upi_id: e.target.value } : x))}
                            onMouseDown={(e) => e.stopPropagation()}
                            onDoubleClick={(e) => e.stopPropagation()}
                            style={{ backgroundColor: '#2e2e2e' }}
                            className="bg-[#2e2e2e] border-gray-600 text-white"
                          />
                        </div>
                        <div className="flex items-center">
                          <Label className="text-gray-300 mr-2">Visible</Label>
                          <input type="checkbox" checked={!!b.visible} onChange={(e) => setBankList((s) => s.map(x => x.id === b.id ? { ...x, visible: e.target.checked } : x))} />
                        </div>
                        <div />
                      </div>

                      <div className="flex justify-end gap-2 mt-3">
                        <Button
                          onClick={() => {
                            if (String(b.id).startsWith('new-')) setBankList((s) => s.filter(x => x.id !== b.id));
                            else setEditingBankId(null);
                          }}
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white  flex items-center gap-2 px-3 py-2 rounded-md"
                        >
                          <X size={14} />
                          <span className="text-sm">Cancel</span>
                        </Button>

                        <Button
                          onClick={async () => {
                            const saved = await saveSingleBank(b);
                            if (saved) {
                              setBankList((s) => s.map(x => String(x.id) === String(b.id) ? { ...x, ...saved } : x));
                              setEditingBankId(null);
                            }
                          }}
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black flex items-center gap-2 px-3 py-2 rounded-md"
                        >
                          <Save size={14} />
                          <span className="text-sm">Save</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Display card view when not editing */
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                          <div className="text-lg font-semibold" style={{ color: accentGold }}>{b.account_name}</div>
                          <div className="text-sm text-gray-300">{b.bank_name}{b.branch_name ? ` — ${b.branch_name}` : ''}</div>
                          {b.ifsc_code ? (
                            <div className="text-sm text-gray-400 mt-2">IFSC: <span className="text-white">{b.ifsc_code}</span></div>
                          ) : (
                            <div className="text-sm text-gray-400 mt-2">IFSC: <span className="text-white">-</span></div>
                          )}
                          <div className="text-sm text-gray-400">A/C: <span className="text-white">{b.account_number || '-'}</span></div>
                          {b.swift_code ? (
                            <div className="text-sm text-gray-400">SWIFT: <span className="text-white">{b.swift_code}</span></div>
                          ) : null}
                          {b.upi_id ? (
                            <div className="text-sm text-gray-400">UPI ID: <span className="text-white">{b.upi_id}</span></div>
                          ) : null}
                        </div>

                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
                        <Button onClick={() => toggleVisibleBank(b)} disabled={isViewer} className={`rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white ${!b.visible ? 'opacity-60' : ''}${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`} title={b.visible ? 'Unpublish' : 'Publish'}>
                          {b.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                        </Button>
                        <Button onClick={() => { setExpandedBankId(null); setEditingBankId(String(b.id)); }} disabled={isViewer} className={`rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white flex items-center gap-2${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`} title="Edit">
                          <Edit2 size={14} />
                        </Button>
                        <Button onClick={() => { setDeleteTarget({ type: 'bank', id: b.id, name: b.account_name }); setDeleteDialogOpen(true); }} disabled={isViewer} className={`bg-transparent rounded-md border border-[#FDB813] bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`} title="Delete">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                  {/* Expanded details when View toggled */}
                  {expandedBankId === String(b.id) && !(String(b.id).startsWith('new-') || editingBankId === String(b.id)) && (
                    <div className="mt-3 text-sm text-gray-300">
                      <div>Account Holder: <span className="text-white">{b.account_name}</span></div>
                      <div>Account Number: <span className="text-white">{b.account_number}</span></div>
                      <div>IFSC: <span className="text-white">{b.ifsc_code}</span></div>
                      <div>SWIFT: <span className="text-white">{b.swift_code}</span></div>
                      <div>UPI ID: <span className="text-white">{b.upi_id}</span></div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title={deleteTarget?.type === 'bank' ? 'Delete Bank' : 'Delete UPI'}
        description={deleteTarget?.type === 'bank'
          ? `Are you sure you want to delete the bank ${deleteTarget?.name ? `"${deleteTarget.name}"` : ''}? This action cannot be undone.`
          : `Are you sure you want to delete the UPI entry ${deleteTarget?.name ? `"${deleteTarget.name}"` : ''}? This action cannot be undone.`
        }
      />

      <DiscardConfirmDialog
        open={discardDialog !== null}
        onOpenChange={(open) => { if (!open) setDiscardDialog(null); }}
        onConfirm={() => {
          if (discardDialog === 'upi') {
            setUpiList((s) => s.filter(x => !String(x.id).startsWith('new-')));
            setTimeout(() => addNewUpi(), 50);
          } else if (discardDialog === 'bank') {
            setBankList((s) => s.filter(x => !String(x.id).startsWith('new-')));
            setTimeout(() => addNewBank(), 50);
          }
          setDiscardDialog(null);
        }}
        title={discardDialog === 'bank' ? 'Discard unsaved Bank?' : 'Discard unsaved UPI?'}
        description={discardDialog === 'bank' ? 'You have an unsaved Bank form open. Discard it and open a new one?' : 'You have an unsaved UPI form open. Discard it and open a new one?'}
      />

    </div>
  );
}

export default DonateManager;

