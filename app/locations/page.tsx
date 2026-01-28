import { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import LocationMap from '@/components/LocationMap';

// Data
import { regionCategories, interstateDestinations } from '@/data/suburbs';

// Assets
import interstateMoving from '@/assets/interstate-moving.jpg';

// 1. Static Metadata for SEO
export const metadata: Metadata = {
  title: "Service Areas | Removalists Across Sydney & Interstate",
  description: "Sydney Removalist serves 64+ suburbs across Greater Sydney and interstate routes to Melbourne, Brisbane, Canberra, Adelaide & Gold Coast. Find your local removalist today.",
  keywords: ["sydney removalist locations", "removalists near me", "interstate removalists", "sydney suburbs moving", "greater sydney movers"],
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Sydney Removalist Service Areas",
    description: "Professional removalist services across 64+ Sydney suburbs and interstate destinations.",
    type: "website",
    url: "/locations",
    images: [{
      url: '/og-default.jpg',
      width: 1200,
      height: 630,
      alt: "Sydney Removalist Service Areas Map"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sydney Removalist Service Areas",
    description: "Serving 64+ Sydney suburbs and interstate destinations."
  }
};

export default function LocationsPage() {
  return (
    <>
      <main>
        <HeroSection
          title="Areas We Serve"
          subtitle="Professional removalist services across Greater Sydney and beyond"
          showCTA={false}
          backgroundImage={interstateMoving.src}
          breadcrumbs={[
            { label: 'Locations', path: '/locations' }
          ]}
          stats={[
            { value: '64+', label: 'Suburbs' },
            { value: '100km', label: 'Radius' },
            { value: '24/7', label: 'Available' },
            { value: '5+', label: 'Interstate' }
          ]}
        />
        
        {/* Coverage Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Sydney-Wide Coverage</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                From the Northern Beaches to the Sutherland Shire, from the Inner West to the Eastern Suburbs, Sydney Removalist serves all of Greater Sydney and surrounding areas. No matter where you&apos;re moving from or to, we&apos;ve got you covered.
              </p>
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">64+</div>
                  <div className="text-sm text-muted-foreground">Suburbs Covered</div>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">8</div>
                  <div className="text-sm text-muted-foreground">Major Regions</div>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Service Available</div>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Interstate Routes</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sydney Regions & Suburbs */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Sydney Regions We Serve</h2>
              
              <div className="space-y-8">
                {regionCategories.map((region) => (
                  <div key={region.id} className="bg-background p-6 rounded-xl shadow-md">
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h3 className="text-2xl font-bold text-foreground">{region.name}</h3>
                      <span className="ml-auto bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                        {region.suburbs.length} suburbs
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {region.suburbs.map((suburb) => (
                        <Link 
                          key={suburb.slug}
                          href={`/locations/${region.slug}/${suburb.slug}`}
                          className="text-muted-foreground hover:text-secondary transition-colors hover:underline"
                        >
                          {suburb.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Interstate Moving */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-center text-foreground">Interstate Moving Services</h2>
              <p className="text-xl text-center text-muted-foreground mb-12">
                Moving beyond Sydney? We provide professional interstate removalist services to all major Australian cities.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interstateDestinations.map((destination) => (
                  <Link 
                    key={destination.slug}
                    href={`/interstate/${destination.slug}`} 
                    className="bg-muted p-6 rounded-xl shadow-lg hover:shadow-xl transition-all block group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-secondary transition-colors">{destination.to}</h3>
                      <svg className="w-6 h-6 text-secondary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground mb-4">{destination.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Distance:</span>
                        <span className="font-semibold text-foreground">{destination.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-semibold text-foreground">{destination.duration}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Regional NSW Coverage */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-center text-foreground">Regional NSW Coverage</h2>
              <p className="text-xl text-center text-muted-foreground mb-12">
                We also service regional areas throughout New South Wales
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Central Coast', desc: 'Gosford, Terrigal, Wyong, and surrounding areas' },
                  { title: 'Blue Mountains', desc: 'Katoomba, Penrith, Richmond, and mountain towns' },
                  { title: 'Wollongong', desc: 'Illawarra region and South Coast areas' },
                  { title: 'Newcastle', desc: 'Hunter Valley and Northern NSW regions' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-background p-4 rounded-lg">
                    <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <LocationMap locationName="Sydney" />

        <HowItWorksSteps />

        <CTASection />
      </main>
    </>
  );
}