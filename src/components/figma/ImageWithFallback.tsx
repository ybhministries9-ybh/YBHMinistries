"use client";

import { useState, useEffect, memo } from 'react';
// Use native <img> here to avoid `fill`-related next/image warnings when the
// parent element does not have an explicit height. We generate a responsive
// `srcSet` where possible for Vercel Blob URLs.
import { ImageOff, User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  enableResponsive?: boolean;
  // New: choose a person-icon fallback instead of the image placeholder
  fallbackVariant?: 'image' | 'person';
}

function _ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  className = '',
  loading = 'lazy',
  enableResponsive = true,
  fallbackVariant = 'image',
  ...props
}: ImageWithFallbackProps) {
  // If caller requests a person fallback and no src is provided, avoid loading
  // the default image placeholder and render the person icon instead.
  const [imgSrc, setImgSrc] = useState(
    src ?? (fallbackVariant === 'person' ? '' : fallbackSrc)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const newSrc = src ?? (fallbackVariant === 'person' ? '' : fallbackSrc);
    setImgSrc(newSrc);
    // Only show loading skeleton when there's an image to load
    setIsLoading(!!newSrc);
    setHasError(false);
  }, [src, fallbackSrc, fallbackVariant]);

  const handleError = () => {
    if (fallbackVariant === 'person') {
      // For person fallback, treat any error as a signal to show the person icon
      setImgSrc('');
      setHasError(true);
    } else {
      if (imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
        setHasError(false);
      } else {
        setHasError(true);
      }
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Generate responsive image sizes for Vercel Blob Storage URLs
  const getResponsiveSizes = (imageUrl: string) => {
    // Check if it's a Vercel Blob Storage URL
    if (!imageUrl.includes('vercel-storage.com')) {
      return null;
    }

    // Vercel Blob Storage supports image transformations via URL parameters
    // Format: ?width=XXX&height=XXX&quality=XX
    const baseUrl = imageUrl.split('?')[0];
    
    return {
      small: `${baseUrl}?width=400&quality=85`,
      medium: `${baseUrl}?width=800&quality=90`,
      large: `${baseUrl}?width=1600&quality=90`,
      original: imageUrl
    };
  };

  const responsiveSizes = enableResponsive && imgSrc ? getResponsiveSizes(imgSrc) : null;

  // If an error occurred or there's no image and the caller requested the
  // person fallback, render the appropriate fallback UI instead of an <img>.
  if (hasError || (!imgSrc && fallbackVariant === 'person')) {
    if (fallbackVariant === 'person') {
      return (
        <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
          <div className="text-center p-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
              <User className="text-gray-500" size={20} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center p-4">
          <ImageOff className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-xs text-gray-500">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading skeleton */}
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
      )}

      {/* Actual image - only render when we have a non-empty src */}
      {imgSrc ? (
        <div className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <img
            src={responsiveSizes ? responsiveSizes.medium : imgSrc}
            srcSet={responsiveSizes ? `${responsiveSizes.small} 400w, ${responsiveSizes.medium} 800w, ${responsiveSizes.large} 1600w` : undefined}
            sizes={responsiveSizes ? '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1600px' : undefined}
            alt={alt}
            className={`object-cover w-full h-full ${className}`}
            onError={handleError}
            onLoad={handleLoad}
            loading={loading}
            decoding="async"
          />
        </div>
      ) : null}
    </div>
  );
}

// Memoize and export as the public `ImageWithFallback` named export
export const ImageWithFallback = memo(_ImageWithFallback);
// Also export the original function for tests or special cases
export { _ImageWithFallback as UnmemoizedImageWithFallback };
