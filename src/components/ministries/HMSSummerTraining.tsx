import { motion } from "motion/react";
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-top opacity-30">
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
            <button 
              onClick={() => scrollToSection("join")}
              className="bg-[#FDB813] text-black px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              {t('hmsSummerTrainingPage.heroButton')}
            </button>
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
                <path key="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>,
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
      <section id="experience" className="py-20 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black opacity-80"></div>
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
              <button 
                onClick={() => scrollToSection("join")}
                className="bg-[#FDB813] text-black px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                {t('hmsSummerTrainingPage.experience.button')}
              </button>
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
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
              <div className="w-full md:w-1/3 aspect-square bg-[url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center rounded-lg"></div>
              <div className="w-full md:w-1/3 aspect-square bg-[url('https://images.unsplash.com/photo-1508695666381-69deeaa78ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center rounded-lg"></div>
              <div className="w-full md:w-1/3 aspect-square bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center rounded-lg"></div>
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
            <button className="bg-[#FDB813] text-black px-10 py-4 rounded-md font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              {t('hmsSummerTrainingPage.callToAction.button')}
            </button>
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
              <a href="#" className="bg-black p-6 rounded-lg flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer">
                <svg className="w-12 h-12 text-[#FDB813] mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-2">{t('hmsSummerTrainingPage.connect.facebook.title')}</h3>
                <p className="text-gray-300">{t('hmsSummerTrainingPage.connect.facebook.subtitle')}</p>
              </a>
              
              <a href="#" className="bg-black p-6 rounded-lg flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer">
                <svg className="w-12 h-12 text-[#FDB813] mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.17-.31.48-.6 1.3-.6 1.49 0 2.7 1.21 2.7 2.7V17z"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-2">{t('hmsSummerTrainingPage.connect.website.title')}</h3>
                <p className="text-gray-300">{t('hmsSummerTrainingPage.connect.website.subtitle')}</p>
              </a>
              
              <a href="#" className="bg-black p-6 rounded-lg flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer">
                <svg className="w-12 h-12 text-[#FDB813] mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
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
