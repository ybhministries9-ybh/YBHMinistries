"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
// Use shared DateInput (DayPicker-based) instead of react-datepicker
import DatePicker from './ui/date-input';
import { useTranslation } from 'react-i18next';
import logger from '../lib/logger';
import { motion } from 'motion/react';

// Static option lists extracted to top-level constants to avoid re-creating arrays on each render
const PROGRAM_LEVELS = ['beginner', 'intermediate', 'advanced'];
const INSTRUMENTS = ['piano', 'guitar', 'violin', 'drums', 'vocal'];
const CLASS_TYPES = ['individual', 'group', 'online', 'inPerson'];
const SCHEDULES = ['weekdays', 'weekends', 'morning', 'evening'];
const COURSE_TYPES = ['freeBasicMusic', 'hmsWithCertificate', 'lcmWithCertificate'];
const PERFORMANCE_OPTIONS = ['schoolEvents', 'competitions', 'choir'];
const VOLUNTEER_AREAS = ['volunteerOnlineTeacher', 'volunteerOfflineConferences', 'volunteerSummerKids', 'volunteerEvents'];

// Shared constants to avoid recreating inline objects / regexes
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_PATTERN = /^[0-9]{7,15}$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

interface FormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string | Date;
  gender: string;
  address: string;
  cityStateZip: string;
  phoneNumber: string;
  countryCode?: string;
  emailId: string;
  parentGuardianName: string;
  parentGuardianContact: string;
  
  // Course Information
  programApplyingFor: string[];
  instrumentSpecialization: string[];
  instrumentOther: string;
  preferredClassType: string[];
  preferredSchedule: string[];
  
  // Course Type
  courseType: string[];
  
  // Music Background
  yearsOfExperience: string;
  previousTraining: string;
  musicExamCertifications: string;
  performanceExperience: string[];
  performanceOther: string;
  
  // Goals & Interests
  goals: string;
  
  // Volunteer
  volunteerInterested: string;
  volunteerAreas: string[];
  
  // Emergency Contact
  emergencyName: string;
  emergencyRelationship: string;
  emergencyContact: string;
  // Referral
  hearAboutUs: string;
  otherHearAboutUs?: string;
}

export function HMSStudentForm({
  onClose,
  initialData,
  submitUrl,
  submitMethod,
  onSubmitOverride
}: {
  onClose?: () => void;
  initialData?: Partial<FormData>;
  submitUrl?: string;
  submitMethod?: 'POST' | 'PUT';
  onSubmitOverride?: (data: FormData) => Promise<any>;
}) {
  const { t } = useTranslation('contact');
  const mergedDefaults: Partial<FormData> = {
    programApplyingFor: [],
    instrumentSpecialization: [],
    preferredClassType: [],
    preferredSchedule: [],
    courseType: [],
    performanceExperience: [],
    volunteerAreas: [],
    volunteerInterested: 'no',
    countryCode: '+91',
    emergencyRelationship: 'Parent',
    hearAboutUs: '',
    otherHearAboutUs: '',
    ...initialData
  };

  const { register, handleSubmit, watch, setValue, reset, control, setError, formState: { errors, isSubmitting } } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: mergedDefaults as any
  });

  // watch current values for live character counts
  const watched = watch();

  // Clear `otherHearAboutUs` whenever the selected option is not Other
  useEffect(() => {
    try {
      if ((watched as any).hearAboutUs !== 'Other') {
        setValue('otherHearAboutUs', '')
      }
    } catch (e) {}
  }, [watched?.hearAboutUs, setValue]);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formAlert, setFormAlert] = useState<{ type?: 'error' | 'info'; message?: string }>({});
  
  const [programLevels, setProgramLevels] = useState<string>(() => {
    try {
      const arr = (mergedDefaults.programApplyingFor as string[]) || [];
      return Array.isArray(arr) && arr.length > 0 ? arr[0] : '';
    } catch (e) { return ''; }
  });
  const [instruments, setInstruments] = useState<string[]>(() => (mergedDefaults.instrumentSpecialization as string[]) || []);
  const [classTypes, setClassTypes] = useState<string[]>(() => (mergedDefaults.preferredClassType as string[]) || []);
  const [schedules, setSchedules] = useState<string[]>(() => (mergedDefaults.preferredSchedule as string[]) || []);
  const [courseTypes, setCourseTypes] = useState<string[]>(() => (mergedDefaults.courseType as string[]) || []);
  const [performances, setPerformances] = useState<string[]>(() => (mergedDefaults.performanceExperience as string[]) || []);
  const [volunteerAreas, setVolunteerAreas] = useState<string[]>(() => (mergedDefaults.volunteerAreas as string[]) || []);

  const volunteerInterested = watch('volunteerInterested');

  const successRef = useRef<HTMLDivElement | null>(null);

  // stable helper to toggle values in checkbox-backed string arrays
  const toggleArray = useCallback((setter: (updater: (prev: string[]) => string[]) => void) => {
    return (value: string, checked: boolean) => {
      setter((prev: string[]) => (checked ? [...prev, value] : prev.filter((p) => p !== value)));
    };
  }, []);

  // legacy-compatible handler (kept for backwards readability) — prefer `toggleArray` for performance
  const handleCheckboxChange = (
    value: string,
    checked: boolean,
    stateArray: string[],
    setStateArray: (arr: string[]) => void
  ) => {
    if (checked) {
      setStateArray([...stateArray, value]);
    } else {
      setStateArray(stateArray.filter(item => item !== value));
    }
  };

  const handleReset = (keepSuccess = false) => {
    reset();
    setProgramLevels('');
    setInstruments([]);
    setClassTypes([]);
    setSchedules([]);
    setCourseTypes([]);
    setPerformances([]);
    setVolunteerAreas([]);
    if (!keepSuccess) setSubmitSuccess(false);
  };

  // Scroll to top of the page whenever the success panel is shown
  useEffect(() => {
    if (submitSuccess) {
      try {
        if (typeof window !== 'undefined' && window.scrollTo) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (err) {
        // ignore if scrolling is not available
      }
      // focus success panel for keyboard / screen reader users
      try {
        successRef.current?.focus();
      } catch (err) {
        // ignore
      }
    }
  }, [submitSuccess]);

  // memoize computed flags to avoid calling `t` repeatedly during renders
  const courseTypeError = useMemo(() => formAlert?.message === String(t('studentForm.validation.courseTypeRequired')), [formAlert?.message, t]);
  const programError = useMemo(() => formAlert?.message === String(t('studentForm.validation.programRequired')), [formAlert?.message, t]);
  const instrumentError = useMemo(() => formAlert?.message === String(t('studentForm.validation.instrumentRequired')), [formAlert?.message, t]);
  const classTypeError = useMemo(() => formAlert?.message === String(t('studentForm.validation.classTypeRequired')), [formAlert?.message, t]);
  const scheduleError = useMemo(() => formAlert?.message === String(t('studentForm.validation.scheduleRequired')), [formAlert?.message, t]);

  const effectiveSubmitUrl = submitUrl || '/api/hms-students';
  const effectiveSubmitMethod = submitMethod || 'POST';

  const onSubmit = async (data: FormData) => {
    try {
      // Validate checkbox arrays (show inline alert instead of toast)
      setFormAlert({});
      if (!programLevels) {
        setFormAlert({ type: 'error', message: String(t('studentForm.validation.programRequired')) });
        return;
      }
      if (instruments.length === 0) {
        setFormAlert({ type: 'error', message: String(t('studentForm.validation.instrumentRequired')) });
        return;
      }
      if (classTypes.length === 0) {
        setFormAlert({ type: 'error', message: String(t('studentForm.validation.classTypeRequired')) });
        return;
      }
      if (schedules.length === 0) {
        setFormAlert({ type: 'error', message: String(t('studentForm.validation.scheduleRequired')) });
        return;
      }
      if (courseTypes.length === 0) {
        setFormAlert({ type: 'error', message: String(t('studentForm.validation.courseTypeRequired')) });
        return;
      }

      // Add the state arrays to form data
      // send as array for server compatibility (previously multi-select)
      data.programApplyingFor = programLevels ? [programLevels] : [];
      data.instrumentSpecialization = instruments;
      data.preferredClassType = classTypes;
      data.preferredSchedule = schedules;
      data.courseType = courseTypes;
      data.performanceExperience = performances;
      data.volunteerAreas = volunteerAreas;

      // Normalize dateOfBirth to DD-MM-YYYY
      if (data.dateOfBirth instanceof Date) {
        const d = data.dateOfBirth as Date;
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = String(d.getFullYear());
        data.dateOfBirth = `${dd}-${mm}-${yyyy}`;
      } else if (ISO_DATE_REGEX.test(data.dateOfBirth as string)) {
        const parts = (data.dateOfBirth as string).split('-');
        data.dateOfBirth = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }

      // Client-side age check: ensure applicant is at least 5 years old before submitting
      try {
        const dobParts = String(data.dateOfBirth).split('-');
        if (dobParts.length === 3) {
          const dDay = Number(dobParts[0]);
          const dMonth = Number(dobParts[1]) - 1;
          const dYear = Number(dobParts[2]);
          const dobCheck = new Date(dYear, dMonth, dDay);
          if (!isNaN(dobCheck.getTime())) {
            const today = new Date();
            let age = today.getFullYear() - dobCheck.getFullYear();
            const m = today.getMonth() - dobCheck.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dobCheck.getDate())) {
              age--;
            }
            if (age < 5) {
              setError('dateOfBirth' as any, { type: 'validation', message: String(t('studentForm.validation.ageMinimum')) });
              setFormAlert({ type: 'error', message: String(t('studentForm.validation.ageMinimum')) });
              return;
            }
          }
        }
      } catch (e) {
        // ignore parsing issues here; server will validate
      }

      // Coerce conditional "other" fields to single strings so server-side zod validation won't see arrays
      try {
        // instrumentOther may come through as an array if the client produced duplicated keys — join into comma-separated string
        (data as any).instrumentOther = Array.isArray((data as any).instrumentOther)
          ? (data as any).instrumentOther.join(', ')
          : String((data as any).instrumentOther ?? '').trim();

        (data as any).performanceOther = Array.isArray((data as any).performanceOther)
          ? (data as any).performanceOther.join(', ')
          : String((data as any).performanceOther ?? '').trim();
      } catch (e) {
        // ignore, server validation will catch any remaining issues
      }

      // If caller provided an override submit handler, call it
      if (onSubmitOverride) {
        const result = await onSubmitOverride(data);
        // allow override to indicate success/failure
        if (result && result.success === false) {
          setFormAlert({ type: 'error', message: String(t('studentForm.messages.error')) });
          return;
        }
      } else {
        // Before submitting, combine country code + phone digits if present
        try {
          const cc = (data as any).countryCode || '';
          const pn = String((data as any).phoneNumber || '').replace(/\D/g, '');
          (data as any).phoneNumber = `${cc}${pn}`;
        } catch (e) {
          // ignore, server will validate
        }

        // Submit to server API (default behavior)

        const resp = await fetch(effectiveSubmitUrl, {
          method: effectiveSubmitMethod,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        // Try to parse JSON safely; handle non-JSON or empty responses.
        let result: any = null;
        try {
          result = await resp.json();
        } catch (parseErr) {
          // If parsing fails, attempt to read text for diagnostics
          let txt: string | null = null;
          try {
            txt = await resp.text();
          } catch (tErr) {
            txt = null;
          }
          // non-JSON response
          setFormAlert({ type: 'error', message: String(t('studentForm.messages.error')) });
          return;
        }
        

        if (!resp.ok) {
          // API returned an error status. If it's a validation error (zod), map to field errors.
          if (result?.error === 'validation_error' && result?.details) {
            const details = result.details;

            // Zod sometimes exposes issues array; handle that shape first
            if (Array.isArray((details as any).issues)) {
              for (const issue of (details as any).issues) {
                const path = Array.isArray(issue.path) && issue.path.length ? issue.path.join('.') : String(issue.path || '');
                const msg = String(issue.message || issue.toString || JSON.stringify(issue));
                if (path) {
                  try { setError(path as any, { type: 'server', message: msg }); } catch (e) { /* ignore */ }
                } else {
                  setFormAlert(prev => prev?.message ? prev : { type: 'error', message: msg });
                }
              }
              return;
            }

            // Some servers return an `errors` array of objects with path/message
            if (Array.isArray((details as any).errors)) {
              for (const errObj of (details as any).errors) {
                const path = Array.isArray(errObj.path) ? errObj.path.join('.') : String(errObj.path || '');
                const msg = errObj.message || errObj.msg || JSON.stringify(errObj);
                if (path) {
                  try { setError(path as any, { type: 'server', message: msg }); } catch (e) { /* ignore */ }
                } else {
                  setFormAlert(prev => prev?.message ? prev : { type: 'error', message: String(msg) });
                }
              }
              return;
            }

            // Fallback: traverse the zod-formatted object and look for _errors
            const walkAndSet = (obj: any, prefix = '') => {
              for (const key of Object.keys(obj || {})) {
                const val = obj[key];
                const fieldPath = prefix ? `${prefix}.${key}` : key;
                if (key === '_errors' && Array.isArray(obj['_errors']) && obj['_errors'].length) {
                  const msg = obj['_errors'].join(', ');
                  const target = prefix || '';
                  if (target) {
                    try { setError(target as any, { type: 'server', message: msg }); } catch (e) { /* ignore */ }
                  } else {
                    setFormAlert(prev => prev?.message ? prev : { type: 'error', message: msg });
                  }
                } else if (typeof val === 'object' && val !== null) {
                  walkAndSet(val, fieldPath);
                }
              }
            };
            walkAndSet(details, '');
            setFormAlert(prev => (prev.message ? prev : { type: 'error', message: String(t('studentForm.messages.error')) }));
            return;
          }

          logger.error('Server error response', { status: resp.status, body: result });
          setFormAlert({ type: 'error', message: String(t('studentForm.messages.error')) });
          return;
        }

        if (!result || result.success === false) {
          // If the API returned a structured validation error as success=false, try to map it too
          if (result?.error === 'validation_error' && result?.details) {
            const details = result.details;
            const walkAndSet = (obj: any, prefix = '') => {
              for (const key of Object.keys(obj || {})) {
                const val = obj[key];
                const fieldPath = prefix ? `${prefix}.${key}` : key;
                if (key === '_errors' && Array.isArray(obj['_errors']) && obj['_errors'].length) {
                  const msg = obj['_errors'].join(', ');
                  const target = prefix || '';
                  if (target) {
                    try { setError(target as any, { type: 'server', message: msg }); } catch (e) { /* ignore */ }
                  } else {
                    setFormAlert({ type: 'error', message: msg });
                  }
                } else if (typeof val === 'object' && val !== null) {
                  walkAndSet(val, fieldPath);
                }
              }
            };
            walkAndSet(details, '');
            setFormAlert(prev => (prev.message ? prev : { type: 'error', message: String(t('studentForm.messages.error')) }));
            return;
          }

          logger.error('API returned failure', result);
          setFormAlert({ type: 'error', message: String(t('studentForm.messages.error')) });
          return;
        }
      }

      // show inline success panel (no toast)
      setSubmitSuccess(true);
      // Reset the form fields/state but keep the success panel visible
      handleReset(true);
      // clear any alert messages
      setFormAlert({});
      } catch (error) {
      logger.error('Form submission error', error);
      setFormAlert({ type: 'error', message: String(t('studentForm.messages.error')) });
    }
  };

  // success message text and a short-length heuristic to decide whether to hide the form
  const successMessage = useMemo(() => String(t('studentForm.messages.success')), [t]);
  const successIsShort = useMemo(() => successMessage.length > 0 && successMessage.length <= 120, [successMessage]);

  return (
    <div className="max-w-6xl mx-auto w-full">

      {/* Show a global alert only for messages that are not handled inline */}
      {formAlert?.message && !(programError || instrumentError || classTypeError || scheduleError || courseTypeError) && (
        <div className="max-w-3xl mx-auto mb-6 px-4">
          <div className="rounded-md bg-red-600 text-white p-3 text-sm">
            {formAlert.message}
          </div>
        </div>
      )}

      {/* If the success message is short, show only the success panel and hide the form to keep focus on the message */}
      {submitSuccess && successIsShort && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="max-w-3xl mx-auto rounded-lg bg-[#2E2E2E] p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full" style={{ backgroundColor: '#FDB813' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="mb-4 text-xl font-semibold text-white">{successMessage}</p>
            <button
              type="button"
              onClick={() => {
                handleReset(false);
                setSubmitSuccess(false);
              }}
              className="px-6 py-2 rounded-full text-black font-bold transition-all duration-300 shadow-md inline-flex items-center justify-center"
              style={{ backgroundColor: '#FDB813' }}
            >
              {t('studentForm.buttons.submitAnother') || 'Submit another application'}
            </button>
          </div>
        </motion.div>
      )}

      {! (submitSuccess && successIsShort) && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* 1. Personal Information */}
        <section className="bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg">
          <h3 className="text-2xl text-white font-normal mb-2">
            {t('studentForm.sections.personalInfo')}
          </h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="fullName" className="block text-white text-sm font-medium cursor-pointer">
                    {t('studentForm.fields.fullName')} <span className="text-[#FDB813]">*</span>
                  </label>
                  <p className="text-sm text-gray-400">{(watched.fullName || '').length}/100</p>
                </div>
                <input
                  id="fullName"
                  type="text"
                  {...register('fullName', { 
                    required: t('studentForm.validation.fullNameRequired'),
                    minLength: { value: 2, message: t('studentForm.validation.fullNameMin') },
                    maxLength: { value: 100, message: t('studentForm.validation.fullNameMax') },
                    pattern: { 
                      value: /^[a-zA-Z\s.'-]+$/, 
                      message: t('studentForm.validation.fullNamePattern') 
                    }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  placeholder={t('studentForm.placeholders.fullName')}
                  maxLength={100}
                />
                <div className="mt-1">
                  {errors.fullName ? (
                    <p className="text-red-400 text-xs">{errors.fullName.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="dateOfBirth" className="block text-white text-sm font-medium mb-1 cursor-pointer">
                {t('studentForm.fields.dateOfBirth')} <span className="text-[#FDB813]">*</span>
              </label>
              <div>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  rules={{
                    required: t('studentForm.validation.dateOfBirthRequired'),
                    validate: (value: Date | string) => {
                      if (!value) return t('studentForm.validation.ageMinimum');
                      const date = value instanceof Date ? value : (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value) : null);
                      if (!date || isNaN(date.getTime())) return 'Please select a valid date';
                      const today = new Date();
                      if (date > today) return 'Date of birth cannot be in the future';
                      const age = today.getFullYear() - date.getFullYear();
                      const monthDiff = today.getMonth() - date.getMonth();
                      const dayDiff = today.getDate() - date.getDate();
                      if (age < 5 || (age === 5 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) return t('studentForm.validation.ageMinimum');
                      return true;
                    }
                  }}
                        render={({ field }) => (
                        <DatePicker
                          value={typeof field.value === 'string' ? field.value : (field.value instanceof Date ? (() => {
                            const d = field.value as Date;
                            const yyyy = d.getFullYear();
                            const mm = String(d.getMonth()+1).padStart(2,'0');
                            const dd = String(d.getDate()).padStart(2,'0');
                            return `${yyyy}-${mm}-${dd}`;
                          })() : '')}
                          onChange={(v: string) => {
                            // convert YYYY-MM-DD string into Date object for internal consumers
                            if (!v) {
                              field.onChange('');
                              return;
                            }
                            if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
                              field.onChange(v);
                            } else {
                              field.onChange(v);
                            }
                          }}
                          className="bg-black border-gray-600 text-white w-full"
                          allowFuture={false}
                          yearStart={1900}
                          yearEnd={new Date().getFullYear()}
                        />
                    )}
                />
              </div>
              {errors.dateOfBirth ? (
                <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth.message}</p>
              ) : null}
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-white text-sm font-medium mb-1 cursor-pointer">
                {t('studentForm.fields.gender')} <span className="text-[#FDB813]">*</span>
              </label>
              <select
                id="gender"
                {...register('gender', { required: t('studentForm.validation.genderRequired') })}
                className={`w-full px-4 py-2 bg-black rounded-md border ${errors.gender ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-pointer`}
              >
                <option value="">{t('studentForm.placeholders.selectGender')}</option>
                <option value="male">{t('studentForm.options.male')}</option>
                <option value="female">{t('studentForm.options.female')}</option>
                <option value="preferNotToSay">{t('studentForm.options.preferNotToSay')}</option>
              </select>
              {errors.gender ? (
                <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>
              ) : null}
            </div>
            
            <div className="md:col-span-2">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="address" className="block text-white text-sm font-medium cursor-pointer">
                    {t('studentForm.fields.address')} <span className="text-[#FDB813]">*</span>
                  </label>
                  <p className="text-sm text-gray-400">{(watched.address || '').length}/200</p>
                </div>
                <input
                  id="address"
                  type="text"
                  {...register('address', { 
                    required: t('studentForm.validation.addressRequired'),
                    minLength: { value: 5, message: t('studentForm.validation.addressMin') },
                    maxLength: { value: 200, message: t('studentForm.validation.addressMax') }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  placeholder={t('studentForm.placeholders.address')}
                  maxLength={200}
                />
                <div className="mt-1">
                  {errors.address ? (
                    <p className="text-red-400 text-xs">{errors.address.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="cityStateZip" className="block text-white text-sm font-medium cursor-pointer">
                    {t('studentForm.fields.cityStateZip')} <span className="text-[#FDB813]">*</span>
                  </label>
                  <p className="text-sm text-gray-400">{(watched.cityStateZip || '').length}/100</p>
                </div>
                <input
                  id="cityStateZip"
                  type="text"
                  {...register('cityStateZip', { 
                    required: t('studentForm.validation.cityStateZipRequired'),
                    maxLength: { value: 100, message: t('studentForm.validation.cityStateZipMax') }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.cityStateZip ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  placeholder={t('studentForm.placeholders.cityStateZip')}
                  maxLength={100}
                />
                <div className="mt-1">
                  {errors.cityStateZip ? (
                    <p className="text-red-400 text-xs">{errors.cityStateZip.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="phoneNumber" className="block text-white text-sm font-medium cursor-pointer">
                    {t('studentForm.fields.phoneNumber')} <span className="text-[#FDB813]">*</span>
                  </label>
                  <p className="text-sm text-gray-400">{(watched.phoneNumber || '').replace(/\D/g,'').length}/10</p>
                </div>
                <div className="flex gap-4">
                  <select
                    id="countryCode"
                    {...register('countryCode')}
                    defaultValue={mergedDefaults.countryCode}
                    className="bg-black border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none w-40"
                  >
                    <option value="+91">India (+91)</option>
                    <option value="+1">United States (+1)</option>
                    <option value="+44">United Kingdom (+44)</option>
                    <option value="+61">Australia (+61)</option>
                    <option value="+49">Germany (+49)</option>
                    <option value="+33">France (+33)</option>
                    <option value="+81">Japan (+81)</option>
                    <option value="+7">Russia (+7)</option>
                    <option value="+86">China (+86)</option>
                    <option value="+55">Brazil (+55)</option>
                    <option value="+27">South Africa (+27)</option>
                    <option value="+92">Pakistan (+92)</option>
                    <option value="+971">UAE (+971)</option>
                    <option value="+234">Nigeria (+234)</option>
                  </select>

                  <input
                    id="phoneNumber"
                    type="tel"
                    inputMode="numeric"
                    {...register('phoneNumber', {
                      required: t('studentForm.validation.phoneRequired'),
                      pattern: {
                        value: /^[0-9]{10}$/, 
                        message: t('studentForm.validation.phonePattern')
                      }
                    })}
                    className={`w-full px-4 py-2 bg-black rounded-md border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                    maxLength={10}
                    placeholder={t('studentForm.placeholders.phone', { defaultValue: 'e.g. 1234567890' })}
                    onInput={(e) => {
                      const cleaned = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, '').slice(0, 10);
                      setValue('phoneNumber', cleaned, { shouldValidate: true, shouldDirty: true });
                    }}
                  />
                </div>
                <div className="mt-1">
                  {errors.phoneNumber ? (
                    <p className="text-red-400 text-xs">{errors.phoneNumber.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="emailId" className="block text-white text-sm font-medium cursor-pointer">
                    {t('studentForm.fields.emailId')} <span className="text-[#FDB813]">*</span>
                  </label>
                  <p className="text-sm text-gray-400">{(watched.emailId || '').length}/100</p>
                </div>
                <input
                  id="emailId"
                  type="email"
                  {...register('emailId', { 
                    required: t('studentForm.validation.emailRequired'),
                    maxLength: { value: 100, message: t('studentForm.validation.emailMax') },
                    pattern: { 
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                      message: t('studentForm.validation.emailPattern') 
                    }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.emailId ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  maxLength={100}
                  placeholder={t('studentForm.placeholders.email')}
                />
                <div className="mt-1">
                  {errors.emailId ? (
                    <p className="text-red-400 text-xs">{errors.emailId.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="parentGuardianName" className="block text-white text-sm font-medium cursor-pointer">
                    {t('studentForm.fields.parentGuardianName')}
                  </label>
                  <p className="text-sm text-gray-400">{(watched.parentGuardianName || '').length}/100</p>
                </div>
                <input
                  id="parentGuardianName"
                  type="text"
                  {...register('parentGuardianName', {
                    maxLength: { value: 100, message: t('studentForm.validation.nameMax') }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.parentGuardianName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  placeholder={t('studentForm.placeholders.parentGuardianName')}
                  maxLength={100}
                />
                <div className="mt-1">
                  {errors.parentGuardianName ? (
                    <p className="text-red-400 text-xs">{errors.parentGuardianName.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="parentGuardianContact" className="block text-white text-sm font-medium cursor-pointer">
                    {t('studentForm.fields.parentGuardianContact')}
                  </label>
                  <p className="text-sm text-gray-400">{(watched.parentGuardianContact || '').length}/15</p>
                </div>
                <input
                  id="parentGuardianContact"
                  type="tel"
                  inputMode="numeric"
                  pattern="^[0-9]{7,15}$"
                  {...register('parentGuardianContact', {
                    pattern: {
                      value: /^[0-9]{7,15}$/, 
                      message: t('studentForm.validation.phonePattern')
                    }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.parentGuardianContact ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  maxLength={15}
                  placeholder={t('studentForm.placeholders.parentGuardianContact')}
                  onInput={(e) => {
                    const cleaned = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, '');
                    setValue('parentGuardianContact', cleaned, { shouldValidate: true, shouldDirty: true });
                  }}
                />
                <div className="mt-1">
                  {errors.parentGuardianContact ? (
                    <p className="text-red-400 text-xs">{errors.parentGuardianContact.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Course Information */}
        <section className="bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg">
            <h3 className="text-2xl text-white font-normal mb-2">
              {t('studentForm.sections.courseInfo')}
            </h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          
          <div className="space-y-6">
            {/* Program Applying For */}
            <div className={`${programError ? 'ring-2 ring-red-500 border border-red-500 rounded-md p-3 bg-[#2a2a2a]' : ''}`}>
              <label className="block text-white text-sm font-medium mb-3 cursor-pointer">
                {t('studentForm.fields.programApplyingFor')} <span className="text-[#FDB813]">*</span>
              </label>
              {programError && (
                <div className="mb-3 px-2">
                  <div className="rounded-md bg-red-600 text-white p-2 text-sm">
                    {t('studentForm.validation.programRequired')}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-4">
                {PROGRAM_LEVELS.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`program-${level}`}
                      name="programApplyingFor"
                      value={level}
                      checked={programLevels === level}
                      onChange={(e) => setProgramLevels(e.target.value)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer"
                    />
                    <label htmlFor={`program-${level}`} className={`${programLevels === level ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                      {t(`studentForm.options.${level}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Instrument / Specialization */}
            <div className={`${instrumentError ? 'ring-2 ring-red-500 border border-red-500 rounded-md p-3 bg-[#2a2a2a]' : ''}`}>
              <label className="block text-white text-sm font-medium mb-3 cursor-pointer">
                {t('studentForm.fields.instrumentSpecialization')} <span className="text-[#FDB813]">*</span>
              </label>
              {instrumentError && (
                <div className="mb-3 px-2">
                  <div className="rounded-md bg-red-600 text-white p-2 text-sm">
                    {t('studentForm.validation.instrumentRequired')}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-4">
                {INSTRUMENTS.map((instrument) => (
                  <div key={instrument} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`instrument-${instrument}`}
                      checked={instruments.includes(instrument)}
                      onChange={(e) => handleCheckboxChange(instrument, e.target.checked, instruments, setInstruments)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer"
                    />
                    <label htmlFor={`instrument-${instrument}`} className={`${instruments.includes(instrument) ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                      {t(`studentForm.options.${instrument}`)}
                    </label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="instrument-other"
                    checked={instruments.includes('other')}
                    onChange={(e) => handleCheckboxChange('other', e.target.checked, instruments, setInstruments)}
                    className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                    style={{ accentColor: '#7C3AED' }}
                  />
                  <label htmlFor="instrument-other" className={`${instruments.includes('other') ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                    {t('studentForm.options.other')}:
                  </label>
                  {instruments.includes('other') && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        {...register('instrumentOther', {
                          maxLength: { value: 50, message: t('studentForm.validation.instrumentOtherMax') }
                        })}
                        placeholder={t('studentForm.placeholders.instrumentOther')}
                        className="px-3 py-1 bg-black rounded-md border border-gray-600 text-white text-sm focus:outline-none focus:border-[#FDB813] w-32 cursor-text"
                        maxLength={50}
                      />
                      <p className="text-sm text-gray-400">{(watched.instrumentOther || '').length}/50</p>
                    </div>
                  )}
                  {instruments.includes('other') && (
                    errors.instrumentOther ? (
                      <p className="text-red-400 text-xs mt-1">{(errors as any).instrumentOther?.message}</p>
                    ) : null
                  )}
                </div>
                </div>
            </div>

            {/* Preferred Class Type */}
            <div className={`${classTypeError ? 'ring-2 ring-red-500 border border-red-500 rounded-md p-3 bg-[#2a2a2a]' : ''}`}>
              <label className="block text-white text-sm font-medium mb-3 cursor-pointer">
                {t('studentForm.fields.preferredClassType')} <span className="text-[#FDB813]">*</span>
              </label>
              {classTypeError && (
                <div className="mb-3 px-2">
                  <div className="rounded-md bg-red-600 text-white p-2 text-sm">
                    {t('studentForm.validation.classTypeRequired')}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-4">
                {CLASS_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`class-${type}`}
                      checked={classTypes.includes(type)}
                      onChange={(e) => handleCheckboxChange(type, e.target.checked, classTypes, setClassTypes)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer"
                    />
                    <label htmlFor={`class-${type}`} className={`${classTypes.includes(type) ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                      {t(`studentForm.options.${type}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferred Schedule */}
            <div className={`${scheduleError ? 'ring-2 ring-red-500 border border-red-500 rounded-md p-3 bg-[#2a2a2a]' : ''}`}>
              <label className="block text-white text-sm font-medium mb-3 cursor-pointer">
                {t('studentForm.fields.preferredSchedule')} <span className="text-[#FDB813]">*</span>
              </label>
              {scheduleError && (
                <div className="mb-3 px-2">
                  <div className="rounded-md bg-red-600 text-white p-2 text-sm">
                    {t('studentForm.validation.scheduleRequired')}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-4">
                {SCHEDULES.map((schedule) => (
                  <div key={schedule} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`schedule-${schedule}`}
                      checked={schedules.includes(schedule)}
                      onChange={(e) => handleCheckboxChange(schedule, e.target.checked, schedules, setSchedules)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer"
                    />
                    <label htmlFor={`schedule-${schedule}`} className={`${schedules.includes(schedule) ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                      {t(`studentForm.options.${schedule}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        

        {/* 3. Course Type / Certification Options */}
        <section className={`bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg ${courseTypeError ? 'ring-2 ring-red-500 border border-red-500' : ''}`}>
          <h3 className="text-2xl text-white font-normal mb-2">
            {t('studentForm.sections.courseType')} <span className="text-xl text-[#FDB813]">*</span>
          </h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          
          <p className="mb-4 text-gray-300">{t('studentForm.fields.courseTypePrompt')}</p>
          {courseTypeError && (
            <div className="mb-4 px-3">
              <div className="rounded-md bg-red-600 text-white p-2 text-sm">
                {t('studentForm.validation.courseTypeRequired')}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {COURSE_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`course-${type}`}
                  checked={courseTypes.includes(type)}
                  onChange={(e) => handleCheckboxChange(type, e.target.checked, courseTypes, setCourseTypes)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer"
                />
                <label htmlFor={`course-${type}`} className={`${courseTypes.includes(type) ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                  {t(`studentForm.options.${type}`)}
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Music Background */}
        <section className="bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg">
          <h3 className="text-2xl text-white font-normal mb-2">
            {t('studentForm.sections.musicBackground')}
          </h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="yearsOfExperience" className="block text-white text-sm font-medium mb-1 cursor-pointer">
                {t('studentForm.fields.yearsOfExperience')}
              </label>
              <input
                id="yearsOfExperience"
                type="number"
                inputMode="numeric"
                step={1}
                pattern="^[0-9]{1,3}$"
                {...register('yearsOfExperience', {
                  min: { value: 0, message: t('studentForm.validation.yearsMin') },
                  max: { value: 100, message: t('studentForm.validation.yearsMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded-md border ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                min={0}
                max={100}
                placeholder={t('studentForm.placeholders.yearsOfExperience')}
                onInput={(e) => {
                  const cleaned = (e.currentTarget as HTMLInputElement).value.replace(/[^0-9]/g, '');
                  // clamp
                  let num = cleaned === '' ? '' : String(Math.min(100, Math.max(0, parseInt(cleaned, 10))));
                  setValue('yearsOfExperience', num as any, { shouldValidate: true, shouldDirty: true });
                }}
              />
              {errors.yearsOfExperience ? (
                <p className="text-red-400 text-xs mt-1">{errors.yearsOfExperience.message}</p>
              ) : null}
            </div>
            
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="previousTraining" className="block text-white text-sm font-medium cursor-pointer">
                  {t('studentForm.fields.previousTraining')}
                </label>
                <p className="text-sm text-gray-400">{(watched.previousTraining || '').length}/200</p>
              </div>
              <input
                id="previousTraining"
                type="text"
                {...register('previousTraining', {
                  maxLength: { value: 200, message: t('studentForm.validation.textMax200') }
                })}
                className={`w-full px-4 py-2 bg-black rounded-md border ${errors.previousTraining ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder={t('studentForm.placeholders.previousTraining')}
                maxLength={200}
              />
              <div className="mt-1">
                {errors.previousTraining ? (
                  <p className="text-red-400 text-xs">{errors.previousTraining.message}</p>
                ) : null}
              </div>
            </div>
            
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="musicExamCertifications" className="block text-white text-sm font-medium cursor-pointer">
                  {t('studentForm.fields.musicExamCertifications')}
                </label>
                <p className="text-sm text-gray-400">{(watched.musicExamCertifications || '').length}/200</p>
              </div>
              <input
                id="musicExamCertifications"
                type="text"
                {...register('musicExamCertifications', {
                  maxLength: { value: 200, message: t('studentForm.validation.textMax200') }
                })}
                className={`w-full px-4 py-2 bg-black rounded-md border ${errors.musicExamCertifications ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder={t('studentForm.placeholders.musicExamCertifications')}
                maxLength={200}
              />
              <div className="mt-1">
                {errors.musicExamCertifications ? (
                  <p className="text-red-400 text-xs">{errors.musicExamCertifications.message}</p>
                ) : null}
              </div>
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-3 cursor-pointer">
                {t('studentForm.fields.performanceExperience')}
              </label>
              <div className="flex flex-wrap gap-4">
                {PERFORMANCE_OPTIONS.map((perf) => {
                  const selected = performances.includes(perf);
                  return (
                    <div key={perf} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`performance-${perf}`}
                        checked={selected}
                        onChange={(e) => handleCheckboxChange(perf, e.target.checked, performances, setPerformances)}
                        className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer"
                      />
                      <label htmlFor={`performance-${perf}`} className={`${selected ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                        {t(`studentForm.options.${perf}`)}
                      </label>
                    </div>
                  );
                })}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="performance-other"
                    checked={performances.includes('other')}
                    onChange={(e) => handleCheckboxChange('other', e.target.checked, performances, setPerformances)}
                    className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                    style={{ accentColor: '#7C3AED' }}
                  />
                  <label htmlFor="performance-other" className={`${performances.includes('other') ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                    {t('studentForm.options.other')}:
                  </label>
                  {performances.includes('other') && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        {...register('performanceOther', {
                          maxLength: { value: 100, message: t('studentForm.validation.performanceOtherMax') }
                        })}
                        placeholder={t('studentForm.placeholders.performanceOther')}
                        className="px-3 py-1 bg-black rounded-md border border-gray-600 text-white text-sm focus:outline-none focus;border-[#FDB813] w-32 cursor-text"
                        maxLength={100}
                      />
                      <p className="text-sm text-gray-400">{(watched.performanceOther || '').length}/100</p>
                    </div>
                  )}
                  {performances.includes('other') && (
                    errors.performanceOther ? (
                      <p className="text-red-400 text-xs mt-1">{(errors as any).performanceOther?.message}</p>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Goals & Interests */}
        <section className="bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg">
          <h3 className="text-2xl text-white font-normal mb-2">
            {t('studentForm.sections.goalsInterests')}
          </h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="goals" className="block text-white text-sm font-medium cursor-pointer">
                {t('studentForm.fields.goalsPrompt')}
              </label>
              <p className="text-sm text-gray-400">{(watched.goals || '').length}/1000</p>
            </div>
            <textarea
              id="goals"
              {...register('goals', {
                maxLength: { value: 1000, message: t('studentForm.validation.goalsMax') }
              })}
              rows={4}
              className={`w-full px-4 py-2 bg-black rounded-md border ${errors.goals ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text resize-none`}
              maxLength={1000}
              placeholder={t('studentForm.fields.goalsPlaceholder')}
            />
            {/* Preview removed per request */}
            <div className="mt-1">
              {errors.goals ? (
                <p className="text-red-400 text-xs">{errors.goals.message}</p>
              ) : null}
            </div>
          </div>
        </section>

        {/* 6. Volunteer Opportunity */}
        <section className="bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg">
          <h3 className="text-2xl text-white font-normal mb-2">
            {t('studentForm.sections.volunteer')}
          </h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-3 cursor-pointer">
                {t('studentForm.fields.volunteerPrompt')}
              </label>
                <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="volunteer-yes"
                    value="yes"
                    {...register('volunteerInterested')}
                    className="w-4 h-4 bg-white border-gray-600 cursor-pointer accent-black"
                    style={{ accentColor: '#7C3AED' }}
                  />
                  <label htmlFor="volunteer-yes" className={`${volunteerInterested === 'yes' ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                    {t('studentForm.options.yes')}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="volunteer-no"
                    value="no"
                    {...register('volunteerInterested')}
                    className="w-4 h-4 bg-white border-gray-600 cursor-pointer accent-black"
                    style={{ accentColor: '#7C3AED' }}
                  />
                  <label htmlFor="volunteer-no" className={`${volunteerInterested === 'no' ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                    {t('studentForm.options.no')}
                  </label>
                </div>
              </div>
            </div>

            {volunteerInterested === 'yes' && (
              <div className="space-y-3 pt-4 border-t border-gray-700 bg-[#252525] p-4 rounded-md">
                <label className="block text-white text-sm font-medium mb-3 cursor-pointer">
                  {t('studentForm.fields.volunteerDetailsPrompt')}
                </label>
                {VOLUNTEER_AREAS.map((area) => {
                  const selected = volunteerAreas.includes(area);
                  return (
                    <div key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={area}
                        checked={selected}
                        onChange={(e) => handleCheckboxChange(area, e.target.checked, volunteerAreas, setVolunteerAreas)}
                        className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                        style={{ accentColor: '#7C3AED' }}
                      />
                      <label htmlFor={area} className={`${selected ? 'text-[#FDB813] font-semibold' : 'text-white'} text-sm cursor-pointer`}>
                        {t(`studentForm.options.${area}`)}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 7. Emergency Contact */}
        <section className="bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg">
          <h3 className="text-2xl text-white font-normal mb-2">
            {t('studentForm.sections.emergencyContact')}
          </h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="emergencyName" className="block text-white text-sm font-medium cursor-pointer">
                    {t('studentForm.fields.emergencyName')} <span className="text-[#FDB813]">*</span>
                  </label>
                  <p className="text-sm text-gray-400">{(watched.emergencyName || '').length}/100</p>
                </div>
                <input
                  id="emergencyName"
                  type="text"
                  {...register('emergencyName', { 
                    required: t('studentForm.validation.emergencyNameRequired'),
                    minLength: { value: 2, message: t('studentForm.validation.emergencyNameMin') },
                    maxLength: { value: 100, message: t('studentForm.validation.nameMax') }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.emergencyName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  placeholder={t('studentForm.placeholders.emergencyName')}
                  maxLength={100}
                />
                <div className="mt-1">
                  {errors.emergencyName ? (
                    <p className="text-red-400 text-xs">{errors.emergencyName.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="emergencyRelationship" className="block text-white text-sm font-medium">
                    {t('studentForm.fields.emergencyRelationship')} <span className="text-[#FDB813]">*</span>
                  </label>
                  <p className="text-sm text-gray-400">{(watched.emergencyRelationship || '').length}/50</p>
                </div>
                <select
                  id="emergencyRelationship"
                  {...register('emergencyRelationship', { 
                    required: t('studentForm.validation.emergencyRelationshipRequired'),
                    maxLength: { value: 50, message: t('studentForm.validation.relationshipMax') }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.emergencyRelationship ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-pointer`}
                >
                  <option value="Parent">{t('studentForm.options.parent')}</option>
                  <option value="Spouse">{t('studentForm.options.spouse')}</option>
                  <option value="Child">{t('studentForm.options.child')}</option>
                  <option value="Sibling">{t('studentForm.options.sibling')}</option>
                  <option value="Other">{t('studentForm.options.other')}</option>
                </select>
                <div className="mt-1">
                  {errors.emergencyRelationship ? (
                    <p className="text-red-400 text-xs">{errors.emergencyRelationship.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="emergencyContact" className="block text-white text-sm font-medium">
                    {t('studentForm.fields.emergencyContact')} <span className="text-[#FDB813]">*</span>
                  </label>
                  <p className="text-sm text-gray-400">{(watched.emergencyContact || '').length}/15</p>
                </div>
                <input
                  id="emergencyContact"
                  type="tel"
                  inputMode="numeric"
                  pattern="^[0-9]{7,15}$"
                  {...register('emergencyContact', { 
                    required: t('studentForm.validation.emergencyContactRequired'),
                    pattern: { 
                      value: /^[0-9]{7,15}$/, 
                      message: t('studentForm.validation.phonePattern') 
                    }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.emergencyContact ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  maxLength={15}
                  placeholder={t('studentForm.placeholders.emergencyContact')}
                  onInput={(e) => {
                    const cleaned = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, '');
                    setValue('emergencyContact', cleaned, { shouldValidate: true, shouldDirty: true });
                  }}
                />
                <div className="mt-1">
                  {errors.emergencyContact ? (
                    <p className="text-red-400 text-xs">{errors.emergencyContact.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Referral Information */}
        <section className="bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg">
          <h3 className="text-2xl text-white font-normal mb-2">{t('studentForm.sections.referralInfo', { defaultValue: '8. Referral Information' })}</h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="hearAboutUs" className="block text-white text-sm font-medium mb-1">
                {t('contactForm.hearAboutUs', { defaultValue: 'How did you hear about us?' })} <span className="text-[#FDB813]">*</span>
              </label>
              <select
                id="hearAboutUs"
                {...register('hearAboutUs', { required: t('hearAboutUsRequired', { defaultValue: 'This field is required.' }) })}
                className={`w-full px-4 py-2 bg-black rounded-md border ${errors.hearAboutUs ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
              >
                <option value="">{t('contactForm.selectOption', { defaultValue: 'Select an option' })}</option>
                <option value="Facebook">{t('contactForm.hearOptions.facebook')}</option>
                <option value="Instagram">{t('contactForm.hearOptions.instagram')}</option>
                <option value="YouTube">{t('contactForm.hearOptions.youtube')}</option>
                <option value="TV Program">{t('contactForm.hearOptions.tvProgram')}</option>
                <option value="Friend or Family">{t('contactForm.hearOptions.friend')}</option>
                <option value="Event or Conference">{t('contactForm.hearOptions.event')}</option>
                <option value="Flyer or Poster">{t('contactForm.hearOptions.flyer')}</option>
                <option value="YBH Website">{t('contactForm.hearOptions.website')}</option>
                <option value="Other">{t('contactForm.hearOptions.other')}</option>
              </select>
              {errors.hearAboutUs ? (
                <p className="text-red-400 text-xs mt-1">{(errors as any).hearAboutUs?.message}</p>
              ) : null}
            </div>

            {/* Other text when 'Other' selected */}
            {(watched as any).hearAboutUs === 'Other' && (
              <div className="md:col-span-2">
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="otherHearAboutUs" className="block text-white text-sm font-medium">
                    {t('otherHearAboutUs', { defaultValue: 'Other (Please specify)' })}
                  </label>
                  <p className="text-sm text-gray-400">{(watched.otherHearAboutUs || '').length}/20</p>
                </div>
                <input
                  id="otherHearAboutUs"
                  type="text"
                  {...register('otherHearAboutUs', {
                    required: t('otherHearAboutUsRequired', { defaultValue: 'Please specify.' }),
                    maxLength: { value: 20, message: t('otherHearAboutUsMax', { defaultValue: 'Maximum 20 characters allowed.' }) }
                  })}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.otherHearAboutUs ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                  maxLength={20}
                  placeholder={t('otherHearAboutUs', { defaultValue: 'Other (Please specify)' })}
                />
                {errors.otherHearAboutUs ? (
                  <p className="text-red-400 text-xs mt-1">{(errors as any).otherHearAboutUs?.message}</p>
                ) : null}
              </div>
            )}
          </div>
        </section>

        {/* Submit and Reset Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-8 py-2 bg-[#FDB813] hover:bg-[#e5a711] font-semibold text-black rounded-full shadow-lg text-center transition-all duration-300 inline-flex items-center justify-center ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isSubmitting ? t('studentForm.buttons.submitting') : t('studentForm.buttons.submit')}
          </button>
          <button
            type="button"
            onClick={() => handleReset()}
            disabled={isSubmitting}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FDB813';
                (e.currentTarget as HTMLButtonElement).style.color = '#000';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '';
                (e.currentTarget as HTMLButtonElement).style.color = '';
              }
            }}
            className={`w-full sm:w-auto px-8 py-2 bg-black font-semibold text-white rounded-full border-2 border-[#FDB813] text-center transition-all duration-300 inline-flex items-center justify-center ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {t('studentForm.buttons.reset')}
          </button>
        </div>

        {/* success panel shown below the buttons (only for long messages) */}
        {submitSuccess && !successIsShort && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="max-w-3xl mx-auto rounded-lg bg-[#2E2E2E] p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full" style={{ backgroundColor: '#FDB813' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p className="mb-4 text-xl font-semibold text-white">{t('studentForm.messages.success')}</p>
              <button
                type="button"
                onClick={() => {
                  handleReset(false);
                  setSubmitSuccess(false);
                }}
                className="px-6 py-2 rounded-md text-black font-bold transition-all duration-300 shadow-md inline-flex items-center justify-center"
                style={{ backgroundColor: '#FDB813' }}
              >
                {t('studentForm.buttons.submitAnother') || 'Submit another application'}
              </button>
            </div>
          </motion.div>
        )}
        </form>
      )}
    </div>
  );
}
