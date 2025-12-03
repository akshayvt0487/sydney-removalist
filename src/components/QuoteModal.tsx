"use client";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import QuoteFormOverlay from './QuoteFormOverlay';

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
      <DialogPortal>
        <DialogOverlay />
        <DialogContent 
          className="max-w-2xl bg-transparent border-0 p-0 overflow-visible"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('.pac-container')) {
              e.preventDefault();
            }
          }}
        >
          <QuoteFormOverlay onSuccess={() => setOpen(false)} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default QuoteModal;
