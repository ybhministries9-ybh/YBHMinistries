import type { Metadata } from 'next';
import Script from 'next/script';
import { Toaster } from 'sonner';
import { OrganizationStructuredData, WebsiteStructuredData } from '@/components/seo/StructuredData';
import '../src/index.css';
import './globals.css';
import { sql } from '@vercel/postgres';
import fs from 'fs/promises';

// Load Inter via Google Fonts link to avoid runtime internal Turbopack font imports

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
        url: `${siteUrl}/logo/ybh.png`,
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
    images: [`${siteUrl}/logo/ybh.png`],
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

async function readFlagFromFile() {
  try {
    const raw = await fs.readFile(process.cwd() + '/data/maintenance.json', 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { enabled: false };
  }
}

async function isMaintenanceEnabled(): Promise<boolean> {
  try {
    const r = await sql`SELECT bool_value FROM site_settings WHERE key = 'maintenance' LIMIT 1`;
    if (r && r.rows && r.rows.length) {
      const v = r.rows[0].bool_value;
      return v === true || v === 't' || v === 'true' || v === 1 || v === '1';
    }
  } catch (e) {
    // ignore and fall back to file
  }
  const file = await readFlagFromFile();
  const fv = file && file.enabled;
  return fv === true || fv === 't' || fv === 'true' || fv === 1 || fv === '1';
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Server component: check maintenance flag at request time
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
              <Script
                // Load reCAPTCHA v2 explicit render so we can call grecaptcha.render on specific containers
                src={`https://www.google.com/recaptcha/api.js?render=explicit`}
                strategy="afterInteractive"
              />
            ) : null}
            <meta name="theme-color" content="#1e40af" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="YBH Ministries" />
            <OrganizationStructuredData />
            <WebsiteStructuredData />
            {/* Load Inter from Google Fonts to avoid next/font turbopack internal loader issues */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
            {/* Favicon / web app manifest - prefer static files in public/ */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.webmanifest" />
            {/* og-image.jpg was not present in public/; remove preload to avoid 404 and preload warning */}
          </head>
          <body suppressHydrationWarning>
        {/* Render children; maintenance routing is handled by middleware */}
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
