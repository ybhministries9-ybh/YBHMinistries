import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { primaryBackground, accentGold } from "../../utils/theme";
import { useTranslation } from 'react-i18next';
import { HMSPage } from './HMSPage';
import { HallelBibleSchoolMinistry } from './HallelBibleSchoolMinistry';
import { HallelConferences } from './HallelConferences';
import { HallelWorshipDay } from './HallelWorshipDay';
import { HallelBibleCollege } from './HallelBibleCollege';
import { HMSSummerTraining } from './HMSSummerTraining';
import { HallelChurch } from './HallelChurch';
import { ScrollToTop } from '../ScrollToTop';

// Map slug to component
const COMPONENT_MAP: Record<string, React.ComponentType> = {
  "hallel-music-school": HMSPage,
  "hallel-bible-school": HallelBibleSchoolMinistry,
  "hallel-conferences": HallelConferences,
  "hallel-worship-day": HallelWorshipDay,
  "hallel-bible-college": HallelBibleCollege,
  "hallel-music-school-summer-training": HMSSummerTraining,
  "hallel-church": HallelChurch
};

// Map slug to translation key
const TRANSLATION_MAP: Record<string, string> = {
  "hallel-music-school": "tabs.hms",
  "hallel-bible-school": "tabs.bibleSchool",
  "hallel-conferences": "tabs.conferences",
  "hallel-worship-day": "tabs.worshipDay",
  "hallel-bible-college": "tabs.bibleCollege",
  "hallel-music-school-summer-training": "tabs.summerTraining",
  "hallel-church": "tabs.church"
};

interface Ministry {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}

// Custom sort function: Hallel Music School first, Hallel Church last, others alphabetically
const sortMinistries = (ministries: Ministry[]): Ministry[] => {
  return ministries.sort((a, b) => {
    if (a.slug === 'hallel-music-school') return -1;
    if (b.slug === 'hallel-music-school') return 1;
    if (a.slug === 'hallel-church') return 1;
    if (b.slug === 'hallel-church') return -1;
    return a.name.localeCompare(b.name);
  });
};

export function MinistriesPage() {
  const { t } = useTranslation('ministries');
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("");

  const fetchActiveMinistries = useCallback(async () => {
    try {
      const response = await fetch('/api/ministries');
      if (!response.ok) {
        throw new Error('Failed to fetch ministries');
      }
      
      const data = await response.json();
      // API already filters by is_active, no need to filter again
      const sortedMinistries = sortMinistries(data);
      
      setMinistries(sortedMinistries);
      // Set first ministry as default tab
      if (sortedMinistries.length > 0) {
        setActiveTab(sortedMinistries[0].slug);
      }
    } catch (error) {
      console.error('Error fetching ministries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveMinistries();
  }, [fetchActiveMinistries]);

  const handleTabChange = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
    // Scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Memoize tab buttons - only show active ministries
  const tabButtons = useMemo(
    () =>
      ministries.map((ministry) => {
        const isActive = activeTab === ministry.slug;
        const translationKey = TRANSLATION_MAP[ministry.slug];
        return (
          <button
            key={ministry.slug}
            className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors focus:outline-none ${
              isActive
                ? "bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]"
                : "bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]"
            }`}
            onClick={() => handleTabChange(ministry.slug)}
            style={{ cursor: "pointer" }}
            aria-selected={isActive}
            role="tab"
          >
            {translationKey ? t(translationKey) : ministry.name}
          </button>
        );
      }),
    [activeTab, handleTabChange, t, ministries]
  );

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: primaryBackground }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FDB813] mx-auto mb-4"></div>
          <p>Loading ministries...</p>
        </div>
      </div>
    );
  }

  // Show message when no active ministries
  if (!loading && ministries.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: primaryBackground }}
      >
        <div className="text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('noMinistries')}</h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: primaryBackground }}
    >
      {/* Tabs - Centered with padding */}
      <div className="pt-20 pb-4 md:pt-38 md:pb-12">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3" role="tablist">
            {tabButtons}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div role="tabpanel" className="pb-0">
        {ministries.map((ministry) => {
          const Component = COMPONENT_MAP[ministry.slug];
          if (!Component || activeTab !== ministry.slug) return null;
          
          return (
            <motion.div
              key={ministry.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Component />
            </motion.div>
          );
        })}
      </div>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
