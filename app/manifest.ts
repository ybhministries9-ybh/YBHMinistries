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
      {
        // Apple touch icon: point to the 192 route which renders a larger icon
        src: '/icon-192',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon-192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['education', 'lifestyle', 'music'],
    orientation: 'portrait-primary',
    lang: 'en',
  };
}
