import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import ServicesQuickAccess from '@/components/ServicesQuickAccess';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateBreadcrumbSchema, COMPANY_INFO } from '@/lib/seo-schema';
import { services } from '@/data/services';

// Assets
import residentialMoving from '@/assets/removalist/08.webp';

// 1. Static SEO Metadata
export const metadata: Metadata = {
  title: "Moving Services Sydney | Residential & Commercial Removalists",
  description: "Complete moving services in Sydney: residential moving, office relocation, packing services, furniture assembly, storage solutions & interstate moves. 100% satisfaction guarantee.",
  keywords: ["moving services sydney", "residential moving", "office relocation", "packing services", "furniture assembly", "storage solutions", "interstate moves"],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Professional Moving Services Sydney",
    description: "Complete moving solutions for homes and businesses. 100% satisfaction guarantee.",
    type: "website",
    url: "/services",
    images: [{
      url: '/og-services.jpg',
      width: 1200,
      height: 630,
      alt: "Sydney Removalist Professional Moving Services"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Services Sydney",
    description: "Complete moving solutions for homes and businesses."
  }
};

export default function ServicesPage() {
  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: COMPANY_INFO.url },
    { name: 'Services', url: `${COMPANY_INFO.url}/services` }
  ]);

  // CollectionPage schema with all services
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${COMPANY_INFO.url}/services#collectionpage`,
    url: `${COMPANY_INFO.url}/services`,
    name: 'Professional Moving Services Sydney',
    description: 'Complete moving services in Sydney: residential moving, office relocation, packing services, furniture assembly, storage solutions & interstate moves.',
    inLanguage: 'en-AU',
    isPartOf: {
      '@id': `${COMPANY_INFO.url}/#website`
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          '@id': `${COMPANY_INFO.url}/services/${service.slug}#service`,
          name: service.title,
          description: service.shortDescription,
          url: `${COMPANY_INFO.url}/services/${service.slug}`,
          provider: {
            '@id': `${COMPANY_INFO.url}/#organization`
          },
          serviceType: 'Moving and Relocation',
          areaServed: {
            '@type': 'City',
            name: 'Sydney',
            '@id': 'https://www.wikidata.org/wiki/Q3130'
          }
        }
      }))
    }
  };

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup schema={[breadcrumbSchema, collectionPageSchema]} />

      <main>
        <HeroSection
          title="Professional Moving Services"
          subtitle="Comprehensive solutions for every type of move"
          showCTA={false}
          // Using .src for static import compatibility with the Hero component
          backgroundImage={residentialMoving.src}
          breadcrumbs={[
            { label: 'Services', path: '/services' }
          ]}
          stats={[
            { value: '2-4hrs', label: 'Avg Move Time' },
            { value: '100%', label: 'Satisfaction' },
            { value: '7 Days', label: 'Every Week' },
            { value: '50+', label: 'Suburbs Served' }
          ]}
        />
        
        {/* Introduction Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Complete Moving Solutions</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Whether you're moving across the street or across the state, Sydney Removalist has the expertise and equipment to handle moves of any size. Our comprehensive range of services is designed to make your relocation as smooth and stress-free as possible.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">2-4 hrs</div>
                  <div className="text-sm text-muted-foreground">Average Move Time</div>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Guarantee</div>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">7 Days</div>
                  <div className="text-sm text-muted-foreground">Available Every Week</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServicesQuickAccess />

        <ServicesGrid />
        
        {/* Process Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 text-center text-foreground">How It Works</h2>
              <p className="text-xl text-center text-muted-foreground mb-12">Simple, straightforward, and stress-free</p>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Get Quote</h3>
                  <p className="text-muted-foreground">Fill out our simple form or call us for an instant estimate based on your move details.</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Book Your Move</h3>
                  <p className="text-muted-foreground">Choose your preferred date and time. We'll confirm and send you all the details.</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">We Pack & Move</h3>
                  <p className="text-muted-foreground">Our professional team arrives on time and handles everything with care and efficiency.</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Settle In</h3>
                  <p className="text-muted-foreground">Relax in your new space while we unpack and set up exactly as you want.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-primary-foreground">Our Service Guarantee</h2>
              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                We stand behind our work with a 100% satisfaction guarantee. If anything goes wrong during your move, we'll make it right—no questions asked. Your peace of mind is our priority.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-background/10 backdrop-blur-sm p-6 rounded-lg border border-primary-foreground/20">
                  <h3 className="text-lg font-bold text-accent mb-2">Price Match Guarantee</h3>
                  <p className="text-primary-foreground/80 text-sm">We'll beat any written quote by 5%</p>
                </div>
                <div className="bg-background/10 backdrop-blur-sm p-6 rounded-lg border border-primary-foreground/20">
                  <h3 className="text-lg font-bold text-accent mb-2">On-Time Promise</h3>
                  <p className="text-primary-foreground/80 text-sm">We arrive when we say we will, every time</p>
                </div>
                <div className="bg-background/10 backdrop-blur-sm p-6 rounded-lg border border-primary-foreground/20">
                  <h3 className="text-lg font-bold text-accent mb-2">Damage Protection</h3>
                  <p className="text-primary-foreground/80 text-sm">Full insurance coverage on all items</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowItWorksSteps />

        <CTASection />
      </main>
    </>
  );
}