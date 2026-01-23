"use client";

import { useEffect, useRef } from 'react';

const TrustindexReviews = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check if script already exists in this container to prevent duplicates
    const existingScript = containerRef.current.querySelector('script[src*="trustindex.io"]');
    if (existingScript) return;

    // Create and append script to the container (not body)
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?eb23df3595a7201f18960935362';
    script.defer = true;
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground">
            Trusted by hundreds of satisfied customers across Sydney
          </p>
        </div>
        <div ref={containerRef} className="max-w-6xl mx-auto min-h-[200px]">
          {/* Trustindex widget will be injected here by the script */}
        </div>
      </div>
    </section>
  );
};

export default TrustindexReviews;