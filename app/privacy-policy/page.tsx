import type { Metadata } from "next";
import { CONTACT_INFO } from "@/data/contact";

export const metadata: Metadata = {
  title: "Privacy Policy | Sydney Removalist",
  description: "Read our privacy policy to understand how Sydney Removalist collects, uses, and protects your personal information when you use our moving services.",
  keywords: ["privacy policy", "data protection", "Sydney removalist", "personal information"],
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Sydney Removalist",
    description: "Read our privacy policy to understand how we protect your personal information.",
    type: "website",
    url: "/privacy-policy",
    images: [{
      url: '/og-home.jpg',
      width: 1200,
      height: 630,
      alt: "Sydney Removalist Privacy Policy"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Sydney Removalist",
    description: "Read our privacy policy to understand how we protect your personal information."
  }
};

export default function PrivacyPolicy() {
  return (
    <>
      <main className="pt-20">
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Privacy Policy</h1>
            <p className="text-center mt-4 opacity-90">Last updated: November 2024</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-6">
                Sydney Removalist ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and address when you request a quote or contact us.</li>
                <li><strong>Moving Details:</strong> Information about your move including pickup and delivery locations, dates, and inventory.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</li>
                <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience and analyze website traffic.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Provide and manage our moving services</li>
                <li>Process your quote requests and bookings</li>
                <li>Communicate with you about your move</li>
                <li>Improve our website and services</li>
                <li>Send promotional materials (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground mb-6">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our business, such as payment processors and communication platforms, provided they agree to keep your information confidential.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-6">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">Under Australian privacy law, you have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">7. Cookies Policy</h2>
              <p className="text-muted-foreground mb-6">
                Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. Disabling cookies may affect some website functionality.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">8. Third-Party Links</h2>
              <p className="text-muted-foreground mb-6">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-6">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-none text-muted-foreground mb-6 space-y-2">
                <li><strong>Phone:</strong> {CONTACT_INFO.phone}</li>
                <li><strong>Email:</strong> {CONTACT_INFO.email}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}