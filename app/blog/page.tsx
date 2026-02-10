import type { Metadata } from "next";
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateBreadcrumbSchema, COMPANY_INFO } from '@/lib/seo-schema';

// Data (I will ask for this file next!)
import { blogPosts } from '@/data/blogs';

// Assets
import movingBoxes from '@/assets/removalist/05.webp';

// 1. Static Metadata
export const metadata: Metadata = {
  title: "Moving Tips & Guides | Sydney Removalist Blog",
  description: "Expert moving tips, pricing guides, and advice from Sydney's trusted removalists. Learn how to plan your move, save money, and reduce stress.",
  keywords: ["moving tips", "removalist blog", "sydney moving guide", "packing tips", "moving cost guide"],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Sydney Removalist Blog | Moving Tips & Guides",
    description: "Expert moving tips and guides from Sydney's trusted removalists.",
    type: "website",
    url: "/blog",
    images: [{
      url: '/og-blog.jpg',
      width: 1200,
      height: 630,
      alt: "Sydney Removalist Blog"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sydney Removalist Blog | Moving Tips & Guides",
    description: "Expert moving tips and guides from Sydney's trusted removalists."
  }
};

export default function Blog() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: COMPANY_INFO.url },
    { name: 'Blog', url: `${COMPANY_INFO.url}/blog` }
  ]);

  // CollectionPage schema with blog posts
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${COMPANY_INFO.url}/blog#collectionpage`,
    url: `${COMPANY_INFO.url}/blog`,
    name: 'Sydney Removalist Blog | Moving Tips & Guides',
    description: 'Expert moving tips, pricing guides, and advice from Sydney\'s trusted removalists.',
    inLanguage: 'en-AU',
    isPartOf: {
      '@id': `${COMPANY_INFO.url}/#website`
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          '@id': `${COMPANY_INFO.url}/blog/${post.slug}#blogposting`,
          headline: post.title,
          description: post.excerpt,
          url: `${COMPANY_INFO.url}/blog/${post.slug}`,
          image: post.featuredImage,
          datePublished: post.publishDate,
          author: {
            '@type': 'Person',
            name: post.author
          },
          publisher: {
            '@id': `${COMPANY_INFO.url}/#organization`
          }
        }
      }))
    }
  };

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup schema={[breadcrumbSchema, collectionPageSchema]} />

      {/* Rest of the page */}

    
      <main>
        <HeroSection
          title="Moving Tips & Guides"
          subtitle="Expert advice to make your Sydney move stress-free"
          showCTA={false}
          backgroundImage={movingBoxes.src}
          breadcrumbs={[
            { label: 'Blog', path: '/blog' }
          ]}
          stats={[
            { value: '10+', label: 'Guides' },
            { value: 'Expert', label: 'Advice' },
            { value: 'Free', label: 'Resources' },
            { value: 'Updated', label: 'Regularly' }
          ]}
        />
        
        {/* Blog Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4">Latest Articles</h2>
                <p className="text-xl text-muted-foreground">
                  Tips, guides, and insights to help you plan the perfect move
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Link 
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col h-full"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image 
                        src={post.featuredImage} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <span>{formatDate(post.publishDate)}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Get Moving Tips Delivered
              </h2>
              <p className="text-white/90 mb-8">
                Subscribe to receive our latest guides, tips, and exclusive offers straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-6 py-3 rounded-lg text-foreground w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <button type="submit" className="px-8 py-3 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-colors shadow-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        <HowItWorksSteps />

        <CTASection />
      </main>
    </>
  );
}