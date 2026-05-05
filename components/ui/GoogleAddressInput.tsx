"use client";

import { useEffect, useRef, useState } from "react";

interface GoogleAddressInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onAddressSelect?: (address: string) => void;
}

// Lazy load Google Maps API
const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
};

export default function GoogleAddressInput({ onAddressSelect, className, ...props }: GoogleAddressInputProps) {
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Google Maps script only when component mounts
    loadGoogleMapsScript()
      .then(() => setIsLoaded(true))
      .catch((error) => console.error("Error loading Google Maps:", error));
  }, []);

  useEffect(() => {
    if (!isLoaded || !autoCompleteRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
      // ❌ REMOVED: types: ["geocode"],
      // ✅ FIX: Removing 'types' allows Cities, States, Businesses, and Landmarks to show up.

      componentRestrictions: { country: "au" }, // Keep restricted to Australia
      fields: ["formatted_address", "geometry"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address && onAddressSelect) {
        onAddressSelect(place.formatted_address);
      }
    });
  }, [isLoaded, onAddressSelect]);

  return (
    <input
      ref={autoCompleteRef}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}