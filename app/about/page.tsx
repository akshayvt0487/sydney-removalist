import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import TrustindexReviews from '@/components/TrustindexReviews';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateOrganizationSchema, generateBreadcrumbSchema, COMPANY_INFO } from '@/lib/seo-schema';

// Assets
import teamMovers from '@/assets/removalist/03.webp';

// 1. Static Metadata for SEO
export const metadata: Metadata = {
  title: "About Us | Sydney's Trusted Removalists Since 2008",
  description: "Learn about Sydney Removalist - 15+ years experience, 10,000+ successful moves, and 98% customer satisfaction. Fully licensed, insured, and dedicated to stress-free moving.",
  keywords: ["about sydney removalist", "sydney movers", "trusted removalists", "professional moving company", "licensed removalists sydney"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Sydney Removalist | 15+ Years Experience",
    description: "Your trusted moving partner since 2008. 10,000+ successful moves and 98% satisfaction rate.",
    type: "website",
    url: "/about",
    images: [{
      url: '/og-about.jpg',
      width: 1200,
      height: 630,
      alt: "Sydney Removalist - Professional Moving Services"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sydney Removalist",
    description: "Your trusted moving partner since 2008. 10,000+ successful moves."
  }
};

export default function About() {
  // Schema markup for About page
  const organizationSchema = generateOrganizationSchema();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: COMPANY_INFO.url },
    { name: 'About Us', url: `${COMPANY_INFO.url}/about` }
  ]);

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${COMPANY_INFO.url}/about#aboutpage`,
    url: `${COMPANY_INFO.url}/about`,
    name: 'About Sydney Removalist',
    description: 'Learn about Sydney Removalist - 15+ years experience, 10,000+ successful moves, and 98% customer satisfaction. Fully licensed, insured, and dedicated to stress-free moving.',
    mainEntity: {
      '@id': `${COMPANY_INFO.url}/#organization`
    },
    inLanguage: 'en-AU',
    isPartOf: {
      '@id': `${COMPANY_INFO.url}/#website`
    }
  };

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup schema={[organizationSchema, breadcrumbSchema, aboutPageSchema]} />

      <main>
        <HeroSection
          title="About Sydney Removalist"
          subtitle="Your trusted moving partner for over 15 years"
          showCTA={false}
          backgroundImage={teamMovers.src}
          breadcrumbs={[
            { label: 'About Us', path: '/about' }
          ]}
          stats={[
            { value: '15+', label: 'Years Experience' },
            { value: '10K+', label: 'Happy Moves' },
            { value: '98%', label: 'Satisfaction' },
            { value: '500+', label: '5-Star Reviews' }
          ]}
        />
        
        {/* Statistics Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-accent mb-2">15+</div>
                <div className="text-lg text-primary-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-accent mb-2">10,000+</div>
                <div className="text-lg text-primary-foreground">Successful Moves</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-accent mb-2">98%</div>
                <div className="text-lg text-primary-foreground">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-accent mb-2">500+</div>
                <div className="text-lg text-primary-foreground">5-Star Reviews</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-foreground">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Founded in 2008, Sydney Removalist has grown from a small local moving company to become one of Sydney's most trusted removalist services. Our journey began with a simple mission: to make moving stress-free, affordable, and reliable for everyone.
                </p>
                <p>
                  Over the years, we've helped thousands of families and businesses relocate across Sydney, interstate, and beyond. Our commitment to excellence, customer satisfaction, and professional service has earned us hundreds of five-star reviews and loyal customers who recommend us to their friends and family.
                </p>
                <p>
                  What sets us apart is our dedication to treating every move with the same care and attention, whether it's a studio apartment or a large corporate office. Our team of trained professionals uses modern equipment and proven techniques to ensure your belongings arrive safely at their destination.
                </p>
                <p>
                  We're fully licensed, insured, and accredited, giving you complete peace of mind throughout your moving journey. Our fleet of well-maintained trucks and professional packing materials ensures that every aspect of your move meets the highest standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Professionalism</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our team is fully trained, uniformed, and experienced. We treat every item with the utmost care and respect, ensuring your belongings are handled professionally from start to finish.
                  </p>
                </div>
                <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Reliability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We arrive on time, every time. With transparent communication throughout the process, you'll always know what's happening with your move. No surprises, just dependable service.
                  </p>
                </div>
                <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Affordability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Competitive rates without compromising on quality. We offer transparent pricing with no hidden fees, and we'll beat any written quote by 5%. Quality moving services shouldn't break the bank.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 text-center text-foreground">Why Choose Sydney Removalist?</h2>
              <p className="text-xl text-center text-muted-foreground mb-12">We go above and beyond to make your move seamless</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Fully Licensed & Insured</h3>
                    <p className="text-muted-foreground">Complete peace of mind with comprehensive insurance coverage for all your belongings.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Modern Fleet</h3>
                    <p className="text-muted-foreground">Well-maintained trucks equipped with GPS tracking and climate control when needed.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Professional Packing</h3>
                    <p className="text-muted-foreground">Quality packing materials and expert techniques to protect your valuable items.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Flexible Scheduling</h3>
                    <p className="text-muted-foreground">Available 7 days a week with early morning and evening slots to suit your schedule.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">No Hidden Costs</h3>
                    <p className="text-muted-foreground">Transparent pricing with detailed quotes. What we quote is what you pay.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Storage Solutions</h3>
                    <p className="text-muted-foreground">Secure short-term and long-term storage options if you need extra time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowItWorksSteps />

        <TrustindexReviews />

        <CTASection />
      </main>
    </>
  );
}