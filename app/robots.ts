import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.sydneyremovalist.com.au';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/admin',
          '/auth',
          '/api/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard', '/admin', '/auth', '/api/'],
        // Hint to Google: crawl important pages more frequently
        crawlDelay: 0,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-html`, // Add HTML sitemap for discoverability
    ],
    host: baseUrl,
  };
}
