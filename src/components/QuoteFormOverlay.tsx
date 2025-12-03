"use client";
import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { usePlacesAutocomplete } from '@/hooks/usePlacesAutocomplete';
import { AlertCircle } from 'lucide-react';

interface FormErrors {
  movingFrom?: string;
  movingTo?: string;
  moveDate?: string;
  moveTime?: string;
  moveSize?: string;
  fullName?: string;
  phone?: string;
  email?: string;
}

interface QuoteFormOverlayProps {
  onSuccess?: () => void;
}

const QuoteFormOverlay = ({ onSuccess }: QuoteFormOverlayProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();
  const router = useRouter();
  const movingFromRef = useRef<HTMLInputElement>(null);
  const movingToRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    movingFrom: '',
    movingTo: '',
    moveDate: '',
    moveTime: '',
    moveSize: '',
    fullName: '',
    phone: '',
    email: '',
    details: ''
  });

  // Stable callbacks to prevent autocomplete reinitialization
  const handleMovingFromSelected = useCallback((place: string) => {
    setFormData(prev => ({ ...prev, movingFrom: place }));
    setErrors(prev => ({ ...prev, movingFrom: undefined }));
  }, []);

  const handleMovingToSelected = useCallback((place: string) => {
    setFormData(prev => ({ ...prev, movingTo: place }));
    setErrors(prev => ({ ...prev, movingTo: undefined }));
  }, []);

  // Initialize Google Places Autocomplete for both fields
  usePlacesAutocomplete({
    inputRef: movingFromRef,
    onPlaceSelected: handleMovingFromSelected
  });

  usePlacesAutocomplete({
    inputRef: movingToRef,
    onPlaceSelected: handleMovingToSelected
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.movingFrom.trim()) {
      newErrors.movingFrom = 'Moving from address is required';
    }
    if (!formData.movingTo.trim()) {
      newErrors.movingTo = 'Moving to address is required';
    }
    if (!formData.moveDate) {
      newErrors.moveDate = 'Moving date is required';
    } else {
      const selectedDate = new Date(formData.moveDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.moveDate = 'Moving date cannot be in the past';
      }
    }
    if (!formData.moveTime) {
      newErrors.moveTime = 'Moving time is required';
    }
    if (!formData.moveSize) {
      newErrors.moveSize = 'Please select a move size';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[\d\s\-+()]{8,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert({
          moving_from: formData.movingFrom.trim(),
          moving_to: formData.movingTo.trim(),
          moving_date: formData.moveDate,
          moving_time: formData.moveTime,
          move_size: formData.moveSize,
          full_name: formData.fullName.trim(),
          phone_number: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
          additional_details: formData.details.trim() || null,
          status: 'new'
        });

      if (error) throw error;

      // Send email notification (don't block on this)
      supabase.functions.invoke('send-quote-notification', {
        body: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phoneNumber: formData.phone.trim(),
          movingFrom: formData.movingFrom.trim(),
          movingTo: formData.movingTo.trim(),
          movingDate: formData.moveDate,
          movingTime: formData.moveTime,
          moveSize: formData.moveSize,
          additionalDetails: formData.details.trim() || null,
        }
      }).catch(err => console.error('Email notification failed:', err));
      
      // Close modal if callback provided
      onSuccess?.();
      
      // Navigate to thank you page
      router.push('/thank-you');
      
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {message}
      </p>
    );
  };

  // Get today's date for min date attribute
  const today = typeof window !== 'undefined' ? new Date().toISOString().split('T')[0] : '2025-01-01';

  return (
    <div className="bg-navy rounded-2xl p-6 shadow-2xl border-4 border-yellow animate-scale-in">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white mb-1">Get Your Free Quote!</h3>
        <p className="text-sm text-white/80">
          Fill in the details below and we'll send the best quote to you!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="movingFrom" className="text-sm font-medium text-white">
              Moving From <span className="text-red-400">*</span>
            </Label>
            <Input
              ref={movingFromRef}
              id="movingFrom"
              placeholder="Start typing an address..."
              value={formData.movingFrom}
              onChange={handleInputChange('movingFrom')}
              className={`mt-1 ${errors.movingFrom ? 'border-red-400' : ''}`}
              autoComplete="off"
            />
            <ErrorMessage message={errors.movingFrom} />
          </div>
          <div>
            <Label htmlFor="movingTo" className="text-sm font-medium text-white">
              Moving To <span className="text-red-400">*</span>
            </Label>
            <Input
              ref={movingToRef}
              id="movingTo"
              placeholder="Start typing an address..."
              value={formData.movingTo}
              onChange={handleInputChange('movingTo')}
              className={`mt-1 ${errors.movingTo ? 'border-red-400' : ''}`}
              autoComplete="off"
            />
            <ErrorMessage message={errors.movingTo} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="moveDate" className="text-sm font-medium text-white">
              Moving Date <span className="text-red-400">*</span>
            </Label>
            <Input
              id="moveDate"
              type="date"
              min={today}
              value={formData.moveDate}
              onChange={handleInputChange('moveDate')}
              className={`mt-1 ${errors.moveDate ? 'border-red-400' : ''}`}
            />
            <ErrorMessage message={errors.moveDate} />
          </div>
          <div>
            <Label htmlFor="moveTime" className="text-sm font-medium text-white">
              Moving Time <span className="text-red-400">*</span>
            </Label>
            <Input
              id="moveTime"
              type="time"
              value={formData.moveTime}
              onChange={handleInputChange('moveTime')}
              className={`mt-1 ${errors.moveTime ? 'border-red-400' : ''}`}
            />
            <ErrorMessage message={errors.moveTime} />
          </div>
        </div>

        <div>
          <Label htmlFor="moveSize" className="text-sm font-medium text-white">
            Move Size <span className="text-red-400">*</span>
          </Label>
          <select
            id="moveSize"
            value={formData.moveSize}
            onChange={handleInputChange('moveSize')}
            className={`w-full mt-1 px-3 py-2 border rounded-md bg-background ${errors.moveSize ? 'border-red-400' : 'border-input'}`}
          >
            <option value="">Select size</option>
            <option value="Studio/1BR">Studio / 1 Bedroom</option>
            <option value="2BR">2 Bedrooms</option>
            <option value="3BR">3 Bedrooms</option>
            <option value="4BR+">4+ Bedrooms</option>
            <option value="Office/Commercial">Office / Commercial</option>
          </select>
          <ErrorMessage message={errors.moveSize} />
        </div>

        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-white">
            Full Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            className={`mt-1 ${errors.fullName ? 'border-red-400' : ''}`}
            maxLength={100}
          />
          <ErrorMessage message={errors.fullName} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-white">
              Phone Number <span className="text-red-400">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="04XX XXX XXX"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              className={`mt-1 ${errors.phone ? 'border-red-400' : ''}`}
              maxLength={15}
            />
            <ErrorMessage message={errors.phone} />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-white">
              Email Address <span className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              className={`mt-1 ${errors.email ? 'border-red-400' : ''}`}
              maxLength={255}
            />
            <ErrorMessage message={errors.email} />
          </div>
        </div>

        <div>
          <Label htmlFor="details" className="text-sm font-medium text-white">
            Any Further Details?
          </Label>
          <textarea
            id="details"
            placeholder="Tell us more about your move (optional)..."
            value={formData.details}
            onChange={handleInputChange('details')}
            className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background min-h-[60px]"
            maxLength={1000}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-yellow hover:bg-yellow/90 text-charcoal font-semibold py-3 text-base transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" className="text-charcoal" />
              Submitting...
            </span>
          ) : (
            'Get My Free Quote'
          )}
        </Button>

        <p className="text-xs text-white/60 text-center">
          By submitting, you agree to be contacted regarding your quote request.
        </p>
      </form>
    </div>
  );
};

export default QuoteFormOverlay;
