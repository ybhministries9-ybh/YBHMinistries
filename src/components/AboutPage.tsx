import { useState, useMemo, useCallback, useEffect } from "react";
import Image from 'next/image';
import { motion } from "motion/react";
import {
  Heart,
  Book,
  Users,
  Send,
  GraduationCap,
  Zap,
} from "lucide-react";
import { primaryBackground, accentGold } from "../utils/theme";
import { useTranslation } from 'react-i18next';
import { ScrollToTop } from './ScrollToTop';
import logger from '@/lib/logger';

// Default fallback image URL (derived from env; leave blank if not provided)
const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';
const FALLBACK_HERO_IMAGE = `${R2_BASE}/defaults/about-default.jpg`;

// Tab configuration
const TAB_CONFIG = [
  { key: "vision", labelKey: "tabs.vision" },
  { key: "mission", labelKey: "tabs.mission" },
  { key: "coreValues", labelKey: "tabs.coreValues" }
] as const;

interface Props {
  initialHeroImageUrl?: string;
  initialHeroBlur?: string;
}

export function AboutPage({ initialHeroImageUrl, initialHeroBlur }: Props) {
  const { t } = useTranslation('about');
  const [activeTab, setActiveTab] = useState<string>("vision");
  // Use server-provided initial URL when available to avoid client-side image swap/flicker
  const [heroImageUrl, setHeroImageUrl] = useState<string | undefined>(initialHeroImageUrl || undefined);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  // Fetch hero image on component mount
  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await fetch('/api/about/hero-image');
        const result = await response.json();
        
        if (result.success && result.data?.image_url) {
          // Only update if the server-provided URL differs to avoid visible swapping
          if (result.data.image_url && result.data.image_url !== heroImageUrl) {
            setHeroImageUrl(result.data.image_url);
          }
        }
        } catch (error) {
        logger.error('Error fetching about hero image', error);
        // Keep using fallback image on error
      }
    };

    fetchHeroImage();
  }, []);

  const handleTabChange = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
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
              onClick={() => {
                handleTabChange(tab.key);
                scrollToSection(tab.key);
              }}
            style={{ cursor: "pointer" }}
            aria-selected={isActive}
            role="tab"
          >
            {t(tab.labelKey)}
          </button>
        );
      }),
    [activeTab, handleTabChange, t]
  );

  // Helper to scroll a given tab section into view (accounting for fixed header)
  const scrollToSection = (tabKey: string) => {
    if (typeof window === 'undefined') return;
    const id = `${tabKey}-section`;
    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector('header');
    const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Render a translation string with the leading phrase bolded.
  // `rule` can be a substring or RegExp to split on; returns JSX with bold lead and normal rest.
  const renderBoldLead = (full: string, rule: string | RegExp) => {
    if (!full) return null;
    let parts: string[] = [];
    if (rule instanceof RegExp) {
      const m = full.match(rule);
      if (m && m.index !== undefined) {
        const idx = m.index; // split before the matched token
        parts = [full.slice(0, idx).trimEnd(), full.slice(idx).trimStart()];
      }
    } else {
      const idx = full.toLowerCase().indexOf(rule.toLowerCase());
      if (idx !== -1) {
        // split before the rule occurrence
        parts = [full.slice(0, idx).trimEnd(), full.slice(idx).trimStart()];
      }
    }

    if (parts.length === 0) {
      // fallback: split at first sentence end
      const dot = full.indexOf('.');
      if (dot !== -1) parts = [full.slice(0, dot + 1), full.slice(dot + 1)];
    }

    if (parts.length === 0) return <span>{full}</span>;
    // Decide whether to inject a separating space between the bold lead and the rest.
    // If the remainder begins with a dash-like character, don't add an extra space.
    const needsSpace = parts[1] && !/^[—–-]/.test(parts[1]);
    return (
      <span>
        <strong>{parts[0]}</strong>
        {needsSpace ? ' ' : ''}
        <span>{parts[1]}</span>
      </span>
    );
  };

  // Wrap a specific phrase in <strong> within the full text (first occurrence)
  const renderWrapPhrase = (full: string, phrase: string) => {
    if (!full || !phrase) return <span>{full}</span>;
    const idx = full.indexOf(phrase);
    if (idx === -1) return <span>{full}</span>;
    const before = full.slice(0, idx);
    const after = full.slice(idx + phrase.length);
    return (
      <span>
        {before}
        <strong>{phrase}</strong>
        {after}
      </span>
    );
  };

  // Wrap multiple phrases (first occurrence of each) in <strong> within the full text
  const renderWrapPhrases = (full: string, phrases: string[]) => {
    if (!full || !phrases || phrases.length === 0) return <span>{full}</span>;
    // Build a list of match positions for the phrases (case-insensitive)
    const lower = full.toLowerCase();
    const matches: { idx: number; phrase: string; len: number }[] = [];
    phrases.forEach((p) => {
      const lp = p.toLowerCase();
      const i = lower.indexOf(lp);
      if (i !== -1) matches.push({ idx: i, phrase: full.slice(i, i + lp.length), len: lp.length });
    });
    if (matches.length === 0) return <span>{full}</span>;
    // Sort matches by index and stitch the pieces together, avoiding overlaps
    matches.sort((a, b) => a.idx - b.idx);
    const nodes: Array<string | JSX.Element> = [];
    let cursor = 0;
    for (const m of matches) {
      if (m.idx < cursor) continue; // overlapping/previously consumed
      if (m.idx > cursor) nodes.push(full.slice(cursor, m.idx));
      nodes.push(<strong key={m.idx}>{full.slice(m.idx, m.idx + m.len)}</strong>);
      cursor = m.idx + m.len;
    }
    if (cursor < full.length) nodes.push(full.slice(cursor));
    return <span>{nodes.map((n, i) => (typeof n === 'string' ? <span key={i}>{n}</span> : n))}</span>;
  };
  // Scroll selected section into view, accounting for fixed header
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const id = `${activeTab}-section`;
    const el = document.getElementById(id);
    if (!el) return;

    // Determine header height to offset the scroll so section sits below header
    const header = document.querySelector('header');
    const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [activeTab]);

  // If navigated with fragment `#about-hero`, focus and scroll to the hero section for accessibility
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash) return;
    if (hash === '#about-hero') {
      const el = document.getElementById('about-hero');
      if (!el) return;
      const header = document.querySelector('header');
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => {
        try {
          (el as HTMLElement).focus();
        } catch (e) {
          // ignore
        }
      }, 300);
    }
  }, []);

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: primaryBackground }}
    >
      {/* Hero Image */}
      <div id="about-hero" tabIndex={-1} role="region" aria-label={t('hero.title') || 'About hero'} className="relative w-full h-screen overflow-hidden md:pt-20" style={{ backgroundColor: '#000' }}>
        {heroImageUrl ? (
          <div className="absolute inset-0 w-full h-full"> 
            <Image
              src={heroImageUrl}
              alt={t('hero.title')}
              fill
              className={`object-cover transition-opacity duration-500 ease-out ${isImgLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ objectPosition: 'center top' }}
              placeholder={initialHeroBlur ? 'blur' : 'empty'}
              blurDataURL={initialHeroBlur}
              onLoad={() => setIsImgLoaded(true)}
              unoptimized={true}
              priority={true}
            />
          </div>
        ) : (
          // No hero image provided — show a stable background block to avoid layout shift
          <div className="absolute inset-0" style={{ backgroundColor: '#000' }} aria-hidden />
        )}
        {/* Tabs overlayed at specified position on the hero image */}
        <div
          className="absolute left-0 right-0 z-30 flex justify-center"
          style={{ top: '90%' }}
        >
          <div className="bg-black/60 rounded-full px-4 py-2 backdrop-blur-md">
            <div className="flex items-center justify-center gap-3 md:gap-6" role="tablist" aria-label={t('tabs.ariaLabel') || 'About tabs'}>
              {tabButtons}
            </div>
          </div>
        </div>
      </div>
      

      {/* Tab Content - Full Width Sections */}
      <div role="tabpanel">
        {/* Vision Tab */}
        {activeTab === "vision" && (
          <motion.div
            id="vision-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Our Vision Section - Black */}
            <section className="py-12 px-4 md:px-12" style={{ backgroundColor: '#000000' }}>
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <h2 className="text-3xl md:text-4xl text-white">
                      {t('vision.title')}
                    </h2>
                  </div>
                  <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: accentGold }}></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-6 text-white leading-relaxed">
                  <p className="text-lg">
                    {renderWrapPhrase(
                      t('vision.intro1'),
                      t('vision.intro1_highlight')
                    )}
                  </p>
                  <p className="text-lg">
                    {renderWrapPhrase(
                      t('vision.intro2'),
                      t('vision.intro2_highlight')
                    )}
                  </p>
                  <p className="text-lg">
                    {t('vision.intro3')}
                  </p>
                  <ul className="space-y-3 text-lg pl-4">
                    {(t('vision.points', { returnObjects: true }) as string[]).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-white mr-3 mt-1">
                          •
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-lg">
                    {renderWrapPhrases(
                      t('vision.outro'),
                      t('vision.outro_highlights', { returnObjects: true }) as string[]
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Our Commitment Section - Black (keep with Vision tab) */}
            <section className="py-12 px-4 md:px-12" style={{ backgroundColor: '#000000' }}>
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <h2 className="text-3xl md:text-4xl text-white">
                      {t('commitment.title')}
                    </h2>
                  </div>
                  <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: accentGold }}></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-6 text-white leading-relaxed">
                  <p className="text-lg text-center">
                    {renderWrapPhrase(
                      t('commitment.description'),
                      t('commitment.description_highlight')
                    )}
                  </p>
                  <p className="text-xl text-center text-white mt-8">
                    <em>
                      {renderWrapPhrase(
                        t('commitment.quote'),
                        t('commitment.quote_highlight')
                      )}
                    </em>
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Mission Tab */}
        {activeTab === "mission" && (
          <motion.div
            id="mission-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Our Mission Section - Grey */}
            <section className="py-12 px-4 md:px-12" style={{ backgroundColor: '#2E2E2E' }}>
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <h2 className="text-3xl md:text-4xl text-white">
                      {t('mission.title')}
                    </h2>
                  </div>
                  <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: accentGold }}></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-8 text-white leading-relaxed">
                  <p className="text-lg">
                    {renderWrapPhrase(
                      t('mission.intro'),
                      t('mission.intro_highlight')
                    )}
                  </p>

                  {/* Evangelize */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex flex-col md:flex-row items-start md:space-x-4 space-y-4 md:space-y-0">
                      <div className="bg-gray-700 p-3 rounded-full flex-shrink-0">
                        <Send className="text-white" size={28} />
                      </div>
                      <div className="w-full">
                        <h3 className="text-2xl text-white mb-3">
                          {t('mission.evangelize.title')}
                        </h3>
                          <p className="text-lg">
                          {renderWrapPhrase(
                            t('mission.evangelize.description'),
                            t('mission.evangelize.description_highlight')
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Educate */}
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex flex-col md:flex-row items-start md:space-x-4 space-y-4 md:space-y-0">
                      <div className="bg-gray-800 p-3 rounded-full flex-shrink-0">
                        <GraduationCap
                          className="text-white"
                          size={28}
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-2xl text-white mb-3">
                          {t('mission.educate.title')}
                        </h3>
                        <p className="text-lg">
                          {renderWrapPhrase(
                            t('mission.educate.description'),
                            t('mission.educate.description_highlight')
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Execute */}
                  <div className="bg-black rounded-xl p-6 border border-gray-800">
                    <div className="flex flex-col md:flex-row items-start md:space-x-4 space-y-4 md:space-y-0">
                      <div className="bg-gray-800 p-3 rounded-full flex-shrink-0">
                        <Zap className="text-white" size={28} />
                      </div>
                      <div className="w-full">
                        <h3 className="text-2xl text-white mb-3">
                          {t('mission.execute.title')}
                        </h3>
                        <p className="text-lg">
                          {renderWrapPhrase(
                            t('mission.execute.description'),
                            t('mission.execute.description_highlight')
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Core Values Tab */}
        {activeTab === "coreValues" && (
          <motion.div
            id="coreValues-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Our Core Values Section - Black */}
            <section className="py-12 px-4 md:px-12" style={{ backgroundColor: '#000000' }}>
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl text-white mb-4">
                    {t('coreValues.title')}
                  </h2>
                  <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: accentGold }}></div>
                  <p className="text-xl text-white max-w-2xl mx-auto">
                    {renderWrapPhrase(t('coreValues.subtitle'), t('coreValues.subtitle_highlight'))}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Value 1 */}
                  <div className="rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-700" style={{ backgroundColor: '#1a1a1a' }}>
                    <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <Heart className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl text-white mb-4">
                      {t('coreValues.love.title')}
                    </h3>
                    <p className="text-white leading-relaxed">
                      {t('coreValues.love.description')}
                    </p>
                  </div>

                  {/* Value 2 */}
                  <div className="rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-700" style={{ backgroundColor: '#1a1a1a' }}>
                    <div className="bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <Book className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl text-white mb-4">
                      {t('coreValues.patience.title')}
                    </h3>
                    <p className="text-white leading-relaxed">
                      {t('coreValues.patience.description')}
                    </p>
                  </div>

                  {/* Value 3 */}
                  <div className="rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-700" style={{ backgroundColor: '#1a1a1a' }}>
                    <div className="bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <Users className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl text-white mb-4">
                      {t('coreValues.commitment.title')}
                    </h3>
                    <p className="text-white leading-relaxed">
                      {t('coreValues.commitment.description')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Belief System Section - Grey */}
            <section className="py-12 px-4 md:px-12" style={{ backgroundColor: '#2E2E2E' }}>
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl text-white mb-4">
                    {t('beliefSystem.title')}
                  </h2>
                  <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: accentGold }}></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-6 text-white leading-relaxed">
                  <p className="text-lg">
                    {t('beliefSystem.intro')}
                  </p>

                  <ul className="space-y-4 list-disc pl-6">
                    <li className="text-lg">{renderBoldLead(t('beliefSystem.trinity'), /[—–-]/)}</li>
                    <li className="text-lg">{renderWrapPhrase(t('beliefSystem.denominations'), t('beliefSystem.denominations_lead'))}</li>
                  </ul>

                  <p className="text-lg">
                    {t('beliefSystem.unity')}
                  </p>
                </div>
              </div>
            </section>

            {/* A Movement Beyond Walls Section - Black */}
            <section className="py-12 px-4 md:px-12" style={{ backgroundColor: '#000000' }}>
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl text-white mb-4">
                    {t('movementBeyondWalls.title')}
                  </h2>
                  <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: accentGold }}></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-6 text-white leading-relaxed">
                  <p className="text-lg">
                    {renderWrapPhrases(
                      t('movementBeyondWalls.intro'),
                      t('movementBeyondWalls.intro_highlights', { returnObjects: true }) as string[]
                    )}
                  </p>

                  <p className="text-lg">
                    {t('movementBeyondWalls.worship')}
                  </p>

                  <p className="text-lg">
                    {t('movementBeyondWalls.community')}
                  </p>

                  <p className="text-lg">
                    {t('movementBeyondWalls.transformation')}
                  </p>

                  <p className="text-xl text-center mt-8 text-white">
                    <em>
                      {renderWrapPhrase(
                        t('movementBeyondWalls.callToAction'),
                        t('movementBeyondWalls.callToAction_highlight')
                      )}
                    </em>
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </div>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
