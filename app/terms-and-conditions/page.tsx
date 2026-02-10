import type { Metadata } from "next";
import { CONTACT_INFO } from "@/data/contact";

export const metadata: Metadata = {
  title: "Terms and Conditions | Sydney Removalist",
  description: "Read the terms and conditions for using Sydney Removalist services. Understand your rights and obligations when booking our professional moving services.",
  keywords: ["terms and conditions", "service agreement", "Sydney removalist", "moving services"],
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions | Sydney Removalist",
    description: "Read the terms and conditions for using Sydney Removalist services.",
    type: "website",
    url: "/terms-and-conditions",
    images: [{
      url: '/og-default.jpg',
      width: 1200,
      height: 630,
      alt: "Sydney Removalist Terms and Conditions"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | Sydney Removalist",
    description: "Read the terms and conditions for using Sydney Removalist services."
  }
};

export default function TermsAndConditions() {
  return (
    <>
      <main className="pt-20">
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Terms and Conditions</h1>
            <p className="text-center mt-4 opacity-90">Last updated: November 2024</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-6">
                By using Sydney Removalist services or accessing our website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">2. Services</h2>
              <p className="text-muted-foreground mb-6">
                Sydney Removalist provides residential and commercial moving services, packing services, furniture assembly/disassembly, storage solutions, and interstate moving services within Australia. All services are subject to availability and these terms.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">3. Quotes and Pricing</h2>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>All quotes are estimates based on information provided by the customer.</li>
                <li>Final charges may vary based on actual time, distance, and services rendered.</li>
                <li>Quotes are valid for 14 days from the date of issue unless otherwise specified.</li>
                <li>Additional charges may apply for stairs, long carries, difficult access, or items not disclosed at the time of booking.</li>
                <li>Minimum charges apply as per our published pricing schedule.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">4. Booking and Cancellation</h2>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Bookings are confirmed upon receipt of a deposit where required.</li>
                <li>Cancellations made within 48 hours of the scheduled move may incur a cancellation fee.</li>
                <li>Rescheduling is subject to availability and may incur additional charges.</li>
                <li>We reserve the right to reschedule due to adverse weather conditions or unforeseen circumstances.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">5. Customer Responsibilities</h2>
              <p className="text-muted-foreground mb-4">The customer agrees to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Provide accurate information about items to be moved</li>
                <li>Ensure all items are properly packed unless packing services are booked</li>
                <li>Disclose any valuable, fragile, or hazardous items</li>
                <li>Ensure clear access at both pickup and delivery locations</li>
                <li>Be present or have an authorized representative at both locations</li>
                <li>Empty all furniture drawers and disconnect appliances prior to the move</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">6. Prohibited Items</h2>
              <p className="text-muted-foreground mb-4">We do not transport:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Hazardous materials, explosives, or flammable substances</li>
                <li>Illegal items or contraband</li>
                <li>Perishable food items</li>
                <li>Plants and live animals</li>
                <li>Cash, jewelry, or important documents (these should be transported personally)</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">7. Insurance and Liability</h2>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>We carry public liability insurance for our operations.</li>
                <li>Basic transit insurance is included in our services.</li>
                <li>Additional comprehensive insurance is available upon request.</li>
                <li>Claims for damage must be reported within 24 hours of delivery.</li>
                <li>We are not liable for items packed by the customer, pre-existing damage, or damage due to inadequate packing.</li>
                <li>Liability is limited to repair cost or depreciated value, whichever is lower.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">8. Payment Terms</h2>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Payment is due upon completion of services unless otherwise agreed.</li>
                <li>We accept cash, credit cards, and bank transfers.</li>
                <li>A deposit may be required for large or interstate moves.</li>
                <li>Late payments may incur interest charges.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">9. Dispute Resolution</h2>
              <p className="text-muted-foreground mb-6">
                Any disputes arising from our services should first be raised with our customer service team. If a resolution cannot be reached, the matter may be referred to mediation or the relevant consumer protection authority.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">10. Privacy</h2>
              <p className="text-muted-foreground mb-6">
                Your personal information is handled in accordance with our Privacy Policy. By using our services, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">11. Website Use</h2>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>The content on our website is for general information purposes only.</li>
                <li>We reserve the right to modify website content without notice.</li>
                <li>Users must not misuse the website or attempt to gain unauthorized access.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">12. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">
                To the maximum extent permitted by law, Sydney Removalist shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or website.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">13. Changes to Terms</h2>
              <p className="text-muted-foreground mb-6">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective upon posting to our website. Continued use of our services constitutes acceptance of the updated terms.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">14. Governing Law</h2>
              <p className="text-muted-foreground mb-6">
                These Terms and Conditions are governed by the laws of New South Wales, Australia. Any disputes shall be subject to the exclusive jurisdiction of the courts of New South Wales.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">15. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For any questions regarding these Terms and Conditions, please contact us:
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