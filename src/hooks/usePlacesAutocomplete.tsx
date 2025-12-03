'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UsePlacesAutocompleteProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onPlaceSelected: (place: string) => void;
}

export const usePlacesAutocomplete = ({ inputRef, onPlaceSelected }: UsePlacesAutocompleteProps) => {
  const autocompleteRef = useRef<any>(null);
  const listenerRef = useRef<any>(null);
  
  const handlePlaceChanged = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.formatted_address) {
      onPlaceSelected(place.formatted_address);
    }
  }, [onPlaceSelected]);

  useEffect(() => {
    // Wait for Google Maps to load and input to be available
    const initAutocomplete = () => {
      if (!inputRef.current || !window.google?.maps?.places) return;
      
      // Clean up existing autocomplete
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }

      // Initialize autocomplete
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'au' },
        fields: ['formatted_address', 'address_components', 'geometry'],
        types: ['address']
      });

      // Listen for place selection
      listenerRef.current = autocompleteRef.current.addListener('place_changed', handlePlaceChanged);
    };

    // Small delay to ensure DOM is ready in modal context
    const timeoutId = setTimeout(initAutocomplete, 100);

    return () => {
      clearTimeout(timeoutId);
      if (listenerRef.current) {
        window.google?.maps?.event?.removeListener(listenerRef.current);
      }
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [inputRef, handlePlaceChanged]);

  return autocompleteRef;
};
