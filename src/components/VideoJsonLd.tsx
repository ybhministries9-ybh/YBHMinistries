"use client";

import { useEffect } from "react";

function extractYouTubeId(url: string) {
  if (!url) return null;
  try {
    if (url.includes("youtube.com/watch?v=")) return url.split("v=")[1]?.split("&")[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1]?.split("?")[0];
    if (url.includes("youtube.com/shorts/")) return url.split("shorts/")[1]?.split("?")[0];
    if (url.includes("youtube.com/embed/")) return url.split("embed/")[1]?.split("?")[0];
  } catch (e) {
    return null;
  }
  return null;
}

function toISODate(dateStr?: string) {
  if (!dateStr) return undefined;
  // If already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
  return undefined;
}

export default function VideoJsonLd({ videos }: { videos: Array<{ id: string; youtubeUrl: string; title: string; description?: string; date?: string }> }) {
  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const itemList = videos.map((v, idx) => {
      const vid = extractYouTubeId(v.youtubeUrl) || null;
      const thumbnail = vid ? `https://img.youtube.com/vi/${vid}/sddefault.jpg` : undefined;
      const uploadDate = toISODate(v.date);
      return {
        '@type': 'ListItem',
        position: idx + 1,
        url: v.youtubeUrl,
        item: {
          '@type': 'VideoObject',
          name: v.title || undefined,
          description: v.description || undefined,
          thumbnailUrl: thumbnail || undefined,
          uploadDate: uploadDate || undefined,
          contentUrl: v.youtubeUrl,
        }
      };
    });

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Video Gallery',
      itemListElement: itemList,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [videos]);

  return null;
}
