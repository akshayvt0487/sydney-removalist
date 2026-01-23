import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

// Import your global components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap", // Ensures text is visible while font loads
});

export const metadata: Metadata = {
  // FIXED: metadataBase resolves the warning for social media images
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://sydneyremovalistpro.com.au" // Replace with your actual live domain
  ),
  title: "Sydney Removalist Pro",
  description: "Professional Removalist Services in Sydney",
  
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          strategy="afterInteractive" // Changed from lazyOnload for better performance with Places
        />
      </body>
    </html>
  );
}