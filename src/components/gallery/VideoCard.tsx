"use client";

import React, { memo } from 'react';
import { Calendar } from 'lucide-react';

interface Video {
  id: string;
  youtubeUrl: string;
  title: string;
  description?: string;
  date?: string;
}

type Props = {
  video: Video;
  onThumbnailError: (id: string) => void;
  getThumbnailUrl: (url: string, id: string) => string;
};

function VideoCard({ video, onThumbnailError, getThumbnailUrl }: Props) {
  function formatDate(dateStr?: string) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }
  return (
    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-xl bg-[#2E2E2E] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] no-underline flex flex-col border-2 border-transparent hover:border-[#FDB813]">
      <div className="aspect-video w-full overflow-hidden bg-gray-900 relative rounded-t-xl">
        <img src={getThumbnailUrl(video.youtubeUrl, video.id)} alt={video.title} className="w-full h-full object-cover" loading="lazy" style={{ display: 'block' }} onError={() => onThumbnailError(video.id)} />
      </div>
      <div className="flex flex-col flex-grow bg-[#2E2E2E] rounded-b-xl">
        <div className="p-4 pb-2 flex-grow">
          <h3 className="text-white text-sm line-clamp-2 leading-snug font-bold">{video.title}</h3>
        </div>
        <div className="px-4 pb-4 pt-2 mt-auto">
          <div className="flex items-center text-white text-xs">
            <Calendar size={14} className="mr-1.5 flex-shrink-0" />
            <span>{formatDate(video.date)}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default memo(VideoCard);
