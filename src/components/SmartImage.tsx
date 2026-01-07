"use client";

import { useState, useEffect } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // List of sources to try in order. Provide local paths first, then R2 fallbacks.
  srcs: string[];
}

export default function SmartImage({ srcs, alt, className, ...rest }: SmartImageProps) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const src = srcs && srcs.length > 0 ? srcs[index] : undefined;

  useEffect(() => {
    // reset when srcs prop changes
    setIndex(0);
    setFailed([]);
  }, [srcs]);

  const handleError = () => {
    if (!srcs) return;
    setFailed((f) => [...f, src || '']);
    if (index < srcs.length - 1) {
      setIndex(index + 1);
    }
  };

  // If we've exhausted all sources, render a lightweight SVG placeholder instead of broken image
  if (!srcs || index >= srcs.length) {
    if (process.env.NODE_ENV !== 'production') console.warn('SmartImage: all sources failed for', srcs, 'failed:', failed);
    return (
      <svg
        className={className}
        role="img"
        aria-label={alt || 'image'}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width="48" height="48" rx="4" fill="#1f1f1f" />
        <path d="M10 34 L18 22 L26 30 L36 16 L38 18 L26 34 Z" fill="#374151" />
      </svg>
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={handleError} {...rest} />;
}
