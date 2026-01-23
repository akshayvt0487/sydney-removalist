import { Metadata } from 'next';

// Company Information
export const COMPANY_INFO = {
  name: 'Sydney Removalist Pro',
  legalName: 'Sydney Removalist Pro Pty Ltd',
  url: 'https://sydneyremovalistpro.com.au',
  logo: 'https://sydneyremovalistpro.com.au/logo.png',
  description: 'Professional removalist services in Sydney. Trusted moving company with 15+ years experience, serving all Sydney suburbs and interstate moves.',
  phone: '+61 2 1234 5678',
  email: 'info@sydneyremovalistpro.com.au',
  address: {
    streetAddress: '123 Main Street',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU'
  },
  geo: {
    latitude: -33.8688,
    longitude: 151.2093
  },
  foundingDate: '2008',
  priceRange: '$$',
  areaServed: 'Greater Sydney Area, NSW, Australia',
  serviceArea: {
    type: 'GeoCircle',
    name: 'Greater Sydney',
    geoMidpoint: {
      latitude: -33.8688,
      longitude: 151.2093
    },
    geoRadius: 100000 // 100km radius
  }
};

// Author/Publisher Information
export const AUTHOR_INFO = {
  '@type': 'Organization',
  name: COMPANY_INFO.name,
  url: COMPANY_INFO.url,
  logo: {
    '@type': 'ImageObject',
    url: COMPANY_INFO.logo
  }
};

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    '@id': `${COMPANY_INFO.url}/#organization`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: COMPANY_INFO.url,
    logo: {
      '@type': 'ImageObject',
      url: COMPANY_INFO.logo,
      width: '600',
      height: '60'
    },
    image: COMPANY_INFO.logo,
    description: COMPANY_INFO.description,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    foundingDate: COMPANY_INFO.foundingDate,
    priceRange: COMPANY_INFO.priceRange,
    address: {
      '@type': 'PostalAddress',
      ...COMPANY_INFO.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...COMPANY_INFO.geo
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Sydney',
        '@id': 'https://www.wikidata.org/wiki/Q3130'
      },
      {
        '@type': 'State',
        name: 'New South Wales',
        '@id': 'https://www.wikidata.org/wiki/Q3224'
      }
    ],
    serviceArea: COMPANY_INFO.serviceArea,
    sameAs: [
      'https://www.facebook.com/sydneyremovalist',
      'https://www.instagram.com/sydneyremovalist',
      'https://www.linkedin.com/company/sydney-removalist-pro'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Removalist Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Residential Moving',
            description: 'Professional home removal services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial Moving',
            description: 'Office and business relocation services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Interstate Moving',
            description: 'Long-distance moving across Australia'
          }
        }
      ]
    }
  };
}

/**
 * Generate Website Schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${COMPANY_INFO.url}/#website`,
    url: COMPANY_INFO.url,
    name: COMPANY_INFO.name,
    description: COMPANY_INFO.description,
    publisher: {
      '@id': `${COMPANY_INFO.url}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${COMPANY_INFO.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate Service Schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${COMPANY_INFO.url}/#organization`
    },
    url: service.url,
    image: service.image || COMPANY_INFO.logo,
    areaServed: service.areaServed || COMPANY_INFO.areaServed,
    serviceType: 'Moving and Relocation',
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'AUD'
      }
    })
  };
}

/**
 * Generate Local Business Schema
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${COMPANY_INFO.url}/#localbusiness`,
    name: COMPANY_INFO.name,
    image: COMPANY_INFO.logo,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      ...COMPANY_INFO.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...COMPANY_INFO.geo
    },
    url: COMPANY_INFO.url,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '15:00'
      }
    ],
    priceRange: COMPANY_INFO.priceRange,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500'
    }
  };
}

/**
 * Generate Article Schema (for blog posts)
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: article.author ? {
      '@type': 'Person',
      name: article.author
    } : AUTHOR_INFO,
    publisher: AUTHOR_INFO,
    url: article.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    ...(article.keywords && {
      keywords: article.keywords.join(', ')
    })
  };
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate enhanced metadata with all SEO tags
 */
export function generateEnhancedMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}): Metadata {
  const baseUrl = COMPANY_INFO.url;
  const fullTitle = title.includes('|') ? title : `${title} | ${COMPANY_INFO.name}`;
  const fullUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const imageUrl = ogImage || `${baseUrl}/og-default.jpg`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    authors: author ? [{ name: author }] : [{ name: COMPANY_INFO.name }],
    creator: COMPANY_INFO.name,
    publisher: COMPANY_INFO.name,
    ...(canonical && {
      alternates: {
        canonical: canonical
      }
    }),
    ...(noindex && {
      robots: {
        index: false,
        follow: false
      }
    }),
    openGraph: {
      type: ogType,
      url: fullUrl,
      title: fullTitle,
      description,
      siteName: COMPANY_INFO.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_AU',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && ogType === 'article' && { section }),
      ...(tags && ogType === 'article' && { tags })
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@sydneyremovalist'
    },
    other: {
      'geo.region': 'AU-NSW',
      'geo.placename': 'Sydney',
      'geo.position': `${COMPANY_INFO.geo.latitude};${COMPANY_INFO.geo.longitude}`
    }
  };

  return metadata;
}

/**
 * Convert schema to JSON string for rendering
 */
export function schemaToJson(schema: object | object[]): string {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  return JSON.stringify(schemaArray, null, 0);
}
