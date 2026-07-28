import React, { useEffect, useRef, useState } from 'react';
import { X, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * How much time is left when we start warning the admin. Also drives the
 * highlighted "Expires in" badge in the dashboard header, so both surfaces
 * always agree on what counts as "running out".
 */
export const SESSION_WARNING_MS = 5 * 60 * 1000; // 5 minutes

/**
 * The dialog can be dismissed during the warning window, but it forces itself
 * back for the final stretch so a session can't lapse silently.
 */
const FINAL_CALL_MS = 60 * 1000; // 1 minute

export function SessionWarning({ onLogout }: { onLogout: () => void }) {
  const [visible, setVisible] = useState(false);
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  // Cleared whenever the session is extended, so the next window warns again.
  const dismissedRef = useRef(false);

  useEffect(() => {
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
            try { localStorage.removeItem('suppress_session_warning_until'); } catch {}
          }
        }
      } catch {}

      const raw = localStorage.getItem('admin_token');
      if (!raw) {
        setVisible(false);
        setRemainingMs(null);
        return;
      }
      let tokenObj: any = null;
      try { tokenObj = JSON.parse(raw); } catch { tokenObj = { token: raw, expiresAt: null }; }
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
      // Outside the warning window the dialog is hidden and any earlier dismissal
      // is forgotten, so a freshly extended session warns again next time.
      if (rem > SESSION_WARNING_MS) {
        dismissedRef.current = false;
        setVisible(false);
        return;
      }
      // Inside the window: respect a dismissal until the final call.
      if (dismissedRef.current && rem > FINAL_CALL_MS) {
        setVisible(false);
        return;
      }
      dismissedRef.current = false;
      setVisible(true);
    }
    tick();
    const interval: any = setInterval(tick, 1000);
    const onExtended = () => { dismissedRef.current = false; tick(); };
    window.addEventListener('session-extended', onExtended as EventListener);
    return () => { clearInterval(interval); window.removeEventListener('session-extended', onExtended as EventListener); };
  }, [onLogout]);

  const handleExtend = async () => {
    const raw = localStorage.getItem('admin_token');
    if (!raw) return;
    let token = '';
    try { token = JSON.parse(raw).token || raw } catch { token = raw }
    try {
      // The middleware rejects non-upload API POSTs that don't declare a JSON content
      // type, and it replies with a plain-text 415 - so the header and body below are
      // required for this request to reach the route at all.
      const resp = await fetch('/api/admin/auth/extend', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: '{}'
      });
      // Never assume the body is JSON: middleware and proxies can return plain text.
      const contentType = resp.headers.get('content-type') || '';
      const j = contentType.includes('application/json') ? await resp.json() : null;
      if (resp.ok && j?.success && j.expiresAt) {
        // normalize expiresAt to milliseconds since epoch so other code can compare numbers
        const expiresMs = typeof j.expiresAt === 'string' ? new Date(j.expiresAt).getTime() : j.expiresAt;
        localStorage.setItem('admin_token', JSON.stringify({ token, expiresAt: expiresMs }));
        // dispatch both a CustomEvent with detail and a plain Event to ensure listeners catch it
        try {
          window.dispatchEvent(new CustomEvent('session-extended', { detail: { expiresAt: expiresMs } }));
        } catch {
          // some environments may restrict CustomEvent construction
          try { window.dispatchEvent(new Event('session-extended')); } catch { /* ignore */ }
        }
        // Also trigger a storage event fallback by writing then removing a sentinel key
        try { localStorage.setItem('admin_token_updated', String(Date.now())); localStorage.removeItem('admin_token_updated'); } catch {}
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

  // In the final stretch the dialog re-shows itself every tick, so hide the
  // dismiss control rather than leaving a button that appears to do nothing.
  const isFinalCall = remainingMs <= FINAL_CALL_MS;
  const totalSeconds = Math.max(1, Math.ceil(remainingMs / 1000));
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const countdown =
    mins > 0
      ? `${mins} minute${mins !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`
      : `${secs} second${secs !== 1 ? 's' : ''}`;

  const dismiss = () => { dismissedRef.current = true; setVisible(false); };

  return (
    // `data-session-warning` marks this subtree as non-interaction: the admin page
    // extends the session on any click/keypress, and dismissing this dialog must not
    // count as activity. See app/admin/page.tsx.
    <div className="fixed inset-0 z-50" data-session-warning>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative inset-0 flex items-end md:items-center justify-center p-4 sm:p-6">
        <div className="w-auto max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto pointer-events-auto bg-black border border-gray-700 rounded-lg p-3 sm:p-4 shadow-2xl overflow-hidden">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-yellow-400" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Session expiring</div>
              <div className="text-sm text-gray-300">Your session will expire in {countdown}.</div>
              <div className="mt-3 flex gap-2">
                <button onClick={handleExtend} className="inline-flex items-center gap-2 px-3 py-2 bg-[#FDB813] text-black rounded-md hover:bg-[#e5a711] transition"> <RefreshCw size={14} /> Extend session</button>
                {!isFinalCall && (
                  <button
                    onClick={dismiss}
                    title="Hide this warning without extending your session"
                    className="px-3 py-2 bg-transparent border border-gray-600 text-gray-200 rounded-md hover:bg-gray-800 transition"
                  >
                    Ignore
                  </button>
                )}
                <button onClick={() => onLogout()} className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"> Logout</button>
              </div>
            </div>
            {!isFinalCall && (
              <button
                aria-label="Ignore"
                onClick={dismiss}
                className="text-gray-400 hover:text-gray-200 ml-2 mt-1"
              >
                <X />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionWarning;
