"use client";

import { useState, useMemo, useCallback, useRef, useEffect, memo } from "react";
import { motion } from "motion/react";
import { MapPin, Play, X, Quote, Maximize, Minimize, Calendar, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { logger } from '@/lib/logger';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from 'sonner';
import { primaryBackground, accentGold } from "../utils/theme";
import { useTranslation } from 'react-i18next';
import { ScrollToTop } from './ScrollToTop';
import { sanitizeInput } from '@/lib/security';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  date: string;
  location: string;
  category?: string;
  image: string | null;
  text: string;
  fullscreenTestimonial?: boolean;
  email?: string;
}

// Type for stories coming from the public API
interface PublicStory {
  id: number;
  title?: string | null;
  location?: string | null;
  role?: string | null;
  status?: string | null;
  category?: string | null;
  body?: string | null;
  media_type: 'text' | 'video';
  video_url?: string | null;
  thumbnail_url?: string | null;
  date?: string | null;
  created_by?: string | null;
  email?: string | null;
}

interface Video {
  id: string;
  videoId: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  role?: string;
  category?: string;
}

// Date formatting helper function - memoized
const formatDate = (dateStr?: string | null): string => {
  if (!dateStr) return '';
  // Handle ISO dates like 2025-11-18 or 2025-11-18T08:00:00.000Z
  const isoMatch = /^\d{4}-\d{2}-\d{2}(?:T|$)/.test(dateStr);
  if (isoMatch) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }

  // Handle legacy format: "DD-MMM-YYYY" (e.g., "15-Jun-2023")
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${month} ${day}, ${year}`;
  }

  return dateStr;
};

interface EventData {
  id: string;
  title: string;
  description: string;
  testimonials?: Testimonial[];
  videos?: Video[];
}

// Tab configuration (used for the page tabs and the event select)
// Tabs ordered by the new category display names (alphabetical by new label)
const TAB_CONFIG = [
  { key: "guinness", label: "Guinness World Record", title: "Guinness World Record" },
  { key: "bibleschool", label: "Hallel Bible School", title: "Hallel Bible School" },
  { key: "hallelconference", label: "Hallel Conference", title: "Hallel Conference" },
  { key: "lcmclasses", label: "London College of Music (LCM)", title: "London College of Music (LCM)" },
  { key: "onlineschool", label: "Online Free Course (Keyboard & Guitar)", title: "Online Free Course (Keyboard & Guitar)" },
  { key: "songbooks", label: "Song Writing Classes", title: "Song Writing Classes" },
  { key: "summercamp", label: "Kids Summer Camp", title: "Kids Summer Camp" }
] as const;


// Testimonial Modal Component - Memoized for performance
  const TestimonialModal = memo(({ 
  testimonial, 
  isOpen, 
  onClose 
}: { 
  testimonial: Testimonial;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isExtraLongText = testimonial.text.length > 500;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      closeButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const paragraphs = testimonial.text.split('\\n\\n').filter(p => p.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <motion.div 
        ref={modalRef}
        className={`bg-[#2E2E2E] rounded-lg ${isFullscreen ? 'w-full h-full max-h-full' : 'max-w-3xl w-full max-h-[90vh]'} overflow-y-auto overflow-x-hidden`} 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`${isFullscreen ? 'p-6 md:p-10' : 'p-6 md:p-8'}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mr-4 flex-shrink-0">
                <ImageWithFallback 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                  fallbackVariant="person"
                  fallbackIconClassName="text-white"
                  fallbackBgClassName="bg-[#1f1f1f]"
                    fallbackIconSize={40}
                />
              </div>
              <div className="text-left">
                <h3 className="text-white text-xl md:text-2xl font-medium">{testimonial.name}</h3>
                <p className="text-white">{testimonial.role}</p>
                <div className="flex flex-col md:flex-row md:items-center text-white text-sm mt-2 gap-1 md:gap-0">
                  <div className="flex items-center md:mr-4">
                    <Calendar size={14} className="mr-1 text-white" />
                    <span>{formatDate(testimonial.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1 text-white" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              {(isExtraLongText || testimonial.fullscreenTestimonial) && (
                <button 
                  onClick={toggleFullscreen}
                  className="text-gray-400 hover:text-white transition-colors p-1 mr-2 cursor-pointer"
                  aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
                >
                  {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                </button>
              )}
              <button 
                ref={closeButtonRef}
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          <div className="text-left mt-6">
            <Quote className="text-gray-400 opacity-20 mb-4" size={48} />
              <div className={`${isFullscreen ? 'max-w-4xl mx-auto' : ''}`}>
                <div
                  className={`text-white ${isFullscreen ? 'text-lg md:text-xl' : 'text-base md:text-lg'} leading-relaxed mb-4 break-words whitespace-normal`}
                  style={{ overflowWrap: 'break-word', wordBreak: 'normal' }}
                  dangerouslySetInnerHTML={{ __html: sanitizeInput(testimonial.text) || '' }}
                />
              </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

TestimonialModal.displayName = 'TestimonialModal';

// Testimonial Card Component - Memoized for performance
const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Memoize sanitized short HTML for the card (keeps allowed tags)
  const shortHtml = useMemo(() => sanitizeInput(testimonial.text, 200) || '', [testimonial.text]);

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <div 
        className="bg-[#2E2E2E] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#FDB813] flex flex-col justify-between h-full" 
        onClick={handleOpenModal}
      >
        <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
            <ImageWithFallback 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
              fallbackVariant="person"
              fallbackIconClassName="text-white"
              fallbackBgClassName="bg-[#1f1f1f]"
                  fallbackIconSize={40}
            />
          </div>
          <div className="text-left">
            <h4 className="text-white font-medium">{testimonial.name}</h4>
            <p className="text-white text-sm">{testimonial.role}</p>
            {/* Do not display email or phone in public testimonial cards */}
            <div className="flex flex-col text-white text-xs mt-1 gap-0.5">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{formatDate(testimonial.date)}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                <span>{testimonial.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white text-sm text-left leading-relaxed flex-grow break-words whitespace-normal overflow-hidden max-w-full" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: shortHtml }} />
        <button className="text-[#FDB813] hover:text-[#DAA520] transition-colors text-sm cursor-pointer self-start">
          Read more →
        </button>
      </div>
      <TestimonialModal 
        testimonial={testimonial}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

// Video Card Component - Memoized for performance
const VideoCard = memo(({ video }: { video: Video }) => {
  const thumbnailUrl = useMemo(() => 
    `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
    [video.videoId]
  );
  
  const youtubeUrl = useMemo(() => 
    `https://www.youtube.com/watch?v=${video.videoId}`,
    [video.videoId]
  );

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#2E2E2E] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#FDB813] cursor-pointer flex flex-col h-full no-underline"
    >
      <div className="relative aspect-video bg-gray-900">
        <img 
          src={thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
          width="1280"
          height="720"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
          <div className="w-16 h-16 rounded-full bg-[#FDB813] flex items-center justify-center group-hover:bg-[#DAA520] transition-colors">
            <Play size={32} className="text-black ml-1" fill="black" />
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-white font-medium mb-1 text-left">{video.title}</h4>
        <div className="flex items-center text-white text-xs gap-3 mb-2">
          {video.role ? (
            <span className="text-white text-xs">{video.role}</span>
          ) : null}
          {video.role && video.location ? <span className="text-gray-500">•</span> : null}
          {video.location ? (
            <div className="flex items-center">
              <MapPin size={12} className="mr-1" />
              <span>{video.location}</span>
            </div>
          ) : null}
        </div>

        <div className="mt-auto flex items-center text-white text-xs">
          <Calendar size={12} className="mr-1" />
          <span>{formatDate(video.date)}</span>
        </div>
      </div>
    </a>
  );
});

VideoCard.displayName = 'VideoCard';

// Submit Testimony Form Component - Memoized for performance
const SubmitTestimonyForm = memo(() => {
  const { t } = useTranslation('stories');
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();
  // register honeypot field
  useEffect(() => { register('hp'); }, [register]);
  const testimonyRef = useRef<HTMLDivElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const watched = watch();
  const requiredFilled = Boolean((watched.name || '').toString().trim())
    && Boolean((watched.email || '').toString().trim())
    && Boolean((watched.role || '').toString().trim())
    && Boolean((watched.category || '').toString().trim())
    && Boolean((watched.location || '').toString().trim())
    && Boolean((watched.testimony || '').toString().trim());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isTestimonyEmpty, setIsTestimonyEmpty] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [storyImageFile, setStoryImageFile] = useState<File | null>(null);
  const [storyImagePreview, setStoryImagePreview] = useState<string>('');
  const [storyImageError, setStoryImageError] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const validateStoryImage = useCallback((file: File) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowed.includes((file.type || '').toLowerCase())) return 'Only JPG, JPEG, and PNG files are allowed';
    if (file.size > 3_000_000) return 'Image must be 3MB or smaller';
    return '';
  }, []);

  const clearStoryImage = useCallback(() => {
    setStoryImageFile(null);
    setStoryImageError('');
    setStoryImagePreview(prev => {
      if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
      return '';
    });
    if (imageInputRef.current) imageInputRef.current.value = '';
  }, []);

  const handleStoryImageSelect = useCallback((file?: File | null) => {
    if (!file) {
      clearStoryImage();
      return;
    }
    const err = validateStoryImage(file);
    if (err) {
      clearStoryImage();
      setStoryImageError(err);
      return;
    }
    setStoryImageError('');
    setStoryImageFile(file);
    setStoryImagePreview(prev => {
      if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, [clearStoryImage, validateStoryImage]);

  useEffect(() => {
    return () => {
      if (storyImagePreview && storyImagePreview.startsWith('blob:')) URL.revokeObjectURL(storyImagePreview);
    };
  }, [storyImagePreview]);

  const updateFormattingState = useCallback(() => {
    try {
      const sel = document.getSelection();
      if (!sel || !sel.anchorNode || !testimonyRef.current) {
        setIsBold(false);
        setIsItalic(false);
        setIsUnderline(false);
        return;
      }
      // Only update state when selection is inside the testimony editor
      if (!testimonyRef.current.contains(sel.anchorNode)) {
        setIsBold(false);
        setIsItalic(false);
        setIsUnderline(false);
        return;
      }

      // document.queryCommandState is deprecated but works for simple editors
      setIsBold(Boolean((document as any).queryCommandState && (document as any).queryCommandState('bold')));
      setIsItalic(Boolean((document as any).queryCommandState && (document as any).queryCommandState('italic')));
      setIsUnderline(Boolean((document as any).queryCommandState && (document as any).queryCommandState('underline')));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', updateFormattingState);
    // also update on keyboard navigation inside editor
    testimonyRef.current?.addEventListener('keyup', updateFormattingState);
    testimonyRef.current?.addEventListener('mouseup', updateFormattingState);
    return () => {
      document.removeEventListener('selectionchange', updateFormattingState);
      testimonyRef.current?.removeEventListener('keyup', updateFormattingState);
      testimonyRef.current?.removeEventListener('mouseup', updateFormattingState);
    };
  }, [updateFormattingState]);

  // Register testimony as a form field with custom validation that counts
  // visible text (strip HTML) so rich text still validates against min length.
  useEffect(() => {
    register('testimony', {
      required: t('form.testimonyRequired'),
      validate: (v: any) => {
        const text = String(v || '').replace(/<[^>]*>/g, '').trim();
        return text.length >= 4 || t('form.testimonyMinLength');
      },
      maxLength: { value: 5000, message: t('form.testimonyMaxLength') }
    });
  }, [register, t]);

  // Keep the contentEditable element in sync with the form value
  useEffect(() => {
    const html = (watched.testimony as string) || '';
    if (testimonyRef.current && testimonyRef.current.innerHTML !== html) {
      testimonyRef.current.innerHTML = html;
    }
  }, [watched.testimony]);

  // Track whether the testimony content is empty (plain-text) to show placeholder
  useEffect(() => {
    const text = String(watched.testimony || '').replace(/<[^>]*>/g, '').trim();
    setIsTestimonyEmpty(text.length === 0);
  }, [watched.testimony]);

  // Close emoji picker when clicking outside of it or the emoji button
  useEffect(() => {
    if (!showEmojiPicker) return;
    const onDown = (ev: MouseEvent) => {
      const target = ev.target as Node | null;
      if (!target) return;
      const picker = emojiPickerRef.current;
      const btn = emojiButtonRef.current;
      if (picker && picker.contains(target)) return; // click inside picker
      if (btn && btn.contains(target)) return; // click on button
      setShowEmojiPicker(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [showEmojiPicker]);

  const onSubmit = useCallback(async (data: any) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Map category key to display name on the server; send key here
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        category: data.category, // key like 'guinness'
        location: data.location,
        testimony: data.testimony,
        hp: data.hp || ''
      };
      if (storyImageFile) {
        const form = new FormData();
        form.append('file', storyImageFile);
        const uploadResp = await fetch('/api/stories/upload', { method: 'POST', body: form });
        const uploadJson = await uploadResp.json();
        if (!uploadResp.ok || !uploadJson?.success || !uploadJson?.url) {
          throw new Error(uploadJson?.error || 'Failed to upload image');
        }
        (payload as any).thumbnail_url = uploadJson.url;
      }
      // try getting reCAPTCHA token
      try {
        const { getRecaptchaToken } = await import('@/lib/recaptcha');
        const token = await getRecaptchaToken('stories');
        if (token) (payload as any).recaptchaToken = token;
      } catch (e) {}

      const resp = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const j = await resp.json();
      if (!resp.ok || !j?.success) {
        const msg = j?.error || 'Failed to submit testimony';
        throw new Error(msg);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      reset();
      clearStoryImage();
    } catch (err: any) {
      logger.error('Submit testimony error', err);
      setIsSubmitting(false);
      toast.error(err?.message || 'Submission failed');
    }
  }, [clearStoryImage, reset, storyImageFile]);

  return (
    <section id="submit-testimony" className="py-12 mt-12 border-t border-gray-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl text-white font-normal mb-2">{t('form.title')}</h2>
        <div className="w-24 h-1 bg-[#FDB813] mb-4 mx-auto"></div>
        <div className="mb-8 space-y-4">
          <p className="text-gray-300">{t('form.subtitle')}</p>
          <div className="mx-auto max-w-5xl rounded-xl border border-[#FDB813] bg-[#FDB813]/12 px-4 py-3 text-center shadow-[0_0_0_1px_rgba(253,184,19,0.15)] md:px-6">
            <p className="text-sm md:text-base font-semibold leading-relaxed text-[#FFE08A] md:whitespace-nowrap">
              {t('form.videoNotice', {
                defaultValue:
                  'If you’d like to share your video testimonies, please send them to Bro. Augustine WhatsApp number: +91 8309655233',
              })}
            </p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto bg-[#2E2E2E] p-6 md:p-8 rounded-lg shadow-lg">
          {submitSuccess ? (
            <div>
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#FDB813' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-black font-bold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="mb-6 text-xl font-semibold text-white">{t('form.successMessage', { defaultValue: "Thanks — we'll get back to you soon!" })}</p>
                <button
                  type="button"
                  onClick={() => { reset(); setSubmitSuccess(false); }}
                  className="px-6 py-2 bg-[#FDB813] shadow-lg text-black cursor-pointer rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 inline-flex items-center justify-center"
                  style={{ backgroundColor: '#FDB813' }}
                >
                  {t('form.sendAnother', { defaultValue: 'Send another message' })}
                </button>
            </div>
          ) : null}
          
          {!submitSuccess && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="name" className="block text-white text-sm font-medium">{t('form.nameLabel')} <span className="text-[#FDB813]">*</span></label>
                  <p className="text-sm text-gray-400">{(watched.name || '').length}/100</p>
                </div>
                <input
                  id="name"
                  type="text"
                  maxLength={100}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  placeholder={t('form.namePlaceholder')}
                  {...register("name", { 
                    required: t('form.nameRequired'),
                    minLength: { value: 2, message: t('form.nameMinLength') },
                    maxLength: { value: 100, message: t('form.nameMaxLength') }
                  })}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message as string}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="email" className="block text-white text-sm font-medium">{t('form.emailLabel')} <span className="text-[#FDB813]">*</span></label>
                  <p className="text-sm text-gray-400">{(watched.email || '').length}/254</p>
                </div>
                <input
                  id="email"
                  type="email"
                  maxLength={254}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  placeholder={t('form.emailPlaceholder')}
                  {...register("email", { 
                    required: t('form.emailRequired'),
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                      message: t('form.emailInvalid')
                    },
                    maxLength: { value: 254, message: t('form.emailMaxLength') }
                  })}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message as string}</p>}
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="phone" className="block text-white text-sm font-medium">{t('form.phoneLabel', { defaultValue: 'Phone' })} <span className="text-gray-400 text-xs">(optional)</span></label>
                  <p className="text-sm text-gray-400">{(watched.phone || '').length}/10</p>
                </div>
                <input
                  id="phone"
                  type="tel"
                  maxLength={10}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  placeholder={t('form.phonePlaceholder', { defaultValue: 'Phone number' })}
                  {...register("phone", {
                    pattern: { value: /^[0-9+()\-\.\s]+$/, message: t('form.phoneInvalid', { defaultValue: 'Invalid phone number' }) },
                    minLength: { value: 7, message: t('form.phoneMinLength', { defaultValue: 'Phone is too short' }) },
                    maxLength: { value: 10, message: t('form.phoneMaxLength', { defaultValue: 'Phone is too long' }) }
                  })}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message as string}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="role" className="block text-white text-sm font-medium">{t('form.roleLabel')} <span className="text-[#FDB813]">*</span></label>
                  <p className="text-sm text-gray-400">{(watched.role || '').length}/100</p>
                </div>
                <input
                  id="role"
                  type="text"
                  maxLength={100}
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.role ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                  placeholder={t('form.rolePlaceholder')}
                  {...register("role", { required: t('form.roleRequired'), maxLength: { value: 100, message: t('form.roleMaxLength') } })}
                />
                {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message as string}</p>}
              </div>
              
              <div>
                {/* Safe translation fallback: t may return the key when missing, so fall back to literal 'Category' */}
                {(() => {
                  const raw = t('form.categoryLabel');
                  const label = (raw && !raw.includes('form.')) ? raw : 'Category';
                  return (
                    <label htmlFor="category" className="block text-white text-sm font-medium mb-1">{label} <span className="text-[#FDB813]">*</span></label>
                  );
                })()}
                <select
                  id="category"
                  className={`w-full px-4 py-2 bg-black rounded-md border ${errors.category ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-pointer`}
                  {...register("category", { required: t('form.eventRequired') })}
                >
                  <option value="">{t('form.eventPlaceholder')}</option>
                  {TAB_CONFIG.map((tab) => (
                    <option key={tab.key} value={tab.key}>
                      {t(`tabs.${tab.key}.title`)}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message as string}</p>}
              </div>
            </div>
            
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="location" className="block text-white text-sm font-medium">{t('form.locationLabel')} <span className="text-[#FDB813]">*</span></label>
                <p className="text-sm text-gray-400">{(watched.location || '').length}/100</p>
              </div>
              <input
                id="location"
                type="text"
                maxLength={100}
                className={`w-full px-4 py-2 bg-black rounded-md border ${errors.location ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text`}
                placeholder={t('form.locationPlaceholder')}
                {...register("location", { required: t('form.locationRequired'), maxLength: { value: 100, message: t('form.locationMaxLength') } })}
              />
              {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location.message as string}</p>}
            </div>
            
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="story-image" className="block text-white text-sm font-medium">{t('form.profileImageLabel', { defaultValue: 'Profile Image' })} <span className="text-gray-400 text-xs">({t('form.optional', { defaultValue: 'optional' })})</span></label>
                <p className="text-sm text-gray-400">1 {t('form.fileMax', { defaultValue: 'file max' })}</p>
              </div>
              <input
                ref={imageInputRef}
                id="story-image"
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                className="hidden"
                onChange={(e) => handleStoryImageSelect(e.target.files?.[0] || null)}
              />
              <div
                role="button"
                tabIndex={0}
                onClick={() => imageInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    imageInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragActive(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragActive(false);
                  handleStoryImageSelect(e.dataTransfer.files?.[0] || null);
                }}
                className={`w-full rounded-md border-2 border-dashed px-4 py-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-[#FDB813] bg-[#1a1a1a]' : 'border-gray-600 bg-black hover:border-[#FDB813]'}`}
                aria-label={t('form.profileImageAriaLabel', { defaultValue: 'Upload profile image' })}
              >
                {storyImagePreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img src={storyImagePreview} alt="Selected story preview" className="h-32 w-32 rounded-lg object-cover border border-gray-700" />
                    <div className="text-sm text-gray-300">{storyImageFile?.name}</div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearStoryImage();
                      }}
                      className="px-3 py-1 text-sm rounded-full border border-gray-600 text-white hover:bg-[#111] cursor-pointer"
                    >
                      {t('form.removeProfileImage', { defaultValue: 'Remove profile image' })}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-300">
                    <Upload size={28} className="text-[#FDB813]" />
                    <div className="font-medium">{t('form.profileImageDrop', { defaultValue: 'Click or drag & drop one profile image here' })}</div>
                    <div className="text-xs text-gray-400">{t('form.profileImageHint', { defaultValue: 'JPG, JPEG, PNG only • Max 3MB' })}</div>
                  </div>
                )}
              </div>
              {storyImageError ? <p className="text-red-400 text-xs mt-1">{storyImageError}</p> : null}
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="testimony" className="block text-white text-sm font-medium">{t('form.testimonyLabel')} <span className="text-[#FDB813]">*</span></label>
                <p className="text-sm text-gray-400">{String((watched.testimony || '')).replace(/<[^>]*>/g, '').length}/5000</p>
              </div>
              {/* Rich text editor using contentEditable to allow simple formatting and emojis */}
              <div>
                {/* Toolbar */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!testimonyRef.current) return;
                      testimonyRef.current.focus();
                      document.execCommand('bold');
                      updateFormattingState();
                    }}
                    className={`px-2 py-1 rounded-md border ${isBold ? 'bg-[#FDB813] text-black border-[#e0a300]' : 'bg-[#1f1f1f] text-white border-gray-700'} hover:bg-[#2a2a2a]`}
                    aria-label="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!testimonyRef.current) return;
                      testimonyRef.current.focus();
                      document.execCommand('italic');
                      updateFormattingState();
                    }}
                    className={`px-2 py-1 rounded-md border ${isItalic ? 'bg-[#FDB813] text-black border-[#e0a300]' : 'bg-[#1f1f1f] text-white border-gray-700'} hover:bg-[#2a2a2a]`}
                    aria-label="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!testimonyRef.current) return;
                      testimonyRef.current.focus();
                      document.execCommand('underline');
                      updateFormattingState();
                    }}
                    className={`px-2 py-1 rounded-md border ${isUnderline ? 'bg-[#FDB813] text-black border-[#e0a300]' : 'bg-[#1f1f1f] text-white border-gray-700'} hover:bg-[#2a2a2a]`}
                    aria-label="Underline"
                  >
                    <span style={{ textDecoration: 'underline' }}>U</span>
                  </button>
                  {/* Bullet list button removed per request */}

                  <div className="relative">
                    <button
                      ref={emojiButtonRef}
                      type="button"
                      onClick={() => setShowEmojiPicker(s => !s)}
                      className="px-2 py-1 bg-[#1f1f1f] text-white rounded-md border border-gray-700 hover:bg-[#2a2a2a]"
                      aria-label="Emoji picker"
                    >
                      😊
                    </button>
                    {showEmojiPicker && (
                      <div ref={emojiPickerRef} className="absolute left-0 mt-2 bg-[#2E2E2E] border border-gray-700 rounded-md p-2 shadow-lg z-20 min-w-[380px]" role="dialog" aria-label="Emoji picker">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '8px', maxHeight: '40vh', overflow: 'auto', padding: '4px' }}>
                          {[
                            "😀","😃","😄","😁","😆","😂","🤣","😊","🙂","😉",
                            "😍","😘","😚","😇","🤩","🤗","🙌","👏","👍","👎",
                            "🙏","🎉","🔥","✨","💯","❤️","💙","💚","💛","🧡",
                            "💜","😅","😅","🤪","🤯","😴","😎","🤝","🤲","🤞"
                          ].map((e, i) => (
                            <button
                              key={`${e}-${i}`}
                              type="button"
                              onClick={() => {
                                if (!testimonyRef.current) return;
                                testimonyRef.current.focus();
                                try {
                                  document.execCommand('insertText', false, e);
                                } catch (err) {
                                  const sel = document.getSelection();
                                  if (!sel || !sel.rangeCount) return;
                                  const range = sel.getRangeAt(0);
                                  range.deleteContents();
                                  range.insertNode(document.createTextNode(e));
                                  range.setStartAfter(range.endContainer as Node);
                                  sel.removeAllRanges();
                                  sel.addRange(range);
                                }
                                const html = testimonyRef.current.innerHTML || '';
                                setValue('testimony', html, { shouldValidate: true, shouldDirty: true });
                                setIsTestimonyEmpty(false);
                                setShowEmojiPicker(false);
                              }}
                              className="p-2 text-xl flex items-center justify-center"
                              aria-label={`Insert ${e}`}
                            >
                              {e}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <div
                    id="testimony"
                    ref={testimonyRef}
                    contentEditable
                    role="textbox"
                    aria-multiline
                    data-placeholder={t('form.testimonyPlaceholder')}
                    onInput={(e) => {
                      const html = (e.target as HTMLDivElement).innerHTML || '';
                      // update form value with HTML (server will sanitize)
                      setValue('testimony', html, { shouldValidate: true, shouldDirty: true });
                      const text = (e.target as HTMLDivElement).innerText || '';
                      setIsTestimonyEmpty(String(text || '').trim().length === 0);
                    }}
                    onBlur={(e) => {
                      // ensure validation runs on blur
                      const html = (e.target as HTMLDivElement).innerHTML || '';
                      setValue('testimony', html, { shouldValidate: true });
                      const text = (e.target as HTMLDivElement).innerText || '';
                      setIsTestimonyEmpty(String(text || '').trim().length === 0);
                    }}
                    className={`w-full px-4 py-2 bg-black rounded-md border ${errors.testimony ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-[#FDB813] cursor-text resize-none min-h-[12rem]`}
                    style={{ outline: 'none', minHeight: '12rem' }}
                    suppressContentEditableWarning
                  />

                  {isTestimonyEmpty && (
                    <div className="absolute inset-0 pointer-events-none flex items-start">
                      <div className="px-4 py-2 text-gray-400">{t('form.testimonyPlaceholder')}</div>
                    </div>
                  )}
                </div>
              </div>
              {/* Preview removed per request */}
              {errors.testimony && <p className="text-red-400 text-xs mt-1">{errors.testimony.message as string}</p>}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting || !requiredFilled}
                aria-label={t('form.submitButton', { defaultValue: 'Submit Testimony' })}
                className={`flex-1 py-2 px-4 text-sm text-center bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 ${
                  (isSubmitting || !requiredFilled) ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {isSubmitting ? t('form.submitting') : t('form.submitButton')}
              </button>

              <button
                type="button"
                onClick={() => { reset(); clearStoryImage(); }}
                disabled={isSubmitting}
                aria-label={t('form.resetButton', { defaultValue: 'Reset Form' })}
                className={`flex-1 py-2 px-4 text-sm bg-black cursor-pointer font-semibold text-white rounded-full border-2 border-[#FDB813] transition-colors duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#111]'}`}
              >
                {t('form.resetButton', { defaultValue: 'Reset Form' })}
              </button>
            </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

SubmitTestimonyForm.displayName = 'SubmitTestimonyForm';

export function StoriesPage() {
  const { t } = useTranslation('stories');
  
  // default tab (server-safe). We will read URL hash on the client and update.
  const [activeTab, setActiveTab] = useState<string>('guinness');
  const [publicStories, setPublicStories] = useState<PublicStory[]>([]);
  const [previewUrls, setPreviewUrls] = useState<Record<number, string>>({});
  // Client-side pagination sizes for stories/videos
  const PAGE_SIZE_TESTIMONIALS = 8;
  const PAGE_SIZE_VIDEOS = 8;
  const [testimonialsVisible, setTestimonialsVisible] = useState<number>(PAGE_SIZE_TESTIMONIALS);
  const [videosVisible, setVideosVisible] = useState<number>(PAGE_SIZE_VIDEOS);

  const handleTabChange = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Reset visible counts when tab changes
  useEffect(() => {
    setTestimonialsVisible(PAGE_SIZE_TESTIMONIALS);
    setVideosVisible(PAGE_SIZE_VIDEOS);
  }, [activeTab]);

  const loadMoreTestimonials = useCallback(() => {
    setTestimonialsVisible((s) => s + PAGE_SIZE_TESTIMONIALS);
  }, []);

  const loadMoreVideos = useCallback(() => {
    setVideosVisible((s) => s + PAGE_SIZE_VIDEOS);
  }, []);

  // fetch public stories from DB (approved & visible)
  useEffect(() => {
    // read hash on client only
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1); // Remove the '#'
      const params = new URLSearchParams(hash);
      const tab = params.get('tab') || 'guinness';
      setActiveTab(tab);
    }

    let mounted = true;
    const fetchStories = async () => {
      try {
        const resp = await fetch('/api/stories');
        const j = await resp.json();
        if (!mounted) return;
        if (j?.success) {
          setPublicStories(j.data || []);
        } else {
          setPublicStories([]);
        }
      } catch (err) {
        // fail silently — keep UI unchanged
        setPublicStories([]);
        if (process.env.NODE_ENV !== 'production') console.error('Failed to load public stories', err);
      }
    };

    void fetchStories();
    return () => { mounted = false; };
  }, []);

  // Resolve r2:// thumbnail references to signed URLs for display (cards and modal)
  useEffect(() => {
    let cancelled = false;

    const itemsToResolve = publicStories.filter(s => s.thumbnail_url && !previewUrls[s.id]);
    if (itemsToResolve.length === 0) return;

    (async () => {
      const resolved: Record<number, string> = {};
      await Promise.all(itemsToResolve.map(async (s) => {
        try {
          const url = s.thumbnail_url;
          if (!url) return;
          if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
            resolved[s.id] = url as string;
            return;
          }
          if (!url.startsWith('r2://')) return;
          const rest = url.slice('r2://'.length);
          const parts = rest.split('/').filter(Boolean);
          if (parts.length === 0) return;
          parts.shift();
          const key = parts.join('/');
          if (!key) return;
          const resp = await fetch('/api/r2/presign-get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, expiresIn: 3600 })
          });
          if (!resp.ok) return;
          const json = await resp.json();
          if (cancelled) return;
          if (json && json.url) resolved[s.id] = json.url;
        } catch (e) {
          // ignore
        }
      }));
      if (!cancelled && Object.keys(resolved).length > 0) {
        setPreviewUrls(prev => ({ ...prev, ...resolved }));
      }
    })();

    return () => { cancelled = true; };
  }, [publicStories, previewUrls]);

  // helper: extract YouTube id from url or return the string if it's already an id
  const extractYouTubeId = useCallback((url?: string | null) => {
    if (!url) return null;
    // if it already looks like an id (no slashes), return as-is
    if (!url.includes('/')) return url;
    try {
      const u = new URL(url);
      // look for v= param
      const v = u.searchParams.get('v');
      if (v) return v;
      // check path formats like /embed/ID or /watch/ID or /ID
      const parts = u.pathname.split('/').filter(Boolean);
      return parts.length ? parts[parts.length - 1] : null;
    } catch (e) {
      return null;
    }
  }, []);

  // Memoize tab buttons
  const tabButtons = useMemo(
    () =>
      TAB_CONFIG.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors focus:outline-none ${
              isActive
                ? "bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]"
                : "bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]"
            }`}
            onClick={() => handleTabChange(tab.key)}
            style={{ cursor: "pointer" }}
            aria-selected={isActive}
            role="tab"
          >
            {t(`tabs.${tab.key}.label`)}
          </button>
        );
      }),
    [activeTab, handleTabChange, t]
  );

  // No mock `eventsData` — tab-specific titles/descriptions are provided via translations.

  // Map public stories into testimonial/video shapes used by this page
  // Only include stories with status 'approved'
  const mappedPublicText = useMemo(() => {
    return publicStories
      .filter(s => s.media_type === 'text' && (s.status || '').toLowerCase() === 'approved')
      .map<Testimonial>(s => ({
        id: s.id,
        name: s.title || 'Story',
        role: s.role || '',
        date: s.date || '',
        // Use the story `location` field as the displayed location
        location: s.location || '',
        category: s.category || '',
        // Prefer resolved previewUrls from r2 presign, fallback to thumbnail_url (signed or raw)
        image: (previewUrls && previewUrls[s.id]) || s.thumbnail_url || null,
        text: s.body || '',
        // intentionally omit email/phone from public mapping
      }));
  }, [publicStories, previewUrls]);

  const mappedPublicVideos = useMemo(() => {
    return publicStories
      .filter(s => s.media_type === 'video' && (s.status || '').toLowerCase() === 'approved')
      .map<Video>(s => ({
        id: `story-${s.id}`,
        videoId: extractYouTubeId(s.video_url) || (s.video_url || '').replace(/.*\//, ''),
        title: s.title || 'Video Story',
        date: s.date || '',
        description: s.body || '',
        // Use the story `location` field as the displayed location
        location: s.location || '',
        role: s.role || '',
        category: s.category || ''
      }));
  }, [publicStories, extractYouTubeId]);

  // Map active tab key -> admin category display name
  const TAB_TO_CATEGORY: Record<string, string> = {
    guinness: 'Guinness World Record',
    bibleschool: 'Hallel Bible School',
    hallelconference: 'Hallel Conference',
    lcmclasses: 'London College of Music (LCM)',
    onlineschool: 'Online Free Course (Keyboard & Guitar)',
    songbooks: 'Song Writing Classes',
    summercamp: 'Kids Summer Camp'
  };

  // Decide which data to display: only show DB-fed stories; do not fall back to mock data
  const displayedTestimonials = useMemo(() => {
    const cat = TAB_TO_CATEGORY[activeTab] || '';
    return mappedPublicText.filter(t => (t.category || '') === cat);
  }, [mappedPublicText, activeTab]);

  const displayedVideos = useMemo(() => {
    const cat = TAB_TO_CATEGORY[activeTab] || '';
    return mappedPublicVideos.filter(v => (v.category || '') === cat);
  }, [mappedPublicVideos, activeTab]);

  const hasContentForTab = useMemo(() => {
    return (displayedTestimonials && displayedTestimonials.length > 0) || (displayedVideos && displayedVideos.length > 0);
  }, [displayedTestimonials, displayedVideos]);

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: primaryBackground }}
    >
      {/* Main Content */}
      <div className="container mx-auto px-2 md:px-4 pt-12 md:pt-30 pb-16">
        {/* Tabs */}
        <div className="mb-6 my-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3" role="tablist">
            {tabButtons}
          </div>
        </div>

          {/* Tab Content */}
          <div className="mt-4" role="tabpanel">
            {/* Section Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl text-white mb-2">
                  {t(`tabs.${activeTab}.title`)}
                </h2>
                <div
                  className="w-24 h-1 mx-auto rounded-full mb-4"
                  style={{ backgroundColor: accentGold }}
                ></div>
                <div className="mx-auto mt-5 max-w-6xl px-4 md:px-0">
                  <div className="rounded-2xl border border-[#FDB813] bg-gradient-to-r from-[#2a2106] via-[#3a2c08] to-[#2a2106] px-4 py-4 md:px-4 lg:px-5 shadow-[0_0_30px_rgba(253,184,19,0.18)]">
                    <p className="text-sm md:text-base lg:text-lg font-semibold leading-relaxed text-[#FFF1C2] md:whitespace-nowrap">
                      {t(`tabs.${activeTab}.description`)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Empty-state when no stories in this tab */}
              {!hasContentForTab && (
                <div className="text-center py-12 bg-black border border-gray-700 rounded-lg mb-8">
                  <p className="text-gray-400">No Stories Available.</p>
                </div>
              )}

              {/* Tab-specific content (testimonies/videos) */}
              <>
                  {/* Testimonies Section */}
                  {displayedTestimonials && displayedTestimonials.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-2xl md:text-3xl text-white mb-6 text-center">{t('testimoniesHeading')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0 items-stretch">
                              {displayedTestimonials.slice(0, testimonialsVisible).map((testimonial) => (
                                <TestimonialCard key={`disp-${testimonial.id}`} testimonial={testimonial} />
                              ))}
                      </div>
                            {displayedTestimonials.length > testimonialsVisible && (
                              <div className="mt-6 text-center">
                                <button
                                  className="bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer py-2 px-6"
                                  onClick={loadMoreTestimonials}
                                  style={{ color: '#000' }}
                                >
                                  {t('loadMore')}
                                </button>
                              </div>
                            )}
                    </div>
                  )}

                  {/* Videos Section */}
                  {displayedVideos && displayedVideos.length > 0 && (
                    <div className="mt-12">
                      <div className="flex items-center mb-6">
                        <div className="flex-grow h-px bg-gray-700"></div>
                        <h3 className="text-xl text-white font-medium px-4 flex items-center">
                          <Play size={20} className="text-[#FDB813] mr-2" />
                          {t('relatedVideos')}
                        </h3>
                        <div className="flex-grow h-px bg-gray-700"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0 items-stretch">
                        {displayedVideos.slice(0, videosVisible).map((video) => (
                          <VideoCard key={`disp-${video.id}`} video={video} />
                        ))}
                      </div>
                      {displayedVideos.length > videosVisible && (
                        <div className="mt-6 text-center">
                          <button
                            className="bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer py-2 px-6"
                            onClick={loadMoreVideos}
                            style={{ color: '#000' }}
                          >
                            {t('loadMore')}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
        </div>

        {/* Submit Testimony Form - Common for all tabs */}
        <SubmitTestimonyForm />
      </div>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
