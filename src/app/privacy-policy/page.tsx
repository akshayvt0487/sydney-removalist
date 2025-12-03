import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { SEO_CONFIG } from '@/lib/seo';

export const metadata = {
  title: "Privacy Policy | Sydney Removalist",
  description: "Read our privacy policy to understand how we protect your data.",
  openGraph: {
    title: "Privacy Policy | Sydney Removalist",
    type: "website",
    url: `${SEO_CONFIG.baseUrl}/privacy-policy`,
  }
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="Privacy Policy"
          subtitle="How We Protect Your Information"
        />
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">Information We Collect</h3>
              <p className="text-gray-600">We collect information you provide when using our services, including your name, contact details, and moving requirements.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">How We Use Your Information</h3>
              <p className="text-gray-600">We use your information to provide our moving services, respond to inquiries, and improve our customer experience.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Data Protection</h3>
              <p className="text-gray-600">We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
