'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  enabled: boolean;
  videoUrl: string | null;
};

export default function FlashNewsOverlay({ enabled, videoUrl }: Props) {
  const [isClosed, setIsClosed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isOpen = enabled && Boolean(videoUrl) && !isClosed;

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // Keep the hero section visible behind the overlay
    window.scrollTo(0, 0);

    // Prevent background scrolling while the overlay is open
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      // Always return to the top (hero section) after closing
      window.scrollTo(0, 0);
    };
  }, [isOpen]);

  // Autoplay on open (fallback to muted autoplay if the browser blocks sound).
  useEffect(() => {
    if (!isOpen || !videoUrl) return;

    const el = videoRef.current;
    if (!el) return;

    let cancelled = false;

    const tryPlay = async (muted: boolean) => {
      if (cancelled) return false;
      try {
        el.muted = muted;
        await el.play();
        return !el.paused;
      } catch {
        return false;
      }
    };

    void (async () => {
      // First attempt: normal playback.
      const ok = await tryPlay(false);
      if (ok) return;
      // Fallback: autoplay may require muted.
      await tryPlay(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, videoUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-3xl flex flex-col items-center gap-4">
        <div
          className="flash-news-player relative w-[min(92vw,520px)] md:w-[520px] aspect-[16/9] max-h-[45vh] bg-black rounded-md overflow-hidden border shadow-2xl mx-auto"
          style={{ borderColor: '#FDB813', borderWidth: 1 }}
        >
          <button
            type="button"
            onClick={() => setIsClosed(true)}
            className="absolute top-2 right-2 z-20 rounded-full bg-black/70 text-white p-3 hover:bg-black/80 shadow-lg ring-1 ring-white/30"
            aria-label="Close Flash News"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-full h-full flex items-center justify-center bg-black">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={videoRef}
              className="w-full h-full object-contain bg-black"
              controls
              playsInline
              autoPlay
              controlsList="nodownload"
              preload="auto"
              onContextMenu={(e) => e.preventDefault()}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
