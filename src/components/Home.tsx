'use client';

import { useState, useEffect, useRef } from "react";
import SmartImage from './SmartImage';
import { useRouter } from "next/navigation";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { accentGold } from "../utils/theme";
import { useTranslation } from 'react-i18next';
import { ScrollToTop } from './ScrollToTop';
import { EventScrollBanner } from './EventScrollBanner';
import { getUpcomingEvents, Event } from '../utils/eventsData';

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

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
  const [videoData, setVideoData] = useState<{
    videoUrl: string;
    thumbnailUrl: string;
  } | null>(null);
  const [hasVideo, setHasVideo] = useState(true);

  // Fetch video from API
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch('/api/home/video');
        const result = await response.json();
        
        if (result.success && result.data) {
          setVideoData({
            videoUrl: result.data.video_url,
            thumbnailUrl: result.data.thumbnail_image_url
          });
          setHasVideo(true);
        } else {
          // No video in database
          setVideoData(null);
          setHasVideo(false);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
        setVideoData(null);
        setHasVideo(false);
      }
    };

    fetchVideo();
  }, []);

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
          {!hasVideo ? (
            // No video available placeholder
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2E2E2E] to-[#1a1a1a]">
              <div className="flex flex-col items-center text-center px-8">
                <div className="relative mb-6">
                  <svg 
                    className="w-24 h-24 text-[#FDB813] opacity-80" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                    />
                  </svg>
                  <div className="absolute inset-0 animate-ping">
                    <svg 
                      className="w-24 h-24 text-[#FDB813] opacity-20" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  {t('video.noVideoTitle') || 'No Video Available'}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {t('video.noVideoMessage') || 'A ministry video will be available here soon. Stay tuned!'}
                </p>
              </div>
            </div>
          ) : isVideoVisible && videoData ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              preload="none"
              poster={videoData.thumbnailUrl}
              playsInline
            >
              <source src={videoData.videoUrl} type="video/mp4" />
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

      {/* Left / Right navigation buttons */}
      <button
        onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 border border-[#FDB813] rounded-full p-2 hover:bg-opacity-75"
      >
        <ChevronLeft size={20} color="#FDB813" />
      </button>

      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 border border-[#FDB813] rounded-full p-2 hover:bg-opacity-75"
      >
        <ChevronRight size={20} color="#FDB813" />
      </button>
    </div>
  );
}

export function Home() {
  const { t } = useTranslation('home');
  const router = useRouter();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Default image when no images are in database
  const defaultHeroImage = `${R2_BASE}/home/hero/default.jpg`;

  // Fetch hero images and events from API
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await fetch('/api/home/hero-images');
        const result = await response.json();
        
        if (result.success && result.data && result.data.length > 0) {
          const imageUrls = result.data.map((img: any) => img.signedUrl || img.image_url || img.url).filter(Boolean) as string[];
          setHeroImages(imageUrls.length > 0 ? imageUrls : [defaultHeroImage]);
        } else {
          // Use default image if no images in database
          setHeroImages([defaultHeroImage]);
        }
      } catch (error) {
        console.error('Error fetching hero images:', error);
        // Use default image on error
        setHeroImages([defaultHeroImage]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchEvents = async () => {
      const events = await getUpcomingEvents();
      setUpcomingEvents(events);
    };

    fetchHeroImages();
    fetchEvents();
  }, []);

  const awardImages = [
    {
      src: `${R2_BASE}/logo/awards/guiness.png`,
      alt: "Guinness World Records Award",
      year: 2024
    },
    {
      src: `${R2_BASE}/logo/awards/Asian%20book%20of%20records.png`,
      alt: "Asian Book of Records Award",
      year: 2024
    },
    {
      src: `${R2_BASE}/logo/awards/ingenious.png`,
      alt: "Ingenious Charm World Records Award",
      year: 2024
    },
    {
      src: `${R2_BASE}/logo/awards/Star%20book%20of%20records.png`,
      alt: "International Star Book of Records Award",
      year: 2023
    }
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Hero Section - Image Slideshow */}
      <section className="relative h-screen overflow-hidden pt-16 md:pt-30">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <div className="flex space-x-3">
              <div className="w-4 h-4 rounded-full bg-[#FDB813] animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-4 h-4 rounded-full bg-[#FDB813] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 rounded-full bg-[#FDB813] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ) : (
          <ImageCarousel images={heroImages} interval={3000} />
        )}
        
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
                onClick={() => router.push('/about')}
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
              onClick={() => router.push('/awards')}
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