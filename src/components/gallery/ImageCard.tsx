"use client";

import React, { memo } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface GalleryImage {
  id?: number | string;
  url: string;
  thumbnail_url?: string | null;
  medium_url?: string | null;
}

type Props = {
  image: GalleryImage;
  index: number;
  title: string;
  onClick: () => void;
  eager?: boolean;
};

function ImageCard({ image, index, title, onClick, eager = false }: Props) {
  // First 4 images get priority loading for fastest LCP
  const isPriority = eager && index < 4;
  
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={onClick}>
      <ImageWithFallback
        src={image.thumbnail_url || image.medium_url || image.url}
        alt={`${title} ${index + 1}`}
        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
        loading={eager ? 'eager' : 'lazy'}
        enableResponsive={false}
        priority={isPriority}
      />
    </div>
  );
}

export default memo(ImageCard);
