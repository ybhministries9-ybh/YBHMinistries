"use client";

import { useState, useMemo, memo, useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Button } from "./ui/button";
import { primaryBackground, accentGold } from "../utils/theme";
import { useTranslation } from 'react-i18next';

interface GalleryImage {
  id?: number | string;
  url: string; // original / full-size URL
  thumbnail_url?: string | null;
  medium_url?: string | null;
}

interface Video {
  id: string;
  youtubeUrl: string;
  title: string;
  description: string;
  date: string;
}

const TAB_CONFIG = [
  { key: "guinness-events" },
  { key: "asian-records" },
  { key: "ingenious-record" },
  { key: "international-star-records" },
  { key: "hallel-conferences" },
  { key: "lcm-events" },
  { key: "anniversary" },
  { key: "kids-training" }
] as const;

function getYouTubeThumbnail(url: string): string {
  if (!url) return "";
  
  let videoId = "";
  
  // Handle different YouTube URL formats
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/shorts/")) {
    videoId = url.split("shorts/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/live/")) {
    videoId = url.split("live/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/v/")) {
    videoId = url.split("v/")[1]?.split("?")[0];
  }
  
  if (videoId && videoId.length === 11) {
    return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
  }
  
  return "";
}

function parseVideoDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  // Accept formats: YYYY-MM-DD, DD-Mon-YYYY (e.g. 21-Nov-2025), ISO strings
  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-').map((s) => parseInt(s, 10));
    return new Date(y, (m || 1) - 1, d || 1);
  }
  // DD-Mon-YYYY
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthStr = parts[1];
    const year = parseInt(parts[2], 10);
    const monthMap: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const month = monthMap[monthStr];
    if (month === undefined) return new Date(0);
    return new Date(year, month, day);
  }
  // Try Date parse as fallback
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) return parsed;
  return new Date(0);
}

function formatVideoDate(dateStr: string): string {
  const date = parseVideoDate(dateStr);
  if (date.getTime() === 0) return '';
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const VideoCard = memo(({ video, onThumbnailError, getThumbnailUrl }: {
  video: Video;
  onThumbnailError: (id: string) => void;
  getThumbnailUrl: (url: string, id: string) => string;
}) => (
  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-xl bg-[#2E2E2E] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] no-underline flex flex-col border-2 border-transparent hover:border-[#FDB813]">
    <div className="aspect-video w-full overflow-hidden bg-gray-900 relative rounded-t-xl">
      <img src={getThumbnailUrl(video.youtubeUrl, video.id)} alt={video.title} className="w-full h-full object-cover" loading="lazy" style={{ display: "block" }} onError={() => onThumbnailError(video.id)} />
    </div>
    <div className="flex flex-col flex-grow bg-[#2E2E2E] rounded-b-xl">
      <div className="p-4 pb-2 flex-grow">
        <h3 className="text-white text-sm line-clamp-2 leading-snug font-bold">{video.title}</h3>
      </div>
      <div className="px-4 pb-4 pt-2 mt-auto">
        <div className="flex items-center text-white text-xs">
          <Calendar size={14} className="mr-1.5 flex-shrink-0" />
          <span>{formatVideoDate(video.date)}</span>
        </div>
      </div>
    </div>
  </a>
));
VideoCard.displayName = "VideoCard";

const ImageCard = memo(({ image, index, title, onClick, eager = false }: {
  image: GalleryImage;
  index: number;
  title: string;
  onClick: () => void;
  eager?: boolean;
}) => (
  <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={onClick}>
    <ImageWithFallback src={image.thumbnail_url || image.medium_url || image.url} alt={`${title} ${index + 1}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" loading={eager ? "eager" : "lazy"} enableResponsive={false} />
  </div>
));
ImageCard.displayName = "ImageCard";

export function Gallery() {
  const { t } = useTranslation('gallery');
  const getInitialTabAndView = () => {
    if (typeof window === 'undefined') return { tab: 'guinness-events', view: 'photos' };
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return { tab: params.get('tab') || 'guinness-events', view: params.get('view') || 'photos' };
  };
  const { tab: initialTab, view: initialView } = getInitialTabAndView();
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [activeView, setActiveView] = useState<string>(initialView);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<Record<string, GalleryImage[]>>({});
  const [galleryVideos, setGalleryVideos] = useState<Record<string, Video[]>>({});
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({
    "guinness-events": 8, "asian-records": 8, "ingenious-record": 8, "international-star-records": 8,
    "hallel-conferences": 8, "lcm-events": 8, anniversary: 8, "kids-training": 8,
  });
  const [visibleVideoCounts, setVisibleVideoCounts] = useState<Record<string, number>>({
    "guinness-events": 8, "asian-records": 8, "ingenious-record": 8, "international-star-records": 8,
    "hallel-conferences": 8, "lcm-events": 8, anniversary: 8, "kids-training": 8,
  });

  useEffect(() => {
    if (activeView === 'videos' && videoSectionRef.current) {
      setTimeout(() => {
        const element = videoSectionRef.current;
        if (element) {
          const headerOffset = 180;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [activeView, activeTab]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all category data in parallel to reduce total load time
        const promises = TAB_CONFIG.map(async (tab) => {
          try {
            const res = await fetch(`/api/gallery?category=${tab.key}`);
            const data = await res.json();
            return { key: tab.key, data: data.success ? { images: data.data.images || [], videos: data.data.videos || [] } : { images: [], videos: [] } };
          } catch (e) {
            return { key: tab.key, data: { images: [], videos: [] } };
          }
        });

        const results = await Promise.all(promises);
        const imagesMap: Record<string, GalleryImage[]> = {};
        const videosMap: Record<string, Video[]> = {};
        for (const r of results) {
          imagesMap[r.key] = r.data.images;
          videosMap[r.key] = r.data.videos;
        }

        setGalleryImages(imagesMap);
        setGalleryVideos(videosMap);

        // If the page was opened with view=videos but this tab has no videos,
        // fall back to the photos view and update the URL so the gallery shows images.
        try {
          if (typeof window !== 'undefined') {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const requestedView = hashParams.get('view') || initialView || 'photos';
            const requestedTab = hashParams.get('tab') || initialTab || 'guinness-events';
            const hasVideos = (videosMap[requestedTab] || []).length > 0;
            if (requestedView === 'videos' && !hasVideos) {
              setActiveView('photos');
              // update URL hash to reflect fallback to photos without reloading
              hashParams.set('view', 'photos');
              window.history.replaceState(null, '', `#${hashParams.toString()}`);
            }
          }
        } catch (e) {
          // ignore
        }
      } catch (err) {
        console.error('Error fetching gallery data:', err);
        setError('Failed to load gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryData();
  }, []);

  const handleTabChange = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const openLightbox = useCallback((imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  }, []);
  const nextImage = useCallback(() => {
    const images = galleryImages[activeTab];
    setCurrentImageIndex((prev) => Math.min(prev + 1, images.length - 1));
  }, [activeTab, galleryImages]);
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => Math.max(prev - 1, 0));
  }, []);
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }, [closeLightbox, nextImage, prevImage]);
  const loadMore = useCallback(() => {
    setVisibleCounts((prev) => ({ ...prev, [activeTab]: prev[activeTab] + 8 }));
  }, [activeTab]);
  const loadMoreVideos = useCallback(() => {
    setVisibleVideoCounts((prev) => ({ ...prev, [activeTab]: prev[activeTab] + 8 }));
  }, [activeTab]);
  const handleThumbnailError = useCallback((videoId: string) => {
    setThumbnailErrors((prev) => new Set(prev).add(videoId));
  }, []);
  const getThumbnailUrl = useCallback((url: string, videoId: string): string => {
    if (thumbnailErrors.has(videoId)) {
      const extractedId = getVideoIdFromUrl(url);
      return extractedId ? `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg` : "";
    }
    return getYouTubeThumbnail(url);
  }, [thumbnailErrors]);
  const getVideoIdFromUrl = useCallback((url: string): string => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) videoId = url.split("v=")[1]?.split("&")[0];
    else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
    else if (url.includes("youtube.com/shorts/")) videoId = url.split("shorts/")[1]?.split("?")[0];
    else if (url.includes("youtube.com/live/")) videoId = url.split("live/")[1]?.split("?")[0];
    return videoId;
  }, []);

  const tabButtons = useMemo(() => TAB_CONFIG.map((tab) => {
    const isActive = activeTab === tab.key;
    return (
      <button key={tab.key} className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors focus:outline-none ${isActive ? "bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]" : "bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]"}`} onClick={() => handleTabChange(tab.key)} style={{ cursor: "pointer" }} aria-selected={isActive} role="tab">
        {t(`tabs.${tab.key}.label`)}
      </button>
    );
  }), [activeTab, handleTabChange, t]);

  const currentTab = useMemo(() => TAB_CONFIG.find((tab) => tab.key === activeTab), [activeTab]);
  const sectionImages = useMemo(() => galleryImages[activeTab] || [], [activeTab, galleryImages]);
  const visibleImages = useMemo(() => sectionImages.slice(0, visibleCounts[activeTab]), [sectionImages, visibleCounts, activeTab]);
  const hasMore = useMemo(() => visibleCounts[activeTab] < sectionImages.length, [visibleCounts, activeTab, sectionImages.length]);
  const videos = useMemo(() => galleryVideos[activeTab] || [], [activeTab, galleryVideos]);
  const sortedVideos = useMemo(() => [...videos].sort((a, b) => parseVideoDate(b.date).getTime() - parseVideoDate(a.date).getTime()), [videos]);
  const visibleVideos = useMemo(() => sortedVideos.slice(0, visibleVideoCounts[activeTab]), [sortedVideos, visibleVideoCounts, activeTab]);
  const hasMoreVideos = useMemo(() => visibleVideoCounts[activeTab] < sortedVideos.length, [visibleVideoCounts, activeTab, sortedVideos.length]);

  if (loading) return (<div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: primaryBackground }}><div className="text-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FDB813] mx-auto mb-4"></div><p className="text-lg">Loading gallery...</p></div></div>);
  if (error) return (<div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: primaryBackground }}><div className="text-center"><p className="text-lg text-red-400 mb-4">{error}</p><button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#FDB813] text-black rounded-lg hover:bg-[#DAA520] transition-colors">Retry</button></div></div>);

  return (<div className="min-h-screen text-white" style={{ backgroundColor: primaryBackground }}><div className="container mx-auto px-4 md:px-4 pt-12 md:pt-30 pb-16"><div className="mb-12 my-8"><div className="flex flex-wrap justify-center gap-2 md:gap-3" role="tablist">{tabButtons}</div></div><div className="mt-8" role="tabpanel"><div className="text-center mb-10"><h2 className="text-3xl md:text-4xl text-white mb-4">{t(`tabs.${activeTab}.title`)}</h2><div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: accentGold }}></div></div>{sectionImages && sectionImages.length > 0 ? (<><ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 768: 3, 1024: 4 }}><Masonry gutter="16px">{visibleImages.map((image, index) => (<ImageCard key={`${activeTab}-${index}`} image={image} index={index} title={t(`tabs.${activeTab}.title`)} onClick={() => openLightbox(index)} eager={index < 4} />))}</Masonry></ResponsiveMasonry>{hasMore && (<div className="flex justify-center mt-8"><Button onClick={loadMore} className="px-8 py-3 shadow-lg rounded-full transition-all duration-300" style={{ backgroundColor: "#FDB813", color: "black" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DAA520")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FDB813")}>{t('loadMore')}</Button></div>)}</>) : (<div className="text-center py-12"><p className="text-gray-400 text-lg">{t('noImages')}</p></div>)}{videos.length > 0 && (<div className="mt-12" ref={videoSectionRef}><div className="flex items-center mb-6"><div className="flex-grow h-px bg-gray-700"></div><h3 className="text-xl text-white font-medium px-4 flex items-center"><Play size={20} className="text-[#FDB813] mr-2" />{t('videoGallery')}</h3><div className="flex-grow h-px bg-gray-700"></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{visibleVideos.map((video) => (<VideoCard key={video.id} video={video} onThumbnailError={handleThumbnailError} getThumbnailUrl={getThumbnailUrl} />))}</div>{hasMoreVideos && (<div className="flex justify-center mt-8"><Button onClick={loadMoreVideos} className="px-8 py-3 shadow-lg transition-all duration-300" style={{ backgroundColor: "#FDB813", color: "black" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DAA520")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FDB813")}>{t('loadMoreVideos')}</Button></div>)}</div>)}</div></div>{lightboxOpen && (<div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center" onClick={closeLightbox} onKeyDown={handleKeyDown} tabIndex={0} role="dialog" aria-modal="true"><button className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors cursor-pointer" onClick={closeLightbox} aria-label="Close lightbox"><X size={32} /></button><button className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-colors ${currentImageIndex === 0 ? 'text-gray-600 bg-black/30 cursor-not-allowed opacity-50' : 'text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 cursor-pointer'}`} onClick={(e) => { e.stopPropagation(); if (currentImageIndex > 0) prevImage(); }} disabled={currentImageIndex === 0} aria-label="Previous image"><ChevronLeft size={40} /></button><button className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-colors ${currentImageIndex === sectionImages.length - 1 ? 'text-gray-600 bg-black/30 cursor-not-allowed opacity-50' : 'text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 cursor-pointer'}`} onClick={(e) => { e.stopPropagation(); if (currentImageIndex < sectionImages.length - 1) nextImage(); }} disabled={currentImageIndex === sectionImages.length - 1} aria-label="Next image"><ChevronRight size={40} /></button><div className="flex items-center justify-center p-4 w-full h-full" onClick={(e) => e.stopPropagation()}><img src={sectionImages[currentImageIndex]?.url} alt={`${t(`tabs.${activeTab}.title`)} ${currentImageIndex + 1}`} className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain" loading="eager" decoding="async" /></div><div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">{currentImageIndex + 1} / {sectionImages.length}</div></div>)}</div>);
}
