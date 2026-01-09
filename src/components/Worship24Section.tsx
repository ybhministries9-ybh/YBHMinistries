"use client";

import { useRef, useState, memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DateInput from './ui/date-input';

const LIMITS = { name: 100, email: 254, phone: 30, location: 200, message: 2000, facebook: 300 };

function generateTimeslots(): string[] {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const start = new Date(0,0,0,hour,min,0);
      const end = new Date(0,0,0,hour, min + 30, 0);
      const fmt = (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
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
  const [status, setStatus] = useState<{ submitted: boolean; message?: string }>({ submitted: false });

  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', message: '', date: '', timeslot: '', facebook: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string,string>>({});

  const timeslots = useMemo(() => generateTimeslots(), []);

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
    else if (data.phone.trim().length < 7) errs.phone = t('contactForm.validation.phoneMin');

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
    const value = e.target.value;
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
      const res = await fetch('/api/worship24', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ submitted: false, message: data?.error || 'Failed' });
      } else {
        setStatus({ submitted: true, message: 'Request received' });
        if (formRef.current) formRef.current.reset();
        setForm({ name: '', email: '', phone: '', location: '', message: '', date: '', timeslot: '', facebook: '' });
      }
    } catch (err) {
      setStatus({ submitted: false, message: 'Server error' });
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = Object.keys(validate(form)).length === 0;

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
        <h2 className="mb-4 text-3xl md:text-4xl text-white">{t('tabs.worship24', { defaultValue: '24hrs Worship' })} Booking</h2>
        <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
        <p className="text-lg text-white">{t('contactForm.worship24_description', { name: t('tabs.worship24', { defaultValue: '24hrs Worship' }), defaultValue: `Book a slot for the ${t('tabs.worship24', { defaultValue: '24hrs Worship' })} event (2nd Saturday of each month).` })}</p>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <form ref={formRef} onSubmit={handleSubmit} className="p-8 rounded-lg bg-[#2E2E2E] border border-gray-800">
          {status.submitted ? (
            <div ref={successRef} tabIndex={-1} className="py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4">
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="24" cy="24" r="20" fill={accentColor} />
                  <path d="M14 24l6 6 14-14" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <p className="mb-4 text-xl font-semibold text-white">{status.message}</p>
              <button
                type="button"
                onClick={() => {
                  if (formRef.current) formRef.current.reset();
                  setForm({ name: '', email: '', phone: '', location: '', message: '', date: '', timeslot: '', facebook: '' });
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
                  <p className="text-sm text-gray-400">{form.phone.length}/{LIMITS.phone}</p>
                </div>
                <input value={form.phone} onChange={handleChange('phone')} onBlur={handleBlur('phone')} maxLength={LIMITS.phone}
                  placeholder={t('contactForm.phonePlaceholder', { defaultValue: 'e.g. +1 555 555 5555' })}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}/>
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
                <label className="font-medium text-white">{t('contactForm.selectDateLabel', { defaultValue: 'Select Date (2nd Saturday)' })} <span className="text-yellow-400">*</span></label>
                <DateInput value={form.date} onChange={(v) => { setForm((s) => ({ ...s, date: v })); setErrors(validate({ ...form, date: v })); }}
                  isDateDisabled={(d: Date) => {
                    const now = new Date();
                    // disable previous months
                    if (d.getFullYear() < now.getFullYear() || (d.getFullYear() === now.getFullYear() && d.getMonth() < now.getMonth())) return true;
                    // must be Saturday
                    if (d.getDay() !== 6) return true;
                    // compute second saturday
                    const first = new Date(d.getFullYear(), d.getMonth(), 1);
                    const firstSatOffset = (6 - first.getDay() + 7) % 7;
                    const firstSatDate = 1 + firstSatOffset;
                    const secondSatDate = firstSatDate + 7;
                    return d.getDate() !== secondSatDate;
                  }}
                />
                <p className="text-sm text-red-400">{touched.date && errors.date ? errors.date : ''}</p>
              </div>

              <div>
                <label className="font-medium text-white">{t('contactForm.timeslot', { defaultValue: 'Timeslot' })} <span className="text-yellow-400">*</span></label>
                <select value={form.timeslot} onChange={handleChange('timeslot')} onBlur={handleBlur('timeslot')}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.timeslot ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}>
                  <option value="">{t('contactForm.timeslotPlaceholder', { defaultValue: 'Select a timeslot' })}</option>
                  {timeslots.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
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

                <button type="button" onClick={() => { if (formRef.current) formRef.current.reset(); setForm({ name: '', email: '', phone: '', location: '', message: '', date: '', timeslot: '', facebook: '' }); }}
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
