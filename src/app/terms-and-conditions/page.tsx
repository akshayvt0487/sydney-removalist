import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { SEO_CONFIG } from '@/lib/seo';

export const metadata = {
  title: "Terms and Conditions | Sydney Removalist",
  description: "Read our terms and conditions for using our moving services.",
  openGraph: {
    title: "Terms and Conditions | Sydney Removalist",
    type: "website",
    url: `${SEO_CONFIG.baseUrl}/terms-and-conditions`,
  }
};

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="Terms and Conditions"
          subtitle="Our Service Terms"
        />
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
          <p className="text-gray-600 mb-4">
            Please read these terms and conditions carefully before using our moving services.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">Service Agreement</h3>
              <p className="text-gray-600">By using our services, you agree to be bound by these terms and conditions.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Liability</h3>
              <p className="text-gray-600">We take reasonable care in handling your belongings. Please refer to our insurance coverage for details on liability limits.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Cancellation Policy</h3>
              <p className="text-gray-600">Cancellations must be made at least 48 hours in advance for a full refund.</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
