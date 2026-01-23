"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().min(8, 'Phone number must be at least 8 digits').max(20, 'Phone number is too long'),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200, 'Subject must be less than 200 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters')
});

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const router = useRouter(); // Updated from useNavigate
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const validateForm = (): boolean => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      // Insert into database with form_type = 'contact'
      const { error: dbError } = await supabase
        .from('form_submissions')
        .insert({
          form_type: 'contact',
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone_number: formData.phone.trim(),
          subject: formData.subject.trim(),
          additional_details: formData.message.trim(),
          status: 'new'
        });

      if (dbError) throw dbError;

      // Send email notification with retry logic
      let emailSent = false;
      let retryCount = 0;
      const maxRetries = 3;

      while (!emailSent && retryCount < maxRetries) {
        try {
          const { error: emailError } = await supabase.functions.invoke('send-quote-notification', {
            body: {
              formType: 'contact',
              fullName: formData.fullName.trim(),
              email: formData.email.trim(),
              phoneNumber: formData.phone.trim(),
              subject: formData.subject.trim(),
              message: formData.message.trim()
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

      // Navigate to thank you page with type
      router.push('/thank-you?type=contact');
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <p className="text-destructive text-sm mt-1">{error}</p>;
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Send Us a Message</h2>
            <p className="text-xl text-muted-foreground">
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2 text-card-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-background text-foreground ${errors.fullName ? 'border-destructive' : 'border-input'}`}
                  placeholder="Your full name"
                />
                <ErrorMessage error={errors.fullName} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-card-foreground">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-background text-foreground ${errors.email ? 'border-destructive' : 'border-input'}`}
                  placeholder="your.email@example.com"
                />
                <ErrorMessage error={errors.email} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-card-foreground">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-background text-foreground ${errors.phone ? 'border-destructive' : 'border-input'}`}
                  placeholder="04XX XXX XXX"
                />
                <ErrorMessage error={errors.phone} />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-card-foreground">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-background text-foreground ${errors.subject ? 'border-destructive' : 'border-input'}`}
                >
                  <option value="">Select a subject</option>
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Quote Follow-up">Quote Follow-up</option>
                  <option value="Service Question">Service Question</option>
                  <option value="Pricing Information">Pricing Information</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
                <ErrorMessage error={errors.subject} />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-card-foreground">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-background text-foreground ${errors.message ? 'border-destructive' : 'border-input'}`}
              />
              <ErrorMessage error={errors.message} />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-accent-foreground py-3 rounded-md font-semibold text-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Message...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;