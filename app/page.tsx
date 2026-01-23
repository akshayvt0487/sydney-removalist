import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import TrustBadges from '@/components/TrustBadges';
import ServicesGrid from '@/components/ServicesGrid';
import ServicesQuickAccess from '@/components/ServicesQuickAccess';
import AreasWeService from '@/components/AreasWeService';
import CallToActionPhone from '@/components/CallToActionPhone';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import FAQAccordion from '@/components/FAQAccordion';
import TrustindexReviews from '@/components/TrustindexReviews';

// Components for social proof and features
import StatsSection from '@/components/StatsSection';
import MovingMadeEasy from '@/components/MovingMadeEasy';
import WhyPickUs from '@/components/WhyPickUs';

// Assets - Next.js handles these as static objects
import heroImage from '@/assets/hero-main.jpg';

/**
 * SEO Metadata
 * Next.js 15 uses the metadataBase from layout.tsx to resolve the OpenGraph images.
 */
export const metadata: Metadata = {
  title: "Removalists Sydney | Professional Moving Services | 5-Star Rated",
  description: 
    "Sydney's most trusted removalists. Professional moving services across Sydney with 15+ years experience, 10,000+ happy moves, and 5-star reviews. Get your free quote today!",
  keywords: [
    "removalists sydney", 
    "sydney removalist", 
    "moving services sydney", 
    "professional movers sydney",
    "house movers sydney"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Removalists Sydney | Professional Moving Services",
    description: "Sydney's most trusted removalists with 15+ years experience. Reliable, affordable, and professional.",
    type: "website",
    url: "https://sydneyremovalistpro.com.au", // Replace with your live domain
    images: [
      {
        url: '/og-home.jpg', // Ensure this file exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Sydney Removalist Pro - Professional Moving Services",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Removalists Sydney | Professional Moving Services",
    description: "Sydney's most trusted removalists with 15+ years experience.",
    images: ['/og-home.jpg'],
  }
};

export default function Home() {
  return (
    <>
      {/* HeroSection is the most important for LCP (Largest Contentful Paint). 
        Passing backgroundImage={heroImage.src} is correct for CSS backgrounds.
      */}
      <HeroSection
        title="Removalists Sydney That Go the Extra Mile"
        subtitle="Moving Made Simple, Every Step of the Way."
        backgroundImage={heroImage.src}
        showQuoteForm={true}
      />
      
      <section className="bg-background">
        <TrustBadges />
      </section>

      <StatsSection />
      
      <ServicesQuickAccess />
      
      <MovingMadeEasy />
      
      <WhyPickUs />
      
      {/* TrustindexReviews usually fetches external data, ensure it has a loading skeleton inside */}
      <TrustindexReviews />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Moving Services</h2>
          <ServicesGrid limit={6} />
        </div>
      </section>
      
      <AreasWeService />
      
      <CallToActionPhone />
      
      <HowItWorksSteps />
      
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <FAQAccordion limit={6} />
        </div>
      </section>
    </>
  );
}