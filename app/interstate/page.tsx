import { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import LocationMap from '@/components/LocationMap';
import interstateMoving from '@/assets/interstate-moving.jpg';
import { interstateDestinations } from '@/data/suburbs';
import { SEO_CONFIG } from '@/lib/seo';

// 1. Generate Metadata
export const metadata: Metadata = {
  title: "Interstate Removalists Sydney | Reliable Long Distance Moving",
  description: "Professional interstate removalists services from Sydney to Melbourne, Brisbane, Canberra, Adelaide, Gold Coast and beyond. Get a free quote today.",
  openGraph: {
    title: "Interstate Removalists Sydney",
    description: "Reliable long distance moving services across Australia.",
    type: "website",
    images: [{
      url: `${SEO_CONFIG?.baseUrl || ''}/og-interstate.jpg`,
      width: 1200,
      height: 630,
      alt: "Interstate Removalists Sydney"
    }]
  }
};

// 2. The Page Component
export default function InterstateIndexPage() {
  return (
    <main>
      <HeroSection
        title="Interstate Moving Services"
        subtitle="Moving beyond Sydney? We provide professional interstate removalist services to all major Australian cities."
        showCTA={false}
        backgroundImage={interstateMoving.src}
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: 'Interstate', path: '/interstate' }
        ]}
        stats={[
          { value: '5+', label: 'Major Cities' },
          { value: '100%', label: 'Insured' },
          { value: '24/7', label: 'Support' },
          { value: 'Fixed', label: 'Pricing' }
        ]}
      />

      {/* Interstate Destinations Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-foreground">
              Destinations We Serve
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Choose your destination below to see specific route details, pricing estimates, and travel times.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interstateDestinations.map((destination) => (
                <Link 
                  key={destination.slug}
                  href={`/interstate/${destination.slug}`} // Points to the dynamic page we made earlier
                  className="bg-muted p-6 rounded-xl shadow-lg hover:shadow-xl transition-all block group border border-transparent hover:border-secondary/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-secondary transition-colors">
                      {destination.to}
                    </h3>
                    <svg className="w-6 h-6 text-secondary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-semibold text-foreground">{destination.distance}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold text-foreground">{destination.duration}</span>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-sm font-medium text-secondary group-hover:underline">
                      View Route Details
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LocationMap locationName="Australia" />

      <HowItWorksSteps />

      <CTASection />
    </main>
  );
}