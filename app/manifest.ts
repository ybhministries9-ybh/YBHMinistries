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
        // Prefer static favicon files in `public/` so browsers and crawlers pick them up reliably
        src: '/favicon.ico',
        sizes: '64x64 32x32 16x16',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    categories: ['education', 'lifestyle', 'music'],
    orientation: 'portrait-primary',
    lang: 'en',
  };
}
