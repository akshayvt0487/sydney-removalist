import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { SEO_CONFIG } from '@/lib/seo';

export const metadata = {
  title: "Thank You | Sydney Removalist",
  description: "Thank you for contacting Sydney Removalist.",
  openGraph: {
    title: "Thank You | Sydney Removalist",
    type: "website",
    url: `${SEO_CONFIG.baseUrl}/thank-you`,
  }
};

export default function ThankYou() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="Thank You!"
          subtitle="We've received your inquiry and will be in touch soon"
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-4">
            Thank you for contacting Sydney Removalist. We appreciate your inquiry and will respond within 2 hours during business hours.
          </p>
        </div>
        <Footer />
      </main>
    </>
  );
}
