"use client";

import React, { useState } from "react";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

export function HallelBibleSchoolMinistry() {
  const { t } = useTranslation('ministries');
  
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section (full-width) */}
      <section className="relative h-[80vh] flex items-start justify-center overflow-hidden mb-20 pt-4 md:pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1672867138294-8aa5591041de?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        
        <div className="container mx-auto px-4 z-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">{t('hallelBibleSchoolPage.title')}</h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white">
              {t('hallelBibleSchoolPage.tagline')}
            </p>
            <p className="text-lg md:text-xl leading-relaxed mx-6 md:mx-16 lg:mx-1 text-white">
              {t('hallelBibleSchoolPage.heroDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#2E2E2E] p-8 rounded-lg">
              <h2 className="text-3xl font-normal mb-4">{t('hallelBibleSchoolPage.vision.title')}</h2>
              <p className="leading-relaxed">
                {t('hallelBibleSchoolPage.vision.content')}
              </p>
            </div>
            <div className="bg-[#2E2E2E] p-8 rounded-lg">
              <h2 className="text-3xl font-normal mb-4">{t('hallelBibleSchoolPage.mission.title')}</h2>
              <p className="mb-4">{t('hallelBibleSchoolPage.mission.intro')}</p>
              <ul className="list-disc pl-5 space-y-2">
                {(t('hallelBibleSchoolPage.mission.points', { returnObjects: true }) as string[]).map((point, index) => {
                  const titles = t('hallelBibleSchoolPage.mission.pointTitles', { returnObjects: true }) as string[];
                  return (
                    <li key={index}>
                      <span className="font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4">
                        {titles[index]}
                      </span>{' '}
                      {point.replace(titles[index], '').trim()}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique Section */}
      <section style={{ backgroundColor: '#2E2E2E' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-2 text-center">{t('hallelBibleSchoolPage.unique.title')}</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t('hallelBibleSchoolPage.unique.items', { returnObjects: true }) as any[]).map((item, index) => (
              <div key={index} className="bg-black p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-3 text-yellow-500">{item.title}</h3>
                <p>
                  {item.highlight ? (
                    <>
                      {item.description.split(item.highlight)[0]}
                      <span className="font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4">
                        {item.highlight}
                      </span>
                      {item.description.split(item.highlight)[1]}
                    </>
                  ) : (
                    item.description
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-2 text-center">{t('hallelBibleSchoolPage.courses.title')}</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
          <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
            {t('hallelBibleSchoolPage.courses.intro')}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {(t('hallelBibleSchoolPage.courses.programs', { returnObjects: true }) as any[]).map((program, index) => (
              <div key={index} className="bg-[#2E2E2E] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-yellow-500">{program.title}</h3>
                <p>{program.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center">
            {t('hallelBibleSchoolPage.courses.closing')}
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section style={{ backgroundColor: '#2E2E2E' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-2 text-center">{t('hallelBibleSchoolPage.impact.title')}</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <p className="text-lg leading-relaxed mb-4">
              {t('hallelBibleSchoolPage.impact.paragraph1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('hallelBibleSchoolPage.impact.paragraph2')}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-2">{t('hallelBibleSchoolPage.callToAction.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            <p className="text-lg mx-auto mb-8">
              {t('hallelBibleSchoolPage.callToAction.description')}
            </p>
            <p className="text-lg font-semibold mb-8">
              {t('hallelBibleSchoolPage.callToAction.closing').split(t('hallelBibleSchoolPage.callToAction.closingHighlight'))[0]}
              <span className="font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4">
                {t('hallelBibleSchoolPage.callToAction.closingHighlight')}
              </span>
              {t('hallelBibleSchoolPage.callToAction.closing').split(t('hallelBibleSchoolPage.callToAction.closingHighlight'))[1]}
            </p>
            <button className="bg-[#FDB813] hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105">
              {t('hallelBibleSchoolPage.callToAction.button')}
            </button>
          </div>

          {/* Bible Verse */}
          <div className="text-center italic">
            <p className="text-lg">
              {t('hallelBibleSchoolPage.callToAction.verse')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
