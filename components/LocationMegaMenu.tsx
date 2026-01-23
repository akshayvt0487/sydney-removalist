"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
// I will ask for this file next if you don't have it!
import { regionCategories } from '@/data/suburbs'; 

const LocationMegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState(regionCategories[0]?.id); // Added safe check ?.id
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const activeRegionData = regionCategories.find(r => r.id === activeRegion);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-primary-foreground hover:text-accent transition-colors font-medium flex items-center gap-1"
        onMouseEnter={() => setIsOpen(true)}
      >
        Locations
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed left-0 right-0 mx-auto w-[900px] max-w-[95vw] bg-white rounded-lg shadow-2xl overflow-hidden border border-border"
          style={{ 
            top: '70px', 
            zIndex: 9999
          }}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="grid grid-cols-4">
            {/* Left sidebar - Region categories */}
            <div className="col-span-1 bg-charcoal text-white p-4">
              <h3 className="text-sm font-bold mb-4 text-accent uppercase tracking-wide">Regions</h3>
              <ul className="space-y-1">
                {regionCategories.map((region) => (
                  <li key={region.id}>
                    <button
                      onClick={() => setActiveRegion(region.id)}
                      onMouseEnter={() => setActiveRegion(region.id)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                        activeRegion === region.id
                          ? 'bg-accent text-primary font-semibold'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      {region.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-white/20">
                <Link
                  href="/locations"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-accent text-primary px-4 py-2 rounded font-semibold hover:bg-accent/90 transition-colors text-sm"
                >
                  View All Locations
                </Link>
              </div>
            </div>

            {/* Right content - Suburbs grid */}
            <div className="col-span-3 p-6 bg-background">
              <h3 className="text-lg font-bold mb-4 text-foreground">
                {activeRegionData?.name} Suburbs
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {activeRegionData?.suburbs.map((suburb) => (
                  <Link
                    key={suburb.slug}
                    href={`/locations/${activeRegionData.slug}/${suburb.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start gap-2 p-2 rounded hover:bg-muted transition-colors group"
                  >
                    <svg
                      className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-foreground group-hover:text-secondary group-hover:font-medium transition-colors">
                      {suburb.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMegaMenu;