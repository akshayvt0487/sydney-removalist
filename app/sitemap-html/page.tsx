import { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';
import { regionCategories, interstateDestinations } from '@/data/suburbs';
import { blogPosts } from '@/data/blogs';

export const metadata: Metadata = {
  title: 'Sitemap | Sydney Removalist',
  description: 'Complete sitemap of all Sydney Removalist pages including services, locations, blog posts, and more.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function HTMLSitemap() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-foreground">Sitemap</h1>
          <p className="text-muted-foreground mb-12">
            Complete directory of all pages on Sydney Removalist website.
          </p>

          {/* Main Pages */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground border-b pb-2">Main Pages</h2>
            <ul className="grid md:grid-cols-2 gap-2">
              <li><Link href="/" className="text-primary hover:underline">Home</Link></li>
              <li><Link href="/about" className="text-primary hover:underline">About Us</Link></li>
              <li><Link href="/services" className="text-primary hover:underline">Services</Link></li>
              <li><Link href="/locations" className="text-primary hover:underline">Locations</Link></li>
              <li><Link href="/interstate" className="text-primary hover:underline">Interstate Moving</Link></li>
              <li><Link href="/pricing" className="text-primary hover:underline">Pricing</Link></li>
              <li><Link href="/contact" className="text-primary hover:underline">Contact</Link></li>
              <li><Link href="/blog" className="text-primary hover:underline">Blog</Link></li>
            </ul>
          </section>

          {/* Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground border-b pb-2">
              Our Services ({services.length})
            </h2>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-primary hover:underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Interstate Destinations */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground border-b pb-2">
              Interstate Removals ({interstateDestinations.length})
            </h2>
            <ul className="grid md:grid-cols-2 gap-2">
              {interstateDestinations.map((destination) => (
                <li key={destination.slug}>
                  <Link
                    href={`/interstate/${destination.slug}`}
                    className="text-primary hover:underline"
                  >
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Locations by Region */}
          {regionCategories.map((region) => (
            <section key={region.slug} className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-foreground border-b pb-2">
                {region.name} ({region.suburbs.length} suburbs)
              </h2>
              <ul className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
                {region.suburbs.map((suburb) => (
                  <li key={suburb.slug}>
                    <Link
                      href={`/${region.slug}/${suburb.slug}`}
                      className="text-primary hover:underline text-sm"
                    >
                      {suburb.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Blog Posts */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground border-b pb-2">
              Blog Posts ({blogPosts.length})
            </h2>
            <ul className="grid md:grid-cols-2 gap-2">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Legal Pages */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground border-b pb-2">Legal</h2>
            <ul className="grid md:grid-cols-2 gap-2">
              <li><Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-primary hover:underline">Terms and Conditions</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
