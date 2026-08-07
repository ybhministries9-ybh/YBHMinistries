"use client";

import { useRef, useState, memo, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRY_CODES } from '../lib/countryCodes';

const LIMITS = { name: 100, email: 254, phone: 10, location: 200, message: 2000, facebook: 300 };

// Maximum number of timeslots a single booking may reserve for one date.
// The limit applies per date — selections on one date do not consume the
// allowance of another date.
const MAX_SLOTS_PER_DAY = 4;

// How many upcoming booking dates (2nd Saturdays) are offered
const MONTHS_OFFERED = 3;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shared, immutable empty array so memos keyed on it stay referentially stable
const NO_SLOTS: readonly string[] = Object.freeze([]);

// Intl formatters are expensive to construct; build each one once
const TIME_FORMAT = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
const LONG_DATE_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
const MONTH_YEAR_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

/** The 48 half-hour timeslots of a day, e.g. "12:00 AM to 12:30 AM" */
const TIMESLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const start = TIME_FORMAT.format(new Date(0, 0, 0, hour, min, 0)).toUpperCase();
      const end = TIME_FORMAT.format(new Date(0, 0, 0, hour, min + 30, 0)).toUpperCase();
      slots.push(`${start} to ${end}`);
    }
  }
  return slots;
})();

/** slot -> position in the day, used for O(1) validity checks and chronological ordering */
const TIMESLOT_INDEX: ReadonlyMap<string, number> = new Map(TIMESLOTS.map((s, i) => [s, i]));

const SLOT_GROUPS = [
  { key: 'g1', label: '12 AM to 6 AM Slots', slots: TIMESLOTS.slice(0, 12) },
  { key: 'g2', label: '6 AM to 12 PM Slots', slots: TIMESLOTS.slice(12, 24) },
  { key: 'g3', label: '12 PM to 6 PM Slots', slots: TIMESLOTS.slice(24, 36) },
  { key: 'g4', label: '6 PM to 12 AM Slots', slots: TIMESLOTS.slice(36, 48) },
] as const;

function toYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** The 2nd Saturday of the given month */
function secondSaturdayOfMonth(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const firstSatDate = 1 + ((6 - first.getDay() + 7) % 7);
  return new Date(year, monthIndex, firstSatDate + 7);
}

function isSecondSaturday(dateStr: string) {
  if (!dateStr) return false;
  const d = new Date(dateStr + 'T00:00:00');
  if (Number.isNaN(d.getTime()) || d.getDay() !== 6) return false;
  return d.getDate() === secondSaturdayOfMonth(d.getFullYear(), d.getMonth()).getDate();
}

function formatDatePretty(raw?: string) {
  if (!raw) return '';
  const [year, month, day] = raw.split('-').map(Number);
  if (!year || !month || !day) return raw;
  const d = new Date(year, month - 1, day);
  return Number.isNaN(d.getTime()) ? raw : LONG_DATE_FORMAT.format(d);
}

function monthYearIsBeforeCurrent(dateStr: string) {
  if (!dateStr) return true;
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  // compare year and month only
  if (d.getFullYear() < now.getFullYear()) return true;
  return d.getFullYear() === now.getFullYear() && d.getMonth() < now.getMonth();
}

type Worship24Form = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  location: string;
  message: string;
  /** The date currently shown in the slot picker */
  date: string;
  /** Selected timeslots keyed by booking date (YYYY-MM-DD) */
  slotsByDate: Record<string, string[]>;
  facebook: string;
  hp: string;
};

const EMPTY_FORM: Worship24Form = {
  name: '',
  email: '',
  countryCode: '+91',
  phone: '',
  location: '',
  message: '',
  date: '',
  slotsByDate: {},
  facebook: '',
  hp: '',
};

/**
 * Flatten the selection map into an ordered list of dates, each with its slots
 * already sorted chronologically. Dates with no slots are dropped.
 */
function buildSelections(slotsByDate: Record<string, string[]>) {
  return Object.keys(slotsByDate)
    .filter((d) => (slotsByDate[d] || []).length > 0)
    .sort()
    .map((date) => ({ date, timeslots: slotsByDate[date] }));
}

export const Worship24Section = memo(({ accentColor = '#FDB813' }: { accentColor?: string }) => {
  const { t } = useTranslation('contact');
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ submitted: boolean; message?: string }>({
    submitted: false,
  });

  // use shared country-code list from lib
  const [form, setForm] = useState<Worship24Form>({ ...EMPTY_FORM });
  // selected country option index to avoid duplicate option values (e.g. +1)
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(() => {
    const idx = COUNTRY_CODES.findIndex(c => c.code === '+91');
    return idx >= 0 ? idx : 0;
  });
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [openGroup, setOpenGroup] = useState<string | null>(null);
  // Booked slots cached per date so switching between dates does not refetch
  const [bookedByDate, setBookedByDate] = useState<Record<string, readonly string[]>>({});

  const bookedSlotsSet = useMemo(
    () => new Set(bookedByDate[form.date] ?? NO_SLOTS),
    [bookedByDate, form.date]
  );
  const availableSlotCountsByGroup = useMemo(() => {
    const map = new Map<string, number>();
    for (const group of SLOT_GROUPS) {
      let available = 0;
      for (const slot of group.slots) if (!bookedSlotsSet.has(slot)) available++;
      map.set(group.key, available);
    }
    return map;
  }, [bookedSlotsSet]);

  // Selections for the date currently shown in the picker
  const selectedSlotSet = useMemo(
    () => new Set(form.slotsByDate[form.date] ?? NO_SLOTS),
    [form.slotsByDate, form.date]
  );
  const selectedSlotCount = selectedSlotSet.size;
  const limitReached = selectedSlotCount >= MAX_SLOTS_PER_DAY;

  // Ordered view of every date that has selections — drives the summary,
  // the month badges and the submitted payload.
  const selections = useMemo(() => buildSelections(form.slotsByDate), [form.slotsByDate]);
  const totalSlots = useMemo(
    () => selections.reduce((sum, s) => sum + s.timeslots.length, 0),
    [selections]
  );

  const validate = useCallback((data: Worship24Form) => {
    const errs: Record<string, string> = {};
    if (!data.name || data.name.trim().length < 2) errs.name = t('contactForm.validation.nameRequired');
    else if (data.name.length > LIMITS.name) errs.name = t('contactForm.validation.nameMax');

    if (data.email) {
      if (data.email.length > LIMITS.email) errs.email = t('contactForm.validation.emailMax');
      else if (!EMAIL_RE.test(data.email)) errs.email = t('contactForm.validation.emailInvalid');
    }

    if (!data.phone || data.phone.trim().length === 0) errs.phone = t('contactForm.validation.phoneRequired');
    else if (data.phone.replace(/\D/g, '').length !== LIMITS.phone) {
      errs.phone = t('contactForm.validation.phoneExact', { count: LIMITS.phone }) || t('contactForm.validation.phoneMin');
    }

    // Date — every date carrying selections must be a valid booking date.
    // Before anything is selected, the active date is checked instead.
    const dated = buildSelections(data.slotsByDate);
    const datesToCheck = dated.length > 0 ? dated.map((s) => s.date) : (data.date ? [data.date] : []);
    if (datesToCheck.length === 0) errs.date = String(t('contactForm.validation.worship24_dateRequired'));
    else {
      for (const d of datesToCheck) {
        if (monthYearIsBeforeCurrent(d)) { errs.date = String(t('contactForm.validation.worship24_previousMonth')); break; }
        if (!isSecondSaturday(d)) { errs.date = String(t('contactForm.validation.worship24_secondSaturday')); break; }
      }
    }

    // Timeslots — at least one overall, and at most MAX_SLOTS_PER_DAY on any single date
    if (dated.length === 0) {
      errs.timeslot = String(t('contactForm.validation.worship24_timeslotRequired'));
    } else {
      for (const { timeslots } of dated) {
        if (timeslots.some((s) => !TIMESLOT_INDEX.has(s))) {
          errs.timeslot = String(t('contactForm.validation.worship24_timeslotInvalid'));
          break;
        }
        if (timeslots.length > MAX_SLOTS_PER_DAY) {
          errs.timeslot = String(t('contactForm.validation.worship24_timeslotMax', {
            max: MAX_SLOTS_PER_DAY,
            defaultValue: `You can select up to ${MAX_SLOTS_PER_DAY} slots per date`,
          }));
          break;
        }
      }
    }

    // Facebook (mandatory)
    if (!data.facebook || data.facebook.trim().length === 0) errs.facebook = String(t('contactForm.validation.worship24_facebookRequired'));
    else if (data.facebook.length > LIMITS.facebook) errs.facebook = String(t('contactForm.validation.worship24_facebookTooLong'));
    else {
      try { new URL(data.facebook); } catch { errs.facebook = String(t('contactForm.validation.worship24_facebookInvalid')); }
    }

    // Message is optional for Worship24; no length validation applied

    return errs;
  }, [t]);

  // Errors are derived, not stored — one validation pass per form change
  const errors = useMemo(() => validate(form), [validate, form]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleChange = (field: keyof Worship24Form) => (e: { target: { value: string } }) => {
    let value = e.target.value;
    if (field === 'phone') {
      value = value.replace(/\D/g, '').slice(0, LIMITS.phone);
    }
    // the countryCode select submits the option index, not the code itself
    if (field === 'countryCode') {
      const idx = Number.parseInt(value, 10);
      if (!Number.isNaN(idx) && COUNTRY_CODES[idx]) {
        setSelectedCountryIndex(idx);
        value = COUNTRY_CODES[idx].code;
      }
    }
    setForm((s) => ({ ...s, [field]: value }));
  };

  /**
   * Toggle a slot for a given date, keeping each date's slots in chronological
   * order. The per-date limit is independent of every other date.
   */
  const toggleSlotForDate = useCallback((date: string, slot: string) => {
    if (!date || !TIMESLOT_INDEX.has(slot)) return;
    setTouched((tch) => (tch.timeslot ? tch : { ...tch, timeslot: true }));
    setForm((f) => {
      const current = f.slotsByDate[date] ?? [];
      const isSelected = current.includes(slot);
      // at the limit for this date – ignore attempts to add more slots
      if (!isSelected && current.length >= MAX_SLOTS_PER_DAY) return f;
      const nextSlots = isSelected
        ? current.filter((x) => x !== slot)
        : [...current, slot].sort((a, b) => (TIMESLOT_INDEX.get(a) ?? 0) - (TIMESLOT_INDEX.get(b) ?? 0));
      const slotsByDate = { ...f.slotsByDate };
      if (nextSlots.length > 0) slotsByDate[date] = nextSlots;
      else delete slotsByDate[date];
      return { ...f, slotsByDate };
    });
  }, []);

  /** Remove every selection for a date (used by the summary's "clear" action) */
  const clearDate = useCallback((date: string) => {
    setTouched((tch) => (tch.timeslot ? tch : { ...tch, timeslot: true }));
    setForm((f) => {
      if (!f.slotsByDate[date]) return f;
      const slotsByDate = { ...f.slotsByDate };
      delete slotsByDate[date];
      return { ...f, slotsByDate };
    });
  }, []);

  const handleBlur = (field: keyof Worship24Form) => () => {
    setTouched((s) => (s[field] ? s : { ...s, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true, date: true, timeslot: true, facebook: true });
    if (!isValid || submitting) return;
    setSubmitting(true);
    try {
      // attempt to get reCAPTCHA token for worship24
      let recaptchaToken: string | null = null;
      try {
        const { getRecaptchaToken } = await import('@/lib/recaptcha');
        recaptchaToken = await getRecaptchaToken('worship24');
      } catch { recaptchaToken = null; }

      const payload = {
        name: form.name,
        email: form.email,
        phone: `${form.countryCode}${form.phone.replace(/\D/g, '')}`,
        location: form.location,
        message: form.message,
        facebook: form.facebook,
        hp: form.hp,
        // one entry per date, each with its own (max 4) timeslots
        selections,
        recaptchaToken,
      };
      const res = await fetch('/api/worship24', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ submitted: false, message: data?.error || 'Failed' });
      } else {
        setStatus({ submitted: true });
        formRef.current?.reset();
        setForm({ ...EMPTY_FORM });
        setTouched({});
      }
    } catch {
      setStatus({ submitted: false, message: 'Server error' });
    } finally {
      setSubmitting(false);
    }
  };

  /** The next few bookable dates (2nd Saturday of each month) */
  const monthOptions = useMemo(() => {
    const now = new Date();
    const currentSecondSat = secondSaturdayOfMonth(now.getFullYear(), now.getMonth());
    // once this month's date has passed, start from next month
    const startMonthIndex = now.getTime() >= currentSecondSat.getTime() ? now.getMonth() + 1 : now.getMonth();

    return Array.from({ length: MONTHS_OFFERED }, (_, i) => {
      const m = new Date(now.getFullYear(), startMonthIndex + i, 1);
      return {
        label: MONTH_YEAR_FORMAT.format(m),
        bookingDate: toYmd(secondSaturdayOfMonth(m.getFullYear(), m.getMonth())),
      };
    });
  }, []);

  // Default the picker to the first bookable date
  useEffect(() => {
    setForm((s) => (s.date || monthOptions.length === 0 ? s : { ...s, date: monthOptions[0].bookingDate }));
  }, [monthOptions]);

  // Fetch booked slots for the active date so they can be disabled in the UI.
  // Results are cached per date, so previously visited dates are not refetched.
  useEffect(() => {
    const date = form.date;
    if (!date) return;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`/api/worship24?date=${encodeURIComponent(date)}`, { signal: controller.signal });
        const data = await res.json();
        if (controller.signal.aborted) return;

        const booked: string[] = data?.success && Array.isArray(data.booked)
          ? data.booked.map(String)
          : [];
        setBookedByDate((prev) => ({ ...prev, [date]: booked }));

        // drop any selections for this date that were taken in the meantime
        if (booked.length > 0) {
          const bookedSet = new Set(booked);
          setForm((f) => {
            const current = f.slotsByDate[date];
            if (!current) return f;
            const kept = current.filter((s) => !bookedSet.has(s));
            if (kept.length === current.length) return f;
            const slotsByDate = { ...f.slotsByDate };
            if (kept.length > 0) slotsByDate[date] = kept;
            else delete slotsByDate[date];
            return { ...f, slotsByDate };
          });
        }
      } catch {
        // network/abort failures leave the date uncached so it can be retried
      }
    })();

    return () => controller.abort();
  }, [form.date]);

  useEffect(() => {
    if (status.submitted) {
      try {
        if (typeof window !== 'undefined' && window.scrollTo) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch {}
      try { successRef.current?.focus(); } catch {}
    }
  }, [status.submitted]);

  return (
    <section className="pt-6 pb-8">
      <div className="max-w-3xl mx-auto mb-12 text-center px-4">
        <h2 className="mb-4 text-3xl md:text-4xl text-white">{t('tabs.worship24', { defaultValue: '24 Hours Worship' })} Booking</h2>
        <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
        <p className="text-lg text-white">{t('contactForm.worship24_description', { name: t('tabs.worship24', { defaultValue: '24 Hours Worship' }), defaultValue: `Book a slot for the ${t('tabs.worship24', { defaultValue: '24 Hours Worship' })} event (2nd Saturday of each month).` })}</p>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <form ref={formRef} onSubmit={handleSubmit} className="p-4 md:p-8 rounded-lg bg-[#2E2E2E] border border-gray-800">
          <input type="text" name="hp" value={form.hp} onChange={(e) => setForm(s => ({ ...s, hp: e.target.value }))} autoComplete="off" tabIndex={-1} style={{ display: 'none' }} aria-hidden />
          {status.submitted ? (
            <div ref={successRef} tabIndex={-1} className="py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4">
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="24" cy="24" r="20" fill={accentColor} />
                  <path d="M14 24l6 6 14-14" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <p className="mb-4 text-xl font-semibold text-white">
                {t('worship24.bookingSuccessMessage', {
                  defaultValue:
                    'Thank you for booking your slot. We will review your request and get back to you shortly.',
                })}
              </p>
              <button
                type="button"
                  onClick={() => {
                  formRef.current?.reset();
                  setForm({ ...EMPTY_FORM });
                  setTouched({});
                  setStatus({ submitted: false, message: '' });
                  // focus first input after returning to the form
                  setTimeout(() => { try { nameInputRef.current?.focus(); } catch {} }, 50);
                }}
                aria-label={t('worship24.bookAnother', { defaultValue: 'Book Another' })}
                className="px-6 py-2 rounded-full text-black font-bold transition-all duration-300 shadow-md inline-flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: accentColor }}
              >
                {t('worship24.bookAnother', { defaultValue: 'Book Another' })}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-medium text-white">{t('contactForm.name', { defaultValue: 'Full Name' })} <span className="text-yellow-400">*</span></label>
                  <p className="text-sm text-gray-400">{form.name.length}/{LIMITS.name}</p>
                </div>
                <input ref={nameInputRef} value={form.name} onChange={handleChange('name')} onBlur={handleBlur('name')} maxLength={LIMITS.name}
                  placeholder={t('contactForm.namePlaceholder', { defaultValue: 'Enter your name' })}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}/>
                <p className="text-sm text-red-400">{touched.name && errors.name ? errors.name : ''}</p>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-medium text-white">{t('contactForm.phone', { defaultValue: 'Phone' })} <span className="text-yellow-400">*</span></label>
                  <p className="text-sm text-gray-400">{String(form.phone).replace(/\D/g,'').length}/{LIMITS.phone}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <select value={String(selectedCountryIndex)} onChange={handleChange('countryCode')} className="bg-black border border-gray-700 text-white rounded-md px-3 py-3 focus:outline-none w-40 md:w-1/2 lg:w-1/2 flex-shrink-0">
                    {COUNTRY_CODES.map((c, idx) => {
                      const label = c.label;
                      return <option key={`${c.code}-${idx}`} value={String(idx)}>{label}</option>;
                    })}
                  </select>
                  <input value={form.phone} onChange={handleChange('phone')} onBlur={handleBlur('phone')}
                    inputMode="numeric" pattern="[0-9]*" placeholder={t('contactForm.phonePlaceholder', { defaultValue: 'e.g. 1234567890' })}
                    className={`flex-1 min-w-0 md:w-1/2 px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}/>
                </div>
                <p className="text-sm text-red-400">{touched.phone && errors.phone ? errors.phone : ''}</p>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-medium text-white">{t('contactForm.email', { defaultValue: 'Email' })}</label>
                  <p className="text-sm text-gray-400">{form.email.length}/{LIMITS.email}</p>
                </div>
                <input value={form.email} onChange={handleChange('email')} onBlur={handleBlur('email')} type="email" maxLength={LIMITS.email}
                  placeholder={t('contactForm.emailPlaceholder', { defaultValue: 'yourname@example.com' })}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}/>
                <p className="text-sm text-red-400">{touched.email && errors.email ? errors.email : ''}</p>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-medium text-white">{t('contactForm.location', { defaultValue: 'Location' })}</label>
                  <p className="text-sm text-gray-400">{form.location.length}/{LIMITS.location}</p>
                </div>
                <input value={form.location} onChange={handleChange('location')} onBlur={handleBlur('location')} maxLength={LIMITS.location}
                  placeholder={t('contactForm.locationPlaceholder', { defaultValue: 'City, State or Country (optional)' })}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.location ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}/>
              </div>


              <div>
                <label className="font-medium text-white">
                  {t('contactForm.selectDateLabel', { defaultValue: 'Select Month' })}{' '}
                  <span className="text-yellow-400">*</span>
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {monthOptions.map((m) => {
                    const active = form.date === m.bookingDate;
                    const count = form.slotsByDate[m.bookingDate]?.length ?? 0;
                    return (
                      <button
                        key={m.bookingDate}
                        type="button"
                        onClick={() => {
                          // Switching dates keeps every existing selection
                          setForm((s) => (s.date === m.bookingDate ? s : { ...s, date: m.bookingDate }));
                          setTouched((tch) => (tch.date ? tch : { ...tch, date: true }));
                        }}
                        className={`rounded px-4 py-2 text-sm font-medium transition-colors inline-flex items-center gap-2 ${
                          active ? 'bg-[#FDB813] text-black' : `bg-[#333] text-white border hover:bg-[#444] ${count > 0 ? 'border-[#FDB813]' : 'border-gray-600'}`
                        }`}
                        title={`2nd Saturday: ${m.bookingDate}`}
                      >
                        {m.label}
                        {count > 0 ? (
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${active ? 'bg-black/20 text-black' : 'bg-[#FDB813] text-black'}`}>
                            {count}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  {form.date ? `2nd Saturday: ${formatDatePretty(form.date)}` : ''}
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  {t('contactForm.worship24_multiDateHint', {
                    max: MAX_SLOTS_PER_DAY,
                    defaultValue: `You can book more than one date. Each date allows up to ${MAX_SLOTS_PER_DAY} slots, and switching dates keeps your earlier selections.`,
                  })}
                </p>
                <p className="text-sm text-red-400">{touched.date && errors.date ? errors.date : ''}</p>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-medium text-white">
                    {t('contactForm.timeslot', { defaultValue: 'Timeslot' })} <span className="text-yellow-400">*</span>
                    {form.date ? <span className="ml-2 text-sm font-normal text-gray-300">{formatDatePretty(form.date)}</span> : null}
                  </label>
                  <p className="text-sm text-gray-400">
                    {t('contactForm.worship24_slotsSelected', {
                      selected: selectedSlotCount,
                      max: MAX_SLOTS_PER_DAY,
                      defaultValue: `${selectedSlotCount} of ${MAX_SLOTS_PER_DAY} slots selected`,
                    })}
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {t('contactForm.worship24_slotsHint', {
                    max: MAX_SLOTS_PER_DAY,
                    defaultValue: `You can select up to ${MAX_SLOTS_PER_DAY} slots for this date.`,
                  })}
                </p>
                <div className="space-y-3 mt-2">
                  {SLOT_GROUPS.map((group) => (
                    <div key={group.key} className="bg-black/10 rounded-md border border-gray-700">
                      <button
                        type="button"
                        aria-expanded={openGroup === group.key}
                        onClick={() => setOpenGroup(openGroup === group.key ? null : group.key)}
                        className="w-full flex items-center justify-between px-3 py-2 text-left text-white font-medium"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="truncate">{group.label}</span>
                          <span className="shrink-0 text-xs text-gray-300">
                            ({availableSlotCountsByGroup.get(group.key) ?? 0} available)
                          </span>
                        </span>
                        <svg className={`w-5 h-5 transform transition-transform ${openGroup === group.key ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M5 8l5 5 5-5" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {openGroup === group.key ? (
                        <div className="px-3 pb-3 mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {group.slots.map((slot) => {
                              const isSelected = selectedSlotSet.has(slot);
                              const isTaken = bookedSlotsSet.has(slot);
                              const isBlockedByLimit = !isSelected && !isTaken && limitReached;
                              const isDisabled = isTaken || isBlockedByLimit;
                              const labelClass = `flex items-center px-3 py-2 rounded-md border transition-colors ${isDisabled ? 'bg-gray-800 text-gray-400 border-gray-600 opacity-60 cursor-not-allowed' : (isSelected ? 'bg-[#FDB813] text-black border-[#FDB813] cursor-pointer' : 'bg-black border-gray-700 hover:border-[#FDB813] text-white cursor-pointer')}`;
                              return (
                                <label key={slot} className={labelClass} aria-disabled={isDisabled}>
                                  <input
                                    type="checkbox"
                                    name="timeslots"
                                    value={slot}
                                    checked={isSelected}
                                    disabled={isDisabled}
                                    onChange={() => { if (!isDisabled) toggleSlotForDate(form.date, slot); }}
                                    className="form-checkbox accent-[#FDB813] mr-2"
                                  />
                                  <span className="flex items-center gap-2 w-full min-w-0">
                                    <span className="flex-1 min-w-0 truncate">{slot}</span>
                                    {isTaken ? (
                                      <span className="shrink-0 rounded-full bg-gray-700/80 px-2 py-0.5 text-sm sm:text-base text-gray-200 leading-none whitespace-nowrap">
                                        N/A
                                      </span>
                                    ) : null}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                {selections.length > 0 ? (
                  <div className="mt-4 rounded-md border border-gray-700 bg-black/20 p-3">
                    <p className="mb-2 text-sm font-medium text-white">
                      {t('contactForm.worship24_summaryTitle', {
                        total: totalSlots,
                        dates: selections.length,
                        defaultValue: `Your selection — ${totalSlots} slot(s) across ${selections.length} date(s)`,
                      })}
                    </p>
                    <div className="space-y-3">
                      {selections.map(({ date, timeslots: slotsForDate }) => {
                        const prettyDate = formatDatePretty(date);
                        return (
                          <div key={date}>
                            <div className="mb-1 flex items-center justify-between gap-2">
                              <span className="text-sm text-gray-200">
                                {prettyDate}{' '}
                                <span className="text-gray-400">({slotsForDate.length}/{MAX_SLOTS_PER_DAY})</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => clearDate(date)}
                                className="text-xs text-gray-400 underline hover:text-white cursor-pointer"
                              >
                                {t('contactForm.worship24_clearDate', { defaultValue: 'Clear' })}
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {slotsForDate.map((slot) => (
                                <span key={slot} className="inline-flex items-center gap-2 rounded-full bg-[#FDB813] px-3 py-1 text-sm font-medium text-black">
                                  {slot}
                                  <button
                                    type="button"
                                    onClick={() => toggleSlotForDate(date, slot)}
                                    aria-label={`Remove ${slot} on ${prettyDate}`}
                                    className="leading-none text-black/70 hover:text-black cursor-pointer"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
                <p className="text-sm text-red-400">{touched.timeslot && errors.timeslot ? errors.timeslot : ''}</p>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-medium text-white">{t('contactForm.facebookLink', { defaultValue: 'Facebook Link' })} <span className="text-yellow-400">*</span></label>
                  <p className="text-sm text-gray-400">{form.facebook.length}/{LIMITS.facebook}</p>
                </div>
                <input value={form.facebook} onChange={handleChange('facebook')} onBlur={handleBlur('facebook')} maxLength={LIMITS.facebook}
                  placeholder={t('contactForm.facebookPlaceholder', { defaultValue: 'https://facebook.com/yourpage' })}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.facebook ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}/>
                <p className="text-sm text-red-400">{touched.facebook && errors.facebook ? errors.facebook : ''}</p>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-medium text-white">{t('contactForm.message', { defaultValue: 'Message' })}</label>
                  <p className="text-sm text-gray-400">{form.message.length} chars</p>
                </div>
                <textarea value={form.message} onChange={handleChange('message')} onBlur={handleBlur('message')} rows={4}
                  placeholder={t('contactForm.messagePlaceholder', { defaultValue: 'Write your message here' })}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}></textarea>
                <p className="text-sm text-red-400">{touched.message && errors.message ? errors.message : ''}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button type="submit" disabled={!isValid || submitting}
                  className={`flex-1 py-2 px-4 text-sm bg-[#FDB813] cursor-pointer shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 inline-flex items-center justify-center ${(!isValid || submitting) ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
                  {submitting ? t('contactForm.sending', { defaultValue: 'Sending...' }) : t('contactForm.submitBooking', { defaultValue: 'Submit Booking' })}
                </button>

                <button type="button" onClick={() => { formRef.current?.reset(); setForm({ ...EMPTY_FORM }); setTouched({}); }}
                  className="flex-1 py-2 px-4 text-sm bg-black cursor-pointer font-semibold text-white rounded-full border-2 border-[#FDB813] transition-colors duration-200 hover:bg-[#111]">
                  {t('contactForm.resetButton', { defaultValue: 'Reset Form' })}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
});

Worship24Section.displayName = 'Worship24Section';

export default Worship24Section;
