"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import QuoteFormOverlay from './QuoteFormOverlay';
import QuoteModal from './QuoteModal';
// I will provide the code for this data file below to prevent errors!
import { CONTACT_INFO } from '@/data/contact'; 

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string | any; // Updated type to accept Next.js image imports
  showCTA?: boolean;
  showQuoteForm?: boolean;
  breadcrumbs?: { label: string; path: string }[];
  stats?: { value: string; label: string }[];
}

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  showCTA = true, 
  showQuoteForm = false, 
  breadcrumbs,
  stats 
}: HeroSectionProps) => {
  const hasBackground = !!backgroundImage;
  const [scrollY, setScrollY] = useState(0);
  
  // Helper to get image URL whether it's a string or Next.js static import
  const bgImageSrc = typeof backgroundImage === 'object' ? backgroundImage.src : backgroundImage;
  
  useEffect(() => {
    // Only add parallax effect for inner pages with background images
    if (!backgroundImage || showQuoteForm) return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [backgroundImage, showQuoteForm]);
  
  return (
    <section
      className="relative min-h-[600px] md:min-h-[500px] py-8 md:py-12 lg:py-16 flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      {bgImageSrc && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: !showQuoteForm ? `translateY(${scrollY * 0.5}px)` : 'none',
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
      
      {/* Dark overlay - stronger for pages with background images */}
      <div className={`absolute inset-0 ${hasBackground ? 'bg-gradient-to-b from-charcoal/90 via-charcoal/85 to-charcoal/95' : 'bg-charcoal/95'}`}></div>

      {/* Decorative shapes - animated */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Additional decorative elements for inner pages */}
      {!showQuoteForm && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-fade-in"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-fade-in" style={{ animationDelay: '0.5s' }}></div>
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`${showQuoteForm ? 'grid md:grid-cols-2 gap-8 items-center' : 'max-w-5xl mx-auto text-center'}`}>
          <div className="text-white animate-fade-in">
            {/* Breadcrumbs for inner pages */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className={`flex items-center gap-2 mb-6 text-sm text-white/70 ${showQuoteForm ? 'justify-start' : 'justify-center'}`}>
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-accent font-medium">{crumb.label}</span>
                    ) : (
                      <Link href={crumb.path} className="hover:text-accent transition-colors">{crumb.label}</Link>
                    )}
                  </div>
                ))}
              </nav>
            )}

            {showCTA && (
              <div className="inline-flex items-center gap-2 bg-accent/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-scale-in">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"  />
                    </svg>
                  ))}
                </div>
                <span className="text-primary font-semibold text-sm">4.9 Rating • 207 Reviews</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              {title}
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-white/90 max-w-3xl ${showQuoteForm ? 'mx-0' : 'mx-auto'}`}>
              {subtitle}
            </p>

            {/* Stats for inner pages */}
            {stats && stats.length > 0 && (
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-4xl ${showQuoteForm ? 'mx-0' : 'mx-auto'}`}>
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {showCTA && (
              <div className="space-y-4 md:space-y-6 ">
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 ">
                  <QuoteModal>
                    <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent/90 active:scale-95 transition-all duration-300 md:hover:scale-105 shadow-xl text-base md:text-lg hover:shadow-2xl touch-manipulation">
                      <svg className="w-5 h-5 md:w-6 md:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Get Free Quote
                    </button>
                  </QuoteModal>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-primary font-bold rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-300 md:hover:scale-105 shadow-xl text-base md:text-lg hover:shadow-2xl touch-manipulation"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call {CONTACT_INFO.phone}
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 md:gap-8 text-white/90 text-sm md:text-base ">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Free quotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Available 7 days</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {showQuoteForm && (
            <div className="hidden md:block">
              <QuoteFormOverlay />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;