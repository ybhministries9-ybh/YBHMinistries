import React, { useEffect, useState } from 'react';
import { X, AlertCircle, RefreshCw } from 'lucide-react';

const WARNING_MS = 60 * 1000; // show warning when <= 60s left (1 minute)

export function SessionWarning({ onLogout }: { onLogout: () => void }) {
  const [visible, setVisible] = useState(false);
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    let interval: any;
    function tick() {
      // Respect a short-lived suppression flag set after first-time password reset login
      try {
        const suppress = localStorage.getItem('suppress_session_warning_until');
        if (suppress) {
          const until = Number(suppress || 0) || 0;
          if (Date.now() < until) {
            setVisible(false);
            setRemainingMs(null);
            return;
          } else {
            // expired — remove the key
            try { localStorage.removeItem('suppress_session_warning_until'); } catch (e) {}
          }
        }
      } catch (e) {}

      const raw = localStorage.getItem('admin_token');
      if (!raw) {
        setVisible(false);
        setRemainingMs(null);
        return;
      }
      let tokenObj: any = null;
      try { tokenObj = JSON.parse(raw); } catch (e) { tokenObj = { token: raw, expiresAt: null }; }
      const expiresAt = tokenObj?.expiresAt ? new Date(tokenObj.expiresAt).getTime() : null;
      if (!expiresAt) { setVisible(false); setRemainingMs(null); return; }
      const rem = expiresAt - Date.now();
      setRemainingMs(rem);
      if (rem <= 0) {
        // expired — force logout
        setVisible(false);
        onLogout();
        return;
      }
      setVisible(rem <= WARNING_MS);
    }
    tick();
    interval = setInterval(tick, 1000);
    window.addEventListener('session-extended', tick as any);
    return () => { clearInterval(interval); window.removeEventListener('session-extended', tick as any); };
  }, [onLogout]);

  const handleExtend = async () => {
    const raw = localStorage.getItem('admin_token');
    if (!raw) return;
    let token = '';
    try { token = JSON.parse(raw).token || raw } catch (e) { token = raw }
    try {
      const resp = await fetch('/api/admin/auth/extend', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
      const j = await resp.json();
      if (j.success && j.expiresAt) {
        // normalize expiresAt to milliseconds since epoch so other code can compare numbers
        const expiresMs = typeof j.expiresAt === 'string' ? new Date(j.expiresAt).getTime() : j.expiresAt;
        localStorage.setItem('admin_token', JSON.stringify({ token, expiresAt: expiresMs }));
        // dispatch both a CustomEvent with detail and a plain Event to ensure listeners catch it
        try {
          window.dispatchEvent(new CustomEvent('session-extended', { detail: { expiresAt: expiresMs } }));
        } catch (e) {
          // some environments may restrict CustomEvent construction
          try { window.dispatchEvent(new Event('session-extended')); } catch (err) { /* ignore */ }
        }
        // Also trigger a storage event fallback by writing then removing a sentinel key
        try { localStorage.setItem('admin_token_updated', String(Date.now())); localStorage.removeItem('admin_token_updated'); } catch (e) {}
        setVisible(false);
      } else {
        // cannot extend — logout
        onLogout();
      }
    } catch (err) {
      console.error('extend session failed', err);
      onLogout();
    }
  };

  if (!visible || remainingMs == null) return null;

  const seconds = Math.max(1, Math.ceil(remainingMs / 1000));

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative inset-0 flex items-end md:items-center justify-center p-4 sm:p-6">
        <div className="w-auto max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto pointer-events-auto bg-black border border-gray-700 rounded-lg p-3 sm:p-4 shadow-2xl overflow-hidden">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-yellow-400" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Session expiring</div>
              <div className="text-sm text-gray-300">Your session will expire in {seconds} second{seconds !== 1 ? 's' : ''}.</div>
              <div className="mt-3 flex gap-2">
                <button onClick={handleExtend} className="inline-flex items-center gap-2 px-3 py-2 bg-[#FDB813] text-black rounded-md hover:bg-[#e5a711] transition"> <RefreshCw size={14} /> Extend session</button>
                <button onClick={() => onLogout()} className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"> Logout</button>
              </div>
            </div>
            <button aria-label="Dismiss" onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-200 ml-2 mt-1"><X /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionWarning;
