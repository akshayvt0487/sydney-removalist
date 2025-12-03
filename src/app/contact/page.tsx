import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContactForm from '@/components/ContactForm';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import Footer from '@/components/Footer';
import { CONTACT_INFO } from '@/data/contact';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="Get in Touch"
          subtitle="We're here to help with your moving needs"
        />
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {CONTACT_INFO && Object.entries(CONTACT_INFO).map(([key, value]) => (
              <div key={key} className="text-center">
                <h3 className="font-bold mb-2">{key}</h3>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
          </div>
          <ContactForm />
        </div>
        <HowItWorksSteps />
        <Footer />
      </main>
    </>
  );
}
