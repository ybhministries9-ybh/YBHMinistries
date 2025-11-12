"use client";

import { useState, useMemo, memo, useCallback, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Calendar,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Button } from "./ui/button";
import { primaryBackground, accentGold } from "../utils/theme";
import { useTranslation } from 'react-i18next';

interface GalleryImage {
  url: string;
}

interface Video {
  id: string;
  youtubeUrl: string;
  title: string;
  description: string;
  date: string;
}

// Tab configuration - will use translations
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

// Utility function to extract YouTube thumbnail from video URL
function getYouTubeThumbnail(url: string): string {
  if (!url) return "";

  let videoId = "";

  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/shorts/")) {
    videoId = url.split("shorts/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/live/")) {
    videoId = url.split("live/")[1]?.split("?")[0];
  }

  return videoId
    ? `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
    : "";
}

// Utility function to parse date string
function parseVideoDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);

  const parts = dateStr.split("-");
  if (parts.length !== 3) return new Date(0);

  const day = parseInt(parts[0]);
  const monthStr = parts[1];
  const year = parseInt(parts[2]);

  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };

  const month = monthMap[monthStr];
  if (month === undefined) return new Date(0);

  return new Date(year, month, day);
}

// Utility function to format date
function formatVideoDate(dateStr: string): string {
  const date = parseVideoDate(dateStr);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

// Memoized Video Card Component
const VideoCard = memo(({ video, onThumbnailError, getThumbnailUrl }: {
  video: Video;
  onThumbnailError: (id: string) => void;
  getThumbnailUrl: (url: string, id: string) => string;
}) => {
  return (
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl bg-[#2E2E2E] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] no-underline flex flex-col border-2 border-transparent hover:border-[#FDB813]"
    >
      {/* Video Thumbnail */}
      <div className="aspect-video w-full overflow-hidden bg-gray-900 relative rounded-t-xl">
        <img
          src={getThumbnailUrl(video.youtubeUrl, video.id)}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ display: "block" }}
          onError={() => onThumbnailError(video.id)}
        />
      </div>

      {/* Video Info */}
      <div className="flex flex-col flex-grow bg-[#2E2E2E] rounded-b-xl">
        <div className="p-4 pb-2 flex-grow">
          <h3 className="text-white text-sm line-clamp-2 leading-snug font-bold">
            {video.title}
          </h3>
        </div>
        <div className="px-4 pb-4 pt-2 mt-auto">
          <div className="flex items-center text-white text-xs">
            <Calendar size={14} className="mr-1.5 flex-shrink-0" />
            <span>{formatVideoDate(video.date)}</span>
          </div>
        </div>
      </div>
    </a>
  );
});

VideoCard.displayName = "VideoCard";

// Memoized Image Card Component
const ImageCard = memo(({ image, index, title, onClick, eager = false }: {
  image: GalleryImage;
  index: number;
  title: string;
  onClick: () => void;
  eager?: boolean;
}) => {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <ImageWithFallback
        src={image.url}
        alt={`${title} ${index + 1}`}
        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
        loading={eager ? "eager" : "lazy"}
        enableResponsive={false}
      />
    </div>
  );
});

ImageCard.displayName = "ImageCard";

export function Gallery() {
  const { t } = useTranslation('gallery');
  
  // Parse URL hash for initial tab and view mode
  const getInitialTabAndView = () => {
    const hash = window.location.hash.substring(1); // Remove the '#'
    const params = new URLSearchParams(hash);
    const tab = params.get('tab') || 'guinness-events';
    const view = params.get('view') || 'photos'; // 'photos' or 'videos'
    return { tab, view };
  };
  
  const { tab: initialTab, view: initialView } = getInitialTabAndView();
  
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [activeView, setActiveView] = useState<string>(initialView);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<string>>(new Set());
  
  // Ref for video gallery section
  const videoSectionRef = useRef<HTMLDivElement>(null);
  
  // Scroll to video section when activeView is 'videos'
  useEffect(() => {
    if (activeView === 'videos' && videoSectionRef.current) {
      setTimeout(() => {
        const element = videoSectionRef.current;
        if (element) {
          const headerOffset = 180; // Account for fixed header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300); // Small delay to ensure content is rendered
    }
  }, [activeView, activeTab]);

  // Track visible images per section
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({
    "guinness-events": 8,
    "asian-records": 8,
    "ingenious-record": 8,
    "international-star-records": 8,
    "hallel-conferences": 8,
    "lcm-events": 8,
    anniversary: 8,
    "kids-training": 8,
  });

  // Track visible videos per section
  const [visibleVideoCounts, setVisibleVideoCounts] = useState<Record<string, number>>({
    "guinness-events": 8,
    "asian-records": 8,
    "ingenious-record": 8,
    "international-star-records": 8,
    "hallel-conferences": 8,
    "lcm-events": 8,
    anniversary: 8,
    "kids-training": 8,
  });

  // Gallery images data - Memoized
  const galleryImages = useMemo<Record<string, GalleryImage[]>>(() => ({
    "guinness-events": [
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/1.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/9.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/2.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/14.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/13.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/12.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/11a.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/11.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/10.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/15.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/16.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/17.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/18.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/19.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/20.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/21.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/22.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/23.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/24.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/25.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/26.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/27.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/28.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/29.jpg" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Guinness/30.jpg" },
    ],
    "asian-records": [
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/1.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/2.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/3.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/4.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/5.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/6.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/7.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/8.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/9.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/10.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/11.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/12.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/13.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/14.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/15.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/16.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/17.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/18.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/19.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Asian%20Book/20.jpg?w=1200" },
    ],
    "ingenious-record": [
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/1.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/2.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/3.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/4.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/5.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/6.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/7.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/8.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/9.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/10.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/11.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/12.JPG?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/13.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/14.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/15.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/16.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/17.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/18.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/19.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Ingenious%20Charm/20.jpg?w=1200" },
      
    ],
    "international-star-records": [
      { url: "https://images.unsplash.com/photo-1759560270562-468e8ba866e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwYWNoaWV2ZW1lbnR8ZW58MXx8fHwxNzYxODU0MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
      { url: "https://images.unsplash.com/photo-1761178334144-9715e83bf64b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMHJlY29nbml0aW9ufGVufDF8fHx8MTc2MTg1NDA5OHww&ixlib=rb-4.1.0&q=80&w=1080" },
      { url: "https://images.unsplash.com/photo-1759701546980-1211be084c70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waHklMjBhY2hpZXZlbWVudHxlbnwxfHx8fDE3NjE3NjM1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { url: "https://images.unsplash.com/photo-1595733533725-1a6bce052b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRzJTIwYWNoaWV2ZW1lbnQlMjBib29rfGVufDF8fHx8MTc2MTg1NDEwNXww&ixlib=rb-4.1.0&q=80&w=1080" },
      { url: "https://images.unsplash.com/photo-1504610926078-a1611febcad3?w=1200" },
      { url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200" },
      { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200" },
      { url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200" },
      { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200" },
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200" },
    ],
    "hallel-conferences": [
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/1.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/2.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/3.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/4.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/5.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/6.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/7.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/8.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/9.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/10.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/11.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/12.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/13.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/14.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/15.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/16.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/17.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/18.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/19.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/Conferences/20.jpg?w=1200" },
    ],
    "lcm-events": [
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/1.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/2.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/3.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/4.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/5.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/6.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/7.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/8.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/9.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/10.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/11.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/12.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/13.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/14.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/15.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/16.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/17.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/18.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/19.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/20.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/21.jpg?w=1200" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/LCM/22.jpg?w=1200" },
    ],
    anniversary: [
      { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200" },
      { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200" },
      { url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=1200" },
      { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200" },
      { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200" },
      { url: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b5?w=1200" },
      { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200" },
      { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200" },
      { url: "https://images.unsplash.com/photo-1541679665730-473be2609e6e?w=1200" },
      { url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200" },
      { url: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=1200" },
      { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200" },
    ],
    "kids-training": [
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/1.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/2.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/3.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/4.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/5.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/6.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/7.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/8.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/9.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/10.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/11.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/12.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/13.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/14.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/15.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/16.JPG" },
      { url: "https://n3elvywvxxnbjwip.public.blob.vercel-storage.com/Gallery/KidsSummerTraining/17.jpg" },
    ],
  }), []);

  // Gallery videos data - Memoized
  const galleryVideos = useMemo<Record<string, Video[]>>(() => ({
    "guinness-events": [
      { id: "video-1", youtubeUrl: "https://www.youtube.com/watch?v=onjJxyACJ0s", title: "Guinness World Records REAL BENEFITS ?", description: "Within just four years of its establishment, Hallel Music School provided free online music education to 7,000 students. On 1st December 2024, he set a world record by having 1,090 students play the keyboard simultaneously online.", date: "18-Jul-2025" },
      { id: "video-2", youtubeUrl: "https://www.youtube.com/live/kj3JWuoFLrg", title: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY - BANGALORE", description: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY - BANGALORE", date: "2-May-2025" },
      { id: "video-3", youtubeUrl: "https://www.youtube.com/live/xCqagJW1Mcc", title: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY VIJAYAWADA - PART 1", description: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY VIJAYAWADA - PART 1", date: "24-Apr-2025" },
      { id: "video-4", youtubeUrl: "https://www.youtube.com/live/318Badxxjt8", title: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY VIJAYAWADA - PART 2", description: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY VIJAYAWADA - PART 2", date: "24-Apr-2025" },
      { id: "video-5", youtubeUrl: "https://www.youtube.com/watch?v=hgUGBJoqMYo", title: "సర్టిఫికెట్ గ్రహీతలు - VIJAYAWADA", description: "సర్టిఫికెట్ గ్రహీతలు - VIJAYAWADA", date: "03-Apr-2025" },
      { id: "video-6", youtubeUrl: "https://www.youtube.com/watch?v=JIloV7bAT0A", title: "Guinness Achievers Meet Hyderabad-2025", description: "Guinness Achievers Meet Hyderabad-2025", date: "27-Jun-2025" },
      { id: "video-7", youtubeUrl: "https://www.youtube.com/live/XWkzdzlWuCc", title: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY HYDERABAD", description: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY HYDERABAD", date: "13-Apr-2025" },
      { id: "video-8", youtubeUrl: "https://www.youtube.com/watch?v=NIxV2msUAeQ", title: "సర్టిఫికెట్ గ్రహీతలు", description: "సర్టిఫికెట్ గ్రహీతలు", date: "14-Jul-2025" },
      { id: "video-9", youtubeUrl: "https://www.youtube.com/live/XWkzdzlWuCc", title: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY HYDERABAD", description: "GUINNESS WORLD RECORD CERTIFICATES DISTRUBUTION CEREMONY HYDERABAD", date: "13-Apr-2025" },
      { id: "video-10", youtubeUrl: "https://www.youtube.com/watch?v=NIxV2msUAeQ", title: "సర్టిఫికెట్ గ్రహీతలు", description: "సర్టిఫికెట్ గ్రహీతలు", date: "14-Jul-2025" },
    ],
    "asian-records": [
      { id: "video-1", youtubeUrl: "https://www.youtube.com/watch?v=q-oB60TT9_Y", title: "HMS Asia Book Records", description: "HMS Asia Book Records", date: "10-Apr-2024" },
    ],
    "ingenious-record": [
      { id: "video-1", youtubeUrl: "https://www.youtube.com/live/qL0FXMxWmAk", title: "INGENIOUS CHARM WORLD RECORD", description: "INGENIOUS CHARM WORLD RECORD", date: "30-May-2024" },
    ],
    "hallel-conferences": [],
    "lcm-events": [
      { id: "video-1", youtubeUrl: "https://www.youtube.com/watch?v=iqU-XS4UJ0k", title: "LCM Music Training Program", description: "An overview of the LCM music training program and student performances.", date: "25-Jul-2023" },
      { id: "video-2", youtubeUrl: "https://www.youtube.com/watch?v=dBvlnyvgOnw", title: "Student Recital Performance", description: "Watch talented students showcase their musical skills at the annual recital.", date: "30-Jul-2023" },
      { id: "video-3", youtubeUrl: "https://www.youtube.com/watch?v=NppED5MvJF4", title: "Music Workshop Sessions", description: "Interactive music workshop sessions with professional instructors.", date: "20-Jul-2023" },
      { id: "video-4", youtubeUrl: "https://www.youtube.com/watch?v=7NOSDKb0HlU", title: "LCM Annual Concert Event", description: "The grand annual concert featuring performances from all LCM students and faculty.", date: "05-Aug-2023" },
    ],
    "international-star-records": [
      { id: "video-1", youtubeUrl: "https://www.youtube.com/watch?v=zAdKtc3uIWs", title: "International Star Book 2023", description: "International Star Book 2023", date: "02-Oct-2023" },
    ],
    anniversary: [
      { id: "video-1", youtubeUrl: "https://www.youtube.com/watch?v=jfKfPfyJRdk", title: "HMS Anniversary Celebration 2023", description: "Celebrating years of excellence in music education at Hallel Music School.", date: "15-Sep-2023" },
      { id: "video-2", youtubeUrl: "https://www.youtube.com/watch?v=n61ULEU7CO0", title: "Alumni Performances and Testimonies", description: "Former students share their success stories and perform at the anniversary event.", date: "16-Sep-2023" },
      { id: "video-3", youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", title: "Anniversary Gala Highlights", description: "The best moments from the anniversary gala dinner and awards ceremony.", date: "15-Sep-2023" },
      { id: "video-4", youtubeUrl: "https://www.youtube.com/watch?v=EErSKhC0CZs", title: "Journey Through the Years", description: "A documentary showcasing the growth and achievements of HMS over the years.", date: "14-Sep-2023" },
    ],
    "kids-training": [],
  }), []);

  // Memoized callbacks
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
    setVisibleCounts((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] + 8,
    }));
  }, [activeTab]);

  const loadMoreVideos = useCallback(() => {
    setVisibleVideoCounts((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] + 8,
    }));
  }, [activeTab]);

  const handleThumbnailError = useCallback((videoId: string) => {
    setThumbnailErrors((prev) => new Set(prev).add(videoId));
  }, []);

  const getThumbnailUrl = useCallback((url: string, videoId: string): string => {
    if (thumbnailErrors.has(videoId)) {
      const extractedId = getVideoIdFromUrl(url);
      return extractedId
        ? `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`
        : "";
    }
    return getYouTubeThumbnail(url);
  }, [thumbnailErrors]);

  const getVideoIdFromUrl = useCallback((url: string): string => {
    if (!url) return "";

    let videoId = "";

    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("shorts/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/live/")) {
      videoId = url.split("live/")[1]?.split("?")[0];
    }

    return videoId;
  }, []);

  // Memoize tab buttons
  const tabButtons = useMemo(
    () =>
      TAB_CONFIG.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors focus:outline-none ${
              isActive
                ? "bg-[#FDB813] text-black shadow-md ring-2 ring-offset-2 ring-[#FDB813]"
                : "bg-[#2E2E2E] text-white hover:bg-[#FDB813] hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB813]"
            }`}
            onClick={() => handleTabChange(tab.key)}
            style={{ cursor: "pointer" }}
            aria-selected={isActive}
            role="tab"
          >
            {t(`tabs.${tab.key}.label`)}
          </button>
        );
      }),
    [activeTab, handleTabChange]
  );

  // Get current tab data with memoization
  const currentTab = useMemo(() => TAB_CONFIG.find((tab) => tab.key === activeTab), [activeTab]);
  const sectionImages = useMemo(() => galleryImages[activeTab] || [], [activeTab, galleryImages]);
  const visibleImages = useMemo(() => sectionImages.slice(0, visibleCounts[activeTab]), [sectionImages, visibleCounts, activeTab]);
  const hasMore = useMemo(() => visibleCounts[activeTab] < sectionImages.length, [visibleCounts, activeTab, sectionImages.length]);

  const videos = useMemo(() => galleryVideos[activeTab] || [], [activeTab, galleryVideos]);
  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => {
      const dateA = parseVideoDate(a.date);
      const dateB = parseVideoDate(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }, [videos]);
  const visibleVideos = useMemo(() => sortedVideos.slice(0, visibleVideoCounts[activeTab]), [sortedVideos, visibleVideoCounts, activeTab]);
  const hasMoreVideos = useMemo(() => visibleVideoCounts[activeTab] < sortedVideos.length, [visibleVideoCounts, activeTab, sortedVideos.length]);

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: primaryBackground }}
    >
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-4 pt-12 md:pt-30 pb-16">
        {/* Tabs */}
        <div className="mb-12 my-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3" role="tablist">
            {tabButtons}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8" role="tabpanel">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              {t(`tabs.${activeTab}.title`)}
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{ backgroundColor: accentGold }}
            ></div>
          </div>

          {/* Images Grid */}
          {sectionImages && sectionImages.length > 0 ? (
            <>
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  350: 2,
                  768: 3,
                  1024: 4,
                }}
              >
                <Masonry gutter="16px">
                  {visibleImages.map((image, index) => (
                    <ImageCard
                      key={`${activeTab}-${index}`}
                      image={image}
                      index={index}
                      title={(currentTab && 'title' in currentTab ? currentTab.title : '') as string}
                      onClick={() => openLightbox(index)}
                      eager={index < 4}
                    />
                  ))}
                </Masonry>
              </ResponsiveMasonry>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={loadMore}
                    className="px-8 py-3 shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: "#FDB813",
                      color: "black",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#DAA520")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FDB813")
                    }
                  >
                    {t('loadMore')}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">{t('noImages')}</p>
            </div>
          )}

          {/* Video Gallery Section */}
          {videos.length > 0 && (
            <div className="mt-12" ref={videoSectionRef}>
              <div className="flex items-center mb-6">
                <div className="flex-grow h-px bg-gray-700"></div>
                <h3 className="text-xl text-white font-medium px-4 flex items-center">
                  <Play size={20} className="text-[#FDB813] mr-2" />
                  {t('videoGallery')}
                </h3>
                <div className="flex-grow h-px bg-gray-700"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onThumbnailError={handleThumbnailError}
                    getThumbnailUrl={getThumbnailUrl}
                  />
                ))}
              </div>

              {/* Load More Videos Button */}
              {hasMoreVideos && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={loadMoreVideos}
                    className="px-8 py-3 shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: "#FDB813",
                      color: "black",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#DAA520")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FDB813")
                    }
                  >
                    {t('loadMoreVideos')}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors cursor-pointer"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          <button
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-colors ${
              currentImageIndex === 0
                ? 'text-gray-600 bg-black/30 cursor-not-allowed opacity-50'
                : 'text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 cursor-pointer'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (currentImageIndex > 0) {
                prevImage();
              }
            }}
            disabled={currentImageIndex === 0}
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Next Button */}
          <button
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-colors ${
              currentImageIndex === sectionImages.length - 1
                ? 'text-gray-600 bg-black/30 cursor-not-allowed opacity-50'
                : 'text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 cursor-pointer'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (currentImageIndex < sectionImages.length - 1) {
                nextImage();
              }
            }}
            disabled={currentImageIndex === sectionImages.length - 1}
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          {/* Image Container */}
          <div
            className="flex items-center justify-center p-4 w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={sectionImages[currentImageIndex]?.url}
              alt={`${(currentTab && 'title' in currentTab ? currentTab.title : 'Image')} ${currentImageIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {sectionImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
