"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

type Worship24Row = {
  id: number;
  name: string;
  facebook_link: string | null;
  timeslot: string;
  status: string;
};

function getStatusPillClass(status?: string) {
  const s = (status || 'Submitted').trim() || 'Submitted';
  const base = 'inline-flex rounded-full px-3 py-1 text-xs font-semibold border';
  if (s === 'Accepted') return `${base} bg-blue-600 text-white border-blue-600`;
  if (s === 'Rejected') return `${base} bg-red-600 text-white border-red-600`;
  if (s === 'Archived') return `${base} bg-gray-600 text-white border-gray-600`;
  return `${base} bg-yellow-400 text-black border-yellow-400`;
}

function isSlotsResponse(value: unknown): value is { success: true; data: unknown[] } {
  if (!value || typeof value !== 'object') return false;
  if (!('success' in value) || (value as { success?: unknown }).success !== true) return false;
  if (!('data' in value) || !Array.isArray((value as { data?: unknown }).data)) return false;
  return true;
}

function generateTimeslots(): string[] {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const start = new Date(0, 0, 0, hour, min, 0);
      const end = new Date(0, 0, 0, hour, min + 30, 0);
      const fmt = (d: Date) =>
        d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
      slots.push(`${fmt(start)} to ${fmt(end)}`);
    }
  }
  return slots;
}

function groupSlots(timeslots: string[]) {
  return [
    { key: 'g1', label: '12 AM to 6 AM Slots', slots: timeslots.slice(0, 12) },
    { key: 'g2', label: '6 AM to 12 PM Slots', slots: timeslots.slice(12, 24) },
    { key: 'g3', label: '12 PM to 6 PM Slots', slots: timeslots.slice(24, 36) },
    { key: 'g4', label: '6 PM to 12 AM Slots', slots: timeslots.slice(36, 48) },
  ];
}

function formatMonthYear(d: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(d);
}

function formatDatePretty(raw?: string) {
  if (!raw) return '';
  try {
    const [year, month, day] = raw.split('-').map(Number);
    if (!year || !month || !day) return raw;
    const d = new Date(year, month - 1, day);
    if (Number.isNaN(d.getTime())) return raw;
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(d);
  } catch {
    return raw || '';
  }
}

function toYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function secondSaturdayOfMonth(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const firstSatOffset = (6 - first.getDay() + 7) % 7;
  const firstSatDate = 1 + firstSatOffset;
  const secondSatDate = firstSatDate + 7;
  return new Date(year, monthIndex, secondSatDate);
}

function getAuthHeader() {
  try {
    const raw = localStorage.getItem('admin_token');
    if (!raw) return {};
    let token = raw;
    try {
      const parsed = JSON.parse(raw);
      token = parsed.token || token;
    } catch {}
    return { Authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
}

export default function ManageSlots({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeslots = useMemo(() => generateTimeslots(), []);
  const groups = useMemo(() => groupSlots(timeslots), [timeslots]);
  const [date, setDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Record<string, Worship24Row> | null>(null);

  const availableCountByGroupKey = useMemo(() => {
    const map: Record<string, number> = {};
    for (const group of groups) {
      let available = 0;
      for (const slot of group.slots) {
        const isBooked = Boolean(bookings && bookings[slot]);
        if (!isBooked) available++;
      }
      map[group.key] = available;
    }
    return map;
  }, [groups, bookings]);

  const monthOptions = useMemo(() => {
    const now = new Date();
    const currentSecondSat = secondSaturdayOfMonth(now.getFullYear(), now.getMonth());
    const startMonthIndex = now.getTime() >= currentSecondSat.getTime() ? now.getMonth() + 1 : now.getMonth();

    const months: { label: string; bookingDate: string }[] = [];
    for (let i = 0; i < 3; i++) {
      const m = new Date(now.getFullYear(), startMonthIndex + i, 1);
      const secondSat = secondSaturdayOfMonth(m.getFullYear(), m.getMonth());
      months.push({
        label: formatMonthYear(m),
        bookingDate: toYmd(secondSat),
      });
    }
    return months;
  }, []);

  useEffect(() => {
    if (date || monthOptions.length === 0) return;
    const initialDate = (searchParams?.get('date') || '').trim();
    const match = initialDate ? monthOptions.find((m) => m.bookingDate === initialDate) : undefined;
    setDate(match ? match.bookingDate : monthOptions[0].bookingDate);
  }, [date, monthOptions, searchParams]);

  const fetchBookingsForDate = useCallback(async (selectedDate: string, signal?: AbortSignal) => {
    const resp = await fetch(`/api/admin/worship24/slots?date=${encodeURIComponent(selectedDate)}`, {
      headers: { 'Content-Type': 'application/json', ...(getAuthHeader() as any) },
      signal,
    });

    if (resp.status === 401) {
      alert('Unauthorized. Please log in as admin.');
      return null;
    }

    const json: unknown = await resp.json().catch(() => null);
    if (!isSlotsResponse(json)) return {};

    const map: Record<string, Worship24Row> = {};
    json.data.forEach((row: unknown) => {
      if (!row || typeof row !== 'object') return;
      const r = row as Partial<Worship24Row> & { timeslot?: unknown };
      if (!r.timeslot) return;
      map[String(r.timeslot)] = row as Worship24Row;
    });
    return map;
  }, []);

  useEffect(() => {
    let aborted = false;
    const controller = new AbortController();

    async function load() {
      if (!date) {
        setBookings(null);
        return;
      }

      setLoading(true);
      try {
        const map = await fetchBookingsForDate(date, controller.signal);
        if (aborted) return;
        if (map !== null) setBookings(map);
      } catch (e: unknown) {
        if (e && typeof e === 'object' && 'name' in e && (e as { name?: unknown }).name === 'AbortError') return;
        setBookings({});
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    load();
    return () => {
      aborted = true;
      controller.abort();
    };
  }, [date, fetchBookingsForDate]);

  return (
    <div className="rounded-lg border border-gray-700 bg-[#1f1f1f] p-4">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-lg font-semibold text-white">View 24Hrs Worship Slots</h3>
        {onClose ? (
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-600 bg-[#333] px-3 py-2 text-white cursor-pointer"
            >
              Back
            </button>
          </div>
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-sm text-gray-300">Select month</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {monthOptions.map((m) => {
            const selected = date === m.bookingDate;
            return (
              <button
                key={m.bookingDate}
                type="button"
                onClick={() => setDate(m.bookingDate)}
                className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                  selected ? 'bg-[#FDB813] text-black' : 'bg-[#333] text-white border border-gray-600 hover:bg-[#444]'
                } cursor-pointer`}
                title={`2nd Saturday: ${m.bookingDate}`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
        <div className="mt-2 text-sm text-gray-300">
          {date ? `2nd Saturday: ${formatDatePretty(date)}` : ''}
        </div>
      </div>

      {loading ? (
        <div className="text-gray-300">Loading slots...</div>
      ) : (
        <div className="space-y-4">
          {groups.map((g) => (
            <div key={g.key} className="rounded-md border border-gray-700 bg-[#111] p-3">
              <div className="mb-2 flex items-center gap-2 font-medium text-white">
                <span className="truncate">{g.label}</span>
                <span className="shrink-0 text-sm text-gray-300">({availableCountByGroupKey[g.key] ?? 0} available)</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {g.slots.map((slot) => {
                  const rec = bookings ? (bookings[slot] || null) : null;
                  if (rec) {
                    return (
                      <div
                        key={slot}
                        className="flex flex-col gap-3 rounded-md bg-[#FDB813] p-3 text-black sm:flex-row sm:items-start sm:justify-between"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold">{slot}</div>
                          <div className="text-sm font-bold">{rec.name}</div>
                          {rec.facebook_link ? (
                            <div className="flex min-w-0 items-center gap-2">
                              <a
                                href={rec.facebook_link}
                                target="_blank"
                                rel="noreferrer"
                                className="min-w-0 truncate text-xs underline underline-offset-2 opacity-90 hover:opacity-100"
                                title={rec.facebook_link}
                              >
                                {rec.facebook_link}
                              </a>
                              <button
                                type="button"
                                onClick={async () => {
                                  const url = rec.facebook_link || '';
                                  try {
                                    await navigator.clipboard.writeText(url);
                                    toast('Copied to clipboard');
                                  } catch {
                                    try {
                                      const ta = document.createElement('textarea');
                                      ta.value = url;
                                      ta.setAttribute('readonly', 'true');
                                      ta.style.position = 'fixed';
                                      ta.style.left = '-9999px';
                                      document.body.appendChild(ta);
                                      ta.select();
                                      const ok = document.execCommand('copy');
                                      document.body.removeChild(ta);
                                      if (ok) toast('Copied to clipboard');
                                      else toast('Copy failed');
                                    } catch {}
                                  }
                                }}
                                className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded bg-black/20 text-black hover:bg-black/30"
                                title="Copy Facebook URL"
                                aria-label="Copy Facebook URL"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="text-xs opacity-75">No Facebook link</div>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-2 sm:flex-col sm:items-end">
                          <div className={getStatusPillClass(rec.status)}>{rec.status}</div>
                          <button
                            type="button"
                            onClick={() => {
                              const returnTo = `/admin/contacts/worship24?subtab=slots&date=${encodeURIComponent(date)}`;
                              router.push(`/admin/contacts/worship24/${rec.id}?return=${encodeURIComponent(returnTo)}`);
                            }}
                            className="rounded bg-black px-2 py-1 text-white cursor-pointer"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={slot}
                      className="flex items-center justify-center rounded-md border border-gray-700 bg-black p-3 text-white"
                    >
                      <div className="text-sm">{slot}</div>
                      <div className="ml-2 text-xs text-gray-400">Available</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
