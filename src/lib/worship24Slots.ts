// Shared helpers for the 24 Hours Worship timeslot grid.
// Kept in sync with the slot generation used on the public booking form
// (src/components/Worship24Section.tsx) and the admin slot viewer
// (src/components/admin/ManageSlots.tsx) so timeslot strings match exactly
// what is stored in the `worship24.timeslot` column.

/**
 * Generates the 48 fixed 30-minute timeslots for a 24-hour day, e.g.
 * "12:00 AM to 12:30 AM", "12:30 AM to 1:00 AM", ... "11:30 PM to 12:00 AM".
 */
export function generateWorship24Timeslots(): string[] {
  const slots: string[] = [];
  const fmt = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const start = new Date(0, 0, 0, hour, min, 0);
      const end = new Date(0, 0, 0, hour, min + 30, 0);
      slots.push(`${fmt(start)} to ${fmt(end)}`);
    }
  }
  return slots;
}

/** Cached list of all 48 timeslots (order matches the day's chronological order). */
export const WORSHIP24_TIMESLOTS: readonly string[] = Object.freeze(generateWorship24Timeslots());

/** Returns the Date of the 2nd Saturday for the given year and 0-indexed month. */
export function getSecondSaturday(year: number, monthIndex: number): Date {
  const first = new Date(year, monthIndex, 1);
  const firstSatOffset = (6 - first.getDay() + 7) % 7;
  const firstSatDate = 1 + firstSatOffset;
  const secondSatDate = firstSatDate + 7;
  return new Date(year, monthIndex, secondSatDate);
}

/** Formats a Date as YYYY-MM-DD (local time, no timezone conversion). */
export function toYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
