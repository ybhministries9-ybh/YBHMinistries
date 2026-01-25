"use client";

import { motion } from "motion/react";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function HMSSummerTraining() {
  const { t } = useTranslation('ministries');
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 100; // Adjust based on your header height
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section id="home" className="relative h-[80vh] flex items-start justify-center overflow-hidden pt-4 md:pt-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/ministries/summer/1.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        
        <div className="container mx-auto px-4 z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4">{t('hmsSummerTrainingPage.title')}</h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white">
              {t('hmsSummerTrainingPage.tagline')}
            </p>
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 text-left md:text-center max-w-3xl mx-auto">
              <p className="text-base md:text-lg">
                {t('hmsSummerTrainingPage.intro1')}
              </p>
              <p className="text-base md:text-lg">
                {t('hmsSummerTrainingPage.intro2Before')}{' '}
                <span className="font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4">
                  {t('hmsSummerTrainingPage.intro2Highlight')}
                </span>{' '}
                {t('hmsSummerTrainingPage.intro2After')}
              </p>
            </div>
            <Link href="/contact?tab=student-form" className="bg-[#FDB813] text-black px-10 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer inline-block shadow-lg">
              {t('hmsSummerTrainingPage.heroButton')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Purpose Section */}
      <section id="purpose" className="py-20 bg-[#2E2E2E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-2 text-center">{t('hmsSummerTrainingPage.purpose.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            
            <p className="text-lg mb-8">
              {t('hmsSummerTrainingPage.purpose.intro')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {(t('hmsSummerTrainingPage.purpose.points', { returnObjects: true }) as string[]).map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-[#FDB813] rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-gray-300 italic">
              {t('hmsSummerTrainingPage.purpose.closing')}
            </p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section id="program" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl mb-2 text-center">{t('hmsSummerTrainingPage.programOverview.title')}</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
          
          <p className="text-lg text-center max-w-3xl mx-auto mb-16">
            {t('hmsSummerTrainingPage.programOverview.introBefore')}{' '}
            <span className="font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4">
              {t('hmsSummerTrainingPage.programOverview.introHighlight')}
            </span>
            {t('hmsSummerTrainingPage.programOverview.introAfter')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(t('hmsSummerTrainingPage.programOverview.areas', { returnObjects: true }) as any[]).map((item, index) => {
              const icons = [
                <path key="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>,
                <path key="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>,
                <path key="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>,
                <>
                  <path key="4a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11a4 4 0 11-8 0 4 4 0 018 0z" />
                  <path key="4b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 19a4 4 0 014-4h4a4 4 0 014 4v1H2v-1z" />
                  <path key="4c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 15v1a3 3 0 013 3v1h-6v-1a3 3 0 013-3v-1" />
                </>,
                <path key="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>,
                <path key="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              ];
              return (
                <div key={index} className="bg-[#2E2E2E] p-6 rounded-lg hover:transform hover:scale-105 transition-all">
                  <div className="text-[#FDB813] mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      {icons[index]}
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning through Experience */}
      <section id="experience" className="py-20 bg-[#2E2E2E] relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-2 text-center">{t('hmsSummerTrainingPage.experience.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            
            <p className="text-lg mb-8 text-center">
              {t('hmsSummerTrainingPage.experience.introBefore')}{' '}
              <span className="font-semibold underline decoration-[#FDB813] decoration-4 underline-offset-4">
                {t('hmsSummerTrainingPage.experience.introHighlight')}
              </span>
              {t('hmsSummerTrainingPage.experience.introAfter')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-[#2E2E2E] bg-opacity-80 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('hmsSummerTrainingPage.experience.practical.title')}</h3>
                <p>
                  {t('hmsSummerTrainingPage.experience.practical.description')}
                </p>
              </div>
              <div className="bg-[#2E2E2E] bg-opacity-80 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('hmsSummerTrainingPage.experience.mentorship.title')}</h3>
                <p>
                  {t('hmsSummerTrainingPage.experience.mentorship.description')}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/contact?tab=student-form" className="bg-[#FDB813] text-black px-10 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer inline-block shadow-lg">
                {t('hmsSummerTrainingPage.experience.button')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Hallel Connection */}
      <section id="hallel" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-2 text-center">{t('hmsSummerTrainingPage.hallelConnection.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            
            <div className="bg-[#2E2E2E] p-8 rounded-lg mb-12">
              <p className="mb-6">
                {t('hmsSummerTrainingPage.hallelConnection.paragraph1')}
              </p>
              <p className="mb-6">
                {t('hmsSummerTrainingPage.hallelConnection.paragraph2')}
              </p>
              <p>
                {t('hmsSummerTrainingPage.hallelConnection.paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section id="join" className="py-20 bg-[#2E2E2E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-2 text-center">{t('hmsSummerTrainingPage.whoCanJoin.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {(t('hmsSummerTrainingPage.whoCanJoin.categories', { returnObjects: true }) as any[]).map((item, index) => (
                <div key={index} className="bg-black p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#FDB813]">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
            
            <p className="text-center text-lg italic mb-12">
              {t('hmsSummerTrainingPage.whoCanJoin.closing')}
            </p>
            
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center">{t('hmsSummerTrainingPage.whoCanJoin.transformationTitle')}</h3>
              <p className="mb-4">
                {t('hmsSummerTrainingPage.whoCanJoin.transformation1')}
              </p>
              <p className="mb-4">
                {t('hmsSummerTrainingPage.whoCanJoin.transformation2')}
              </p>
              <p>
                {t('hmsSummerTrainingPage.whoCanJoin.transformation3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-2">{t('hmsSummerTrainingPage.callToAction.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            
            <p className="text-lg mb-8">
              {t('hmsSummerTrainingPage.callToAction.paragraph1')}
            </p>
            <p className="text-lg mb-12">
              {t('hmsSummerTrainingPage.callToAction.paragraph2')}
            </p>
            <div className="bg-[#2E2E2E] p-6 rounded-lg mb-12">
              <p className="italic text-lg">
                {t('hmsSummerTrainingPage.callToAction.verse')}
              </p>
            </div>
            <Link href="/contact?tab=student-form" className="bg-[#FDB813] text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer inline-block shadow-lg">
              {t('hmsSummerTrainingPage.callToAction.button')}
            </Link>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-20 bg-[#2E2E2E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-2 text-center">{t('hmsSummerTrainingPage.connect.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <a href="https://www.facebook.com/p/Augustine-Dandingi-Official-100063698651483/" target="_blank" rel="noopener noreferrer" aria-label="Facebook - Augustine Dandingi Official" className="bg-black p-6 rounded-lg flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors duration-300">
                <svg className="w-12 h-12 text-[#FDB813] mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">{t('hmsSummerTrainingPage.connect.facebook.title')}</h3>
                <p className="text-gray-300">{t('hmsSummerTrainingPage.connect.facebook.subtitle')}</p>
              </a>

              <a href="https://www.youtube.com/@augustinedandingi6878" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel - Augustine Dandingi" className="bg-black p-6 rounded-lg flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors duration-300">
                <svg className="w-12 h-12 text-[#FDB813] mb-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a2.998 2.998 0 0 0-2.115-2.12C19.647 3.5 12 3.5 12 3.5s-7.647 0-9.382.566A3 3 0 0 0 .503 6.186C0 8.03 0 12 0 12s0 3.97.503 5.814a2.998 2.998 0 0 0 2.115 2.12C4.353 20.5 12 20.5 12 20.5s7.647 0 9.382-.566a2.998 2.998 0 0 0 2.115-2.12C24 15.97 24 12 24 12s0-3.97-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">{t('hmsSummerTrainingPage.connect.website.title')}</h3>
                <p className="text-gray-300">{t('hmsSummerTrainingPage.connect.website.subtitle')}</p>
              </a>

              <a href="mailto:daugustine001@gmail.com" aria-label="Email Augustine Dandingi" className="bg-black p-6 rounded-lg flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors duration-300">
                <svg className="w-12 h-12 text-[#FDB813] mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">{t('hmsSummerTrainingPage.connect.email.title')}</h3>
                <p className="text-gray-300">{t('hmsSummerTrainingPage.connect.email.subtitle')}</p>
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-xl mb-6">
                {t('hmsSummerTrainingPage.connect.closing1')}
              </p>
              <p className="text-xl mb-8">
                {t('hmsSummerTrainingPage.connect.closing2')}
              </p>
              <p className="text-2xl font-bold text-[#FDB813]">
                {t('hmsSummerTrainingPage.connect.closing3')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
