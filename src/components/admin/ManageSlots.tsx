"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import DateInput from '@/components/ui/date-input';

type Worship24Row = {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  timeslot: string;
  status: string;
};

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
  const timeslots = useMemo(() => generateTimeslots(), []);
  const groups = useMemo(() => groupSlots(timeslots), [timeslots]);
  const [date, setDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Record<string, Worship24Row> | null>(null);

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

  const releaseBooking = async (id: number) => {
    if (!confirm('Mark this booking as Archived (release slot)?')) return;
    try {
      const resp = await fetch('/api/admin/worship24', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(getAuthHeader() as any) },
        body: JSON.stringify({ id, updates: { status: 'Archived' } }),
      });

      if (!resp.ok) {
        const j = await resp.json().catch(() => null);
        alert('Failed to update booking: ' + (j?.error || resp.statusText));
        return;
      }

      const map = await fetchBookingsForDate(date);
      if (map !== null) setBookings(map);
    } catch {
      alert('Server error');
    }
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-[#1f1f1f] p-4">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-lg font-semibold text-white">Manage Slots</h3>
        {onClose && (
          <div className="ml-auto flex items-center gap-2">
            <button onClick={onClose} className="rounded border border-gray-600 bg-[#333] px-3 py-2 text-white">
              Back
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-300">Select date</label>
        <div className="mt-2">
          <DateInput
            value={date}
            onChange={(v: string) => setDate(v)}
            yearStart={new Date().getFullYear()}
            yearEnd={new Date().getFullYear() + 1}
            isDateDisabled={(d: Date) => {
              const now = new Date();
              if (d.getFullYear() < now.getFullYear() || (d.getFullYear() === now.getFullYear() && d.getMonth() < now.getMonth())) {
                return true;
              }
              if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() < now.getDate()) return true;
              if (d.getDay() !== 6) return true;

              const first = new Date(d.getFullYear(), d.getMonth(), 1);
              const firstSatOffset = (6 - first.getDay() + 7) % 7;
              const firstSatDate = 1 + firstSatOffset;
              const secondSatDate = firstSatDate + 7;
              return d.getDate() !== secondSatDate;
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-gray-300">Loading slots...</div>
      ) : (
        <div className="space-y-4">
          {groups.map((g) => (
            <div key={g.key} className="rounded-md border border-gray-700 bg-[#111] p-3">
              <div className="mb-2 font-medium text-white">{g.label}</div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {g.slots.map((slot) => {
                  const rec = bookings ? (bookings[slot] || null) : null;
                  if (rec) {
                    return (
                      <div key={slot} className="flex items-start justify-between rounded-md bg-[#FDB813] p-3 text-black">
                        <div>
                          <div className="font-semibold">{slot}</div>
                          <div className="text-xs">
                            {rec.name} · {rec.phone}
                          </div>
                          <div className="text-xs">{rec.email || ''}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs">{rec.status}</div>
                          <button
                            onClick={() => releaseBooking(rec.id)}
                            className="mt-2 rounded bg-black px-2 py-1 text-white"
                          >
                            Release
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
