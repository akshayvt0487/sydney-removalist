"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QuoteModal from './QuoteModal';
import LocationMegaMenu from './LocationMegaMenu';
import { CONTACT_INFO } from '@/data/contact';
// import { useAuth } from '@/hooks/useAuth'; // Commented out until Auth is set up
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Placeholder for Auth (You can re-enable this once your Next.js Auth is ready)
  const isAdmin = false; 
  // const { isAdmin } = useAuth(); 

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Sydney Removalist Logo"
              width={250}
              height={75}
              className="h-12 md:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-primary-foreground hover:text-accent transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-primary-foreground hover:text-accent transition-colors font-medium">
              About
            </Link>
            <Link href="/services" className="text-primary-foreground hover:text-accent transition-colors font-medium">
              Services
            </Link>
            
            {/* Mega Menu */}
            <LocationMegaMenu />
            
            <Link href="/pricing" className="text-primary-foreground hover:text-accent transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/contact" className="text-primary-foreground hover:text-accent transition-colors font-medium">
              Contact
            </Link>
            <Link href="/blog" className="text-primary-foreground hover:text-accent transition-colors font-medium">
              Blog
            </Link>
            
            {isAdmin && (
              <Link href="/admin" className="text-primary-foreground hover:text-accent transition-colors font-medium">
                Admin
              </Link>
            )}
            
            {/* Phone Button */}
            <a 
              href={CONTACT_INFO.phoneHref}
              className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold hover:bg-secondary/90 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            
            {/* Get Quote Button */}
            <QuoteModal>
              <button className="bg-accent text-accent-foreground px-6 py-2 rounded-md font-semibold hover:bg-accent/90 transition-colors">
                Get Free Quote
              </button>
            </QuoteModal>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2 touch-manipulation active:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-1">
            <Link href="/" className="block py-3 px-2 text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors touch-manipulation" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="block py-3 px-2 text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors touch-manipulation" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/services" className="block py-3 px-2 text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors touch-manipulation" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/locations" className="block py-3 px-2 text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors touch-manipulation" onClick={() => setIsOpen(false)}>
              Locations
            </Link>
            <Link href="/pricing" className="block py-3 px-2 text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors touch-manipulation" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <Link href="/contact" className="block py-3 px-2 text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors touch-manipulation" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link href="/blog" className="block py-3 px-2 text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors touch-manipulation" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            {isAdmin && (
              <Link href="/admin" className="block py-3 px-2 text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors touch-manipulation" onClick={() => setIsOpen(false)}>
                Admin
              </Link>
            )}

            <div className="pt-4 space-y-2">
              <a
                href={CONTACT_INFO.phoneHref}
                className="block w-full bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-semibold text-center hover:bg-secondary/90 transition-colors touch-manipulation"
              >
                Call Now
              </a>
              <QuoteModal>
                <button
                  className="block w-full bg-accent text-accent-foreground px-6 py-3 rounded-md font-semibold text-center hover:bg-accent/90 transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                >
                  Get Free Quote
                </button>
              </QuoteModal>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;