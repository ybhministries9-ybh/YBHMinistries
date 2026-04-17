"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { primaryBackground, accentGold } from "../utils/theme";
import { useTranslation } from 'react-i18next';
import { ScrollToTop } from './ScrollToTop';
import { HMSStudentForm } from './HMSStudentForm';
import GetInTouchSection from './GetInTouchSection';
import { Worship24Section } from './Worship24Section';
import { usePathname, useRouter } from "next/navigation";

// Tab configuration
const TAB_CONFIG = [
  { key: "getintouch", labelKey: "tabs.getInTouch" },
  { key: "guinness-attempt", labelKey: "tabs.guinnessAttempt" },
  { key: "student-form", labelKey: "tabs.studentForm" },
  { key: "worship24", labelKey: "tabs.worship24" },
  { key: "conference-request", labelKey: "tabs.conferenceRequest" },
  { key: "lsm-student", labelKey: "tabs.lsmStudent" },
  { key: "sponsor", labelKey: "tabs.sponsor" },
  { key: "trustee", labelKey: "tabs.trustee" }
] as const;

// Visible tabs on the UI. Keep other tab definitions in TAB_CONFIG
// so their code remains available, but only the keys listed here
// will render as buttons in the tab bar.
const VISIBLE_TAB_KEYS = new Set(["student-form", "getintouch", "worship24"]);

export function ContactsPage({ initialTab }: { initialTab?: string } ) {
  const { t } = useTranslation('contact');
  const pathname = usePathname();
  const router = useRouter();

  const tabKeyFromPathname = useMemo(() => {
    if (!pathname) return undefined;
    const parts = pathname.split("/").filter(Boolean);
    const contactIndex = parts.indexOf("contact");
    const maybeTab = contactIndex >= 0 ? parts[contactIndex + 1] : undefined;
    return typeof maybeTab === "string" && maybeTab.length > 0 ? maybeTab : undefined;
  }, [pathname]);

  const tabPathForKey = useCallback((tabKey: string) => {
    // Keep routes explicit per tab.
    if (tabKey === "student-form") return "/contact/student-form";
    if (tabKey === "getintouch") return "/contact/getintouch";
    if (tabKey === "worship24") return "/contact/worship24";
    return "/contact";
  }, []);

  // Determine initial active tab: prefer server-provided `initialTab`,
  // otherwise pick the first visible tab from `TAB_CONFIG` to avoid flashes
  // Important: do NOT use `usePathname()` to pick the initial state because
  // it can differ between the server render and the first client render,
  // causing hydration mismatches (e.g. Radix generated ids like `aria-controls`).
  const defaultTab =
    initialTab ||
    TAB_CONFIG.find(tab => VISIBLE_TAB_KEYS.has(tab.key))?.key ||
    "student-form";
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  // Keep state in sync with route changes (back/forward, direct URL nav)
  useEffect(() => {
    if (tabKeyFromPathname && tabKeyFromPathname !== activeTab) {
      setActiveTab(tabKeyFromPathname);
    }
  }, [tabKeyFromPathname, activeTab]);

  const handleTabChange = useCallback((tabKey: string) => {
    if (tabKey === activeTab) return;
    router.push(tabPathForKey(tabKey));
    // Scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [router, tabPathForKey, activeTab]);

  // Memoize tab buttons
  const tabButtons = useMemo(
    () =>
      TAB_CONFIG.filter(tab => VISIBLE_TAB_KEYS.has(tab.key)).map((tab) => {
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
      <div className="pt-24 pb-4 md:pt-38 md:pb-12">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3" role="tablist">
            {tabButtons}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div role="tabpanel" className="pb-16">
        {/* Guinness World Records Attempt-2 Tab */}
        {activeTab === "guinness-attempt" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 pt-1 pb-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl mb-6 text-center">
                  {t('guinnessAttempt.title')}
                </h2>
                <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: accentGold }}></div>
                <p className="text-gray-300 text-center text-lg">
                  {t('guinnessAttempt.comingSoon')}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* HMS Student Form Tab */}
        {activeTab === "student-form" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 pt-1 pb-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl mb-6 text-center">
                  {t('studentForm.title')}
                </h2>
                <div className="w-24 h-1 mx-auto rounded-full mb-12" style={{ backgroundColor: accentGold }}></div>
                <HMSStudentForm />
              </div>
            </div>
          </motion.div>
        )}

        {/* Get In Touch Tab */}
        {activeTab === "getintouch" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 pt-1 pb-12">
              <div className="max-w-4xl mx-auto">
                <GetInTouchSection />
              </div>
            </div>
          </motion.div>
        )}

        {/* 24 Hours Worship Tab */}
        {activeTab === "worship24" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 pt-1 pb-12">
              <div className="max-w-4xl mx-auto">
                <Worship24Section />
              </div>
            </div>
          </motion.div>
        )}

        {/* Offline Conference in Your City Tab */}
        {activeTab === "conference-request" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 pt-1 pb-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl mb-6 text-center">
                  {t('conferenceRequest.title')}
                </h2>
                <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: accentGold }}></div>
                <p className="text-gray-300 text-center text-lg">
                  {t('conferenceRequest.comingSoon')}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* London School of Music Student Tab */}
        {activeTab === "lsm-student" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 pt-1 pb-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl mb-6 text-center">
                  {t('lsmStudent.title')}
                </h2>
                <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: accentGold }}></div>
                <p className="text-gray-300 text-center text-lg">
                  {t('lsmStudent.comingSoon')}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Become a Sponsor for Event Tab */}
        {activeTab === "sponsor" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 pt-1 pb-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl mb-6 text-center">
                  {t('sponsor.title')}
                </h2>
                <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: accentGold }}></div>
                <p className="text-gray-300 text-center text-lg">
                  {t('sponsor.comingSoon')}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Become a Trustee Tab */}
        {activeTab === "trustee" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 pt-1 pb-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl mb-6 text-center">
                  {t('trustee.title')}
                </h2>
                <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: accentGold }}></div>
                <p className="text-gray-300 text-center text-lg">
                  {t('trustee.comingSoon')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
