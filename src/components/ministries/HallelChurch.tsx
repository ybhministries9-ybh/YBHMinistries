"use client";

import React from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Calendar, Sun, Moon, Heart, Music } from 'lucide-react';

function ThemedSectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  // SEO: Use h1 if this is the main page title, otherwise h2
  return (
    <div className="text-center mb-12 mt-32 md:mt-48">
      <h2 className="text-3xl font mb-2" tabIndex={0}>{title}</h2>
      {subtitle && <p className="text-lg text-gray-400" tabIndex={0}>{subtitle}</p>}
      <div className="w-24 h-1 rounded-full mx-auto mt-4" style={{ backgroundColor: '#FDB813' }}></div>
    </div>
  );
}

// Activities data from i18n for SEO and localization
const activities = [
  {
    id: 1,
    titleKey: 'activity1Name',
    descriptionKey: 'activity1Subtitle',
    schedule: 'Every Sunday',
    timeKey: 'activity1Time',
    timeOfDay: 'Evening',
    icon: Music,
    featured: true,
  },
  {
    id: 2,
    titleKey: 'activity2Name',
    descriptionKey: 'activity2Subtitle',
    schedule: 'Every Friday',
    timeKey: 'activity2Time',
    timeOfDay: 'Evening',
    icon: Heart,
  },
];


export function HallelChurch() {
  const { t, i18n } = useTranslation('ministries');
  const lang = (i18n?.language || 'en').toLowerCase();

  // Theme object (could be imported from config)
  const theme = {
    background: "#18181b",
    backgroundAlt: "#23232a",
    primary: "#FDB813",
    secondary: "#2563eb",
    accent: "#d97706",
    highlight: "#22d3ee",
    text: "#fff",
    textMuted: "#a1a1aa",
  };
  
  return (
    <div className="font-sans text-white bg-black">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/ministries/church/church.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-white">
              {t('hallelChurchPage.title')}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white">
              {t('hallelChurchPage.tagline')}
            </p>
            <div className="mt-8 text-lg md:text-xl leading-8 prose prose-invert text-center max-w-3xl mx-auto px-3 md:px-10 lg:px-16">
              <p className="">{t('hallelChurchPage.paragraph1')}</p>
              <p className="mt-3">{t('hallelChurchPage.paragraph2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section (SEO: use h2, semantic article) */}
      <section className="bg-[#2E2E2E] py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            {/* About heading intentionally removed */}
          </div>
          <div className="text-center">
            {/* About heading removed per design — paragraphs moved to hero */}
          </div>
        </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: theme.accent + '15' }}
        />
        <div 
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: theme.secondary + '15' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <br /><br />
        <ThemedSectionTitle 
          title={t('hallelChurchPage.activitiesTitle', 'Church Activities')}
        />
        <p className="text-lg text-gray-400 text-center mb-6">
          {lang.startsWith('te') ? t('hallelChurchPage.activitiesSubtitle') : 'Join us in worship, prayer, and fellowship throughout the week'}
        </p>

        {/* Activities Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            const colors = [theme.primary, theme.secondary, theme.accent, theme.highlight];
            const accentColor = colors[index % colors.length];

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative group ${activity.featured ? 'md:col-span-2' : ''}`}
              >
                <div 
                  className="rounded-2xl md:rounded-3xl p-8 h-full min-h-[340px] transition-all duration-500 border hover:shadow-2xl mx-auto max-w-xl text-center flex flex-col justify-between"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.textMuted + '20',
                  }}
                >
                  <div className="flex flex-col items-center gap-6">
                    {/* Icon */}
                    <motion.div 
                      className={`flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 mx-auto`}
                      style={{ 
                        background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                        border: `2px solid ${accentColor}30`
                      }}
                    >
                      <IconComponent 
                        className={`w-10 h-10`}
                        style={{ color: accentColor }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="w-full">
                      <h3 
                        className={`font-bold mb-2 transition-colors text-xl text-white text-center`}
                        style={{ color: '#fff' }}
                        tabIndex={0}
                      >
                        {t(`hallelChurchPage.${activity.titleKey}`)}
                      </h3>
                      <p 
                        className="mb-4 leading-relaxed text-center"
                        style={{ color: theme.textMuted }}
                        tabIndex={0}
                      >
                        {t(`hallelChurchPage.${activity.descriptionKey}`)}
                      </p>

                      {/* Schedule Info */}
                      <div className="flex flex-wrap justify-center items-center gap-3">
                        {/* Day Badge */}
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all justify-center"
                          style={{ 
                            backgroundColor: accentColor + '15',
                            color: accentColor,
                            border: `1px solid ${accentColor}30`
                          }}
                        >
                          <Calendar className="w-4 h-4" />
                          {activity.schedule}
                        </motion.div>

                        {/* Time Badge */}
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all justify-center"
                          style={{ 
                            backgroundColor: theme.backgroundAlt,
                            color: theme.text,
                            border: `1px solid ${theme.textMuted}20`
                          }}
                        >
                          <Clock className="w-4 h-4" style={{ color: accentColor }} />
                          {t(`hallelChurchPage.${activity.timeKey}`)}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Line */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 rounded-b-3xl transition-all duration-500 group-hover:w-full w-0"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
    </div>
  );
}
