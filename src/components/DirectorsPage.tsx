"use client";

import { useState, useRef, useEffect, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Music, Globe, Mail, Youtube, Instagram, ExternalLink, ChevronRight, Award, Mic, BookOpen, Heart, Users, Calendar, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { useTranslation } from 'react-i18next';

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';
const separatorImage = `${R2_BASE}/separator.png`;

// Hero image URL (use lowercase to match files in `public/images/directors`)
const HERO_IMAGE_URL = `/images/directors/augustine.jpg`;

// Image URLs for preloading
const IMAGE_URLS = {
  augustine: HERO_IMAGE_URL,
  vijaya: `/images/directors/vijaya.jpg`,
  charles: `/images/directors/charlie.jpg`,
  nancy: `/images/directors/nancy.jpg`,
  hms: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
};

// Signed URLs fetched from server for R2 private/public objects. Keys are same
// as IMAGE_URLS keys. If a signed URL isn't available we'll fall back to the
// original IMAGE_URLS value.

// Memoized Image Component with lazy loading and priority support
const OptimizedImage = memo(({ src, alt, className, priority = false }: { src: string; alt: string; className: string; priority?: boolean }) => {
  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      priority={priority}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Tab configuration - will be translated in render
const TAB_CONFIG = [
  { key: "augustine" },
  { key: "vijaya" },
  { key: "charles" },
  { key: "nancy" }
] as const;

export function DirectorsPage() {
  const { t } = useTranslation('directors');
  const [activeTab, setActiveTab] = useState<string>("augustine");
  const [augustineTab, setAugustineTab] = useState("ministries");
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const [formStatus, setFormStatus] = useState({ submitted: false, message: "" });
  const [imagePreloaded, setImagePreloaded] = useState(false);
  
  const accentColor = "#FDB813";

  // Signed URLs returned by server for R2 objects. Keyed by the same keys used
  // in `IMAGE_URLS` (e.g. 'augustine', 'vijaya'). We prefetch presigned GET
  // URLs on mount so tab switches are fast.
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const router = useRouter();

  // Set up image URLs directly (static/public assets don't need presigning)
  useEffect(() => {
    const out: Record<string, string> = {};
    Object.entries(IMAGE_URLS).forEach(([k, v]) => {
      out[k] = v as string;
    });
    setSignedUrls(out);
    
    // Preload ALL director images on mount for instant tab switching
    const preloadLinks: HTMLLinkElement[] = [];
    Object.entries(IMAGE_URLS).forEach(([key, url], index) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      // First image (active tab) gets high priority
      if (index === 0) {
        link.setAttribute('fetchpriority', 'high');
      }
      document.head.appendChild(link);
      preloadLinks.push(link);
    });
    
    return () => {
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // Mark image as preloaded when tab changes
  useEffect(() => {
    const currentImage = signedUrls[activeTab as keyof typeof IMAGE_URLS] || IMAGE_URLS[activeTab as keyof typeof IMAGE_URLS];
    if (currentImage) {
      const img = new Image();
      img.src = currentImage;
      img.onload = () => setImagePreloaded(true);
    }
  }, [activeTab, signedUrls]);

  // Preload next tab image on tab hover (prefer signed URL when available)
  const handleTabHover = (tabKey: string) => {
    const nextImage = signedUrls[tabKey as keyof typeof IMAGE_URLS] || IMAGE_URLS[tabKey as keyof typeof IMAGE_URLS];
    if (nextImage) {
      const img = new Image();
      img.src = nextImage;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({
      submitted: true,
      message: "Thanks for reaching out! We'll get back to you soon."
    });
    if (contactFormRef.current) {
      contactFormRef.current.reset();
    }
  };

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    setImagePreloaded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Memoize tab buttons to prevent unnecessary re-renders
  const tabButtons = useMemo(() => (
    TAB_CONFIG.map((tab) => {
      const isActive = activeTab === tab.key;
      return (
        <button
          key={tab.key}
          className={`px-6 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold transition-colors focus:outline-none ${
            isActive
              ? "bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]"
              : "bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]"
          }`}
          onClick={() => handleTabChange(tab.key)}
          onMouseEnter={() => handleTabHover(tab.key)}
          style={{ cursor: 'pointer' }}
          aria-selected={isActive}
          role="tab"
        >
          {t(`tabs.${tab.key}`)}
        </button>
      );
    })
  ), [activeTab, t]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="container mx-auto px-2 md:px-4 pt-12 md:pt-30 pb-16">
        {/* Tabs */}
        <div className="mb-6 my-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4" role="tablist">
            {tabButtons}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4" role="tabpanel">
          {/* Augustine Tab */}
          {activeTab === "augustine" && (
            <AugustineTab 
              accentColor={accentColor} 
              augustineTab={augustineTab} 
              setAugustineTab={setAugustineTab}
              imagePreloaded={imagePreloaded}
              t={t}
              signedUrls={signedUrls}
            />
          )}

          {/* Vijaya Tab */}
          {activeTab === "vijaya" && (
            <VijayaTab accentColor={accentColor} imagePreloaded={imagePreloaded} t={t} signedUrls={signedUrls} />
          )}

          {/* Charles Tab */}
          {activeTab === "charles" && (
            <CharlesTab accentColor={accentColor} imagePreloaded={imagePreloaded} t={t} signedUrls={signedUrls} />
          )}

          {/* Nancy Tab */}
          {activeTab === "nancy" && (
            <NancyTab accentColor={accentColor} imagePreloaded={imagePreloaded} t={t} signedUrls={signedUrls} />
          )}
        </div>
      </div>
    </div>
  );
}

// Memoized Augustine Tab Component
const AugustineTab = memo(({ accentColor, augustineTab, setAugustineTab, imagePreloaded, t, signedUrls }: { 
  accentColor: string; 
  augustineTab: string; 
  setAugustineTab: (tab: string) => void;
  imagePreloaded: boolean;
  t: any;
  signedUrls: Record<string, string>;
}) => {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <section className="mb-16">
        <div className="flex flex-col items-center md:flex-row md:gap-12 md:items-stretch">
          <div className="order-2 md:order-1 mb-8 text-center md:mb-0 md:text-left md:w-[45%] md:pl-8 flex flex-col">
            <div className="space-y-4">
              <h1 className="mb-3 text-xl md:text-xl lg:text-3xl text-white font-bold break-words">
                {t('augustine.name')}
              </h1>
              
              {/* Role */}
              <div className="text-center md:text-left space-y-1">
                <p className="text-white text-xl">{t('augustine.role')}</p>
                <p className="text-white">{t('augustine.organization1')}</p>
                <p className="text-white">{t('augustine.organization2')}</p>
              </div>
              
              {/* All Titles with Grey Design */}
              <div className="space-y-2 mt-8 md:mt-4 md:mb-4">
                {/* Guinness World Record */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Award className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-sm md:text-base">{t('augustine.titles.guinnessRecord')}</span>
                  </div>
                </div>
                
                {/* Worship Leader */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Music className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('augustine.titles.worshipLeader')}</span>
                  </div>
                </div>
                
                {/* Song Writer */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Mic className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('augustine.titles.songWriter')}</span>
                  </div>
                </div>
                
                {/* Bible Teacher */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('augustine.titles.bibleTeacher')}</span>
                  </div>
                </div>
                
                {/* Shofar Instructor */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14" />
                      <path d="M20 4v16" />
                    </svg>
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('augustine.titles.shofarInstructor')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:justify-start mt-6 md:mt-auto">
                <button
                  onClick={() => { router.push('/contact?tab=getintouch'); }}
                  className="bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer py-3 px-6"
                  style={{ color: '#000000' }}
                >
                  {t('augustine.buttons.getInTouch')}
                </button>
              <button
                onClick={() => { router.push('/resources#worship'); }}
                className="bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer py-3 px-6"
                style={{ color: '#000000' }}
              >
                {t('augustine.buttons.worshipSongs')}
              </button>
            </div>
          </div>
          <div className="order-1 md:order-2 mb-8 md:mb-0 md:w-[35%] md:ml-auto md:mr-16 px-4 md:px-0">
            <div className="relative rounded-xl shadow-lg max-h-[438px] overflow-hidden">
              {!imagePreloaded && <Skeleton className="w-full h-full absolute inset-0" />}
              <OptimizedImage
                src={signedUrls?.augustine || HERO_IMAGE_URL}
                alt="Pastor Augustine Dandingi"
                className="object-cover w-full h-auto rounded-xl"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 mb-16 border-t border-b border-gray-800">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="p-6 text-center">
            <p className="mb-2 text-3xl font-bold" style={{ color: accentColor }}>7,000+</p>
            <p className="text-white">{t('augustine.stats.studentsTrained')}</p>
          </div>
          <div className="p-6 text-center">
            <p className="mb-2 text-3xl font-bold" style={{ color: accentColor }}>1,090</p>
            <p className="text-white">{t('augustine.stats.worldRecordParticipants')}</p>
          </div>
          <div className="p-6 text-center">
            <p className="mb-2 text-3xl font-bold" style={{ color: accentColor }}>5+</p>
            <p className="text-white">{t('augustine.stats.majorAwards')}</p>
          </div>
          <div className="p-6 text-center">
            <p className="mb-2 text-3xl font-bold" style={{ color: accentColor }}>100K+</p>
            <p className="text-white">{t('augustine.stats.worshipAttendees')}</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pb-4 mb-8 md:mb-16">
        <div className="max-w-3xl mx-auto mb-12 text-center px-4">
          <h2 className="mb-4 text-3xl md:text-4xl text-white">{t('augustine.aboutSection.title')}</h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
          <p className="text-lg text-white">
            {t('augustine.aboutSection.subtitle')}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="px-4 md:px-0">
            <h3 className="mb-4 text-xl font-semibold text-white">{t('augustine.aboutSection.visionMissionTitle')}</h3>
            <p className="mb-4 text-white">
              {t('augustine.aboutSection.paragraph1')}
            </p>
            <p className="mb-4 text-white">
              {t('augustine.aboutSection.paragraph2')}
            </p>
            <p className="text-white">
              {t('augustine.aboutSection.paragraph3')}
            </p>
          </div>
          
          <div className="mx-4 md:mx-0">
            <div className="p-8 rounded-lg bg-[#2E2E2E] border border-gray-800">
              <h3 className="mb-6 text-xl font-semibold text-center text-white">{t('augustine.aboutSection.ministryHighlights')}</h3>
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('augustine.aboutSection.bibleTeacherTitle')}</h4>
                  <p className="text-sm text-white">{t('augustine.aboutSection.bibleTeacherDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <Music className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('augustine.aboutSection.worshipLeaderTitle')}</h4>
                  <p className="text-sm text-white">{t('augustine.aboutSection.worshipLeaderDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <Users className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('augustine.aboutSection.ministryFounderTitle')}</h4>
                  <p className="text-sm text-white">{t('augustine.aboutSection.ministryFounderDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14" />
                    <path d="M20 4v16" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('augustine.aboutSection.shofarInstructorTitle')}</h4>
                  <p className="text-sm text-white">{t('augustine.aboutSection.shofarInstructorDesc')}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Ministries & Vision Section - REDESIGNED */}
      <section id="ministries" className="pt-6 md:pt-16 pb-8 bg-black w-full">
        <div className="w-full">
          <div className="max-w-3xl mx-auto mb-12 text-center px-4">
            <h2 className="mb-4 text-3xl md:text-4xl text-white">{t('augustine.ministriesVisionSection.title')}</h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
          </div>
          
          <div className="mb-12 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Pill-style tabs */}
            <div className="flex flex-wrap justify-center mb-5 space-x-2 md:space-x-4">
              <button
                className={`px-5 py-2 mb-2 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer ${
                  augustineTab === 'ministries'
                    ? 'bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]'
                    : 'bg-[#2E2E2E] text-white hover:bg-[#3E3E3E] hover:text-black'
                }`}
                onClick={() => setAugustineTab('ministries')}
              >
                {t('augustine.subTabs.ministryOverview')}
              </button>
              <button
                className={`px-5 py-2 mb-2 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer ${
                  augustineTab === 'hallel'
                    ? 'bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]'
                    : 'bg-[#2E2E2E] text-white hover:bg-[#3E3E3E] hover:text-black'
                }`}
                onClick={() => setAugustineTab('hallel')}
              >
                {t('augustine.subTabs.hallelMusicSchool')}
              </button>
              <button
                className={`px-5 py-2 mb-2 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer ${
                  augustineTab === 'teaching'
                    ? 'bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]'
                    : 'bg-[#2E2E2E] text-white hover:bg-[#3E3E3E] hover:text-black'
                }`}
                onClick={() => setAugustineTab('teaching')}
              >
                {t('augustine.subTabs.teachingShofar')}
              </button>
            </div>
            
            {/* Ministry Overview Tab - Redesigned Layout */}
            {augustineTab === 'ministries' && (
              <div>
                {/* YBHM Card - Redesigned with image */}
                <div className="mb-10 overflow-hidden rounded-xl bg-[#2E2E2E]">
                  <div className="grid gap-0 overflow-hidden rounded-lg md:grid-cols-5">
                    <div className="hidden overflow-hidden md:block md:col-span-2">
                      <ImageWithFallback
                        src="/images/directors/ybhm.jpg"
                        alt="Yeshua Beth Hallel Ministries"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-6 md:col-span-3">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white">{t('augustine.ministriesVisionSection.ybhm.title')}</h3>
                        <div className="px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: accentColor, color: 'black' }}>
                          {t('augustine.ministriesVisionSection.ybhm.badge')}
                        </div>
                      </div>
                      <div className="flex items-center mb-3 space-x-4">
                        <div className="flex items-center text-white">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{t('augustine.ministriesVisionSection.ybhm.location')}</span>
                        </div>
                        <div className="flex items-center text-white">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">{t('augustine.ministriesVisionSection.ybhm.founded')}</span>
                        </div>
                      </div>
                      <p className="mb-4 text-white">
                        {t('augustine.ministriesVisionSection.ybhm.description')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs rounded-full bg-black text-white">{t('augustine.ministriesVisionSection.ybhm.tags.worship')}</span>
                        <span className="px-3 py-1 text-xs rounded-full bg-black text-white">{t('augustine.ministriesVisionSection.ybhm.tags.biblicalTeaching')}</span>
                        <span className="px-3 py-1 text-xs rounded-full bg-black text-white">{t('augustine.ministriesVisionSection.ybhm.tags.community')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HMS Card removed from Ministries; moved into Hallel tab */}

                {/* Crusade Worship Leadership - Card with stats */}
                <div className="overflow-hidden rounded-xl bg-[#2E2E2E]">
                  <div className="flex flex-col gap-6 p-4 md:p-6 md:grid md:grid-cols-3">
                    <div className="md:col-span-2">
                      <h3 className="mb-3 text-2xl font-bold text-white">{t('augustine.ministriesVisionSection.crusadeWorship.title')}</h3>
                      <div className="flex items-center mb-3 text-white">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{t('augustine.ministriesVisionSection.crusadeWorship.location')}</span>
                      </div>
                      <p className="text-white">
                        {t('augustine.ministriesVisionSection.crusadeWorship.description')}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-1 md:col-span-1">
                      <div className="flex flex-col items-center justify-center p-4 text-center rounded-lg bg-black">
                        <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-full" style={{ backgroundColor: accentColor }}>
                          <Mic className="w-7 h-7 text-black" />
                        </div>
                        <p className="mb-1 font-bold text-white text-xl">100K+</p>
                        <p className="text-xs text-white leading-tight">{t('augustine.ministriesVisionSection.crusadeWorship.worshipAttendees')}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 text-center rounded-lg bg-black">
                        <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-full" style={{ backgroundColor: accentColor }}>
                          <Music className="w-7 h-7 text-black" />
                        </div>
                        <p className="mb-1 font-bold text-white text-xl">50+</p>
                        <p className="text-xs text-white leading-tight">{t('augustine.ministriesVisionSection.crusadeWorship.crusadeEvents')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {augustineTab === 'hallel' && (
              <div>
                {/* HMS Card - moved here from Ministries and placed at top of Hallel tab */}
                <div className="mb-10 overflow-hidden rounded-xl bg-[#2E2E2E]">
                  <div className="grid gap-0 overflow-hidden rounded-lg md:grid-cols-5">
                    <div className="p-6 md:col-span-3">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white">{t('augustine.ministriesVisionSection.hms.title')}</h3>
                        <div className="px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: accentColor, color: 'black' }}>
                          {t('augustine.ministriesVisionSection.hms.badge')}
                        </div>
                      </div>
                      <div className="flex items-center mb-3 space-x-4">
                        <div className="flex items-center text-white">
                          <Globe className="w-4 h-4 mr-2" />
                          <span className="text-sm">{t('augustine.ministriesVisionSection.hms.onlineInPerson')}</span>
                        </div>
                        <div className="flex items-center text-white">
                          <Users className="w-4 h-4 mr-2" />
                          <span className="text-sm">{t('augustine.ministriesVisionSection.hms.studentsTrained')}</span>
                        </div>
                      </div>
                      <p className="mb-4 text-white">
                        {t('augustine.ministriesVisionSection.hms.description')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs rounded-full bg-black text-white">{t('augustine.ministriesVisionSection.hms.tags.freeTraining')}</span>
                        <span className="px-3 py-1 text-xs rounded-full bg-black text-white">{t('augustine.ministriesVisionSection.hms.tags.keyboard')}</span>
                        <span className="px-3 py-1 text-xs rounded-full bg-black text-white">{t('augustine.ministriesVisionSection.hms.tags.worldRecord')}</span>
                      </div>
                    </div>
                    <div className="hidden overflow-hidden md:block md:col-span-2">
                      <ImageWithFallback
                        src="/images/ministries/hms/hms_c.jpg"
                        alt="Music keyboard"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 md:px-6">
                  <div className="p-8 rounded-lg bg-[#2E2E2E]">
                    <h3 className="mb-4 text-2xl font-semibold text-white">{t('augustine.hallelTab.visionTitle')}</h3>
                    <p className="mb-6 text-lg text-white italic">
                      {t('augustine.hallelTab.visionQuote')}
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">{t('augustine.hallelTab.point1')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">{t('augustine.hallelTab.point2')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">{t('augustine.hallelTab.point3')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">{t('augustine.hallelTab.point4')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <button 
                        onClick={() => {
                          // Navigate to Ministries page and select Hallel Music School tab
                          window.location.href = '/ministries?tab=hallel-music-school';
                        }}
                        className="px-8 py-3 bg-[#FDB813] shadow-lg text-black rounded-full  hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer inline-flex items-center gap-2"
                        style={{ backgroundColor: accentColor }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DAA520'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = accentColor}
                      >
                        {t('augustine.hallelTab.knowMore')}
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 mt-8 rounded-lg bg-[#2E2E2E]">
                  <h3 className="mb-4 text-xl font-semibold text-center text-white">{t('augustine.hallelTab.worldRecordTitle')}</h3>
                  <p className="mb-6 text-center text-white">
                    {t('augustine.hallelTab.worldRecordDesc')}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-6">
                    <div className="flex items-center justify-center w-full p-4 text-center rounded-lg shadow-sm bg-black md:w-auto md:min-w-[200px]">
                      <div>
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full" style={{ backgroundColor: accentColor }}>
                          <Award className="w-8 h-8 text-black" />
                        </div>
                        <p className="font-medium text-white">{t('augustine.hallelTab.guinnessRecord')}</p>
                        <p className="text-sm text-white">{t('augustine.hallelTab.keyboardPlayers')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center w-full p-4 text-center rounded-lg shadow-sm bg-black md:w-auto md:min-w-[200px]">
                      <div>
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full" style={{ backgroundColor: accentColor }}>
                          <Globe className="w-8 h-8 text-black" />
                        </div>
                        <p className="font-medium text-white">{t('augustine.hallelTab.internationalRecognition')}</p>
                        <p className="text-sm text-white">{t('augustine.hallelTab.multipleRecords')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center w-full p-4 text-center rounded-lg shadow-sm bg-black md:w-auto md:min-w-[200px]">
                      <div>
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full" style={{ backgroundColor: accentColor }}>
                          <Calendar className="w-8 h-8 text-black" />
                        </div>
                        <p className="font-medium text-white">December 1st, 2024</p>
                        <p className="text-sm text-white">Historic Achievement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {augustineTab === 'teaching' && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-lg bg-[#2E2E2E]">
                      <h3 className="mb-4 text-xl font-semibold text-white">{t('augustine.teachingSection.shofarTitle')}</h3>
                      <div className="p-4 mb-6 rounded-lg bg-black">
                        <p className="text-white">{t('augustine.teachingSection.shofarDesc')}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14" />
                              <path d="M20 4v16" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{t('augustine.teachingSection.shofarPoint1.title')}</h4>
                            <p className="text-sm text-white">{t('augustine.teachingSection.shofarPoint1.desc')}</p>
                          </div>
                        </div>
                    
                        <div className="flex items-start">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14" />
                              <path d="M20 4v16" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{t('augustine.teachingSection.shofarPoint2.title')}</h4>
                            <p className="text-sm text-white">{t('augustine.teachingSection.shofarPoint2.desc')}</p>
                          </div>
                        </div>
                    
                        <div className="flex items-start">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 9.7V5a3 3 0 0 0-5.3-1.9l-6 6a3 3 0 0 0 0 4.2l6 6a3 3 0 0 0 5.3-1.9V14" />
                              <path d="M20 4v16" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{t('augustine.teachingSection.shofarPoint3.title')}</h4>
                            <p className="text-sm text-white">{t('augustine.teachingSection.shofarPoint3.desc')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                
                <div className="p-6 rounded-lg bg-[#2E2E2E]">
                  <h3 className="mb-4 text-xl font-semibold text-white">{t('augustine.teachingSection.bibleTitle')}</h3>
                  <div className="p-4 mb-6 rounded-lg bg-black">
                    <p className="text-white">{t('augustine.teachingSection.bibleDesc')}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                        <BookOpen className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{t('augustine.teachingSection.biblePoint1.title')}</h4>
                        <p className="text-sm text-white">{t('augustine.teachingSection.biblePoint1.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                        <BookOpen className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{t('augustine.teachingSection.biblePoint2.title')}</h4>
                        <p className="text-sm text-white">{t('augustine.teachingSection.biblePoint2.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                        <BookOpen className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{t('augustine.teachingSection.biblePoint3.title')}</h4>
                        <p className="text-sm text-white">{t('augustine.teachingSection.biblePoint3.desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="flex justify-center py-12 md:py-16">
        <img src={separatorImage} alt="" className="w-full max-w-4xl h-auto opacity-60" />
      </div>

      {/* Contact Section moved to Stories 'Get In Touch' tab */}
    </div>
  );
});

AugustineTab.displayName = 'AugustineTab';

// Memoized Vijaya Tab Component
const VijayaTab = memo(({ accentColor, imagePreloaded, t, signedUrls }: { accentColor: string; imagePreloaded: boolean; t: any; signedUrls: Record<string,string> }) => {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <section className="mb-5 md:mb-16">
        <div className="flex flex-col items-center md:items-start md:flex-row md:gap-12">
          <div className="order-2 md:order-1 mb-8 text-center md:mb-0 md:text-left md:w-[45%] md:pl-8 flex flex-col md:justify-between w-full md:w-[45%]" style={{ minHeight: '405px' }}>
            <div className="space-y-4">
              <h1 className="mb-3 text-xl md:text-xl lg:text-3xl text-white text-center md:text-left font-bold break-words">
                {t('vijaya.name')}
              </h1>
              
              {/* Role */}
              <div className="text-center md:text-left space-y-1">
                <p className="text-white text-xl">{t('vijaya.role')}</p>
                <p className="text-white">{t('vijaya.organization')}</p>
              </div>
              
              {/* All Titles with Grey Design */}
              <div className="space-y-2 mt-8 md:mt-4 md:mb-4">
                {/* Women's Ministry Leader */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Heart className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-sm md:text-base">{t('vijaya.titles.womensMinistry')}</span>
                  </div>
                </div>
                
                {/* Intercessor */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('vijaya.titles.intercessor')}</span>
                  </div>
                </div>
                
                {/* Counselor */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('vijaya.titles.counselor')}</span>
                  </div>
                </div>
                
                {/* Mentor */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('vijaya.titles.mentor')}</span>
                  </div>
                </div>
                
                {/* Speaker */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Mic className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('vijaya.titles.speaker')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:justify-start mt-6 md:mt-auto">
              <button
                onClick={() => { router.push('/contact?tab=getintouch'); }}
                className="bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer py-3 px-6"
                style={{ color: '#000000' }}
              >
                {t('vijaya.buttons.getInTouch')}
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 mb-8 md:mb-0 md:w-[35%] md:ml-auto md:mr-16 px-4 md:px-0">
            <div className="relative rounded-xl shadow-lg max-h-[438px] overflow-hidden">
              {!imagePreloaded && <Skeleton className="w-full h-full absolute inset-0" />}
              <OptimizedImage
                src={signedUrls?.vijaya || IMAGE_URLS.vijaya}
                alt="Ps. Vijaya Kumari Dandingi"
                className="object-cover w-full h-auto rounded-xl"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="py-3 md:py-1 mb-5 md:mb-16 border-t border-gray-800"></div>

      {/* About Section */}
      <section id="about-vijaya" className="pt-2 pb-4 mb-16">
        <div className="max-w-3xl mx-auto mb-12 text-center px-4">
          <h2 className="mb-4 text-3xl md:text-4xl text-white">{t('vijaya.aboutSection.title')}</h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
          <p className="text-lg text-white">
            {t('vijaya.aboutSection.subtitle')}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="px-4 md:px-0">
            <h3 className="mb-4 text-xl font-semibold text-white">{t('vijaya.aboutSection.visionMissionTitle')}</h3>
            <p className="mb-4 text-white">
              {t('vijaya.aboutSection.paragraph1')}
            </p>
            <p className="mb-4 text-white">
              {t('vijaya.aboutSection.paragraph2')}
            </p>
            <p className="text-white">
              {t('vijaya.aboutSection.paragraph3')}
            </p>
            <p className="text-white">
              {t('vijaya.aboutSection.paragraph4')}
            </p>
          </div>
          
          <div className="mx-4 md:mx-0">
            <div className="p-8 rounded-lg bg-[#2E2E2E] border border-gray-800">
              <h3 className="mb-6 text-xl font-semibold text-center text-white">{t('vijaya.aboutSection.ministryHighlights')}</h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                    <Heart className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{t('vijaya.aboutSection.womensMinistryTitle')}</h4>
                    <p className="text-sm text-white">{t('vijaya.aboutSection.womensMinistryDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('vijaya.aboutSection.prayerMinistryTitle')}</h4>
                  <p className="text-sm text-white">{t('vijaya.aboutSection.prayerMinistryDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <Users className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('vijaya.aboutSection.counselingTitle')}</h4>
                  <p className="text-sm text-white">{t('vijaya.aboutSection.counselingDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('vijaya.aboutSection.teachingMinistryTitle')}</h4>
                  <p className="text-sm text-white">{t('vijaya.aboutSection.teachingMinistryDesc')}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="flex justify-center py-12 md:py-16">
        <img src={separatorImage} alt="" className="w-full max-w-4xl h-auto opacity-60" />
      </div>

      {/* Contact Section moved to Stories 'Get In Touch' tab */}
    </div>
  );
});

VijayaTab.displayName = 'VijayaTab';

// Memoized Charles Tab Component
const CharlesTab = memo(({ accentColor, imagePreloaded, t, signedUrls }: { accentColor: string; imagePreloaded: boolean; t: any; signedUrls: Record<string,string> }) => {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <section className="mb-5 md:mb-16">
        <div className="flex flex-col items-center md:items-start md:flex-row md:gap-12">
          <div className="order-2 md:order-1 mb-8 text-center md:mb-0 md:text-left md:w-[45%] md:pl-8 flex flex-col md:justify-between w-full md:w-[45%]" style={{ minHeight: '405px' }}>
            <div className="space-y-4">
              <h1 className="mb-3 text-xl md:text-xl lg:text-3xl text-white text-center md:text-left font-bold break-words">
                {t('charles.name')}
              </h1>
              
              {/* Role */}
              <div className="text-center md:text-left space-y-1">
                <p className="text-white text-xl">{t('charles.role')}</p>
                <p className="text-white">{t('charles.organization')}</p>
              </div>
              
              {/* All Titles with Grey Design */}
              <div className="space-y-2 mt-8 md:mt-4 md:mb-4">
                {/* Worship Leader */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Music className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-sm md:text-base">{t('charles.titles.worshipLeader')}</span>
                  </div>
                </div>
                
                {/* Youth Ministry */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('charles.titles.youthMinistry')}</span>
                  </div>
                </div>
                
                {/* Music Production */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Mic className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('charles.titles.musicProduction')}</span>
                  </div>
                </div>
                
                {/* Songwriting */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('charles.titles.songwriting')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:justify-start mt-6 md:mt-auto">
              <button
                onClick={() => { window.location.href = '/contact?tab=getintouch'; }}
                className="bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer py-3 px-6"
                style={{ color: '#000000' }}
              >
                {t('charles.buttons.getInTouch')}
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 mb-8 md:mb-0 md:w-[35%] md:ml-auto md:mr-16 px-4 md:px-0">
            <div className="relative rounded-xl shadow-lg max-h-[438px] overflow-hidden">
              {!imagePreloaded && <Skeleton className="w-full h-full absolute inset-0" />}
              <OptimizedImage
                src={signedUrls?.charles || IMAGE_URLS.charles}
                alt="Charles Aaron Benedict"
                className="object-cover w-full h-auto rounded-xl"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="py-3 md:py-1 mb-5 md:mb-16 border-t border-gray-800"></div>

      {/* About Section */}
      <section id="about-charles" className="pt-2 pb-4 mb-16">
        <div className="max-w-3xl mx-auto mb-12 text-center px-4">
          <h2 className="mb-4 text-3xl md:text-4xl text-white">{t('charles.aboutSection.title')}</h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
          <p className="text-lg text-white">
            {t('charles.aboutSection.subtitle')}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="px-4 md:px-0">
            <h3 className="mb-4 text-xl font-semibold text-white">{t('charles.aboutSection.visionMissionTitle')}</h3>
            <p className="mb-4 text-white">
              {t('charles.aboutSection.paragraph1')}
            </p>
            <p className="mb-4 text-white">
              {t('charles.aboutSection.paragraph2')}
            </p>
            <p className="text-white">
              {t('charles.aboutSection.paragraph3')}
            </p>
          </div>
          
          <div className="mx-4 md:mx-0">
            <div className="p-8 rounded-lg bg-[#2E2E2E] border border-gray-800">
              <h3 className="mb-6 text-xl font-semibold text-center text-white">{t('charles.aboutSection.ministryHighlights')}</h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                    <Music className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{t('charles.aboutSection.worshipLeadershipTitle')}</h4>
                    <p className="text-sm text-white">{t('charles.aboutSection.worshipLeadershipDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <Users className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('charles.aboutSection.youthMinistryTitle')}</h4>
                  <p className="text-sm text-white">{t('charles.aboutSection.youthMinistryDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('charles.aboutSection.songwritingTitle')}</h4>
                  <p className="text-sm text-white">{t('charles.aboutSection.songwritingDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <Award className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('charles.aboutSection.educationTitle')}</h4>
                  <p className="text-sm text-white">{t('charles.aboutSection.educationDesc')}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="flex justify-center py-12 md:py-16">
        <img src={separatorImage} alt="" className="w-full max-w-4xl h-auto opacity-60" />
      </div>

      {/* Contact Section moved to Stories 'Get In Touch' tab */}
    </div>
  );
});

CharlesTab.displayName = 'CharlesTab';

// Memoized Nancy Tab Component
const NancyTab = memo(({ accentColor, imagePreloaded, t, signedUrls }: { accentColor: string; imagePreloaded: boolean; t: any; signedUrls: Record<string,string> }) => {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <section className="mb-5 md:mb-16">
        <div className="flex flex-col items-center md:items-start md:flex-row md:gap-12">
          <div className="order-2 md:order-1 mb-8 text-center md:mb-0 md:text-left md:w-[45%] md:pl-8 flex flex-col md:justify-between w-full md:w-[45%]" style={{ minHeight: '405px' }}>
            <div className="space-y-4">
              <h1 className="mb-3 text-xl md:text-xl lg:text-3xl text-white text-center md:text-left font-bold break-words">
                {t('nancy.name')}
              </h1>
              
              {/* Role */}
              <div className="text-center md:text-left space-y-1">
                <p className="text-white text-xl">{t('nancy.role')}</p>
                <p className="text-white">{t('nancy.organization')}</p>
              </div>
              
              {/* All Titles with Grey Design */}
              <div className="space-y-2 mt-8 md:mt-4 md:mb-4">
                {/* Children's Ministry */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Heart className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-sm md:text-base">{t('nancy.titles.childrensMinistry')}</span>
                  </div>
                </div>
                
                {/* Music Education */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Music className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('nancy.titles.musicEducation')}</span>
                  </div>
                </div>
                
                {/* Curriculum Development */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('nancy.titles.curriculumDevelopment')}</span>
                  </div>
                </div>
                
                {/* Creative Arts */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2E2E2E] border border-gray-600/40">
                    <Award className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-xs md:text-sm">{t('nancy.titles.creativeArts')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:justify-start mt-6 md:mt-auto">
              <button
                onClick={() => { window.location.href = '/contact?tab=getintouch'; }}
                className="bg-[#FDB813] shadow-lg text-black rounded-full hover:bg-[#e5a711] font-semibold transition-colors duration-300 cursor-pointer py-3 px-6"
                style={{ color: '#000000' }}
              >
                {t('nancy.buttons.getInTouch')}
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 mb-8 md:mb-0 md:w-[35%] md:ml-auto md:mr-16 px-4 md:px-0">
            <div className="relative rounded-xl shadow-lg max-h-[438px] overflow-hidden">
              {!imagePreloaded && <Skeleton className="w-full h-full absolute inset-0" />}
              <OptimizedImage
                src={signedUrls?.nancy || IMAGE_URLS.nancy}
                alt="Nancy Ophir Augustina"
                className="object-cover w-full h-auto rounded-xl"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="py-3 md:py-1 mb-5 md:mb-16 border-t border-gray-800"></div>

      {/* About Section */}
      <section id="about-nancy" className="pt-2 pb-4 mb-16">
        <div className="max-w-3xl mx-auto mb-12 text-center px-4">
          <h2 className="mb-4 text-3xl md:text-4xl text-white">{t('nancy.aboutSection.title')}</h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
          <p className="text-lg text-white">
            {t('nancy.aboutSection.subtitle')}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="px-4 md:px-0">
            <h3 className="mb-4 text-xl font-semibold text-white">{t('nancy.aboutSection.visionMissionTitle')}</h3>
            <p className="mb-4 text-white">
              {t('nancy.aboutSection.paragraph1')}
            </p>
            <p className="mb-4 text-white">
              {t('nancy.aboutSection.paragraph2')}
            </p>
            <p className="text-white">
              {t('nancy.aboutSection.paragraph3')}
            </p>
          </div>
          
          <div className="mx-4 md:mx-0">
            <div className="p-8 rounded-lg bg-[#2E2E2E] border border-gray-800">
              <h3 className="mb-6 text-xl font-semibold text-center text-white">{t('nancy.aboutSection.ministryHighlights')}</h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                    <Heart className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{t('nancy.aboutSection.childrensMinistryTitle')}</h4>
                    <p className="text-sm text-white">{t('nancy.aboutSection.childrensMinistryDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <Music className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('nancy.aboutSection.musicEducationTitle')}</h4>
                  <p className="text-sm text-white">{t('nancy.aboutSection.musicEducationDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('nancy.aboutSection.curriculumTitle')}</h4>
                  <p className="text-sm text-white">{t('nancy.aboutSection.curriculumDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 rounded-full" style={{ backgroundColor: accentColor }}>
                  <Award className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('nancy.aboutSection.creativeArtsTitle')}</h4>
                  <p className="text-sm text-white">{t('nancy.aboutSection.creativeArtsDesc')}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Contact Section moved to Stories 'Get In Touch' tab */}
    </div>
  );
});

NancyTab.displayName = 'NancyTab';

// ContactSection has been extracted to `src/components/GetInTouchSection.tsx`
