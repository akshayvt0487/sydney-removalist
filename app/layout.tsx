import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

// Import your global components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generateOrganizationSchema, generateWebsiteSchema, COMPANY_INFO } from "@/lib/seo-schema";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap", // Ensures text is visible while font loads
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : COMPANY_INFO.url
  ),
  title: {
    default: `${COMPANY_INFO.name} | Professional Moving Services Sydney`,
    template: `%s | ${COMPANY_INFO.name}`
  },
  description: COMPANY_INFO.description,
  keywords: [
    'removalists sydney',
    'sydney removalist',
    'moving services sydney',
    'professional movers sydney',
    'furniture removalists',
    'office removalists',
    'interstate removalists',
    'sydney moving company'
  ],
  authors: [{ name: COMPANY_INFO.name, url: COMPANY_INFO.url }],
  creator: COMPANY_INFO.name,
  publisher: COMPANY_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: COMPANY_INFO.url,
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} | Professional Moving Services Sydney`,
    description: COMPANY_INFO.description,
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: COMPANY_INFO.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY_INFO.name} | Professional Moving Services`,
    description: COMPANY_INFO.description,
    creator: '@sydneyremovalist',
    images: ['/og-home.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        {/* Organization and Website Schema - Global */}
        <SchemaMarkup schema={[
          generateOrganizationSchema(),
          generateWebsiteSchema()
        ]} />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
            <Toaster />
          </div>
        </Providers>

        {/* Load Google Maps Script Globally */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}