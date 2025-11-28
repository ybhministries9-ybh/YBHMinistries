"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronRight, Music, Book, Users, Heart, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
        width: '100%',
        height: '100%',
        borderRadius: 8,
      }}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}

export function HMSPage({ 
  ctaButtonColor = "#FFD700", 
  accentColor = "#8A2BE2"
}) {
  const { t } = useTranslation('ministries');
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = {
    home: useRef<HTMLDivElement | null>(null),
    mission: useRef<HTMLDivElement | null>(null),
    purpose: useRef<HTMLDivElement | null>(null),
    approach: useRef<HTMLDivElement | null>(null),
    vision: useRef<HTMLDivElement | null>(null),
    join: useRef<HTMLDivElement | null>(null),
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section 
        ref={sectionRefs.home}
        className="pt-4 md:pt-16 h-[80vh] flex items-start relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/ministries/hms/hms.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 py-2 md:py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">{t('hmsPage.hero.title')}</h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white">
              {t('hmsPage.hero.tagline')}
            </p>
            <p className="text-lg md:text-xl mb-4 md:mb-8 text-gray-300 max-w-2xl mx-auto">
              {t('hmsPage.hero.description')}
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('join')}
                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium text-black cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: ctaButtonColor }}
              >
                {t('hmsPage.hero.joinButton')}
              </button>
              <button 
                onClick={() => scrollToSection('approach')}
                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium bg-transparent cursor-pointer transition-all duration-300 hover:text-black"
                style={{ transition: 'all 0.3s ease', border: '2px solid #FDB813' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDB813'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {t('hmsPage.hero.exploreButton')}
              </button>
              <button 
                onClick={() => window.open('https://www.youtube.com/@HallelMusicSchool', '_blank')}
                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium bg-transparent cursor-pointer transition-all duration-300 hover:text-black flex items-center gap-2"
                style={{ transition: 'all 0.3s ease', border: '2px solid #FDB813' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDB813'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Youtube size={20} />
                {t('hmsPage.hero.subscribeButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={sectionRefs.mission}
        className="py-20 bg-[#2E2E2E]"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-normal mb-2">
                {t('hmsPage.mission.title')}
              </h2>
              <div className="w-24 h-1 rounded-full mb-6" style={{ backgroundColor: '#FDB813' }}></div>
              <p className="text-lg mb-6">
                {t('hmsPage.mission.subtitle')}
              </p>
              <p className="text-gray-300">
                {t('hmsPage.mission.description')}
              </p>
            </div>
            <div className="md:w-1/2 relative">
                <div className="aspect-video rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="/images/ministries/hms/vision.jpg"
                  alt="Students learning music"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section 
        ref={sectionRefs.purpose}
        className="py-20 bg-black"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl mb-2">{t('hmsPage.purpose.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            <p className="text-lg text-gray-300">
              {t('hmsPage.purpose.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('hmsPage.purpose.cards.sanctuary.title'),
                description: t('hmsPage.purpose.cards.sanctuary.description'),
                icon: <Heart className="h-8 w-8" style={{ color: accentColor }} />
              },
              {
                title: t('hmsPage.purpose.cards.rhythm.title'),
                description: t('hmsPage.purpose.cards.rhythm.description'),
                icon: <Music className="h-8 w-8" style={{ color: accentColor }} />
              },
              {
                title: t('hmsPage.purpose.cards.church.title'),
                description: t('hmsPage.purpose.cards.church.description'),
                icon: <Users className="h-8 w-8" style={{ color: accentColor }} />
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#2E2E2E] p-8 rounded-lg"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section 
        ref={sectionRefs.approach}
        className="py-20 bg-[#2E2E2E]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl mb-2">{t('hmsPage.approach.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            <p className="text-lg text-gray-300">
              {t('hmsPage.approach.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                  title: t('hmsPage.approach.items.training.title'),
                  description: t('hmsPage.approach.items.training.description'),
                  image: "/images/ministries/hms/approach_1.jpg"
                },
                {
                  title: t('hmsPage.approach.items.biblical.title'),
                  description: t('hmsPage.approach.items.biblical.description'),
                  image: "/images/ministries/hms/approach_2.jpg"
                },
                {
                  title: t('hmsPage.approach.items.workshops.title'),
                  description: t('hmsPage.approach.items.workshops.description'),
                  image: "/images/ministries/hms/approach_3.jpg"
                },
                {
                  title: t('hmsPage.approach.items.practical.title'),
                  description: t('hmsPage.approach.items.practical.description'),
                  image: "/images/ministries/hms/approach_4.jpg"
                }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-video">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section 
        ref={sectionRefs.vision}
        className="py-20 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Musical notes background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-2">{t('hmsPage.vision.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            <p className="text-lg mb-10">
              {t('hmsPage.vision.description')}
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
              {[
                { text: t('hmsPage.vision.statements.soul') },
                { text: t('hmsPage.vision.statements.home') },
                { text: t('hmsPage.vision.statements.church') }
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-xl font-light italic"
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section 
        ref={sectionRefs.join}
        className="py-20 bg-[#2E2E2E]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl mb-2">{t('hmsPage.join.title')}</h2>
            <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#FDB813' }}></div>
            <p className="text-lg text-gray-300">
              {t('hmsPage.join.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{t('hmsPage.join.online.title')}</h3>
              <p className="mb-6 text-gray-300">
                {t('hmsPage.join.online.description')}
              </p>
              <button 
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: ctaButtonColor, color: 'black' }}
                onClick={() => router.push('/contact?tab=student-form')}
              >
                {t('hmsPage.join.online.button')} <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{t('hmsPage.join.lms.title')}</h3>
              <p className="mb-6 text-gray-300">
                {t('hmsPage.join.lms.description')}
              </p>
              <button 
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: ctaButtonColor, color: 'black' }}
                onClick={() => router.push('/contact?tab=student-form')}
              >
                {t('hmsPage.join.lms.button')} <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-black rounded-lg max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">{t('hmsPage.join.guinness.title')}</h3>
            <p className="mb-6 text-gray-300">
              {t('hmsPage.join.guinness.description')}
            </p>
            <button 
              onClick={() => router.push('/news?section=upcoming-events')}
              className="px-6 py-3 rounded-full font-medium bg-transparent cursor-pointer transition-all duration-300 hover:text-black"
              style={{ transition: 'all 0.3s ease', border: '2px solid #FDB813' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDB813'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {t('hmsPage.join.guinness.button')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
