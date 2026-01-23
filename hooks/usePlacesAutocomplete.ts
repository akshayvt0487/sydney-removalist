import { useEffect, useRef, useCallback, RefObject } from 'react';

interface UsePlacesAutocompleteProps {
  // We explicitly allow 'null' to match how useRef is initialized
  inputRef: RefObject<HTMLInputElement | null>; 
  onPlaceSelected: (place: string) => void;
}

// Extend Window interface to include google
declare global {
  interface Window {
    google: any;
  }
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
      // Check if input exists and if Google Maps script is loaded
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
    const timeoutId = setTimeout(initAutocomplete, 500); // Increased slightly to 500ms to be safe

    return () => {
      clearTimeout(timeoutId);
      if (listenerRef.current) {
        // Safe check before removing listener
        if (window.google?.maps?.event) {
             window.google.maps.event.removeListener(listenerRef.current);
        }
      }
      if (autocompleteRef.current) {
        if (window.google?.maps?.event) {
            window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }
      }
    };
  }, [inputRef, handlePlaceChanged]);

  return autocompleteRef;
};