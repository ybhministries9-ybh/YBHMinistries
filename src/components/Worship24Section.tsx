"use client";

import { useRef, useState, memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRY_CODES } from '../lib/countryCodes';

const LIMITS = { name: 100, email: 254, phone: 10, location: 200, message: 2000, facebook: 300 };

function generateTimeslots(): string[] {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const start = new Date(0,0,0,hour,min,0);
      const end = new Date(0,0,0,hour, min + 30, 0);
      const fmt = (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
      slots.push(`${fmt(start)} to ${fmt(end)}`);
    }
  }
  return slots;
}

function isSecondSaturday(dateStr: string) {
  if (!dateStr) return false;
  const d = new Date(dateStr + 'T00:00:00');
  // get day of week (6 === Saturday)
  if (d.getDay() !== 6) return false;
  // find first day of month
  const first = new Date(d.getFullYear(), d.getMonth(), 1);
  // day index of first saturday in month
  const firstSatOffset = (6 - first.getDay() + 7) % 7;
  const firstSatDate = 1 + firstSatOffset;
  const secondSatDate = firstSatDate + 7;
  return d.getDate() === secondSatDate;
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

function monthYearIsBeforeCurrent(dateStr: string) {
  if (!dateStr) return true;
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  // compare year and month only
  if (d.getFullYear() < now.getFullYear()) return true;
  if (d.getFullYear() === now.getFullYear() && d.getMonth() < now.getMonth()) return true;
  return false;
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
  const [form, setForm] = useState({ name: '', email: '', countryCode: '+91', phone: '', location: '', message: '', date: '', timeslot: '', facebook: '', hp: '' });
  // selected country option index to avoid duplicate option values (e.g. +1)
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(() => {
    const idx = COUNTRY_CODES.findIndex(c => c.code === '+91');
    return idx >= 0 ? idx : 0;
  });
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string,string>>({});

  const timeslots = useMemo(() => generateTimeslots(), []);

  const groupedSlots = useMemo(() => {
    return [
      { key: 'g1', label: '12 AM to 6 AM Slots', slots: timeslots.slice(0, 12) },
      { key: 'g2', label: '6 AM to 12 PM Slots', slots: timeslots.slice(12, 24) },
      { key: 'g3', label: '12 PM to 6 PM Slots', slots: timeslots.slice(24, 36) },
      { key: 'g4', label: '6 PM to 12 AM Slots', slots: timeslots.slice(36, 48) },
    ];
  }, [timeslots]);

  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const validate = (data: typeof form) => {
    const errs: Record<string,string> = {};
    if (!data.name || data.name.trim().length < 2) errs.name = t('contactForm.validation.nameRequired');
    if (data.name && data.name.length > LIMITS.name) errs.name = t('contactForm.validation.nameMax');

    if (data.email && data.email.length > 0) {
      if (data.email.length > LIMITS.email) errs.email = t('contactForm.validation.emailMax');
      else {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(data.email)) errs.email = t('contactForm.validation.emailInvalid');
      }
    }

    if (!data.phone || data.phone.trim().length === 0) errs.phone = t('contactForm.validation.phoneRequired');
    else {
      const digits = String(data.phone).replace(/\D/g, '');
      if (digits.length !== LIMITS.phone) errs.phone = t('contactForm.validation.phoneExact', { count: LIMITS.phone }) || t('contactForm.validation.phoneMin');
    }

    // Date validation
    if (!data.date) errs.date = String(t('contactForm.validation.worship24_dateRequired'));
    else if (monthYearIsBeforeCurrent(data.date)) errs.date = String(t('contactForm.validation.worship24_previousMonth'));
    else if (!isSecondSaturday(data.date)) errs.date = String(t('contactForm.validation.worship24_secondSaturday'));

    // Timeslot
    if (!data.timeslot) errs.timeslot = String(t('contactForm.validation.worship24_timeslotRequired'));
    else if (!timeslots.includes(data.timeslot)) errs.timeslot = String(t('contactForm.validation.worship24_timeslotInvalid'));

    // Facebook (mandatory)
    if (!data.facebook || data.facebook.trim().length === 0) errs.facebook = String(t('contactForm.validation.worship24_facebookRequired'));
    else if (data.facebook.length > LIMITS.facebook) errs.facebook = String(t('contactForm.validation.worship24_facebookTooLong'));
    else {
      try { new URL(data.facebook); } catch (e) { errs.facebook = String(t('contactForm.validation.worship24_facebookInvalid')); }
    }

    // Message is optional for Worship24; no length validation applied

    return errs;
  };

  const handleChange = (field: keyof typeof form) => (e: any) => {
    let value = e.target.value;
    if (field === 'phone') {
      value = String(value).replace(/\D/g, '').slice(0, LIMITS.phone);
    }
    // if countryCode select changed, expect numeric index
    if (field === 'countryCode') {
      const idx = parseInt(String(value), 10);
      if (!isNaN(idx) && COUNTRY_CODES[idx]) {
        setSelectedCountryIndex(idx);
        value = COUNTRY_CODES[idx].code;
      }
    }
    setForm((s) => ({ ...s, [field]: value }));
    const next = { ...form, [field]: value };
    setErrors(validate(next));
  };

  const handleBlur = (field: keyof typeof form) => () => {
    setTouched((s) => ({ ...s, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true, date: true, timeslot: true, facebook: true });
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    try {
      const combinedPhone = `${form.countryCode || ''}${String(form.phone || '').replace(/\D/g, '')}`;
      // attempt to get reCAPTCHA token for worship24
      let recaptchaToken: string | null = null;
      try {
        const { getRecaptchaToken } = await import('@/lib/recaptcha');
        recaptchaToken = await getRecaptchaToken('worship24');
      } catch (e) { recaptchaToken = null; }
      const payload = { ...form, phone: combinedPhone, recaptchaToken };
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
        if (formRef.current) formRef.current.reset();
        setForm({ name: '', email: '', countryCode: '+91', phone: '', location: '', message: '', date: '', timeslot: '', facebook: '', hp: '' });
      }
    } catch (err) {
      setStatus({ submitted: false, message: 'Server error' });
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = Object.keys(validate(form)).length === 0;

  const monthOptions = useMemo(() => {
    const formatMonthYear = (d: Date) => new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(d);
    const toYmd = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };
    const secondSaturdayOfMonth = (year: number, monthIndex: number) => {
      const first = new Date(year, monthIndex, 1);
      const firstSatOffset = (6 - first.getDay() + 7) % 7;
      const firstSatDate = 1 + firstSatOffset;
      const secondSatDate = firstSatDate + 7;
      return new Date(year, monthIndex, secondSatDate);
    };

    const now = new Date();
    const currentSecondSat = secondSaturdayOfMonth(now.getFullYear(), now.getMonth());
    const startMonthIndex = now.getTime() >= currentSecondSat.getTime() ? now.getMonth() + 1 : now.getMonth();

    const months: { label: string; bookingDate: string }[] = [];
    for (let i = 0; i < 3; i++) {
      const m = new Date(now.getFullYear(), startMonthIndex + i, 1);
      const secondSat = secondSaturdayOfMonth(m.getFullYear(), m.getMonth());
      months.push({ label: formatMonthYear(m), bookingDate: toYmd(secondSat) });
    }
    return months;
  }, []);

  useEffect(() => {
    if (form.date || monthOptions.length === 0) return;
    const nextDate = monthOptions[0].bookingDate;
    setForm((s) => ({ ...s, date: nextDate }));
    setErrors(validate({ ...form, date: nextDate }));
  }, [form.date, monthOptions]);

  // Fetch booked slots for selected date so they can be disabled in the UI
  useEffect(() => {
    let aborted = false;
    const controller = new AbortController();
    async function load() {
      if (!form.date) {
        setBookedSlots([]);
        return;
      }
      try {
        const res = await fetch(`/api/worship24?date=${encodeURIComponent(form.date)}`, { signal: controller.signal });
        const data = await res.json();
        if (aborted) return;
        if (data && data.success && Array.isArray(data.booked)) {
          setBookedSlots(data.booked.map((s: unknown) => String(s)));
          if (form.timeslot && data.booked.includes(form.timeslot)) {
            // clear selection if it became taken
            setForm(f => ({ ...f, timeslot: '' }));
            setTouched(t => ({ ...t, timeslot: true }));
          }
        } else {
          setBookedSlots([]);
        }
      } catch (e) {
        if (!aborted) setBookedSlots([]);
      }
    }
    load();
    return () => { aborted = true; controller.abort(); };
  }, [form.date]);

  useEffect(() => {
    if (status.submitted) {
      try {
        if (typeof window !== 'undefined' && window.scrollTo) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (e) {}
      try { successRef.current?.focus(); } catch (e) {}
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
                  if (formRef.current) formRef.current.reset();
                  setForm({ name: '', email: '', countryCode: '+91', phone: '', location: '', message: '', date: '', timeslot: '', facebook: '', hp: '' });
                  setTouched({});
                  setErrors({});
                  setStatus({ submitted: false, message: '' });
                  // focus first input after returning to the form
                  setTimeout(() => { try { nameInputRef.current?.focus(); } catch (e) {} }, 50);
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
                    const selected = form.date === m.bookingDate;
                    return (
                      <button
                        key={m.bookingDate}
                        type="button"
                        onClick={() => {
                          setForm((s) => ({ ...s, date: m.bookingDate, timeslot: '' }));
                          setTouched((tch) => ({ ...tch, date: true }));
                          setErrors(validate({ ...form, date: m.bookingDate, timeslot: '' }));
                        }}
                        className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                          selected ? 'bg-[#FDB813] text-black' : 'bg-[#333] text-white border border-gray-600 hover:bg-[#444]'
                        }`}
                        title={`2nd Saturday: ${m.bookingDate}`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  {form.date ? `2nd Saturday: ${formatDatePretty(form.date)}` : ''}
                </div>
                <p className="text-sm text-red-400">{touched.date && errors.date ? errors.date : ''}</p>
              </div>

              <div>
                <label className="font-medium text-white">{t('contactForm.timeslot', { defaultValue: 'Timeslot' })} <span className="text-yellow-400">*</span></label>
                <div className="space-y-3 mt-2">
                  {groupedSlots.map((group) => (
                    <div key={group.key} className="bg-black/10 rounded-md border border-gray-700">
                      <button
                        type="button"
                        aria-expanded={openGroup === group.key}
                        onClick={() => setOpenGroup(openGroup === group.key ? null : group.key)}
                        className="w-full flex items-center justify-between px-3 py-2 text-left text-white font-medium"
                      >
                        <span>{group.label}</span>
                        <svg className={`w-5 h-5 transform transition-transform ${openGroup === group.key ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M5 8l5 5 5-5" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {openGroup === group.key ? (
                        <div className="px-3 pb-3 mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {group.slots.map((slot) => {
                              const isSelected = form.timeslot === slot;
                              const isTaken = bookedSlots.includes(slot);
                              const labelClass = `flex items-center px-3 py-2 rounded-md cursor-pointer border transition-colors ${isTaken ? 'bg-gray-800 text-gray-400 border-gray-600 opacity-60 cursor-not-allowed' : (isSelected ? 'bg-[#FDB813] text-black border-[#FDB813]' : 'bg-black border-gray-700 hover:border-[#FDB813] text-white')}`;
                              return (
                                <label key={slot} className={labelClass} aria-disabled={isTaken}>
                                  <input
                                    type="radio"
                                    name="timeslot"
                                    value={slot}
                                    checked={isSelected}
                                    disabled={isTaken}
                                    onChange={() => { if (!isTaken) { setForm(f => ({ ...f, timeslot: slot })); setTouched(t => ({ ...t, timeslot: true })); setErrors(validate({ ...form, timeslot: slot })); } }}
                                    className="form-radio accent-[#FDB813] mr-2"
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

                <button type="button" onClick={() => { if (formRef.current) formRef.current.reset(); setForm({ name: '', email: '', countryCode: '+91', phone: '', location: '', message: '', date: '', timeslot: '', facebook: '', hp: '' }); }}
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
