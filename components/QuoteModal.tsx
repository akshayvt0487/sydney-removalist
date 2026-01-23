"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import QuoteFormOverlay from './QuoteFormOverlay';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface QuoteModalProps {
  children: React.ReactNode;
}

const QuoteModal = ({ children }: QuoteModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      {/* RESTORING YOUR EXACT CLASSES:
         - max-w-2xl: Restricts width to match your old design
         - bg-transparent: Removes white background
         - border-0: Removes grey border
         - p-0: Removes internal padding so the blue box fits perfectly
         - overflow-visible: Ensures shadows/elements aren't clipped
      */}
      <DialogContent 
        className="max-w-2xl bg-transparent border-0 p-0 overflow-visible shadow-none sm:max-w-2xl [&>button]:text-white [&>button]:top-4 [&>button]:right-4 hover:[&>button]:text-yellow"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          // Prevent closing when clicking Google Places autocomplete dropdown
          const target = e.target as HTMLElement;
          if (target.closest('.pac-container')) {
            e.preventDefault();
          }
        }}
      >
        <VisuallyHidden>
          <DialogTitle>Get a Free Quote</DialogTitle>
          <DialogDescription>Form details</DialogDescription>
        </VisuallyHidden>

        <QuoteFormOverlay onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;