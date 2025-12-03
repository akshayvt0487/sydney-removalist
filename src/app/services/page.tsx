import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import ServicesQuickAccess from '@/components/ServicesQuickAccess';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Services() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="Our Moving Services"
          subtitle="Comprehensive Moving Solutions for Every Need"
        />
        <ServicesGrid />
        <ServicesQuickAccess />
        <HowItWorksSteps />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
