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

// Default fallback image URL (derived from env; leave blank if not provided)
const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';
const FALLBACK_HERO_IMAGE = `${R2_BASE}/defaults/about-default.jpg`;

// Tab configuration
const TAB_CONFIG = [
  { key: "vision", labelKey: "tabs.vision" },
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
        console.error('Error fetching about hero image:', error);
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
            onClick={() => handleTabChange(tab.key)}
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

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: primaryBackground }}
    >
      {/* Hero Image */}
      <div className="relative w-full h-screen overflow-hidden md:pt-20" style={{ backgroundColor: '#000' }}>
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
      </div>

      {/* Tabs - Centered with padding */}
      <div className="pt-8 pb-1 md:py-12">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3" role="tablist">
            {tabButtons}
          </div>
        </div>
      </div>

      {/* Tab Content - Full Width Sections */}
      <div role="tabpanel">
        {/* Vision & Mission Tab */}
        {activeTab === "vision" && (
          <motion.div
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
                    {t('vision.intro1')}
                  </p>
                  <p className="text-lg">
                    {t('vision.intro2')}
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
                    {t('vision.outro')}
                  </p>
                </div>
              </div>
            </section>

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
                    {t('mission.intro')}
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
                          {t('mission.evangelize.description')}
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
                          {t('mission.educate.description')}
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
                          {t('mission.execute.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Commitment Section - Black */}
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
                    {t('commitment.description')}
                  </p>
                  <p className="text-xl text-center text-white mt-8">
                    <em>
                      {t('commitment.quote')}
                    </em>
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Core Values Tab */}
        {activeTab === "coreValues" && (
          <motion.div
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
                    {t('coreValues.subtitle')}
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

                  <p className="text-lg">
                    {t('beliefSystem.trinity')}
                  </p>

                  <p className="text-lg">
                    {t('beliefSystem.denominations')}
                  </p>

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
                    {t('movementBeyondWalls.intro')}
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
                      {t('movementBeyondWalls.callToAction')}
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
