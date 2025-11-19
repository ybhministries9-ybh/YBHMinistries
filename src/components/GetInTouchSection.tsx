"use client";

import { useRef, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

export const GetInTouchSection = memo(({ accentColor = '#FDB813', contactId = 'contact' }: { accentColor?: string; contactId?: string }) => {
  const { t } = useTranslation('contact');
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const [formStatus, setFormStatus] = useState({ submitted: false, message: "" });
  const [submitting, setSubmitting] = useState(false);

  // Form state + validation
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false, location: false, message: false });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; location?: string; message?: string }>({});

  const LIMITS = { name: 100, email: 254, phone: 30, location: 200, message: 1000 };

  const validate = (data: { name: string; email: string; phone?: string; location?: string; message: string }) => {
    const errs: { name?: string; email?: string; phone?: string; location?: string; message?: string } = {};

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

    // Phone (required)
    if (!data.phone || data.phone.trim().length === 0) {
      errs.phone = t('contactForm.validation.phoneRequired') || 'Phone is required.';
    } else {
      const phoneTrim = data.phone.trim();
      if (phoneTrim.length < 7) errs.phone = t('contactForm.validation.phoneMin') || 'Phone number is too short.';
      else if (phoneTrim.length > LIMITS.phone) errs.phone = t('contactForm.validation.phoneMax') || 'Phone number is too long.';
      else {
        const phoneRe = /^[0-9+()\-\.\s]+$/;
        if (!phoneRe.test(phoneTrim)) errs.phone = t('contactForm.validation.phoneInvalid') || 'Phone number contains invalid characters.';
      }
    }

    // Message
    if (!data.message || data.message.trim().length === 0) errs.message = t('contactForm.validation.messageRequired');
    else if (data.message.trim().length < 10) errs.message = t('contactForm.validation.messageMin');
    else if (data.message.length > LIMITS.message) errs.message = t('contactForm.validation.messageMax');

    return errs;
  };

  const handleChange = (field: 'name' | 'email' | 'phone' | 'location' | 'message') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((s) => ({ ...s, [field]: value }));
    // live-validate only that field for responsiveness
    const newData = { ...formData, [field]: value };
    const nextErrors = validate(newData);
    setErrors(nextErrors);
  };

  const handleBlur = (field: 'name' | 'email' | 'phone' | 'location' | 'message') => () => {
    setTouched((s) => ({ ...s, [field]: true }));
    const nextErrors = validate(formData);
    setErrors(nextErrors);
  };

  const isValid = Object.keys(validate(formData)).length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/get-in-touch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
      setFormData({ name: '', email: '', phone: '', location: '', message: '' });
    } catch (err) {
      setFormStatus({ submitted: false, message: t('contactForm.error') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id={contactId} className="pt-6 pb-8">
      <div className="max-w-3xl mx-auto mb-12 text-center px-4">
        <h2 className="mb-4 text-3xl md:text-4xl text-white">{t('contactForm.title', { defaultValue: 'Get in touch' })}</h2>
        <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
        <p className="text-lg text-white">{t('contactForm.subtitle', { defaultValue: 'Have a question or want to collaborate? Send us a message.' })}</p>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <form ref={contactFormRef} onSubmit={handleSubmit} className="p-8 rounded-lg bg-[#2E2E2E] border border-gray-800">
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
                className="px-6 py-2 rounded-md text-black font-bold transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              >
                {t('contactForm.sendAnother')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1">
                  <span className="font-medium text-white">{t('contactForm.name', { defaultValue: 'Full Name' })} <span className="text-yellow-400">*</span></span>
                </label>
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
                  placeholder={t('contactForm.namePlaceholder')}
                  placeholder={t('contactForm.namePlaceholder', { defaultValue: '' })}
                />
                <div className="mt-1 flex items-center justify-between">
                  <p id="name-error" className={`text-sm ${touched.name && errors.name ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.name && errors.name ? errors.name : ''}
                  </p>
                  <p className="text-sm text-gray-400">{formData.name.length}/{LIMITS.name}</p>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-1">
                  <span className="font-medium text-white">{t('contactForm.phone', { defaultValue: 'Phone Number' })} <span className="text-yellow-400">*</span></span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  maxLength={LIMITS.phone}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
                  aria-required={true}
                  required
                  className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-700 focus:border-[#FDB813]'}`}
                  placeholder={t('contactForm.phonePlaceholder', { defaultValue: 'e.g. +1 555 555 5555' })}
                />
                <div className="mt-1 flex items-center justify-between">
                  <p id="phone-error" className={`text-sm ${touched.phone && errors.phone ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.phone && errors.phone ? errors.phone : ''}
                  </p>
                  <p className="text-sm text-gray-400">{formData.phone.length}/{LIMITS.phone}</p>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1">
                  <span className="font-medium text-white">{t('contactForm.email', { defaultValue: 'Email-id' })}</span>
                </label>
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
                <div className="mt-1 flex items-center justify-between">
                  <p id="email-error" className={`text-sm ${touched.email && errors.email ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.email && errors.email ? errors.email : ''}
                  </p>
                  <p className="text-sm text-gray-400">{formData.email.length}/{LIMITS.email}</p>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="mb-1">
                  <span className="font-medium text-white">{t('contactForm.location', { defaultValue: 'Location' })}</span>
                </label>
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
                <div className="mt-1 flex items-center justify-between">
                  <p id="location-error" className={`text-sm ${touched.location && errors.location ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.location && errors.location ? errors.location : ''}
                  </p>
                  <p className="text-sm text-gray-400">{formData.location.length}/{LIMITS.location}</p>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1">
                  <span className="font-medium text-white">{t('contactForm.message', { defaultValue: 'Message' })} <span className="text-yellow-400">*</span></span>
                </label>
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
                <div className="mt-1 flex items-center justify-between">
                  <p id="message-error" className={`text-sm ${touched.message && errors.message ? 'text-red-400' : 'text-gray-400'}`}>
                    {touched.message && errors.message ? errors.message : ''}
                  </p>
                  <p className="text-sm text-gray-400">{formData.message.length}/{LIMITS.message}</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid || submitting}
                className={`w-full px-6 py-3 rounded-md shadow-md hover:shadow-lg text-black font-bold transition-all duration-300 text-center ${(!isValid || submitting) ? 'opacity-60 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: accentColor }}
              >
                {submitting ? t('contactForm.sending') : t('contactForm.send')}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
});

GetInTouchSection.displayName = 'GetInTouchSection';

export default GetInTouchSection;
