import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PricingTable from '@/components/PricingTable';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="Our Transparent Pricing"
          subtitle="No Hidden Fees, Just Honest Rates"
        />
        <PricingTable />
        <HowItWorksSteps />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
