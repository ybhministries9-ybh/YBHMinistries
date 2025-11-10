import { useState } from "react";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

export function HallelBibleCollege() {
  const { t } = useTranslation('ministries');
  
  return (
    <div className="font-sans text-white bg-black">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-start justify-center overflow-hidden pt-4 md:pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-16 z-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-white">{t('hallelBibleCollegePage.title')}</h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white">{t('hallelBibleCollegePage.tagline')}</p>
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <p className="text-base md:text-lg text-white">
                {t('hallelBibleCollegePage.about.paragraph1')}
              </p>
              <p className="text-base md:text-lg text-white">
                {t('hallelBibleCollegePage.about.paragraph2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-[#2E2E2E] py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-normal">{t('hallelBibleCollegePage.vision.title')}</h2>
              </div>
              <p className="mb-4">
                {t('hallelBibleCollegePage.vision.paragraph1')}
              </p>
              <p>
                {t('hallelBibleCollegePage.vision.paragraph2')}
              </p>
            </div>
            <div className="bg-black bg-opacity-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-normal">{t('hallelBibleCollegePage.mission.title')}</h2>
              </div>
              <ul className="space-y-3">
                {(t('hallelBibleCollegePage.mission.points', { returnObjects: true }) as string[]).map((point, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FDB813] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique Section */}
      <section className="bg-black py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-2 text-center">{t('hallelBibleCollegePage.unique.title')}</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t('hallelBibleCollegePage.unique.items', { returnObjects: true }) as any[]).map((item, index) => {
              const icons = [
                <path key="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />,
                <path key="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
                <path key="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
                <path key="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
                <path key="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-.565M8 3.935l-6 1.5V17.5A2.5 2.5 0 004.5 20h11a2.5 2.5 0 002.5-2.5V5.435l-6-1.5z" />
              ];
              return (
                <div key={index} className="bg-[#2E2E2E] p-6 rounded-lg hover:transform hover:scale-105 transition-transform">
                  <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#FDB813]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {icons[index]}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{item.title}</h3>
                  <p className="text-center">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Offered Section */}
      <section className="bg-[#2E2E2E] py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-2 text-center">{t('hallelBibleCollegePage.programs.title')}</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
          <div className="grid md:grid-cols-2 gap-8">
            {(t('hallelBibleCollegePage.programs.list', { returnObjects: true }) as any[]).map((program, index) => {
              const icons = [
                <>
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </>,
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />,
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-.565M8 3.935l-6 1.5V17.5A2.5 2.5 0 004.5 20h11a2.5 2.5 0 002.5-2.5V5.435l-6-1.5z" />
              ];
              return (
                <div key={index} className="bg-black p-6 rounded-lg cursor-pointer hover:bg-opacity-80 transition-all">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#FDB813] mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {icons[index]}
                    </svg>
                    <h3 className="text-xl font-bold">{program.title}</h3>
                  </div>
                  <p>{program.description}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center">
            {t('hallelBibleCollegePage.programs.closing')}
          </p>
        </div>
      </section>

      {/* Life at Hallel Section */}
      <section className="bg-black py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-2 text-center">{t('hallelBibleCollegePage.lifeAtHallel.title')}</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Life at Hallel Bible College"
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <p className="mb-4">
                {t('hallelBibleCollegePage.lifeAtHallel.paragraph1')}
              </p>
              <p className="mb-4">
                {t('hallelBibleCollegePage.lifeAtHallel.paragraph2')}
              </p>
              <h3 className="text-2xl font-bold mt-6 mb-4">{t('hallelBibleCollegePage.lifeAtHallel.differenceTitle')}</h3>
              <p className="mb-4">
                {t('hallelBibleCollegePage.lifeAtHallel.difference')}
              </p>
              <blockquote className="border-l-4 border-[#FDB813] pl-4 italic my-6">
                {t('hallelBibleCollegePage.lifeAtHallel.verse')}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#2E2E2E] py-16 px-4 md:px-8 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-2">{t('hallelBibleCollegePage.callToAction.title')}</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
          <p className="mb-8 text-lg">
            {t('hallelBibleCollegePage.callToAction.paragraph1')}
          </p>
          <p className="mb-8 text-lg">
            {t('hallelBibleCollegePage.callToAction.paragraph2')}
          </p>
          <p className="mb-8 text-lg font-semibold">
            {t('hallelBibleCollegePage.callToAction.paragraph3')}
          </p>
          <p className="mb-12 text-lg">
            {t('hallelBibleCollegePage.callToAction.paragraph4')}
          </p>
          <button className="bg-[#FDB813] text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-opacity-80 transition-all duration-300 cursor-pointer hover:scale-105">
            {t('hallelBibleCollegePage.callToAction.button')}
          </button>
        </div>
      </section>
    </div>
  );
}
