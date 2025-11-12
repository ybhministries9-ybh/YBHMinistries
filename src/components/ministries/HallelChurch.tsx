"use client";

import React from "react";
import { useTranslation } from 'react-i18next';

export function HallelChurch() {
  const { t } = useTranslation('ministries');
  
  return (
    <div className="font-sans text-white bg-black">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        
        <div className="container mx-auto px-4 z-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-white">
              {t('hallelChurchPage.title')}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white">
              {t('hallelChurchPage.tagline')}
            </p>
          </div>
        </div>
      </section>

      {/* Content coming soon section */}
      <section className="bg-[#2E2E2E] py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl mb-2">
            {t('hallelChurchPage.comingSoon.title')}
          </h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
          <p className="text-lg">
            {t('hallelChurchPage.comingSoon.message')}
          </p>
        </div>
      </section>
    </div>
  );
}
