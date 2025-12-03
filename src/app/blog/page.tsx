import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { SEO_CONFIG } from '@/lib/seo';

export const metadata = {
  title: "Blog | Moving Tips & Removalist Guides",
  description: "Read our latest blog posts about moving tips, packing guides, and removalist insights.",
  keywords: ["moving tips", "packing guides", "removalist blog"],
  openGraph: {
    title: "Blog | Sydney Removalist",
    description: "Tips and guides for your moving journey.",
    type: "website",
    url: `${SEO_CONFIG.baseUrl}/blog`,
  }
};

export default function Blog() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="Moving Tips & Guides"
          subtitle="Learn from Our Moving Experts"
        />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-gray-600">Blog posts coming soon...</p>
        </div>
        <Footer />
      </main>
    </>
  );
}
