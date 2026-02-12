import type { Metadata } from "next";
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ContactForm from '@/components/ContactForm';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import TrustindexReviews from '@/components/TrustindexReviews';
import SchemaMarkup from '@/components/SchemaMarkup';
import { CONTACT_INFO } from '@/data/contact';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, COMPANY_INFO } from '@/lib/seo-schema';
import packingService from '@/assets/removalist/05.webp';

export const metadata: Metadata = {
  title: "Contact Us | Get Your Free Moving Quote",
  description: "Contact Sydney Removalist for a free moving quote. Call us 7 days a week, email us, or fill out our contact form. Fast response within 2 hours guaranteed.",
  keywords: ["contact removalists", "free moving quote", "sydney removalist contact", "moving enquiry", "book removalists"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Sydney Removalist",
    description: "Get your free moving quote today. Fast response within 2 hours.",
    type: "website",
    url: "/contact",
    images: [{
      url: '/og-contact.jpg',
      width: 1200,
      height: 630,
      alt: "Contact Sydney Removalist"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sydney Removalist",
    description: "Get your free moving quote today. Fast response within 2 hours."
  }
};

export default function ContactPage() {
  // Local Business schema with contact information
  const localBusinessSchema = generateLocalBusinessSchema();

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: COMPANY_INFO.url },
    { name: 'Contact', url: `${COMPANY_INFO.url}/contact` }
  ]);

  // ContactPage schema with ContactPoint
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${COMPANY_INFO.url}/contact#contactpage`,
    url: `${COMPANY_INFO.url}/contact`,
    name: 'Contact Sydney Removalist',
    description: 'Contact Sydney Removalist for a free moving quote. Call us 7 days a week, email us, or fill out our contact form.',
    inLanguage: 'en-AU',
    isPartOf: {
      '@id': `${COMPANY_INFO.url}/#website`
    },
    mainEntity: {
      '@type': 'ContactPoint',
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      contactType: 'Customer Service',
      areaServed: 'AU-NSW',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '06:00',
        closes: '20:00'
      }
    }
  };

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup schema={[localBusinessSchema, breadcrumbSchema, contactPageSchema]} />

      <main>
        <HeroSection
          title="Contact Us"
          subtitle="Get your free quote today"
          showCTA={false}
          backgroundImage={packingService.src}
          breadcrumbs={[
            { label: 'Contact', path: '/contact' }
          ]}
          stats={[
            { value: '<2hrs', label: 'Reply Time' },
            { value: '7 Days', label: 'Available' },
            { value: 'Free', label: 'Quotes' },
            { value: '24/7', label: 'Support' }
          ]}
        />
        
        {/* Quick Contact Options */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Get In Touch</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                
                {/* Phone Card */}
                <a href={CONTACT_INFO.phoneHref} className="group bg-gradient-to-br from-secondary to-secondary/80 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-center block">
                  <svg className="w-16 h-16 text-secondary-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2 text-secondary-foreground">Call Us</h3>
                  <p className="text-2xl font-bold text-secondary-foreground mb-2">{CONTACT_INFO.phone}</p>
                  <p className="text-sm text-secondary-foreground/80">Available 7 days a week</p>
                </a>

                {/* Email Card */}
                <a href={CONTACT_INFO.emailHref} className="group bg-gradient-to-br from-accent to-accent/80 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-center block">
                  <svg className="w-16 h-16 text-accent-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2 text-accent-foreground">Email Us</h3>
                  <p className="text-lg font-bold text-accent-foreground mb-2 break-all">{CONTACT_INFO.email}</p>
                  <p className="text-sm text-accent-foreground/80">We reply within 2 hours</p>
                </a>

                {/* Hours Card */}
                <div className="bg-gradient-to-br from-primary to-navy p-8 rounded-xl shadow-lg text-center">
                  <svg className="w-16 h-16 text-primary-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2 text-primary-foreground">Business Hours</h3>
                  <p className="text-lg font-bold text-primary-foreground mb-2">{CONTACT_INFO.hours}</p>
                  <p className="text-sm text-primary-foreground/80">After hours by appointment</p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Client-Side Contact Form */}
        <ContactForm />
        
        {/* Why Choose Us Stats */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Why Choose Us For Your Move?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="bg-card p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="bg-card p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
                <div className="bg-card p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">5-Star Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas Quick Links */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-foreground">We Service All Sydney Suburbs</h2>
              <p className="text-lg text-muted-foreground mb-8">
                From the Northern Beaches to the Sutherland Shire, from the Inner West to the Eastern Suburbs - we've got Sydney covered.
              </p>
              <Link 
                href="/locations" 
                className="inline-flex items-center bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                View All Service Areas
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <HowItWorksSteps />

        <TrustindexReviews />
      </main>
    </>
  );
}