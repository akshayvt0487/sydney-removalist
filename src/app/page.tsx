import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustBadges from '@/components/TrustBadges';
import StatsSection from '@/components/StatsSection';
import MovingMadeEasy from '@/components/MovingMadeEasy';
import WhyPickUs from '@/components/WhyPickUs';
import ServicesGrid from '@/components/ServicesGrid';
import ServicesQuickAccess from '@/components/ServicesQuickAccess';
import AreasWeService from '@/components/AreasWeService';
import CallToActionPhone from '@/components/CallToActionPhone';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import FAQAccordion from '@/components/FAQAccordion';
import TrustindexReviews from '@/components/TrustindexReviews';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="Removalists Sydney That Go the Extra Mile"
          subtitle="Moving Made Simple, Every Step of the Way."
          showQuoteForm={true}
        />
        <TrustBadges />
        <StatsSection />
        <MovingMadeEasy />
        <WhyPickUs />
        <ServicesGrid />
        <ServicesQuickAccess />
        <AreasWeService />
        <CallToActionPhone />
        <HowItWorksSteps />
        <FAQAccordion />
        <TrustindexReviews />
        <Footer />
      </main>
    </>
  );
}
