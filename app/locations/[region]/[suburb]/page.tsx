import { Metadata } from 'next';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import ServicesQuickAccess from '@/components/ServicesQuickAccess';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import QuoteModal from '@/components/QuoteModal';
import LocationMap from '@/components/LocationMap';
import NearbyLocations from '@/components/NearbyLocations';
import TrustindexReviews from '@/components/TrustindexReviews';
import { getSuburbDetails } from '@/data/suburbs';

// Images - Next.js handles imports automatically
import removalistHero from '@/assets/removalist-hero.jpg';
import movingBoxes from '@/assets/moving-boxes.jpg';
import movingTruckLoading from '@/assets/moving-truck-loading.jpg';
import { SEO_CONFIG } from '@/lib/seo';

// 1. Define the Params Type (Next.js 15 requires params to be a Promise)
type Props = {
  params: Promise<{
    region: string;
    suburb: string;
  }>;
};

// 2. Generate Metadata (Replaces useEffect + createMetadata)
// This runs on the server before the page renders = Perfect SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params;
  const suburbDetails = getSuburbDetails(suburb);

  if (!suburbDetails) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: `Removalist ${suburbDetails.name} | Professional Moving Services ${suburbDetails.region}`,
    description: `Professional removalist in ${suburbDetails.name}, ${suburbDetails.region}. Trusted moving services with experienced team, competitive rates, and full insurance. Get your free quote today!`,
    keywords: [
      `removalist ${suburbDetails.name.toLowerCase()}`,
      `movers ${suburbDetails.name.toLowerCase()}`,
      `${suburbDetails.name.toLowerCase()} removalists`,
      `moving services ${suburbDetails.region.toLowerCase()}`,
      "local removalists"
    ],
    alternates: {
      canonical: `/locations/${suburbDetails.regionSlug}/${suburb}`,
    },
    openGraph: {
      title: `Removalist ${suburbDetails.name} | Sydney Removalist`,
      description: `Expert moving services in ${suburbDetails.name}, ${suburbDetails.region}. Licensed, insured, and ready to help with your move.`,
      type: "website",
      images: [{
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: `Removalist Services in ${suburbDetails.name}`
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: `Removalist ${suburbDetails.name}`,
      description: `Professional moving services in ${suburbDetails.name}. Get your free quote today!`
    }
  };
}

// 3. The Page Component (Server Component by default)
export default async function SuburbPage({ params }: Props) {
  // Await params (Next.js 15 requirement)
  const { region, suburb } = await params;
  
  const suburbDetails = getSuburbDetails(suburb);

  // Validation / Redirect logic
  if (!suburbDetails) {
    return notFound(); // Returns the 404 page
  }

  if (suburbDetails.regionSlug !== region) {
    redirect('/locations'); // Server-side redirect
  }

  // NOTE: Navbar and Footer are removed from here because they should
  // exist in your app/layout.tsx file. If they aren't there, add them back.

  return (
    <main>
      <HeroSection
        title={`Removalist ${suburbDetails.name}`}
        subtitle={`Professional moving services in ${suburbDetails.name}, ${suburbDetails.region}`}
        // Pass the imported image object directly
        backgroundImage={removalistHero.src} 
        showCTA={false}
        breadcrumbs={[
          { label: 'Locations', path: '/locations' },
          { label: suburbDetails.region, path: `/locations#${suburbDetails.regionSlug}` },
          { label: suburbDetails.name, path: `/locations/${region}/${suburb}` }
        ]}
        stats={[
          { value: '15+', label: 'Years Experience' },
          { value: 'Free', label: 'Quotes' },
          { value: '7 Days', label: 'Available' },
          { value: '100%', label: 'Insured' }
        ]}
      />

      {/* Service Overview */}
      <section className="py-16 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-4xl font-bold mb-6 text-foreground">
                  Professional Removalist in {suburbDetails.name}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Looking for trusted removalists in {suburbDetails.name}? Sydney Removalist provides comprehensive moving services throughout {suburbDetails.name} and the surrounding {suburbDetails.region} area. Our experienced team handles everything from packing to transportation with care and efficiency.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Whether you&apos;re moving a small apartment or a large family home in {suburbDetails.name}, we have the equipment, expertise, and dedication to make your move stress-free. We&apos;re fully licensed, insured, and committed to providing exceptional service at competitive rates.
                </p>
                <div className="flex gap-4 items-center flex-wrap">
                  <QuoteModal>
                    <button className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-lg">
                      Get Free Quote
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </QuoteModal>
                  <a href="tel:1300000000" className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>
              <div>
                {/* NEXT.JS OPTIMIZED IMAGE */}
                <Image 
                  src={movingBoxes} 
                  alt="Professional packing and moving services" 
                  className="rounded-xl shadow-2xl animate-fade-in object-cover"
                  style={{ animationDelay: '0.3s' }}
                  width={600}
                  height={400}
                  placeholder="blur" // Optional: adds blur effect while loading
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesQuickAccess />

      {/* Quick Quote Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl p-8 shadow-xl border border-secondary/20 animate-fade-in">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Get Your Free Quote</h3>
                </div>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Competitive pricing with no hidden fees. Get a personalized quote for your {suburbDetails.name} move today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <QuoteModal>
                    <button className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold rounded-lg transition-all hover:scale-105 shadow-lg">
                      Get Free Quote
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </QuoteModal>
                  <a href="tel:1300000000" className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  All quotes include GST, fuel, and tolls. No hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Offer - (Unchanged structure, ensuring keys are unique) */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-4">
                FULL SERVICE REMOVALISTS
              </span>
              <h2 className="text-4xl font-bold text-white">
                Our {suburbDetails.name} Removal Services
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Residential Moving',
                  description: `Complete home moving services in ${suburbDetails.name}. From apartments to family homes, we handle it all.`,
                  filled: true
                },
                {
                  title: 'Office Relocation',
                  description: `Professional commercial moving services for businesses relocating in ${suburbDetails.name}.`,
                  filled: false
                },
                {
                  title: 'Packing Services',
                  description: 'Expert packing with quality materials to protect your belongings during the move.',
                  filled: true
                },
                {
                  title: 'Furniture Removal',
                  description: 'Safe removal and transportation of furniture, including disassembly and reassembly.',
                  filled: false
                },
                {
                  title: 'Storage Solutions',
                  description: 'Secure short-term and long-term storage options if you need extra time.',
                  filled: true
                },
                {
                  title: 'Interstate Moves',
                  description: `Moving from ${suburbDetails.name} to another state? We handle interstate relocations too.`,
                  filled: false
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* SVG Icons logic kept identical to your original */}
                  {service.filled ? (
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg group-hover:rotate-6">
                       {/* ... Icons kept same as your original ... */}
                       {index === 0 && <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>}
                       {index === 2 && <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" /></svg>}
                       {index === 4 && <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>}
                    </div>
                  ) : (
                    <div className="w-14 h-14 border-4 border-secondary/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-accent transition-all shadow-md">
                       {/* ... Icons kept same as your original ... */}
                       {index === 1 && <svg className="w-7 h-7 text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                       {index === 3 && <svg className="w-7 h-7 text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
                       {index === 5 && <svg className="w-7 h-7 text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-background to-muted relative overflow-hidden">
        <div className="absolute top-10 right-20 w-20 h-20 border-4 border-accent/20 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border-4 border-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div className="order-2 md:order-1">
                {/* NEXT.JS OPTIMIZED IMAGE */}
                <Image 
                  src={movingTruckLoading} 
                  alt="Professional moving truck and team" 
                  className="rounded-xl shadow-2xl animate-fade-in object-cover"
                  width={600}
                  height={400}
                  placeholder="blur"
                />
              </div>
              <div className="order-1 md:order-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
                  YOUR TRUSTED PARTNER
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Why Choose Us for Your {suburbDetails.name} Move?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With years of experience serving {suburbDetails.name} and surrounding areas, we&apos;ve built our reputation on reliability, professionalism, and customer satisfaction. Our team is dedicated to making your move as smooth as possible.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: 'Local Knowledge', desc: `We know ${suburbDetails.name} inside out - parking, access, and the best routes.`, icon: '📍' },
                { title: 'Experienced Team', desc: 'Professionally trained movers with years of experience.', icon: '👥' },
                { title: 'Fully Insured', desc: 'Comprehensive insurance coverage for complete peace of mind.', icon: '🛡️' },
                { title: 'Modern Equipment', desc: 'Well-maintained trucks and professional moving equipment.', icon: '🚛' },
                { title: 'Competitive Rates', desc: 'Fair pricing with no hidden fees or surprise charges.', icon: '💰' },
                { title: 'Flexible Scheduling', desc: 'Available 7 days a week to fit your timeline.', icon: '📅' }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustindexReviews />

      {/* FAQ Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              Frequently Asked Questions About Moving in {suburbDetails.name}
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: `How much does it cost to hire removalists in ${suburbDetails.name}?`,
                  answer: `Our ${suburbDetails.name} removalist services start from $60 per half hour for a 1-bedroom move with 2 removalists. Prices vary based on the size of your move and distance. We provide free, no-obligation quotes tailored to your specific needs.`
                },
                {
                  question: `How far in advance should I book removalists in ${suburbDetails.name}?`,
                  answer: `We recommend booking at least 1-2 weeks in advance, especially during peak moving periods (end of month, school holidays). However, we do accommodate last-minute bookings when possible - just give us a call!`
                },
                {
                  question: `Do you provide packing materials for ${suburbDetails.name} moves?`,
                  answer: `Yes! We offer a complete range of packing materials including boxes, tape, bubble wrap, and protective covers. We also provide full packing services if you'd prefer our team to handle everything.`
                },
                {
                  question: `Are your removalists in ${suburbDetails.name} insured?`,
                  answer: `Absolutely. We are fully licensed and insured, providing comprehensive coverage for your belongings during the entire moving process. Your peace of mind is our priority.`
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LocationMap locationName={suburbDetails.name} />

      <NearbyLocations currentSuburbSlug={suburbDetails.slug} regionSlug={suburbDetails.regionSlug} />

      <HowItWorksSteps />

      <CTASection />
    </main>
  );
};