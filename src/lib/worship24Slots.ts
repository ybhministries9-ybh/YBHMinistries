// Single source of truth for the 24 Hours Worship booking grid.
//
// Imported by the public booking form (src/components/Worship24Section.tsx),
// the admin slot viewer (src/components/admin/ManageSlots.tsx) and the booking
// API (app/api/worship24/route.ts). Timeslot strings produced here must match
// exactly what is stored in the `worship24.timeslot` column, and the date rules
// must agree between client and server — keeping one implementation is what
// guarantees that.

/**
 * The event runs on India time. "Today" is always resolved in this zone so that
 * every visitor sees the same booking dates regardless of their device's
 * timezone, and so the server (which runs in UTC) agrees with the browser.
 */
export const EVENT_TIME_ZONE = 'Asia/Kolkata';

/** Maximum timeslots one booking may reserve on a single date. Applied per date. */
export const MAX_SLOTS_PER_DAY = 4;

/** How many upcoming booking dates (2nd Saturdays) are offered at a time. */
export const MONTHS_OFFERED = 3;

// Intl formatters are expensive to construct; build each one once.
const TIME_FORMAT = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
const LONG_DATE_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
const MONTH_YEAR_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
// en-CA renders as YYYY-MM-DD, matching the format used for booking dates
const EVENT_ZONE_YMD_FORMAT = new Intl.DateTimeFormat('en-CA', {
  timeZone: EVENT_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * The 48 fixed 30-minute timeslots of a day, in chronological order, e.g.
 * "12:00 AM to 12:30 AM", "12:30 AM to 1:00 AM", ... "11:30 PM to 12:00 AM".
 */
export const WORSHIP24_TIMESLOTS: readonly string[] = Object.freeze(
  Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const min = (i % 2) * 30;
    const start = TIME_FORMAT.format(new Date(0, 0, 0, hour, min)).toUpperCase();
    const end = TIME_FORMAT.format(new Date(0, 0, 0, hour, min + 30)).toUpperCase();
    return `${start} to ${end}`;
  })
);

/** slot -> position in the day. Gives O(1) validity checks and chronological sorting. */
export const TIMESLOT_INDEX: ReadonlyMap<string, number> = new Map(
  WORSHIP24_TIMESLOTS.map((slot, i) => [slot, i])
);

/** The 48 slots split into the four collapsible six-hour groups shown in the UI. */
export const WORSHIP24_SLOT_GROUPS = Object.freeze([
  { key: 'g1', label: '12 AM to 6 AM Slots', slots: WORSHIP24_TIMESLOTS.slice(0, 12) },
  { key: 'g2', label: '6 AM to 12 PM Slots', slots: WORSHIP24_TIMESLOTS.slice(12, 24) },
  { key: 'g3', label: '12 PM to 6 PM Slots', slots: WORSHIP24_TIMESLOTS.slice(24, 36) },
  { key: 'g4', label: '6 PM to 12 AM Slots', slots: WORSHIP24_TIMESLOTS.slice(36, 48) },
]);

/** Formats a Date as YYYY-MM-DD from its calendar components (no timezone shift). */
export function toYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** The 2nd Saturday of the given year and 0-indexed month. */
export function secondSaturdayOfMonth(year: number, monthIndex: number): Date {
  const first = new Date(year, monthIndex, 1);
  const firstSatDate = 1 + ((6 - first.getDay() + 7) % 7);
  return new Date(year, monthIndex, firstSatDate + 7);
}

/** Today's calendar date in the event's timezone, not the caller's. */
export function todayInEventZone(): { year: number; monthIndex: number; ymd: string } {
  const ymd = EVENT_ZONE_YMD_FORMAT.format(new Date());
  const [year, month] = ymd.split('-').map(Number);
  return { year, monthIndex: month - 1, ymd };
}

/** Splits a YYYY-MM-DD string into numeric parts, or null when malformed. */
function parseYmd(dateStr: string): { year: number; month: number; day: number } | null {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day || month < 1 || month > 12) return null;
  return { year, month, day };
}

/**
 * Whether a YYYY-MM-DD string is the 2nd Saturday of its own month.
 * Compares calendar components directly — parsing to a Date and reading it back
 * would resolve against the running environment's timezone.
 */
export function isSecondSaturday(dateStr: string): boolean {
  const parts = parseYmd(dateStr);
  if (!parts) return false;
  return parts.day === secondSaturdayOfMonth(parts.year, parts.month - 1).getDate();
}

/** Whether a booking date falls in a month earlier than the current one. */
export function isBeforeCurrentMonth(dateStr: string): boolean {
  const parts = parseYmd(dateStr);
  if (!parts) return true;
  const today = todayInEventZone();
  if (parts.year < today.year) return true;
  return parts.year === today.year && parts.month - 1 < today.monthIndex;
}

/** Formats a YYYY-MM-DD string for display, e.g. "August 08, 2026". */
export function formatDatePretty(dateStr?: string): string {
  if (!dateStr) return '';
  const parts = parseYmd(dateStr);
  if (!parts) return dateStr;
  return LONG_DATE_FORMAT.format(new Date(parts.year, parts.month - 1, parts.day));
}

export type MonthOption = { label: string; bookingDate: string };

/**
 * The bookable dates on offer, one per month, each being that month's 2nd Saturday.
 *
 * The current month is kept for the whole of its 2nd Saturday — the event runs
 * all that day, so it must stay selectable until the date has fully passed.
 * Comparing YYYY-MM-DD strings avoids any wall-clock or timezone drift.
 *
 * @param includePastCurrentMonth keep the current month even once its date has
 *   passed. Used by the admin viewer, which looks back at what was booked.
 */
export function buildMonthOptions(includePastCurrentMonth = false): MonthOption[] {
  const today = todayInEventZone();
  const currentSecondSat = toYmd(secondSaturdayOfMonth(today.year, today.monthIndex));
  const startOffset = !includePastCurrentMonth && today.ymd > currentSecondSat ? 1 : 0;

  return Array.from({ length: MONTHS_OFFERED }, (_, i) => {
    const m = new Date(today.year, today.monthIndex + startOffset + i, 1);
    return {
      label: MONTH_YEAR_FORMAT.format(m),
      bookingDate: toYmd(secondSaturdayOfMonth(m.getFullYear(), m.getMonth())),
    };
  });
}
