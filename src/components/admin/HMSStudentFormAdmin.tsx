"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { toast } from 'sonner';

// Static option lists extracted to top-level constants to avoid re-creating arrays on each render
const PROGRAM_LEVELS = ['beginner', 'intermediate', 'advanced'];
const INSTRUMENTS = ['piano', 'guitar', 'violin', 'drums', 'vocal'];
const CLASS_TYPES = ['individual', 'group', 'online', 'inPerson'];
const SCHEDULES = ['weekdays', 'weekends', 'morning', 'evening'];
const COURSE_TYPES = ['freeBasicMusic', 'hmsWithCertificate', 'lcmWithCertificate'];
const PERFORMANCE_OPTIONS = ['schoolEvents', 'competitions', 'choir'];
const VOLUNTEER_AREAS = ['volunteerOnlineTeacher', 'volunteerOfflineConferences', 'volunteerSummerKids', 'volunteerEvents'];

interface FormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string | Date;
  gender: string;
  address: string;
  cityStateZip: string;
  phoneNumber: string;
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
}

export function HMSStudentFormAdmin({
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
    ...initialData
  };

  const { register, handleSubmit, watch, setValue, reset, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: mergedDefaults as any
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [programLevels, setProgramLevels] = useState<string[]>(() => (mergedDefaults.programApplyingFor as string[]) || []);
  const [instruments, setInstruments] = useState<string[]>(() => (mergedDefaults.instrumentSpecialization as string[]) || []);
  const [classTypes, setClassTypes] = useState<string[]>(() => (mergedDefaults.preferredClassType as string[]) || []);
  const [schedules, setSchedules] = useState<string[]>(() => (mergedDefaults.preferredSchedule as string[]) || []);
  const [courseTypes, setCourseTypes] = useState<string[]>(() => (mergedDefaults.courseType as string[]) || []);
  const [performances, setPerformances] = useState<string[]>(() => (mergedDefaults.performanceExperience as string[]) || []);
  const [volunteerAreas, setVolunteerAreas] = useState<string[]>(() => (mergedDefaults.volunteerAreas as string[]) || []);

  const volunteerInterested = watch('volunteerInterested');

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

  const handleReset = () => {
    reset();
    setProgramLevels([]);
    setInstruments([]);
    setClassTypes([]);
    setSchedules([]);
    setCourseTypes([]);
    setPerformances([]);
    setVolunteerAreas([]);
    setSubmitSuccess(false);
  };

  const effectiveSubmitUrl = submitUrl || '/api/hms-students';
  const effectiveSubmitMethod = submitMethod || 'POST';

  const onSubmit = async (data: FormData) => {
    try {
      // Validate checkbox arrays
      if (programLevels.length === 0) {
        toast.error(t('studentForm.validation.programRequired'));
        return;
      }
      if (instruments.length === 0) {
        toast.error(t('studentForm.validation.instrumentRequired'));
        return;
      }
      if (classTypes.length === 0) {
        toast.error(t('studentForm.validation.classTypeRequired'));
        return;
      }
      if (schedules.length === 0) {
        toast.error(t('studentForm.validation.scheduleRequired'));
        return;
      }
      if (courseTypes.length === 0) {
        toast.error(t('studentForm.validation.courseTypeRequired'));
        return;
      }

      // Add the state arrays to form data
      data.programApplyingFor = programLevels;
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
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(data.dateOfBirth as string)) {
        const parts = (data.dateOfBirth as string).split('-');
        data.dateOfBirth = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }

      // If caller provided an override submit handler, call it
      if (onSubmitOverride) {
        const result = await onSubmitOverride(data);
        // allow override to indicate success/failure
        if (result && result.success === false) {
          toast.error(t('studentForm.messages.error'));
          return;
        }
      } else {
        // Submit to server API (default behavior)
        const resp = await fetch(effectiveSubmitUrl, {
          method: effectiveSubmitMethod,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await resp.json();
        if (!resp.ok || !result.success) {
          console.error('Server responded with error', result);
          toast.error(t('studentForm.messages.error'));
          return;
        }
      }

      toast.success(t('studentForm.messages.success'));
      setSubmitSuccess(true);
      handleReset();
      if (onClose) onClose();
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('studentForm.messages.error'));
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      
      {submitSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-900/50 text-green-100 p-4 rounded mb-6"
        >
          {t('studentForm.messages.success')}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* 1. Personal Information */}
        <section className="bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg">
          <h3 className="text-2xl text-white font-normal mb-2">
            {t('studentForm.sections.personalInfo')}
          </h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="fullName" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.fullName')} <span className="text-[#FDB813]">*</span>
              </label>
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                placeholder={t('studentForm.placeholders.fullName')}
                maxLength={100}
                readOnly
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="dateOfBirth" className="block text-white text-sm font-medium mb-1">
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
                      selected={field.value instanceof Date ? field.value : (typeof field.value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(field.value) ? new Date(field.value) : null)}
                      onChange={(d: Date | null) => field.onChange(d)}
                      dateFormat="dd-MM-yyyy"
                      maxDate={new Date()}
                      placeholderText={t('studentForm.placeholders.dateOfBirth')}
                      className={`w-full px-4 py-2 bg-black rounded border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                      showPopperArrow={false}
                      disabled
                    />
                  )}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.gender')} <span className="text-[#FDB813]">*</span>
              </label>
              <select
                id="gender"
                {...register('gender', { required: t('studentForm.validation.genderRequired') })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.gender ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                disabled
              >
                <option value="">{t('studentForm.placeholders.selectGender')}</option>
                <option value="male">{t('studentForm.options.male')}</option>
                <option value="female">{t('studentForm.options.female')}</option>
                <option value="preferNotToSay">{t('studentForm.options.preferNotToSay')}</option>
              </select>
              {errors.gender && (
                <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.address')} <span className="text-[#FDB813]">*</span>
              </label>
              <input
                id="address"
                type="text"
                {...register('address', { 
                  required: t('studentForm.validation.addressRequired'),
                  minLength: { value: 5, message: t('studentForm.validation.addressMin') },
                  maxLength: { value: 200, message: t('studentForm.validation.addressMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.address ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                placeholder={t('studentForm.placeholders.address')}
                maxLength={200}
                readOnly
              />
              {errors.address && (
                <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="cityStateZip" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.cityStateZip')} <span className="text-[#FDB813]">*</span>
              </label>
              <input
                id="cityStateZip"
                type="text"
                {...register('cityStateZip', { 
                  required: t('studentForm.validation.cityStateZipRequired'),
                  maxLength: { value: 100, message: t('studentForm.validation.cityStateZipMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.cityStateZip ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                placeholder={t('studentForm.placeholders.cityStateZip')}
                maxLength={100}
                readOnly
              />
              {errors.cityStateZip && (
                <p className="text-red-400 text-xs mt-1">{errors.cityStateZip.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.phoneNumber')} <span className="text-[#FDB813]">*</span>
              </label>
              <input
                id="phoneNumber"
                type="tel"
                inputMode="numeric"
                pattern="^[0-9]{7,15}$"
                {...register('phoneNumber', { 
                  required: t('studentForm.validation.phoneRequired'),
                  pattern: { 
                    value: /^[0-9]{7,15}$/, 
                    message: t('studentForm.validation.phonePattern') 
                  }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                maxLength={15}
                placeholder={t('studentForm.placeholders.phone')}
                onInput={(e) => {
                  const cleaned = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, '');
                  setValue('phoneNumber', cleaned, { shouldValidate: true, shouldDirty: true });
                }}
                readOnly
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="emailId" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.emailId')} <span className="text-[#FDB813]">*</span>
              </label>
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.emailId ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                maxLength={100}
                placeholder={t('studentForm.placeholders.email')}
                readOnly
              />
              {errors.emailId && (
                <p className="text-red-400 text-xs mt-1">{errors.emailId.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="parentGuardianName" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.parentGuardianName')}
              </label>
              <input
                id="parentGuardianName"
                type="text"
                {...register('parentGuardianName', {
                  maxLength: { value: 100, message: t('studentForm.validation.nameMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.parentGuardianName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                placeholder={t('studentForm.placeholders.parentGuardianName')}
                maxLength={100}
                readOnly
              />
              {errors.parentGuardianName && (
                <p className="text-red-400 text-xs mt-1">{errors.parentGuardianName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="parentGuardianContact" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.parentGuardianContact')}
              </label>
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.parentGuardianContact ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                maxLength={15}
                placeholder={t('studentForm.placeholders.parentGuardianContact')}
                onInput={(e) => {
                  const cleaned = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, '');
                  setValue('parentGuardianContact', cleaned, { shouldValidate: true, shouldDirty: true });
                }}
                readOnly
              />
              {errors.parentGuardianContact && (
                <p className="text-red-400 text-xs mt-1">{errors.parentGuardianContact.message}</p>
              )}
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
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                {t('studentForm.fields.programApplyingFor')} <span className="text-[#FDB813]">*</span>
              </label>
              <div className="flex flex-wrap gap-4">
                {PROGRAM_LEVELS.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`program-${level}`}
                      checked={programLevels.includes(level)}
                      onChange={(e) => handleCheckboxChange(level, e.target.checked, programLevels, setProgramLevels)}
                      className="w-4 h-4 bg-white border-gray-600 rounded accent-black"
                      style={{ accentColor: '#000000' }}
                      disabled
                    />
                    <label htmlFor={`program-${level}`} className="text-white text-sm">
                      {t(`studentForm.options.${level}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Instrument / Specialization */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                {t('studentForm.fields.instrumentSpecialization')} <span className="text-[#FDB813]">*</span>
              </label>
              <div className="flex flex-wrap gap-4">
                {INSTRUMENTS.map((instrument) => (
                  <div key={instrument} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`instrument-${instrument}`}
                      checked={instruments.includes(instrument)}
                      onChange={(e) => handleCheckboxChange(instrument, e.target.checked, instruments, setInstruments)}
                      className="w-4 h-4 bg-white border-gray-600 rounded accent-black"
                      style={{ accentColor: '#000000' }}
                      disabled
                    />
                    <label htmlFor={`instrument-${instrument}`} className="text-white text-sm">
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
                    className="w-4 h-4 bg-white border-gray-600 rounded accent-black"
                    style={{ accentColor: '#000000' }}
                    disabled
                  />
                  <label htmlFor="instrument-other" className="text-white text-sm">
                    {t('studentForm.options.other')}:
                  </label>
                  {instruments.includes('other') && (
                    <input
                      type="text"
                      {...register('instrumentOther', {
                        maxLength: { value: 50, message: t('studentForm.validation.instrumentOtherMax') }
                      })}
                      placeholder={t('studentForm.placeholders.instrumentOther')}
                      className="px-3 py-1 bg-black rounded border border-gray-600 text-white text-sm focus:outline-none focus:border-[#FDB813] w-32"
                      maxLength={50}
                      readOnly
                    />
                  )}
                  {instruments.includes('other') && (
                    errors.instrumentOther && (
                      <p className="text-red-400 text-xs mt-1">{(errors as any).instrumentOther?.message}</p>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Preferred Class Type */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                {t('studentForm.fields.preferredClassType')} <span className="text-[#FDB813]">*</span>
              </label>
              <div className="flex flex-wrap gap-4">
                {CLASS_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`class-${type}`}
                      checked={classTypes.includes(type)}
                      onChange={(e) => handleCheckboxChange(type, e.target.checked, classTypes, setClassTypes)}
                      className="w-4 h-4 bg-white border-gray-600 rounded accent-black"
                      style={{ accentColor: '#000000' }}
                      disabled
                    />
                    <label htmlFor={`class-${type}`} className="text-white text-sm">
                      {t(`studentForm.options.${type}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferred Schedule */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                {t('studentForm.fields.preferredSchedule')} <span className="text-[#FDB813]">*</span>
              </label>
              <div className="flex flex-wrap gap-4">
                {SCHEDULES.map((schedule) => (
                  <div key={schedule} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`schedule-${schedule}`}
                      checked={schedules.includes(schedule)}
                      onChange={(e) => handleCheckboxChange(schedule, e.target.checked, schedules, setSchedules)}
                      className="w-4 h-4 bg-white border-gray-600 rounded accent-black"
                      style={{ accentColor: '#000000' }}
                      disabled
                    />
                    <label htmlFor={`schedule-${schedule}`} className="text-white text-sm">
                      {t(`studentForm.options.${schedule}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Course Type / Certification Options */}
        <section className="bg-[#2E2E2E] rounded-lg p-6 md:p-8 shadow-lg">
          <h3 className="text-2xl text-white font-normal mb-2">
            {t('studentForm.sections.courseType')}
          </h3>
          <div className="w-24 h-1 bg-[#FDB813] mb-6"></div>
          
          <p className="mb-4 text-gray-300">{t('studentForm.fields.courseTypePrompt')}</p>
          
          <div className="space-y-3">
            {COURSE_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`course-${type}`}
                  checked={courseTypes.includes(type)}
                  onChange={(e) => handleCheckboxChange(type, e.target.checked, courseTypes, setCourseTypes)}
                  className="w-4 h-4 bg-white border-gray-600 rounded accent-black"
                  style={{ accentColor: '#000000' }}
                  disabled
                />
                <label htmlFor={`course-${type}`} className="text-white text-sm">
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
              <label htmlFor="yearsOfExperience" className="block text-white text-sm font-medium mb-1">
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                min={0}
                max={100}
                placeholder={t('studentForm.placeholders.yearsOfExperience')}
                onInput={(e) => {
                  const cleaned = (e.currentTarget as HTMLInputElement).value.replace(/[^0-9]/g, '');
                  // clamp
                  let num = cleaned === '' ? '' : String(Math.min(100, Math.max(0, parseInt(cleaned, 10))));
                  setValue('yearsOfExperience', num as any, { shouldValidate: true, shouldDirty: true });
                }}
                readOnly
              />
              {errors.yearsOfExperience && (
                <p className="text-red-400 text-xs mt-1">{errors.yearsOfExperience.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="previousTraining" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.previousTraining')}
              </label>
              <input
                id="previousTraining"
                type="text"
                {...register('previousTraining', {
                  maxLength: { value: 200, message: t('studentForm.validation.textMax200') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.previousTraining ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                placeholder={t('studentForm.placeholders.previousTraining')}
                maxLength={200}
                readOnly
              />
                {errors.previousTraining && (
                  <p className="text-red-400 text-xs mt-1">{errors.previousTraining.message}</p>
                )}
            </div>
            
            <div>
              <label htmlFor="musicExamCertifications" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.musicExamCertifications')}
              </label>
              <input
                id="musicExamCertifications"
                type="text"
                {...register('musicExamCertifications', {
                  maxLength: { value: 200, message: t('studentForm.validation.textMax200') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.musicExamCertifications ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                placeholder={t('studentForm.placeholders.musicExamCertifications')}
                maxLength={200}
                readOnly
              />
              {errors.musicExamCertifications && (
                <p className="text-red-400 text-xs mt-1">{errors.musicExamCertifications.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                {t('studentForm.fields.performanceExperience')}
              </label>
              <div className="flex flex-wrap gap-4">
                {PERFORMANCE_OPTIONS.map((perf) => (
                  <div key={perf} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`performance-${perf}`}
                      checked={performances.includes(perf)}
                      onChange={(e) => handleCheckboxChange(perf, e.target.checked, performances, setPerformances)}
                      className="w-4 h-4 bg-white border-gray-600 rounded accent-black"
                      style={{ accentColor: '#000000' }}
                      disabled
                    />
                    <label htmlFor={`performance-${perf}`} className="text-white text-sm">
                      {t(`studentForm.options.${perf}`)}
                    </label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="performance-other"
                    checked={performances.includes('other')}
                    onChange={(e) => handleCheckboxChange('other', e.target.checked, performances, setPerformances)}
                    className="w-4 h-4 bg-white border-gray-600 rounded accent-black"
                    style={{ accentColor: '#000000' }}
                    disabled
                  />
                  <label htmlFor="performance-other" className="text-white text-sm">
                    {t('studentForm.options.other')}:
                  </label>
                  {performances.includes('other') && (
                    <input
                      type="text"
                      {...register('performanceOther', {
                        maxLength: { value: 100, message: t('studentForm.validation.performanceOtherMax') }
                      })}
                      placeholder={t('studentForm.placeholders.performanceOther')}
                      className="px-3 py-1 bg-black rounded border border-gray-600 text-white text-sm focus:outline-none focus:border-[#FDB813] w-32"
                      maxLength={100}
                      readOnly
                    />
                  )}
                  {performances.includes('other') && (
                    (errors as any).performanceOther && (
                      <p className="text-red-400 text-xs mt-1">{(errors as any).performanceOther?.message}</p>
                    )
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
            <label htmlFor="goals" className="block text-white text-sm font-medium mb-1">
              {t('studentForm.fields.goalsPrompt')}
            </label>
            <textarea
              id="goals"
              {...register('goals', {
                maxLength: { value: 1000, message: t('studentForm.validation.goalsMax') }
              })}
              rows={4}
              className={`w-full px-4 py-2 bg-black rounded border ${errors.goals ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] resize-none`}
              maxLength={1000}
              placeholder={t('studentForm.fields.goalsPlaceholder')}
              readOnly
            />
            {errors.goals && (
              <p className="text-red-400 text-xs mt-1">{errors.goals.message}</p>
            )}
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
              <label className="block text-white text-sm font-medium mb-3">
                {t('studentForm.fields.volunteerPrompt')}
              </label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="volunteer-yes"
                    value="yes"
                    {...register('volunteerInterested')}
                    className="w-4 h-4 bg-white border-gray-600 accent-black"
                    style={{ accentColor: '#000000' }}
                    disabled
                  />
                  <label htmlFor="volunteer-yes" className="text-white text-sm cursor-pointer">
                    {t('studentForm.options.yes')}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="volunteer-no"
                    value="no"
                    {...register('volunteerInterested')}
                    className="w-4 h-4 bg-white border-gray-600 accent-black"
                    style={{ accentColor: '#000000' }}
                    disabled
                  />
                  <label htmlFor="volunteer-no" className="text-white text-sm">
                    {t('studentForm.options.no')}
                  </label>
                </div>
              </div>
            </div>

            {volunteerInterested === 'yes' && (
              <div className="space-y-3 pt-4 border-t border-gray-700 bg-[#252525] p-4 rounded-md">
                <label className="block text-white text-sm font-medium mb-3">
                  {t('studentForm.fields.volunteerDetailsPrompt')}
                </label>
                {VOLUNTEER_AREAS.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={area}
                      checked={volunteerAreas.includes(area)}
                      onChange={(e) => handleCheckboxChange(area, e.target.checked, volunteerAreas, setVolunteerAreas)}
                      className="w-4 h-4 bg-white border-gray-600 rounded accent-black"
                      style={{ accentColor: '#000000' }}
                      disabled
                    />
                    <label htmlFor={area} className="text-white text-sm">
                      {t(`studentForm.options.${area}`)}
                    </label>
                  </div>
                ))}
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
              <label htmlFor="emergencyName" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.emergencyName')} <span className="text-[#FDB813]">*</span>
              </label>
              <input
                id="emergencyName"
                type="text"
                {...register('emergencyName', { 
                  required: t('studentForm.validation.emergencyNameRequired'),
                  minLength: { value: 2, message: t('studentForm.validation.emergencyNameMin') },
                  maxLength: { value: 100, message: t('studentForm.validation.nameMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.emergencyName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                placeholder={t('studentForm.placeholders.emergencyName')}
                maxLength={100}
                readOnly
              />
              {errors.emergencyName && (
                <p className="text-red-400 text-xs mt-1">{errors.emergencyName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="emergencyRelationship" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.emergencyRelationship')} <span className="text-[#FDB813]">*</span>
              </label>
              <input
                id="emergencyRelationship"
                type="text"
                {...register('emergencyRelationship', { 
                  required: t('studentForm.validation.emergencyRelationshipRequired'),
                  maxLength: { value: 50, message: t('studentForm.validation.relationshipMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.emergencyRelationship ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                placeholder={t('studentForm.placeholders.emergencyRelationship')}
                maxLength={50}
                readOnly
              />
              {errors.emergencyRelationship && (
                <p className="text-red-400 text-xs mt-1">{errors.emergencyRelationship.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="emergencyContact" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.emergencyContact')} <span className="text-[#FDB813]">*</span>
              </label>
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.emergencyContact ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813]`}
                maxLength={15}
                placeholder={t('studentForm.placeholders.emergencyContact')}
                onInput={(e) => {
                  const cleaned = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, '');
                  setValue('emergencyContact', cleaned, { shouldValidate: true, shouldDirty: true });
                }}
                readOnly
              />
              {errors.emergencyContact && (
                <p className="text-red-400 text-xs mt-1">{errors.emergencyContact.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Close Button Only */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="px-8 py-3 bg-[#FDB813] hover:bg-[#DAA520] text-black rounded border border-[#FDB813] text-center transition-colors"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default HMSStudentFormAdmin;
