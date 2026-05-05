import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SEO: Disable trailing slashes and don't add them
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  
  // Headers for better crawlability and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
        ],
      },
      // Cache Next.js static assets for 1 year (immutable)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Cache static images
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400'
          }
        ]
      },
      // Cache OG images for 1 week
      {
        source: '/og-:slug.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400'
          }
        ]
      },
      // Cache logo and favicon
      {
        source: '/:file(logo|favicon).(png|ico|jpg|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      }
    ];
  },

  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'recharts',
      'lucide-react',
      'date-fns'
    ],
  },
};

export default nextConfig;
