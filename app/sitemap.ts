import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { regionCategories, interstateDestinations } from '@/data/suburbs';
import { blogPosts } from '@/data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sydneyremovalist.com.au';

  // Use a stable date for content pages (not new Date() which changes every build)
  // This tells Google these pages are stable and don't need constant re-crawling
  const stableDate = new Date('2024-01-15').toISOString();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: stableDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: stableDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: stableDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: stableDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/interstate`,
      lastModified: stableDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: stableDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: stableDate,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: stableDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Service pages - High priority for conversion
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: stableDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Location pages (suburbs) - High priority for local SEO
  // Priority varies: major suburbs get 0.8, others get 0.7
  const locationPages = regionCategories.flatMap((region) =>
    region.suburbs.map((suburb) => {
      // Major suburbs that should be prioritized
      const majorSuburbs = ['bondi', 'manly', 'parramatta', 'chatswood', 'north-sydney', 'rosebery', 'marrickville'];
      const isMajor = majorSuburbs.includes(suburb.slug);

      return {
        url: `${baseUrl}/${region.slug}/${suburb.slug}`,
        lastModified: stableDate,
        changeFrequency: 'monthly' as const,
        priority: isMajor ? 0.8 : 0.65,
      };
    })
  );

  // Interstate pages - High priority
  const interstatePages = interstateDestinations.map((destination) => ({
    url: `${baseUrl}/interstate/${destination.slug}`,
    lastModified: stableDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // Blog pages - Keep actual publish dates
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...interstatePages,
    ...blogPages,
  ];
}
