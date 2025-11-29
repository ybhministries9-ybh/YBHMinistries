"use client";

import React from "react";
import Link from 'next/link';
import { Music, Heart, MessageCircle, Users, Globe, Star, Calendar, Mic2, BookOpen, RefreshCcw } from "lucide-react";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

export function HallelConferences() {
  const { t } = useTranslation('ministries');
  
  return (
    <div className="font-sans text-white bg-black">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-start justify-center overflow-hidden mb-20 pt-4 md:pt-16"> 
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div> 
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/ministries/conference/3.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">{t('hallelConferencesPage.title')}</h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white">
              {t('hallelConferencesPage.tagline')}
            </p>
            <div className="mt-6 md:mt-8 max-w-3xl mx-auto space-y-4">
              <p className="text-base md:text-lg leading-relaxed text-center text-white">
                {t('hallelConferencesPage.introduction.paragraph1')}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-center text-white">
                {t('hallelConferencesPage.introduction.paragraph2')}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
      </section>

      {/* Heart of Hallel Section */}
      <section className="bg-[#2E2E2E] py-20 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-5xl mx-auto">
          {/* Centered Section Header */}
          <h2 className="text-3xl md:text-4xl text-center mb-2">
            {t('hallelConferencesPage.heartOfHallel.title')}
          </h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>

          {/* Content Row */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Text Content */}
            <div className="md:w-3/5 order-2 md:order-1">
              <div className="relative pl-6 mb-8 border-l-4 border-[#FDB813]">
                <p className="text-xl italic font-light">
                  "{t('hallelConferencesPage.heartOfHallel.quote')}"
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-6">
                {t('hallelConferencesPage.heartOfHallel.paragraph1')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('hallelConferencesPage.heartOfHallel.paragraph2')}
              </p>
            </div>
            {/* Image Content */}
            <div className="md:w-2/5 w-full order-1 md:order-2">
              <div className="w-full aspect-square overflow-hidden rounded-lg shadow-lg bg-black">
                <ImageWithFallback
                  src="/images/ministries/conference/1.jpg"
                  alt="People worshiping at Hallel Conference"
                  className="block w-full h-full object-contain bg-black"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Hallel Special Section */}
      <section className="bg-black py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-4 flex items-center justify-center gap-3">
            {t('hallelConferencesPage.whatMakesSpecial.title')}
          </h2>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto mb-12"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {(t('hallelConferencesPage.whatMakesSpecial.items', { returnObjects: true }) as any[]).map((item, index) => {
              const icons = [Mic2, BookOpen, Users];
              const Icon = icons[index];
              return (
                <div key={index} className="bg-[#2E2E2E] p-8 rounded-lg">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-full bg-black inline-flex">
                      <Icon className="w-8 h-8 text-[#FDB813]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-center">{item.title}</h3>
                  <p className="text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Hallel Matters Section */}
      <section className="bg-[#2E2E2E] py-20 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-5xl mx-auto">
          {/* Centered Section Header */}
          <h2 className="text-3xl md:text-4xl text-center mb-4">
            {t('hallelConferencesPage.whyMatters.title')}
          </h2>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto mb-12"></div>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Text Column */}
            <div className="md:w-3/5 w-full order-2 md:order-1">
              
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="mt-1">
                      <div className="p-2 rounded-full bg-[#FDB813] inline-flex">
                        <RefreshCcw className="w-5 h-5 text-black" />
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed">
                      {t('hallelConferencesPage.whyMatters.point1')}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <div className="p-2 rounded-full bg-[#FDB813] inline-flex">
                        <Users className="w-5 h-5 text-black" />
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed">
                      {t('hallelConferencesPage.whyMatters.point2')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Image Column */}
            <div className="md:w-2/5 w-full order-1 md:order-2">
              <div className="w-full aspect-square overflow-hidden rounded-lg shadow-lg bg-black">
                <ImageWithFallback
                  src="/images/ministries/conference/hands.jpg"
                  alt="Hands lifted in worship"
                  className="block w-full h-full object-contain bg-black"
                />
              </div>
            </div>
          </div>
          <div className="bg-black p-6 rounded-lg mt-12 mb-8">
                <p className="text-xl italic">
                  "{t('hallelConferencesPage.whyMatters.quote')}"
                </p>
              </div>
        </div>
      </section>

      {/* Movement of Praise Section */}
      <section className="bg-black py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Centered Section Header */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">{t('hallelConferencesPage.movementOfPraise.title')}</h2>
            <div className="w-24 h-1 bg-[#FDB813] mx-auto mb-8"></div>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/2">
              
              
              <p className="text-lg leading-relaxed mb-6">
                {t('hallelConferencesPage.movementOfPraise.intro')}
              </p>
              
              {(t('hallelConferencesPage.movementOfPraise.bullets', { returnObjects: true }) as string[]).map((bullet, index) => (
                <div key={index} className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#FDB813]"></div>
                  <p className="text-lg">{bullet}</p>
                </div>
              ))}
            </div>
            
            <div className="md:w-1/2 bg-[#2E2E2E] p-8 rounded-lg">
              <div className="text-center mb-6">
                <Music className="w-12 h-12 text-[#FDB813] mx-auto" />
              </div>
              <p className="text-lg leading-relaxed italic text-center mb-6">
                "{t('hallelConferencesPage.movementOfPraise.quote1')}"
              </p>
              <p className="text-lg leading-relaxed text-center">
                {t('hallelConferencesPage.movementOfPraise.quote2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#2E2E2E] py-20 px-4 md:px-8 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-4">{t('hallelConferencesPage.callToAction.title')}</h2>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {(t('hallelConferencesPage.callToAction.actions', { returnObjects: true }) as string[]).map((action, index) => {
              const icons = [Heart, Mic2, Star];
              const Icon = icons[index];
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-black mb-4">
                    <Icon className="w-8 h-8 text-[#FDB813]" />
                  </div>
                  <p className="text-lg">{action}</p>
                </div>
              );
            })}
          </div>
          
          <p className="text-xl leading-relaxed mb-6 max-w-2xl mx-auto">
            {t('hallelConferencesPage.callToAction.paragraph1')}
          </p>
          
          <p className="text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('hallelConferencesPage.callToAction.paragraph2')}
          </p>
          
          <Link
            href="/contact?tab=student-form"
            className="bg-[#FDB813] text-black font-semibold py-3 px-10 rounded-full text-lg inline-flex items-center gap-2 mx-auto cursor-pointer shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            {t('hallelConferencesPage.callToAction.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
