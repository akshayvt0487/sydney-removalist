import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from 'next/image';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateArticleSchema, generateBreadcrumbSchema, COMPANY_INFO } from '@/lib/seo-schema';

// Import the Client Component we created in Step 1
import BlogPostContent from '@/components/BlogPostContent';

// Data
import { getBlogBySlug, getRelatedBlogs, blogPosts } from '@/data/blogs';

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Generate Metadata (SEO) - Server Side
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      images: [{
        url: post.featuredImage,
        width: 1200,
        height: 630,
        alt: post.title
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage]
    }
  };
}

// 2. Generate Static Paths (SSG) - Pre-builds all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 3. Helper for Date Formatting
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 4. The Page Component
export default async function BlogSinglePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogs(slug, 2);

  // Generate Article schema for blog post
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.metaDescription,
    url: `${COMPANY_INFO.url}/blog/${slug}`,
    image: post.featuredImage,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: post.author,
    keywords: post.keywords
  });

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: COMPANY_INFO.url },
    { name: 'Blog', url: `${COMPANY_INFO.url}/blog` },
    { name: post.title, url: `${COMPANY_INFO.url}/blog/${slug}` }
  ]);

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup schema={[articleSchema, breadcrumbSchema]} />

      {/* Client Component handles the charts and main content rendering */}
      <BlogPostContent post={post} />

      {/* Related Posts Section (Static content stays on server side) */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <span>{formatDate(relatedPost.publishDate)}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/blog"
                className="inline-flex items-center text-secondary font-semibold hover:underline"
              >
                View All Articles
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-secondary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Plan Your Move?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation quote from Sydney's most trusted removalists.
          </p>
          <CTASection />
        </div>
      </section>

      <HowItWorksSteps />
    </>
  );
}