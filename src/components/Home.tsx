import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { accentGold } from "../utils/theme";
import { navigate } from "../utils/navigate";
import { useTranslation } from 'react-i18next';
import { ScrollToTop } from './ScrollToTop';
import { EventScrollBanner } from './EventScrollBanner';
import { getUpcomingEvents } from '../utils/eventsData';

// ImageWithFallback component for handling image loading errors
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
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  );
}

// Lazy-loaded Video Section Component for improved performance
function VideoSection() {
  const { t } = useTranslation('home');
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVideoVisible) {
            setIsVideoVisible(true);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before the section is visible
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVideoVisible]);

  return (
    <section ref={sectionRef} className="pt-10 pb-10 px-4 md:px-16 lg:px-24 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">{t('video.title')}</h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: accentGold }}></div>
        </div>
        <div className="relative aspect-video bg-[#2E2E2E] rounded-lg overflow-hidden">
          {isVideoVisible ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              preload="none"
              poster="https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg"
              playsInline
            >
              <source src="https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/Augustine.mp4" type="video/mp4" />
              {t('video.noSupport')}
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#2E2E2E]">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#FDB813] opacity-50 mb-4"></div>
                <p className="text-gray-400">{t('video.loadingText')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Custom ImageCarousel component with optimized image positioning
function ImageCarousel({ images, interval = 3000 }) {
  const { t } = useTranslation('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, interval]);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <ImageWithFallback
            src={image}
            alt={t('hero.slideAlt', { number: index + 1 })}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>
      ))}
      
      {/* Navigation dots */}
      <div className="absolute bottom-16 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                index === currentIndex ? 'bg-[#FDB813]' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const { t } = useTranslation('home');
  const upcomingEvents = getUpcomingEvents();
  
  const heroImages = [
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/00.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/01.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/1.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10%281%29.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/10a.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/11.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/11a.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/12.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/13.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/14.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/15.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/16.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/17.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/18.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/2.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/3.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/4.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/5.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/6.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/7.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/8.jpg",
    "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/hero/16x9/9.jpg"
  ];

  const awardImages = [
    {
      src: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/guiness.png",
      alt: "Guinness World Records Award",
      year: 2024
    },
    {
      src: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Asian%20book%20of%20records.png",
      alt: "Asian Book of Records Award",
      year: 2024
    },
    {
      src: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/ingenious.png",
      alt: "Ingenious Charm World Records Award",
      year: 2024
    },
    {
      src: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Home/awards/Star%20book%20of%20records%20-%20final.png",
      alt: "International Star Book of Records Award",
      year: 2023
    }
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Hero Section - Image Slideshow */}
      <section className="relative h-screen overflow-hidden pt-16 md:pt-30">
        <ImageCarousel images={heroImages} interval={3000} />
        
        {/* Event Scroll Banner - Only show when there are upcoming events */}
        {upcomingEvents.length > 0 && <EventScrollBanner />}
      </section>

      {/* About Section */}
      <section className="pt-20 pb-10 px-4 md:px-16 lg:px-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-4xl mb-4">{t('about.title')}</h2>
              <div className="w-24 h-1 rounded-full mb-8" style={{ backgroundColor: accentGold }}></div>
              <button 
                onClick={() => navigate('/about')}
                className="mt-6 px-6 py-3 bg-[#FDB813] text-black font-semibold rounded-md hover:bg-opacity-80 transition-all cursor-pointer"
              >
                {t('about.learnMore')}
              </button>
            </div>
            <div className="md:w-2/3">
              <p className="text-lg mb-6 leading-relaxed">
                {t('about.paragraph1')}
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                {t('about.paragraph2')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('about.paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Achievements Section */}
      <section className="pt-10 pb-20 px-4 md:px-16 lg:px-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">{t('achievements.title')}
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: accentGold }}></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('achievements.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {awardImages.map((award, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-black p-4 rounded-lg h-56 w-full flex items-center justify-center mb-1">
                  <ImageWithFallback
                    src={award.src}
                    alt={award.alt}
                    className="h-40 w-auto object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">{award.alt}</h3>
                <p className="text-sm font-bold text-white mt-0.5">{award.year}</p>
              </div>
            ))}
          </div>
          
          {/* Learn More Button */}
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => navigate('/awards')}
              className="px-6 py-3 bg-[#FDB813] text-black font-semibold rounded-md hover:bg-opacity-80 transition-all cursor-pointer"
            >
              {t('achievements.learnMore')}
            </button>
          </div>
        </div>
      </section>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}