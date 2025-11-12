"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface FormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
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

export function HMSStudentForm({ onClose }: { onClose?: () => void }) {
  const { t } = useTranslation('contact');
  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      programApplyingFor: [],
      instrumentSpecialization: [],
      preferredClassType: [],
      preferredSchedule: [],
      courseType: [],
      performanceExperience: [],
      volunteerAreas: [],
      volunteerInterested: 'no'
    }
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [programLevels, setProgramLevels] = useState<string[]>([]);
  const [instruments, setInstruments] = useState<string[]>([]);
  const [classTypes, setClassTypes] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<string[]>([]);
  const [courseTypes, setCourseTypes] = useState<string[]>([]);
  const [performances, setPerformances] = useState<string[]>([]);
  const [volunteerAreas, setVolunteerAreas] = useState<string[]>([]);

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

      console.log('Form submitted:', data);
      
      // TODO: Replace with actual API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      handleReset();
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('studentForm.messages.error'));
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <style>{`
        input[type="checkbox"]:checked {
          border: 2px solid white !important;
        }
      `}</style>
      
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
                {t('studentForm.fields.fullName')} *
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder="Enter your full name"
                maxLength={100}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="dateOfBirth" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.dateOfBirth')} *
              </label>
              <input
                id="dateOfBirth"
                type="text"
                {...register('dateOfBirth', { 
                  required: t('studentForm.validation.dateOfBirthRequired'),
                  pattern: {
                    value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                    message: 'Please enter date in DD-MM-YYYY format'
                  },
                  validate: (value) => {
                    // Parse DD-MM-YYYY format
                    const parts = value.split('-');
                    if (parts.length !== 3) return t('studentForm.validation.ageMinimum');
                    
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
                    const year = parseInt(parts[2], 10);
                    
                    const date = new Date(year, month, day);
                    const today = new Date();
                    
                    // Validate it's a valid date
                    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
                      return 'Please enter a valid date';
                    }
                    
                    // Check age is at least 5 years
                    const age = today.getFullYear() - date.getFullYear();
                    const monthDiff = today.getMonth() - date.getMonth();
                    const dayDiff = today.getDate() - date.getDate();
                    
                    if (age < 5 || (age === 5 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
                      return t('studentForm.validation.ageMinimum');
                    }
                    
                    // Check date is not in the future
                    if (date > today) {
                      return 'Date of birth cannot be in the future';
                    }
                    
                    return true;
                  }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder="DD-MM-YYYY"
                maxLength={10}
              />
              {errors.dateOfBirth && (
                <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.gender')} *
              </label>
              <select
                id="gender"
                {...register('gender', { required: t('studentForm.validation.genderRequired') })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.gender ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-pointer`}
              >
                <option value="">Select your gender</option>
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
                {t('studentForm.fields.address')} *
              </label>
              <input
                id="address"
                type="text"
                {...register('address', { 
                  required: t('studentForm.validation.addressRequired'),
                  minLength: { value: 5, message: t('studentForm.validation.addressMin') },
                  maxLength: { value: 200, message: t('studentForm.validation.addressMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.address ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder="Enter your street address"
                maxLength={200}
              />
              {errors.address && (
                <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="cityStateZip" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.cityStateZip')} *
              </label>
              <input
                id="cityStateZip"
                type="text"
                {...register('cityStateZip', { 
                  required: t('studentForm.validation.cityStateZipRequired'),
                  maxLength: { value: 100, message: t('studentForm.validation.cityStateZipMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.cityStateZip ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder="Enter city, state, and ZIP code"
                maxLength={100}
              />
              {errors.cityStateZip && (
                <p className="text-red-400 text-xs mt-1">{errors.cityStateZip.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.phoneNumber')} *
              </label>
              <input
                id="phoneNumber"
                type="tel"
                {...register('phoneNumber', { 
                  required: t('studentForm.validation.phoneRequired'),
                  pattern: { 
                    value: /^[0-9+\-\s()]{10,15}$/, 
                    message: t('studentForm.validation.phonePattern') 
                  }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                maxLength={15}
                placeholder="(123) 456-7890"
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="emailId" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.emailId')} *
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.emailId ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                maxLength={100}
                placeholder="example@email.com"
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.parentGuardianName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder="Enter parent/guardian name"
                maxLength={100}
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
                {...register('parentGuardianContact', {
                  pattern: { 
                    value: /^[0-9+\-\s()]{10,15}$/, 
                    message: t('studentForm.validation.phonePattern') 
                  }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.parentGuardianContact ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                maxLength={15}
                placeholder="(123) 456-7890"
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
                {t('studentForm.fields.programApplyingFor')} *
              </label>
              <div className="flex flex-wrap gap-4">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`program-${level}`}
                      checked={programLevels.includes(level)}
                      onChange={(e) => handleCheckboxChange(level, e.target.checked, programLevels, setProgramLevels)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                      style={{ accentColor: '#000000' }}
                    />
                    <label htmlFor={`program-${level}`} className="text-white text-sm cursor-pointer">
                      {t(`studentForm.options.${level}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Instrument / Specialization */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                {t('studentForm.fields.instrumentSpecialization')} *
              </label>
              <div className="flex flex-wrap gap-4">
                {['piano', 'guitar', 'violin', 'drums', 'vocal'].map((instrument) => (
                  <div key={instrument} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`instrument-${instrument}`}
                      checked={instruments.includes(instrument)}
                      onChange={(e) => handleCheckboxChange(instrument, e.target.checked, instruments, setInstruments)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                      style={{ accentColor: '#000000' }}
                    />
                    <label htmlFor={`instrument-${instrument}`} className="text-white text-sm cursor-pointer">
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
                    style={{ accentColor: '#000000' }}
                  />
                  <label htmlFor="instrument-other" className="text-white text-sm cursor-pointer">
                    {t('studentForm.options.other')}:
                  </label>
                  {instruments.includes('other') && (
                    <input
                      type="text"
                      {...register('instrumentOther', {
                        maxLength: { value: 50, message: t('studentForm.validation.instrumentOtherMax') }
                      })}
                      placeholder="Specify"
                      className="px-3 py-1 bg-black rounded border border-gray-600 text-white text-sm focus:outline-none focus:border-[#FDB813] w-32 cursor-text"
                      maxLength={50}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Preferred Class Type */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                {t('studentForm.fields.preferredClassType')} *
              </label>
              <div className="flex flex-wrap gap-4">
                {['individual', 'group', 'online', 'inPerson'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`class-${type}`}
                      checked={classTypes.includes(type)}
                      onChange={(e) => handleCheckboxChange(type, e.target.checked, classTypes, setClassTypes)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                      style={{ accentColor: '#000000' }}
                    />
                    <label htmlFor={`class-${type}`} className="text-white text-sm cursor-pointer">
                      {t(`studentForm.options.${type}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferred Schedule */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                {t('studentForm.fields.preferredSchedule')} *
              </label>
              <div className="flex flex-wrap gap-4">
                {['weekdays', 'weekends', 'morning', 'evening'].map((schedule) => (
                  <div key={schedule} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`schedule-${schedule}`}
                      checked={schedules.includes(schedule)}
                      onChange={(e) => handleCheckboxChange(schedule, e.target.checked, schedules, setSchedules)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                      style={{ accentColor: '#000000' }}
                    />
                    <label htmlFor={`schedule-${schedule}`} className="text-white text-sm cursor-pointer">
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
            {['freeBasicMusic', 'hmsWithCertificate', 'lcmWithCertificate'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`course-${type}`}
                  checked={courseTypes.includes(type)}
                  onChange={(e) => handleCheckboxChange(type, e.target.checked, courseTypes, setCourseTypes)}
                  className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                  style={{ accentColor: '#000000' }}
                />
                <label htmlFor={`course-${type}`} className="text-white text-sm cursor-pointer">
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
                {...register('yearsOfExperience', {
                  min: { value: 0, message: t('studentForm.validation.yearsMin') },
                  max: { value: 100, message: t('studentForm.validation.yearsMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                min={0}
                max={100}
                placeholder="Enter years of experience (0-100)"
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.previousTraining ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder="Describe your previous music training"
                maxLength={200}
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
                className={`w-full px-4 py-2 bg-black rounded border ${errors.musicExamCertifications ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder="List any certifications or exams completed"
                maxLength={200}
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
                {['schoolEvents', 'competitions', 'choir'].map((perf) => (
                  <div key={perf} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`performance-${perf}`}
                      checked={performances.includes(perf)}
                      onChange={(e) => handleCheckboxChange(perf, e.target.checked, performances, setPerformances)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                      style={{ accentColor: '#000000' }}
                    />
                    <label htmlFor={`performance-${perf}`} className="text-white text-sm cursor-pointer">
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
                    className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                    style={{ accentColor: '#000000' }}
                  />
                  <label htmlFor="performance-other" className="text-white text-sm cursor-pointer">
                    {t('studentForm.options.other')}:
                  </label>
                  {performances.includes('other') && (
                    <input
                      type="text"
                      {...register('performanceOther', {
                        maxLength: { value: 100, message: t('studentForm.validation.performanceOtherMax') }
                      })}
                      placeholder="Specify"
                      className="px-3 py-1 bg-black rounded border border-gray-600 text-white text-sm focus:outline-none focus:border-[#FDB813] w-32 cursor-text"
                      maxLength={100}
                    />
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
              className={`w-full px-4 py-2 bg-black rounded border ${errors.goals ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text resize-none`}
              maxLength={1000}
              placeholder="Describe your music learning goals and interests"
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
                    className="w-4 h-4 bg-white border-gray-600 cursor-pointer accent-black"
                    style={{ accentColor: '#000000' }}
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
                    className="w-4 h-4 bg-white border-gray-600 cursor-pointer accent-black"
                    style={{ accentColor: '#000000' }}
                  />
                  <label htmlFor="volunteer-no" className="text-white text-sm cursor-pointer">
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
                {['volunteerOnlineTeacher', 'volunteerOfflineConferences', 'volunteerSummerKids', 'volunteerEvents'].map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={area}
                      checked={volunteerAreas.includes(area)}
                      onChange={(e) => handleCheckboxChange(area, e.target.checked, volunteerAreas, setVolunteerAreas)}
                      className="w-4 h-4 bg-white border-gray-600 rounded cursor-pointer accent-black"
                      style={{ accentColor: '#000000' }}
                    />
                    <label htmlFor={area} className="text-white text-sm cursor-pointer">
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
                {t('studentForm.fields.emergencyName')} *
              </label>
              <input
                id="emergencyName"
                type="text"
                {...register('emergencyName', { 
                  required: t('studentForm.validation.emergencyNameRequired'),
                  minLength: { value: 2, message: t('studentForm.validation.emergencyNameMin') },
                  maxLength: { value: 100, message: t('studentForm.validation.nameMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.emergencyName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder="Enter emergency contact name"
                maxLength={100}
              />
              {errors.emergencyName && (
                <p className="text-red-400 text-xs mt-1">{errors.emergencyName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="emergencyRelationship" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.emergencyRelationship')} *
              </label>
              <input
                id="emergencyRelationship"
                type="text"
                {...register('emergencyRelationship', { 
                  required: t('studentForm.validation.emergencyRelationshipRequired'),
                  maxLength: { value: 50, message: t('studentForm.validation.relationshipMax') }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.emergencyRelationship ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder="Enter relationship (e.g., Parent, Spouse)"
                maxLength={50}
              />
              {errors.emergencyRelationship && (
                <p className="text-red-400 text-xs mt-1">{errors.emergencyRelationship.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="emergencyContact" className="block text-white text-sm font-medium mb-1">
                {t('studentForm.fields.emergencyContact')} *
              </label>
              <input
                id="emergencyContact"
                type="tel"
                {...register('emergencyContact', { 
                  required: t('studentForm.validation.emergencyContactRequired'),
                  pattern: { 
                    value: /^[0-9+\-\s()]{10,15}$/, 
                    message: t('studentForm.validation.phonePattern') 
                  }
                })}
                className={`w-full px-4 py-2 bg-black rounded border ${errors.emergencyContact ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                maxLength={15}
                placeholder="(123) 456-7890"
              />
              {errors.emergencyContact && (
                <p className="text-red-400 text-xs mt-1">{errors.emergencyContact.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Submit and Reset Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-8 py-3 bg-[#FDB813] hover:bg-[#DAA520] text-black rounded text-center transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isSubmitting ? t('studentForm.buttons.submitting') : t('studentForm.buttons.submit')}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-8 py-3 bg-black hover:bg-gray-900 text-white rounded border-2 border-[#FDB813] text-center transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {t('studentForm.buttons.reset')}
          </button>
        </div>
      </form>
    </div>
  );
}
