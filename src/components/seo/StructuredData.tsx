import React from 'react';

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  alternateName?: string;
  url: string;
  logo?: string;
  description: string;
  address?: {
    '@type': string;
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    '@type': string;
    telephone?: string;
    contactType: string;
    email?: string;
  }[];
  sameAs?: string[];
}

export function OrganizationStructuredData() {
  const organizationSchema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Yeshua Beth Hallel Ministries',
    alternateName: 'YBH Ministries',
    url: 'https://ybhministries.org',
    logo: 'https://ybhministries.org/logo.png',
    description: 'Yeshua Beth Hallel Ministries empowers worship and transforms lives through faith, music, and ministry, offering Bible college, music school, church services, and conferences.',
    // Update with actual address
    // address: {
    //   '@type': 'PostalAddress',
    //   streetAddress: 'Your Street Address',
    //   addressLocality: 'Your City',
    //   addressRegion: 'Your State',
    //   postalCode: 'Your Postal Code',
    //   addressCountry: 'IN',
    // },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'General Inquiries',
        // telephone: '+91-XXX-XXX-XXXX',
        // email: 'info@ybhministries.org',
      },
    ],
    // Add social media links
    // sameAs: [
    //   'https://www.facebook.com/ybhministries',
    //   'https://www.youtube.com/c/ybhministries',
    //   'https://www.instagram.com/ybhministries',
    //   'https://twitter.com/ybhministries',
    // ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

interface WebsiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export function WebsiteStructuredData() {
  const websiteSchema: WebsiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yeshua Beth Hallel Ministries',
    url: 'https://ybhministries.org',
    description: 'Empowering worship and transforming lives through faith, music, and ministry.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ybhministries.org/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: {
    '@type': string;
    position: number;
    name: string;
    item?: string;
  }[];
}

interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema: BreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

interface EducationalOrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  parentOrganization: {
    '@type': string;
    name: string;
  };
}

export function EducationalOrganizationStructuredData({
  name,
  url,
  description,
}: {
  name: string;
  url: string;
  description: string;
}) {
  const educationalSchema: EducationalOrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name,
    url,
    description,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Yeshua Beth Hallel Ministries',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
    />
  );
}
