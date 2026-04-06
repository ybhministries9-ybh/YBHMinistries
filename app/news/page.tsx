import { Metadata } from 'next';
import { NewsPage } from '@/components/newsroom/NewsPage';
import { ClientLayout } from '../ClientLayout';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';
import { sql } from '@vercel/postgres';
import { getPresignedGetUrl, getPublicUrl, parseKeyFromUrl } from '@/lib/r2';

const siteUrl = 'https://ybhministries.org';
const defaultShareImage = `${siteUrl}/logo/ybh.png`;
const defaultTitle = 'News & Updates - YBH Ministries';
const defaultDescription = 'Stay updated with the latest news, events, and enrollment reports from Yeshua Beth Hallel Ministries. Explore upcoming conferences, music classes, and ministry activities.';

type NewsSearchParams = {
  section?: string | string[];
  eventId?: string | string[];
};

function getParamValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function trimText(value?: string | null, maxLength = 180) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return defaultDescription;
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}...`;
}

async function resolveShareImage(raw?: string | null) {
  if (!raw) return defaultShareImage;
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
  if (raw.startsWith('/')) return `${siteUrl}${raw}`;

  const parsed = parseKeyFromUrl(raw);
  if (!parsed?.key) return defaultShareImage;

  try {
    return await getPresignedGetUrl(parsed.key, 3600, parsed.bucket || undefined);
  } catch (error) {
    try {
      const fallback = getPublicUrl(parsed.key, parsed.bucket || undefined);
      if (fallback && !fallback.startsWith('r2://')) return fallback;
    } catch (fallbackError) {
      // Ignore fallback failures and use the default share image.
    }
  }

  return defaultShareImage;
}

async function getEventMetadata(eventId: number) {
  const result = await sql`
    SELECT
      id,
      title,
      description,
      extended_description as "extendedDescription",
      image_url as "imageUrl"
    FROM events
    WHERE id = ${eventId}
      AND published = true
    LIMIT 1
  `;

  return result.rows[0] || null;
}

function buildNewsMetadata(overrides?: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}): Metadata {
  const title = overrides?.title || defaultTitle;
  const description = overrides?.description || defaultDescription;
  const url = overrides?.url || `${siteUrl}/news`;
  const image = overrides?.image || defaultShareImage;

  return {
    title,
    description,
    keywords: ['YBH news', 'ministry events', 'music school enrollment', 'Hallel conferences', 'church updates', 'Hyderabad ministry'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      images: [
        {
          url: image,
          alt: 'YBH Ministries',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export async function generateMetadata(
  { searchParams }: { searchParams?: Promise<NewsSearchParams> | NewsSearchParams }
): Promise<Metadata> {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const section = getParamValue(resolvedSearchParams.section);
  const eventIdParam = getParamValue(resolvedSearchParams.eventId);

  if (section === 'upcoming-events' && eventIdParam && /^\d+$/.test(eventIdParam)) {
    try {
      const eventId = Number(eventIdParam);
      const event = await getEventMetadata(eventId);

      if (event) {
        const title = `${event.title} - YBH Ministries`;
        const description = trimText(event.description || event.extendedDescription);
        const url = `${siteUrl}/news?section=upcoming-events&eventId=${eventId}`;
        const image = await resolveShareImage(event.imageUrl);

        return buildNewsMetadata({ title, description, url, image });
      }
    } catch (error) {
      console.error('Failed to generate event metadata for /news:', error);
    }
  }

  return buildNewsMetadata();
}

export default async function News() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return (
    <ClientLayout>
      <NewsPage />
    </ClientLayout>
  );
}
