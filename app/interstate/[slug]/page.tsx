import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Components
import HeroSection from '@/components/HeroSection';
import ServicesQuickAccess from '@/components/ServicesQuickAccess';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import ServiceWhyChoose from '@/components/ServiceWhyChoose';
import ServicePricing from '@/components/ServicePricing';
import ServiceExpectations from '@/components/ServiceExpectations';
import FAQAccordion from '@/components/FAQAccordion';
import LocationMap from '@/components/LocationMap';
import TrustindexReviews from '@/components/TrustindexReviews';

// Data & SEO
import { interstateDestinations } from '@/data/suburbs';
import { SEO_CONFIG } from '@/lib/seo';

// Images
import interstateMoving from '@/assets/interstate-moving.jpg';
import movingTruckLoading from '@/assets/moving-truck-loading.jpg';

// 1. Define Props for Next.js 15
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// 2. Generate Metadata (Replaces your old useEffect SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = interstateDestinations.find((d) => d.slug === slug);

  if (!destination) return { title: 'Route Not Found' };

  return {
    title: `${destination.name} | Interstate Removalists Sydney to ${destination.to}`,
    description: `Professional interstate removalists from ${destination.from} to ${destination.to}. ${destination.distance} journey with comprehensive insurance, door-to-door service. Get your free quote today!`,
    keywords: [
      `sydney to ${destination.to.toLowerCase()} removalists`,
      `interstate removalists ${destination.to.toLowerCase()}`,
      `moving from sydney to ${destination.to.toLowerCase()}`,
      "interstate movers",
      "long distance removalists"
    ],
    openGraph: {
      title: `Interstate Removalists: ${destination.from} to ${destination.to}`,
      description: destination.description,
      type: "website",
      images: [{
        // Fallback safely if SEO_CONFIG is missing
        url: `${SEO_CONFIG?.baseUrl || ''}/og-interstate.jpg`,
        width: 1200,
        height: 630,
        alt: `Interstate Moving: Sydney to ${destination.to}`
      }]
    },
  };
}

// 3. The Page Component
export default async function InterstateCityPage({ params }: Props) {
  const { slug } = await params;
  const destination = interstateDestinations.find((d) => d.slug === slug);

  // Handle 404 if slug doesn't match any destination
  if (!destination) {
    return notFound();
  }

  // --- Content Arrays (Copied exactly from your old code) ---
  const reasons = [
    `Over 10 years experience with ${destination.from} to ${destination.to} moves`,
    'Door-to-door interstate moving service with no hidden costs',
    'Professional packing and unpacking services available',
    'Comprehensive transit insurance for interstate relocations',
    'Regular routes ensure efficient and reliable delivery',
    'Experienced with long-distance furniture and fragile item transport'
  ];

  const expectations = [
    { 
      title: 'Pre-Move Planning', 
      description: 'Comprehensive assessment of your belongings and detailed moving plan tailored to interstate requirements.' 
    },
    { 
      title: 'Professional Packing', 
      description: 'Extra care in securing items for long-distance transport with quality materials and proven techniques.' 
    },
    { 
      title: 'Secure Loading', 
      description: 'Strategic loading to maximize space and ensure safe transport over long distances.' 
    },
    { 
      title: 'Regular Updates', 
      description: 'Real-time tracking and communication throughout your interstate journey for peace of mind.' 
    },
    { 
      title: 'Safe Delivery', 
      description: `On-time delivery to your new ${destination.to} location with careful unloading and placement.` 
    },
    { 
      title: 'Post-Move Support', 
      description: 'Unpacking assistance and final walkthrough to ensure complete satisfaction with your move.' 
    }
  ];

  const faqItems = [
    {
      question: `How long does a ${destination.from} to ${destination.to} move take?`,
      answer: `The journey typically takes ${destination.duration}. However, the total moving process including packing, loading, transport, and unloading usually spans 2-3 days depending on the size of your move and specific requirements.`
    },
    {
      question: 'How is interstate moving priced?',
      answer: 'Interstate moves are priced based on volume (cubic meters), distance, and additional services like packing. We provide detailed fixed-price quotes with no hidden fees after assessing your belongings.'
    },
    {
      question: 'Is my furniture insured during interstate transport?',
      answer: 'Yes, we provide comprehensive transit insurance coverage for all interstate moves. Your belongings are protected throughout the entire journey from pickup to delivery.'
    },
    {
      question: 'Do you offer packing services for interstate moves?',
      answer: 'Absolutely! We highly recommend our professional packing service for interstate moves to ensure maximum protection during long-distance transport. We use quality materials designed for interstate relocations.'
    },
    {
      question: 'Can you store my items if my new place is not ready?',
      answer: 'Yes, we offer secure storage solutions if there\'s a gap between your move-out and move-in dates. Our climate-controlled facilities keep your belongings safe for short or long-term storage.'
    }
  ];

  return (
    <main>
      <HeroSection
        title={destination.name}
        subtitle={destination.description}
        backgroundImage={interstateMoving.src} // Next.js requires .src for imported images
        showCTA={false}
        breadcrumbs={[
          { label: 'Locations', path: '/locations' },
          { label: 'Interstate', path: '/interstate' },
          { label: destination.to, path: `/interstate/${slug}` }
        ]}
        stats={[
          { value: destination.distance, label: 'Distance' },
          { value: destination.duration, label: 'Drive Time' },
          { value: '100%', label: 'Insured' },
          { value: 'Fixed', label: 'Price' }
        ]}
      />

      {/* Service Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-foreground">
                  Professional Interstate Removalists
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Moving from {destination.from} to {destination.to}? Sydney Removalist provides reliable interstate moving services with regular routes, experienced drivers, and comprehensive insurance coverage. We handle all aspects of your interstate relocation with professionalism and care.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Our interstate moving service covers the entire {destination.distance} journey, typically taking {destination.duration} of driving time. We understand the unique challenges of long-distance moves and have the expertise to ensure your belongings arrive safely at your new {destination.to} home.
                </p>
                <div className="space-y-4">
                  {[
                    'Door-to-door interstate service',
                    'Professional packing available',
                    'Comprehensive transit insurance',
                    'Regular route schedules',
                    'Experienced long-distance drivers',
                    'Storage solutions available'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {/* Updated to Next/Image for optimization */}
                <Image 
                  src={movingTruckLoading}
                  alt="Interstate moving truck loading"
                  className="rounded-xl shadow-2xl object-cover"
                  width={600}
                  height={400}
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesQuickAccess />

      {/* What's Included */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-foreground text-center">What&apos;s Included in Your Interstate Move</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Pre-Move Consultation', desc: 'Detailed assessment and planning for your interstate relocation' },
                { title: 'Professional Loading', desc: 'Secure loading techniques for long-distance transport' },
                { title: 'Transit Insurance', desc: 'Comprehensive coverage throughout the journey' },
                { title: 'Regular Updates', desc: 'Communication and tracking during transport' },
                { title: 'Safe Unloading', desc: 'Careful delivery and placement at your new location' },
                { title: 'Quality Service', desc: 'Same professional standards from start to finish' }
              ].map((item, index) => (
                <div key={index} className="bg-background p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceWhyChoose reasons={reasons} />
      
      <TrustindexReviews />
      
      <ServiceExpectations expectations={expectations} />
      
      <ServicePricing serviceName={`${destination.from} to ${destination.to}`} />
      
      <FAQAccordion items={faqItems} />
      
      <LocationMap locationName={destination.to} />
      
      <HowItWorksSteps />
      
      <CTASection />
    </main>
  );
}