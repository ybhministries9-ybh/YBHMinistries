import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yeshua Beth Hallel Ministries',
    short_name: 'YBH Ministries',
    description: 'Empowering worship and transforming lives through faith, music, and ministry.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        // Use the Next.js OG image routes (server-generated) instead of a missing static png
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      // Removed explicit references to `/icon-192` to avoid 404s; use `/icon` and `/icon-512` instead.
      // Removed `/icon-512` to avoid 404s from missing route; keep `/icon` (32x32) for favicons.
    ],
    categories: ['education', 'lifestyle', 'music'],
    orientation: 'portrait-primary',
    lang: 'en',
  };
}
