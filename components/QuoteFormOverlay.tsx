"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, AlertCircle } from "lucide-react";
import GoogleAddressInput from "@/components/ui/GoogleAddressInput";
import { createClient } from "@/lib/supabase/client";

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

  // --- Handlers ---

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user types
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.movingFrom.trim()) newErrors.movingFrom = 'Address is required';
    if (!formData.movingTo.trim()) newErrors.movingTo = 'Address is required';
    
    if (!formData.moveDate) newErrors.moveDate = 'Date is required';
    else {
      const selected = new Date(formData.moveDate);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selected < today) newErrors.moveDate = 'Date cannot be in past';
    }

    if (!formData.moveTime) newErrors.moveTime = 'Time is required';
    if (!formData.moveSize) newErrors.moveSize = 'Select a size';
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\d\s\-+()]{8,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the highlighted fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      // 1. Insert into Supabase
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

      // 2. Send email notification with retry logic
      let emailSent = false;
      let retryCount = 0;
      const maxRetries = 3;

      while (!emailSent && retryCount < maxRetries) {
        try {
          const { error: emailError } = await supabase.functions.invoke('send-quote-notification', {
            body: {
              formType: 'quote',
              fullName: formData.fullName.trim(),
              email: formData.email.trim(),
              phoneNumber: formData.phone.trim(),
              movingFrom: formData.movingFrom.trim(),
              movingTo: formData.movingTo.trim(),
              movingDate: formData.moveDate,
              movingTime: formData.moveTime,
              moveSize: formData.moveSize,
              additionalDetails: formData.details.trim() || null
            }
          });

          if (!emailError) {
            emailSent = true;
          } else {
            throw emailError;
          }
        } catch (emailError) {
          retryCount++;
          console.error(`Email notification attempt ${retryCount} failed:`, emailError);

          if (retryCount >= maxRetries) {
            console.error('Email notification failed after 3 attempts:', emailError);
            // Log to a monitoring service in production
          } else {
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }
      }

      // 3. Success Feedback
      toast({
        title: "Quote Requested!",
        description: "We'll be in touch shortly with your price.",
      });

      if (onSuccess) onSuccess();
      router.push('/thank-you');

    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Could not submit form. Please call us directly.",
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

  const today = new Date().toISOString().split('T')[0];

  return (
    // Outer Wrapper: Navy Background + Yellow Border (Matches Old App)
    <div className="bg-navy rounded-2xl p-4 md:p-6 shadow-2xl border-4 border-yellow animate-scale-in text-white w-full">
      <div className="mb-4 pt-6 sm:pt-0">
        <h3 className="text-xl md:text-2xl font-bold mb-1">Get Your Free Quote!</h3>
        <p className="text-xs md:text-sm text-white/80">
          Fill in the details below and we&apos;ll send the best quote to you!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {/* Row 1: Addresses (Using Google Autocomplete) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div>
            <Label htmlFor="movingFrom" className="text-sm font-medium text-white">
              Moving From <span className="text-red-400">*</span>
            </Label>
            {/* UPDATED: Added value and onChange to enable manual typing */}
            <GoogleAddressInput
              id="movingFrom"
              placeholder="Start typing..."
              value={formData.movingFrom}
              onChange={handleInputChange('movingFrom')}
              className={`mt-1 bg-white text-charcoal border-none h-10 ${errors.movingFrom ? 'ring-2 ring-red-400' : ''}`}
              onAddressSelect={(val) => {
                setFormData(prev => ({ ...prev, movingFrom: val }));
                setErrors(prev => ({ ...prev, movingFrom: undefined }));
              }}
            />
            <ErrorMessage message={errors.movingFrom} />
          </div>
          <div>
            <Label htmlFor="movingTo" className="text-sm font-medium text-white">
              Moving To <span className="text-red-400">*</span>
            </Label>
            {/* UPDATED: Added value and onChange to enable manual typing */}
            <GoogleAddressInput
              id="movingTo"
              placeholder="Start typing..."
              value={formData.movingTo}
              onChange={handleInputChange('movingTo')}
              className={`mt-1 bg-white text-charcoal border-none h-10 ${errors.movingTo ? 'ring-2 ring-red-400' : ''}`}
              onAddressSelect={(val) => {
                setFormData(prev => ({ ...prev, movingTo: val }));
                setErrors(prev => ({ ...prev, movingTo: undefined }));
              }}
            />
            <ErrorMessage message={errors.movingTo} />
          </div>
        </div>

        {/* Row 2: Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div>
            <Label htmlFor="moveDate" className="text-sm font-medium text-white">
              Date <span className="text-red-400">*</span>
            </Label>
            <Input
              id="moveDate"
              type="date"
              min={today}
              value={formData.moveDate}
              onChange={handleInputChange('moveDate')}
              className={`mt-1 bg-white text-charcoal border-none h-10 ${errors.moveDate ? 'ring-2 ring-red-400' : ''}`}
            />
            <ErrorMessage message={errors.moveDate} />
          </div>
          <div>
            <Label htmlFor="moveTime" className="text-sm font-medium text-white">
              Time <span className="text-red-400">*</span>
            </Label>
            <Input
              id="moveTime"
              type="time"
              value={formData.moveTime}
              onChange={handleInputChange('moveTime')}
              className={`mt-1 bg-white text-charcoal border-none h-10 ${errors.moveTime ? 'ring-2 ring-red-400' : ''}`}
            />
            <ErrorMessage message={errors.moveTime} />
          </div>
        </div>

        {/* Row 3: Move Size */}
        <div>
          <Label htmlFor="moveSize" className="text-sm font-medium text-white">
            Move Size <span className="text-red-400">*</span>
          </Label>
          <select
            id="moveSize"
            value={formData.moveSize}
            onChange={handleInputChange('moveSize')}
            className={`w-full mt-1 px-3 h-10 rounded-md bg-white text-charcoal border-none text-sm ${errors.moveSize ? 'ring-2 ring-red-400' : ''}`}
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

        {/* Row 4: Personal Info */}
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-white">
            Full Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            className={`mt-1 bg-white text-charcoal border-none h-10 ${errors.fullName ? 'ring-2 ring-red-400' : ''}`}
          />
          <ErrorMessage message={errors.fullName} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-white">
              Phone <span className="text-red-400">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="04XX XXX XXX"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              className={`mt-1 bg-white text-charcoal border-none h-10 touch-manipulation ${errors.phone ? 'ring-2 ring-red-400' : ''}`}
            />
            <ErrorMessage message={errors.phone} />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-white">
              Email <span className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              className={`mt-1 bg-white text-charcoal border-none h-10 touch-manipulation ${errors.email ? 'ring-2 ring-red-400' : ''}`}
            />
            <ErrorMessage message={errors.email} />
          </div>
        </div>

        {/* Row 5: Details */}
        <div>
          <Label htmlFor="details" className="text-sm font-medium text-white">
            Any Further Details?
          </Label>
          <textarea
            id="details"
            placeholder="Tell us more about your move (optional)..."
            value={formData.details}
            onChange={handleInputChange('details')}
            className="w-full mt-1 px-3 py-2 rounded-md bg-white text-charcoal border-none min-h-[60px] text-sm"
            maxLength={1000}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow hover:bg-yellow/90 text-charcoal font-bold py-4 md:py-6 text-base md:text-lg transition-all duration-300 active:scale-95 md:hover:scale-[1.02] shadow-xl touch-manipulation"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </span>
          ) : (
            'Get My Free Quote'
          )}
        </Button>

        <p className="text-xs text-white/60 text-center mt-2">
          By submitting, you agree to be contacted regarding your quote request.
        </p>
      </form>
    </div>
  );
};

export default QuoteFormOverlay;