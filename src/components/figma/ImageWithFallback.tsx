import { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  enableResponsive?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  className = '',
  loading = 'lazy',
  enableResponsive = true,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setIsLoading(true);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Generate responsive image sizes for Supabase Storage URLs
  const getResponsiveSizes = (imageUrl: string) => {
    // Check if it's a Supabase Storage URL
    if (!imageUrl.includes('supabase.co/storage')) {
      return null;
    }

    // Supabase Storage supports image transformations via URL parameters
    // Format: ?width=XXX&height=XXX&resize=contain&quality=XX
    const baseUrl = imageUrl.split('?')[0];
    
    return {
      small: `${baseUrl}?width=400&quality=85`,
      medium: `${baseUrl}?width=800&quality=90`,
      large: `${baseUrl}?width=1600&quality=90`,
      original: imageUrl
    };
  };

  const responsiveSizes = enableResponsive && imgSrc ? getResponsiveSizes(imgSrc) : null;

  // If error and no fallback worked, show error state
  if (hasError) {
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
      
      {/* Actual image */}
      <img
        {...props}
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading={loading}
        // Add responsive srcset if available
        {...(responsiveSizes && {
          srcSet: `
            ${responsiveSizes.small} 400w,
            ${responsiveSizes.medium} 800w,
            ${responsiveSizes.large} 1600w
          `,
          sizes: '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1600px'
        })}
        // Enable browser-level image decoding optimization
        decoding="async"
      />
    </div>
  );
}
