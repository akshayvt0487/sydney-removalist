import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import PricingTable from '@/components/PricingTable';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import QuoteModal from '@/components/QuoteModal';

// Assets
import officeMoving from '@/assets/office-moving.jpg';

// Data (We need to create this file next!)
import { additionalServices } from '@/data/pricing';

export const metadata: Metadata = {
  title: "Removalist Pricing Sydney | Get Your Free Moving Quote",
  description: "Get a free removalist quote in Sydney. Competitive moving rates with no hidden fees and price match guarantee. Request your personalized moving quote today.",
  keywords: ["removalist pricing sydney", "moving costs sydney", "removalist quote", "affordable movers", "moving rates", "furniture removal prices"],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Sydney Removalist Pricing | Get Your Free Quote",
    description: "Competitive removalist rates with no hidden fees and price match guarantee. Get your free quote today.",
    type: "website",
    url: "/pricing",
    images: [{
      url: '/og-default.jpg',
      width: 1200,
      height: 630,
      alt: "Sydney Removalist Free Quote"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sydney Removalist Pricing",
    description: "Competitive rates with no hidden fees. Get your free quote."
  }
};

export default function PricingPage() {
  return (
    <>
      <main>
        <HeroSection
          title="Competitive Pricing"
          subtitle="No hidden fees. No surprises. Get your personalized quote."
          showCTA={false}
          backgroundImage={officeMoving.src}
          breadcrumbs={[
            { label: 'Pricing', path: '/pricing' }
          ]}
          stats={[
            { value: 'Free', label: 'Quote' },
            { value: '0%', label: 'Hidden Fees' },
            { value: '5%', label: 'Beat Quotes By' },
            { value: '2hrs', label: 'Min Booking' }
          ]}
        />
        
        {/* Simple Honest Rates */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Simple, Honest Removalist Rates</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We believe in transparent pricing with no hidden costs. Our rates are charged in 30-minute increments and include the truck, fuel, equipment, and professional removalists. Get a free quote for accurate pricing tailored to your move.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <svg className="w-12 h-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-bold text-lg mb-2 text-foreground">No Hidden Fees</h3>
                  <p className="text-sm text-muted-foreground">All costs included in your quote</p>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <svg className="w-12 h-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Price Match</h3>
                  <p className="text-sm text-muted-foreground">We'll beat any quote by 5%</p>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <svg className="w-12 h-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Flexible Timing</h3>
                  <p className="text-sm text-muted-foreground">Pay only for the time you need</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PricingTable />
        
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Additional Services</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <span className="font-semibold text-card-foreground">{service.name}</span>
                    <span className="text-secondary font-medium text-sm">Quote Required</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <QuoteModal>
                  <button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                    Get a Quote for Additional Services
                  </button>
                </QuoteModal>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Pricing FAQs</h2>
              <div className="space-y-4">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-foreground">How is the pricing calculated?</h3>
                  <p className="text-muted-foreground">Our pricing is based on half-hour (30-minute) increments that include the truck, fuel, equipment, and professional removalists. Rates vary based on home size and truck capacity. Contact us for a personalized quote.</p>
                </div>
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-foreground">Are there any additional charges?</h3>
                  <p className="text-muted-foreground">The only additional charges are for optional services like packing materials, storage, or specialty items. We'll discuss all options upfront so there are no surprises.</p>
                </div>
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-foreground">Do you offer discounts?</h3>
                  <p className="text-muted-foreground">Yes! We offer discounts for weekday moves, seniors, students, and repeat customers. Contact us to learn more about current promotions.</p>
                </div>
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-foreground">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">We accept cash, credit cards, debit cards, and bank transfers. Payment is due upon completion of the move.</p>
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