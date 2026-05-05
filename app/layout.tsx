import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

// Import your global components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPANY_INFO } from "@/lib/seo-schema";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap", // Ensures text is visible while font loads
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_INFO.url), // Always use production URL for proper canonical URLs
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
        url: `${COMPANY_INFO.url}/logo.png`, // Use logo as fallback
        width: 600,
        height: 60,
        alt: COMPANY_INFO.name,
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary',
    title: `${COMPANY_INFO.name} | Professional Moving Services`,
    description: COMPANY_INFO.description,
    creator: '@sydneyremovalist',
    site: '@sydneyremovalist'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'noimageindex': false,
    },
  },
  verification: {
    google: 'FDobe8EtgVDa05nNx5_A8WfjJ-OQ7IaFYDsiAS478AM',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-KV4V384N" />
      <GoogleAnalytics gaId="G-9D3WBQ0ZY5" />
      <head>
        {/* DO NOT set canonical here - each page sets its own via metadata.alternates.canonical */}
        {/* Setting it globally would override all page-specific canonicals */}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
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

        {/* Google Maps is lazy loaded by components that need it */}
      </body>
    </html>
  );
}