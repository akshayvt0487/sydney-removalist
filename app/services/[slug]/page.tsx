import { notFound } from "next/navigation";
import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import FAQAccordion from '@/components/FAQAccordion';
import ServicesQuickAccess from '@/components/ServicesQuickAccess';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import ServiceWhyChoose from '@/components/ServiceWhyChoose';
import ServiceCoverage from '@/components/ServiceCoverage';
import ServicePricing from '@/components/ServicePricing';
import ServiceExpectations from '@/components/ServiceExpectations';
import TrustBadges from '@/components/TrustBadges';
import SchemaMarkup from '@/components/SchemaMarkup';
import { services } from '@/data/services';
import { generateServiceSchema } from '@/lib/seo-schema';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} Sydney | Professional ${service.title} Services`,
    description: service.shortDescription,
    keywords: [service.title.toLowerCase(), `${service.title.toLowerCase()} sydney`, "removalist services"],
    openGraph: {
      title: `${service.title} Sydney | Professional Services`,
      description: service.shortDescription,
      type: "website",
      url: `/services/${slug}`,
      images: [{
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: `${service.title} Services in Sydney`
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} Sydney`,
      description: service.shortDescription
    }
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Handle image src whether it's a string URL or Next.js static import object
  const heroImageSrc = typeof service.image === 'string' ? service.image : service.image.src;

  // Generate service schema
  const serviceSchema = generateServiceSchema({
    name: service.title,
    description: service.description,
    url: `/services/${service.slug}`,
  });

  return (
    <>
      <SchemaMarkup schema={serviceSchema} />
      <main>
        <HeroSection
          title={service.title}
          subtitle={service.description}
          backgroundImage={heroImageSrc}
          showQuoteForm={false}
          showCTA={false}
          breadcrumbs={[
            { label: 'Services', path: '/services' },
            { label: service.title, path: `/services/${service.slug}` }
          ]}
          stats={[
            { value: '2-4hrs', label: 'Avg Time' },
            { value: '100%', label: 'Insured' },
            { value: '7 Days', label: 'Available' },
            { value: 'Free', label: 'Quotes' }
          ]}
        />
        
        {/* What's Included */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-foreground">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-secondary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works (Inline Process) */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-foreground">How It Works</h2>
              <div className="space-y-6">
                {service.process.map((step) => (
                  <div key={step.step} className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold mr-4">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServicesQuickAccess />

        {service.reasons && <ServiceWhyChoose reasons={service.reasons} />}
        
        {service.expectations && <ServiceExpectations expectations={service.expectations} />}
        
        <ServiceCoverage />
        
        <ServicePricing serviceName={service.title} />
        
        <TrustBadges />
        
        <FAQAccordion items={service.faq} />
        
        <HowItWorksSteps />
        
        <CTASection />
      </main>
    </>
  );
}