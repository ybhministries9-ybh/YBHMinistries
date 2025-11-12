import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { OrganizationStructuredData, WebsiteStructuredData } from '@/components/seo/StructuredData';
import '../src/index.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://ybhministries.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Yeshua Beth Hallel Ministries - Empowering Worship & Faith',
    template: '%s | YBH Ministries',
  },
  description: 'Yeshua Beth Hallel Ministries: Transforming lives through worship, faith, and ministry. Offering Bible college, music school, church services, and conferences in Telugu and English.',
  keywords: [
    'YBH Ministries',
    'Yeshua Beth Hallel',
    'Telugu ministry',
    'worship ministry',
    'music school',
    'bible college',
    'Hallel Bible College',
    'Hallel Music School',
    'Christian worship',
    'Telugu church',
    'faith-based education',
    'worship conferences',
  ],
  authors: [{ name: 'YBH Ministries', url: siteUrl }],
  creator: 'YBH Ministries',
  publisher: 'YBH Ministries',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Yeshua Beth Hallel Ministries',
    title: 'Yeshua Beth Hallel Ministries - Empowering Worship & Faith',
    description: 'Transforming lives through worship, faith, and ministry. Offering Bible college, music school, church services, and conferences.',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Yeshua Beth Hallel Ministries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yeshua Beth Hallel Ministries - Empowering Worship & Faith',
    description: 'Transforming lives through worship, faith, and ministry. Offering Bible college, music school, church services, and conferences.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@ybhministries', // Update with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '9MImmSaa8jkjB2oGgYwEZmAWGp60B5ruEL51rnAQbi8',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
      'te-IN': siteUrl, // Telugu language support
    },
  },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1e40af" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="YBH Ministries" />
        <OrganizationStructuredData />
        <WebsiteStructuredData />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
