"use client";

import { useRef, useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRY_CODES } from '../lib/countryCodes';

export const GetInTouchSection = memo(({ accentColor = '#FDB813', contactId = 'contact' }: { accentColor?: string; contactId?: string }) => {
  const { t } = useTranslation('contact');
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const [formStatus, setFormStatus] = useState({ submitted: false, message: "" });
  const [submitting, setSubmitting] = useState(false);

  // use shared country-code list from lib

  const [formData, setFormData] = useState({ name: '', email: '', countryCode: '+91', phone: '', location: '', message: '', hearAboutUs: '', otherHearAboutUs: '' });
  // Track selected country by index so option values are unique and stable
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(() => {
    const idx = COUNTRY_CODES.findIndex(c => c.code === '+91');
    return idx >= 0 ? idx : 0;
  });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false, location: false, message: false, hearAboutUs: false, otherHearAboutUs: false });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; location?: string; message?: string; hearAboutUs?: string; otherHearAboutUs?: string }>({});

  const LIMITS = { name: 100, email: 254, phone: 10, location: 200, message: 1000 };

  const validate = (data: { name: string; email: string; phone?: string; location?: string; message: string; hearAboutUs?: string; otherHearAboutUs?: string }) => {
    const errs: { name?: string; email?: string; phone?: string; location?: string; message?: string; hearAboutUs?: string; otherHearAboutUs?: string } = {};

    // Name
    if (!data.name || data.name.trim().length === 0) errs.name = t('contactForm.validation.nameRequired');
    else if (data.name.trim().length < 2) errs.name = t('contactForm.validation.nameMin');
    else if (data.name.length > LIMITS.name) errs.name = t('contactForm.validation.nameMax');

    // Email (optional)
    if (data.email && data.email.trim().length > 0) {
      if (data.email.length > LIMITS.email) errs.email = t('contactForm.validation.emailMax');
      else {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(data.email)) errs.email = t('contactForm.validation.emailInvalid');
      }
    }

    // Location (optional)
    if (data.location && data.location.trim().length > 0) {
      if (data.location.trim().length < 2) errs.location = t('contactForm.validation.locationMin');
      else if (data.location.length > LIMITS.location) errs.location = t('contactForm.validation.locationMax');
    }

    // Phone (required) - must be exactly 10 digits (no spaces or special chars) and country code chosen separately
    if (!data.phone || data.phone.trim().length === 0) {
      errs.phone = t('contactForm.validation.phoneRequired') || 'Phone is required.';
    } else {
      const phoneTrim = data.phone.trim();
      const digitsOnly = phoneTrim.replace(/\D/g, '');
      if (digitsOnly.length !== LIMITS.phone) errs.phone = t('contactForm.validation.phoneExact', { count: LIMITS.phone }) || `Phone number must be ${LIMITS.phone} digits.`;
      else if (!/^\d{10}$/.test(digitsOnly)) errs.phone = t('contactForm.validation.phoneInvalid') || 'Phone number contains invalid characters.';
    }

    // Message
    if (!data.message || data.message.trim().length === 0) errs.message = t('contactForm.validation.messageRequired');
    else if (data.message.trim().length < 10) errs.message = t('contactForm.validation.messageMin');
    else if (data.message.length > LIMITS.message) errs.message = t('contactForm.validation.messageMax');

    // How did you hear about us? (required)
    if (!data.hearAboutUs) {
      errs.hearAboutUs = t('contactForm.validation.hearAboutUsRequired', { defaultValue: 'This field is required.' });
    } else if (data.hearAboutUs === 'Other' && (!data.otherHearAboutUs || data.otherHearAboutUs.trim().length === 0)) {
      errs.otherHearAboutUs = t('contactForm.validation.otherHearAboutUsRequired', { defaultValue: 'Please specify.' });
    } else if (data.otherHearAboutUs && data.otherHearAboutUs.length > 20) {
      errs.otherHearAboutUs = t('contactForm.validation.otherHearAboutUsMax', { defaultValue: 'Maximum 20 characters allowed.' });
    }

    return errs;
  };

  const handleChange = (field: 'name' | 'email' | 'countryCode' | 'phone' | 'location' | 'message' | 'hearAboutUs' | 'otherHearAboutUs') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const rawValue = e.target.value;
    let value = rawValue;
    // For phone field enforce digits-only and max length
    if (field === 'phone') {
      value = value.replace(/\D/g, '').slice(0, LIMITS.phone);
    }
    // If the countryCode select changed, rawValue will be the option index (string)
    if (field === 'countryCode') {
      const idx = parseInt(rawValue, 10);
      if (!isNaN(idx) && COUNTRY_CODES[idx]) {
        setSelectedCountryIndex(idx);
        value = COUNTRY_CODES[idx].code;
      } else {
        // fallback: support legacy raw code value
        value = rawValue;
      }
    }
    setFormData((s) => ({ ...s, [field]: value }));
    // live-validate only that field for responsiveness
    const newData = { ...formData, [field]: value };
    const nextErrors = validate(newData);
    setErrors(nextErrors);
  };

  const handleBlur = (field: 'name' | 'email' | 'phone' | 'location' | 'message' | 'hearAboutUs' | 'otherHearAboutUs') => () => {
    setTouched((s) => ({ ...s, [field]: true }));
    const nextErrors = validate(formData);
    setErrors(nextErrors);
  };

  const isValid = Object.keys(validate(formData)).length === 0;

  // Detect small screens (Tailwind `sm` breakpoint = 640px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(!!('matches' in e ? e.matches : mq.matches));
    onChange(mq);
    if (mq.addEventListener) mq.addEventListener('change', onChange as any);
    else mq.addListener(onChange as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange as any);
      else mq.removeListener(onChange as any);
    };
  }, []);

  const shortCountry = (name: string) => {
    const trimmed = name.trim();
    if (trimmed.length <= 12) return trimmed;
    const words = trimmed.split(/\s+/).filter(Boolean);
    if (words.length === 1) return trimmed.slice(0, 12);
    const acronym = words.map(w => w[0].toUpperCase()).join('');
    if (acronym.length <= 4) return acronym;
    return acronym.slice(0, 4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, location: true, message: true, hearAboutUs: true, otherHearAboutUs: true });
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
            try {
              const combinedPhone = `${formData.countryCode || ''}${(formData.phone || '').replace(/\D/g, '')}`;
              const payload = { ...formData, phone: combinedPhone };
              const res = await fetch('/api/get-in-touch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              });
      const data = await res.json();
      if (!res.ok) {
        setFormStatus({ submitted: false, message: data?.error || t('contactForm.error') });
        setSubmitting(false);
        return;
      }

      setFormStatus({ submitted: true, message: t('contactForm.success') });
      if (contactFormRef.current) contactFormRef.current.reset();
      // reset all form fields (include `phone` and `location`) to avoid undefined values
      setFormData({ name: '', email: '', countryCode: '+91', phone: '', location: '', message: '', hearAboutUs: '', otherHearAboutUs: '' });
      // reset selected index to default (+91)
      const defaultIdx = COUNTRY_CODES.findIndex(c => c.code === '+91');
      setSelectedCountryIndex(defaultIdx >= 0 ? defaultIdx : 0);
    } catch (err) {
      setFormStatus({ submitted: false, message: t('contactForm.error') });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    if (contactFormRef.current) contactFormRef.current.reset();
    setFormData({ name: '', email: '', countryCode: '+91', phone: '', location: '', message: '', hearAboutUs: '', otherHearAboutUs: '' });
    const defaultIdx = COUNTRY_CODES.findIndex(c => c.code === '+91');
    setSelectedCountryIndex(defaultIdx >= 0 ? defaultIdx : 0);
    setTouched({ name: false, email: false, phone: false, location: false, message: false, hearAboutUs: false, otherHearAboutUs: false });
    setErrors({});
    setFormStatus({ submitted: false, message: '' });
  };

  return (
    <section id={contactId} className="pt-6 pb-8">
      <div className="max-w-3xl mx-auto mb-12 text-center px-4">
        <h2 className="mb-4 text-3xl md:text-4xl text-white">{t('contactForm.title', { defaultValue: 'Get in touch' })}</h2>
        <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
        <p className="text-lg text-white">{t('contactForm.subtitle', { defaultValue: 'Have a question or want to collaborate? Send us a message.' })}</p>
      </div>

      <div className="max-w-4xl mx-auto px-1 sm:px-4">
        <form ref={contactFormRef} onSubmit={handleSubmit} className="p-3 sm:p-8 rounded-lg bg-[#2E2E2E] border border-gray-800">
          {formStatus.submitted ? (
            <div className="py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full" style={{ backgroundColor: accentColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p className="mb-4 text-xl font-semibold text-white">{formStatus.message}</p>
              <button
                type="button"
                onClick={() => setFormStatus({ submitted: false, message: "" })}
                aria-label={t('contactForm.sendAnother', { defaultValue: 'Send another message' })}
                className="px-6 py-2 rounded-full text-black font-bold transition-all duration-300 shadow-md inline-flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                {t('contactForm.sendAnother')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="name">
                    <span className="font-medium text-white">{t('contactForm.name', { defaultValue: 'Full Name' })} <span className="text-yellow-400">*</span></span>
                  </label>
                  <p className="text-sm text-gray-400">{formData.name.length}/{LIMITS.name}</p>
                </div>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  maxLength={LIMITS.name}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : 'name-help'}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}
                  placeholder={t('contactForm.namePlaceholder', { defaultValue: '' })}
                />
                <div className="mt-1">
                  <p id="name-error" className={`text-sm ${touched.name && errors.name ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.name && errors.name ? errors.name : ''}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="phone">
                    <span className="font-medium text-white">{t('contactForm.phone', { defaultValue: 'Phone Number' })} <span className="text-yellow-400">*</span></span>
                  </label>
                  <p className="text-sm text-gray-400">{formData.phone.replace(/\D/g, '').length}/{LIMITS.phone}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={String(selectedCountryIndex)}
                    onChange={handleChange('countryCode')}
                    className="bg-black border border-gray-700 text-white rounded-md px-3 py-3 focus:outline-none w-40 md:w-1/2 lg:w-1/2 flex-shrink-0"
                    aria-label={t('contactForm.countryCode', { defaultValue: 'Country code' })}
                  >
                      {COUNTRY_CODES.map((c, idx) => {
                        const label = c.label;
                        return (
                          <option key={`${c.code}-${idx}`} value={String(idx)}>{label}</option>
                        );
                      })}
                  </select>

                  <input
                    id="phone"
                    name="phone"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
                    aria-required={true}
                    required
                    className={`flex-1 min-w-0 md:w-1/2 px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}
                    placeholder={t('contactForm.phonePlaceholder', { defaultValue: 'e.g. 1234567890' })}
                  />
                </div>
                <div className="mt-1">
                  <p id="phone-error" className={`text-sm ${touched.phone && errors.phone ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.phone && errors.phone ? errors.phone : ''}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="email">
                    <span className="font-medium text-white">{t('contactForm.email', { defaultValue: 'Email-id' })}</span>
                  </label>
                  <p className="text-sm text-gray-400">{formData.email.length}/{LIMITS.email}</p>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  maxLength={LIMITS.email}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : 'email-help'}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}
                  placeholder={t('contactForm.emailPlaceholder', { defaultValue: '' })}
                />
                <div className="mt-1">
                  <p id="email-error" className={`text-sm ${touched.email && errors.email ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.email && errors.email ? errors.email : ''}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="location">
                    <span className="font-medium text-white">{t('contactForm.location', { defaultValue: 'Location' })}</span>
                  </label>
                  <p className="text-sm text-gray-400">{formData.location.length}/{LIMITS.location}</p>
                </div>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange('location')}
                  onBlur={handleBlur('location')}
                  maxLength={LIMITS.location}
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? 'location-error' : 'location-help'}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.location ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}
                  placeholder={t('contactForm.locationPlaceholder', { defaultValue: '' })}
                />
                <div className="mt-1">
                  <p id="location-error" className={`text-sm ${touched.location && errors.location ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.location && errors.location ? errors.location : ''}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="hearAboutUs">
                    <span className="font-medium text-white">{t('contactForm.hearAboutUs', { defaultValue: 'How did you hear about us?' })} <span className="text-yellow-400">*</span></span>
                  </label>
                </div>
                <select
                  id="hearAboutUs"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleChange('hearAboutUs')}
                  onBlur={handleBlur('hearAboutUs')}
                  aria-invalid={!!errors.hearAboutUs}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.hearAboutUs ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}
                >
                  <option value="">{t('contactForm.selectOption', { defaultValue: 'Select an option' })}</option>
                  <option value="Facebook">{t('contactForm.hearOptions.facebook', { defaultValue: 'Facebook' })}</option>
                  <option value="Instagram">{t('contactForm.hearOptions.instagram', { defaultValue: 'Instagram' })}</option>
                  <option value="YouTube">{t('contactForm.hearOptions.youtube', { defaultValue: 'YouTube' })}</option>
                  <option value="TV Program">{t('contactForm.hearOptions.tvProgram', { defaultValue: 'TV Program' })}</option>
                  <option value="Friend or Family">{t('contactForm.hearOptions.friend', { defaultValue: 'Friend or Family' })}</option>
                  <option value="Event or Conference">{t('contactForm.hearOptions.event', { defaultValue: 'Event or Conference' })}</option>
                  <option value="Flyer or Poster">{t('contactForm.hearOptions.flyer', { defaultValue: 'Flyer or Poster' })}</option>
                  <option value="YBH Website">{t('contactForm.hearOptions.website', { defaultValue: 'YBH Website' })}</option>
                  <option value="Other">{t('contactForm.hearOptions.other', { defaultValue: 'Other (Please specify)' })}</option>
                </select>
                <div className="mt-1">
                  <p id="hearAboutUs-error" className={`text-sm ${touched.hearAboutUs && errors.hearAboutUs ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.hearAboutUs && errors.hearAboutUs ? errors.hearAboutUs : ''}
                  </p>
                </div>
              </div>

              {formData.hearAboutUs === 'Other' && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label htmlFor="otherHearAboutUs">
                      <span className="font-medium text-white">{t('contactForm.otherHearAboutUs', { defaultValue: 'Please specify' })} <span className="text-yellow-400">*</span></span>
                    </label>
                    <p className="text-sm text-gray-400">{formData.otherHearAboutUs.length}/20</p>
                  </div>
                  <input
                    id="otherHearAboutUs"
                    name="otherHearAboutUs"
                    value={formData.otherHearAboutUs}
                    onChange={handleChange('otherHearAboutUs')}
                    onBlur={handleBlur('otherHearAboutUs')}
                    maxLength={20}
                    aria-invalid={!!errors.otherHearAboutUs}
                    className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.otherHearAboutUs ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}
                  />
                  <div className="mt-1">
                    <p id="otherHearAboutUs-error" className={`text-sm ${touched.otherHearAboutUs && errors.otherHearAboutUs ? 'text-red-400' : 'text-gray-400'}`}>
                      {touched.otherHearAboutUs && errors.otherHearAboutUs ? errors.otherHearAboutUs : ''}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="message">
                    <span className="font-medium text-white">{t('contactForm.message', { defaultValue: 'Message' })} <span className="text-yellow-400">*</span></span>
                  </label>
                  <p className="text-sm text-gray-400">{formData.message.length}/{LIMITS.message}</p>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange('message')}
                  onBlur={handleBlur('message')}
                  rows={5}
                  maxLength={LIMITS.message}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : 'message-help'}
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}
                  placeholder={t('contactForm.messagePlaceholder', { defaultValue: '' })}
                ></textarea>
                                {/* Preview removed per request */}
                <div className="mt-1">
                  <p id="message-error" className={`text-sm ${touched.message && errors.message ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.message && errors.message ? errors.message : ''}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  aria-label={t('contactForm.sendMessage', { defaultValue: 'Send Message' })}
                  className={`flex-1 py-2 px-4 text-sm bg-[#FDB813] cursor-pointer shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 inline-flex items-center justify-center ${(!isValid || submitting) ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {submitting ? t('contactForm.sending') : t('contactForm.sendMessage', { defaultValue: 'Send Message' })}
                </button>

                <button
                  type="button"
                  onClick={handleResetForm}
                  disabled={submitting}
                  aria-label={t('contactForm.resetButton', { defaultValue: 'Reset Form' })}
                  className={`flex-1 py-2 px-4 text-sm bg-black cursor-pointer font-semibold text-white rounded-full border-2 border-[#FDB813] transition-colors duration-200 ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#111]'}`}
                >
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

GetInTouchSection.displayName = 'GetInTouchSection';

export default GetInTouchSection;
