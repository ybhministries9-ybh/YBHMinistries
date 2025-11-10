import { useState, useMemo, useCallback } from "react";
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

// Tab configuration
const TAB_CONFIG = [
  { key: "hms", labelKey: "tabs.hms" },
  { key: "bible-school", labelKey: "tabs.bibleSchool" },
  { key: "conferences", labelKey: "tabs.conferences" },
  { key: "worship-day", labelKey: "tabs.worshipDay" },
  { key: "bible-college", labelKey: "tabs.bibleCollege" },
  { key: "summer-training", labelKey: "tabs.summerTraining" },
  { key: "church", labelKey: "tabs.church" }
] as const;

export function MinistriesPage() {
  const { t } = useTranslation('ministries');
  const [activeTab, setActiveTab] = useState<string>("hms");

  const handleTabChange = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
    // Scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Memoize tab buttons
  const tabButtons = useMemo(
    () =>
      TAB_CONFIG.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors focus:outline-none ${
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
        {/* Hallel Music School Tab */}
        {activeTab === "hms" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HMSPage />
          </motion.div>
        )}

        {/* Hallel Bible School Tab */}
        {activeTab === "bible-school" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HallelBibleSchoolMinistry />
          </motion.div>
        )}

        {/* Hallel Conferences Tab */}
        {activeTab === "conferences" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HallelConferences />
          </motion.div>
        )}

        {/* Hallel Worship Day Tab */}
        {activeTab === "worship-day" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HallelWorshipDay />
          </motion.div>
        )}

        {/* Hallel Bible College Tab */}
        {activeTab === "bible-college" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HallelBibleCollege />
          </motion.div>
        )}

        {/* HMS Summer Training Tab */}
        {activeTab === "summer-training" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HMSSummerTraining />
          </motion.div>
        )}

        {/* Hallel Church Tab */}
        {activeTab === "church" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HallelChurch />
          </motion.div>
        )}
      </div>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
