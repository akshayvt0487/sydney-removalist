// SEO Configuration and Metadata Generation

export const SEO_CONFIG = {
  siteName: "Sydney Removalist",
  baseUrl: "https://sydneyremovalist.com.au",
  twitterHandle: "@sydneyremovalist",
  defaultOgImage: "/og-default.jpg",
  defaultAuthor: "Sydney Removalist"
};

export interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    type?: "website" | "article";
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    images?: string[];
    site?: string;
  };
  canonicalUrl?: string;
  noIndex?: boolean;
}

export function createMetadata(options: MetadataOptions) {
  const {
    title,
    description,
    path,
    keywords = [],
    openGraph,
    twitter,
    canonicalUrl,
    noIndex = false
  } = options;

  const fullTitle = `${title} | ${SEO_CONFIG.siteName}`;
  const fullUrl = `${SEO_CONFIG.baseUrl}${path}`;

  return {
    title: fullTitle,
    description,
    keywords,
    canonicalUrl: canonicalUrl || fullUrl,
    noIndex,
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: openGraph?.url || fullUrl,
      siteName: openGraph?.siteName || SEO_CONFIG.siteName,
      type: openGraph?.type || "website",
      images: openGraph?.images || [{
        url: `${SEO_CONFIG.baseUrl}${SEO_CONFIG.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: title
      }],
      publishedTime: openGraph?.publishedTime,
      modifiedTime: openGraph?.modifiedTime,
      authors: openGraph?.authors || [SEO_CONFIG.defaultAuthor]
    },
    twitter: {
      card: twitter?.card || "summary_large_image",
      title: twitter?.title || title,
      description: twitter?.description || description,
      images: twitter?.images || [`${SEO_CONFIG.baseUrl}${SEO_CONFIG.defaultOgImage}`],
      site: twitter?.site || SEO_CONFIG.twitterHandle
    }
  };
}

export function applyMetadata(metadata: ReturnType<typeof createMetadata>) {
  // Set document title
  document.title = metadata.title;

  // Helper to set or create meta tag
  const setMetaTag = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, name);
      document.head.appendChild(element);
    }
    element.content = content;
  };

  // Basic meta tags
  setMetaTag('description', metadata.description);
  if (metadata.keywords.length > 0) {
    setMetaTag('keywords', metadata.keywords.join(', '));
  }

  // Robots meta tag
  if (metadata.noIndex) {
    setMetaTag('robots', 'noindex, nofollow');
  }

  // Canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = metadata.canonicalUrl;

  // OpenGraph meta tags
  setMetaTag('og:title', metadata.openGraph.title, true);
  setMetaTag('og:description', metadata.openGraph.description, true);
  setMetaTag('og:url', metadata.openGraph.url, true);
  setMetaTag('og:site_name', metadata.openGraph.siteName, true);
  setMetaTag('og:type', metadata.openGraph.type, true);
  
  if (metadata.openGraph.images && metadata.openGraph.images[0]) {
    const img = metadata.openGraph.images[0];
    setMetaTag('og:image', img.url, true);
    if (img.width) setMetaTag('og:image:width', img.width.toString(), true);
    if (img.height) setMetaTag('og:image:height', img.height.toString(), true);
    if (img.alt) setMetaTag('og:image:alt', img.alt, true);
  }

  if (metadata.openGraph.publishedTime) {
    setMetaTag('article:published_time', metadata.openGraph.publishedTime, true);
  }
  if (metadata.openGraph.modifiedTime) {
    setMetaTag('article:modified_time', metadata.openGraph.modifiedTime, true);
  }

  // Twitter meta tags
  setMetaTag('twitter:card', metadata.twitter.card);
  setMetaTag('twitter:title', metadata.twitter.title);
  setMetaTag('twitter:description', metadata.twitter.description);
  if (metadata.twitter.images && metadata.twitter.images[0]) {
    setMetaTag('twitter:image', metadata.twitter.images[0]);
  }
  if (metadata.twitter.site) {
    setMetaTag('twitter:site', metadata.twitter.site);
  }
}

// Hook for React components
export function useMetadata(options: MetadataOptions) {
  const metadata = createMetadata(options);
  
  // Apply metadata on mount and when options change
  if (typeof window !== 'undefined') {
    applyMetadata(metadata);
  }
  
  return metadata;
}
