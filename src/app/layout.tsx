import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import "../index.css";

export const metadata: Metadata = {
  title: "Sydney Removalist Pro - Professional Moving Services",
  description: "Professional removalist and moving services throughout Sydney",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientWrapper>
          <TooltipProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              {children}
            </AuthProvider>
          </TooltipProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
