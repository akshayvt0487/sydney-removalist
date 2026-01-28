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

// SEO Components
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateLocalBusinessSchema, generateFAQSchema, generateEnhancedMetadata } from '@/lib/seo-schema';

// Assets - Next.js handles these as static objects
import heroImage from '@/assets/hero-main.jpg';

/**
 * Enhanced SEO Metadata
 */
export const metadata: Metadata = generateEnhancedMetadata({
  title: "Removalists Sydney | Professional Moving Services | 5-Star Rated",
  description: "Sydney's most trusted removalists. Professional moving services across Sydney with 15+ years experience, 10,000+ happy moves, and 5-star reviews. Get your free quote today!",
  keywords: [
    "removalists sydney",
    "sydney removalist",
    "moving services sydney",
    "professional movers sydney",
    "house movers sydney",
    "furniture removalists",
    "cheap removalists sydney",
    "best removalists sydney",
    "local removalists",
    "sydney moving company"
  ],
  canonical: "/",
  ogImage: "/og-default.jpg",
  ogType: "website"
});

export default function Home() {
  // FAQs for schema markup
  const faqs = [
    {
      question: "How much do removalists cost in Sydney?",
      answer: "Removalist costs in Sydney typically range from $100-150 per hour for a 2-person team. Prices vary based on home size, distance, and additional services. Get a free, no-obligation quote from us today."
    },
    {
      question: "Are you insured?",
      answer: "Yes, we're fully insured. All our moves include comprehensive transit insurance to protect your belongings during the entire moving process."
    },
    {
      question: "How much notice do I need to give?",
      answer: "We recommend booking at least 1-2 weeks in advance, especially during peak moving season (summer and end of month). However, we often accommodate last-minute moves subject to availability."
    },
    {
      question: "Do you move interstate?",
      answer: "Yes! We provide professional interstate removalist services to Melbourne, Brisbane, Canberra, Adelaide, Gold Coast, and other major Australian cities."
    },
    {
      question: "What areas of Sydney do you service?",
      answer: "We service all Sydney suburbs including Eastern Suburbs, North Shore, Inner West, Western Sydney, Northern Beaches, Hills District, and Sutherland Shire."
    },
    {
      question: "Do you provide packing services?",
      answer: "Yes, we offer professional packing services. Our team can pack your entire home with quality materials, or we can provide packing materials for DIY packing."
    }
  ];

  return (
    <>
      {/* JSON-LD Schema Markup for SEO */}
      <SchemaMarkup schema={[
        generateLocalBusinessSchema(),
        generateFAQSchema(faqs)
      ]} />

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