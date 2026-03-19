import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Sydney Removalist',
  description: 'The page you are looking for could not be found. Browse our services and locations.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  // Featured suburbs for quick navigation
  const popularSuburbs = [
    { name: 'Bondi', href: '/eastern-suburbs/bondi' },
    { name: 'Parramatta', href: '/western-sydney/parramatta' },
    { name: 'Manly', href: '/northern-beaches/manly' },
    { name: 'Chatswood', href: '/north-shore/chatswood' },
  ];

  // Quick service links
  const services = [
    { name: 'Residential Moving', href: '/services/residential-moving' },
    { name: 'Office Relocation', href: '/services/office-relocation' },
    { name: 'Packing Services', href: '/services/packing-services' },
    { name: 'Interstate Moves', href: '/services/interstate-moves' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Icon */}
        <div className="mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-primary/10 rounded-full">
            <svg
              className="w-16 h-16 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Oops! The page you're looking for seems to have moved. Don't worry, we'll help you find what you need.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Us
          </Link>
        </div>

        {/* Popular Suburbs */}
        <div className="bg-background rounded-xl p-8 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Popular Service Areas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularSuburbs.map((suburb) => (
              <Link
                key={suburb.href}
                href={suburb.href}
                className="p-4 bg-muted rounded-lg hover:bg-primary/10 hover:border-primary border border-transparent transition-all text-center group"
              >
                <div className="text-2xl mb-2">📍</div>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {suburb.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Service Links */}
        <div className="bg-background rounded-xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Our Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="p-4 bg-muted rounded-lg hover:bg-primary/10 hover:border-primary border border-transparent transition-all text-left group flex items-center justify-between"
              >
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.name}
                </span>
                <svg
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/locations"
              className="text-primary hover:underline font-medium"
            >
              View All Locations
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/services"
              className="text-primary hover:underline font-medium"
            >
              All Services
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/blog"
              className="text-primary hover:underline font-medium"
            >
              Blog
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/sitemap-html"
              className="text-primary hover:underline font-medium"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
