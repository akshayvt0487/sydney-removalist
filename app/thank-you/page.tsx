"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Phone, Mail, ArrowLeft, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '@/data/contact';

// Create a separate component for the logic that needs search params
function ThankYouContent() {
  const searchParams = useSearchParams();
  const formType = searchParams.get('type') || 'quote';
  const isContact = formType === 'contact';

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy via-navy/95 to-charcoal flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 animate-scale-in">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {isContact ? (
                <MessageSquare className="w-16 h-16 text-green-500" />
              ) : (
                <CheckCircle className="w-16 h-16 text-green-500" />
              )}
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Thank You!
          </h1>
          <p className="text-xl text-white/80 mb-8 animate-fade-in">
            {isContact 
              ? 'Your message has been sent successfully.'
              : 'Your quote request has been submitted successfully.'
            }
          </p>

          {/* What to Expect */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 animate-fade-in">
            <h2 className="text-2xl font-semibold text-white mb-4">What Happens Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-charcoal font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">
                    {isContact ? 'Message Received' : 'Review Your Request'}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {isContact 
                      ? 'Our team has received your message and will review it promptly.'
                      : 'Our team will review your moving details within the next 2 hours.'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-charcoal font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">
                    {isContact ? 'Review & Response' : 'Personalized Quote'}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {isContact 
                      ? 'We\'ll carefully review your enquiry and prepare a helpful response.'
                      : 'We\'ll prepare a competitive quote tailored to your specific needs.'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-charcoal font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">We'll Contact You</h3>
                  <p className="text-white/70 text-sm">
                    {isContact 
                      ? 'Expect a reply within 24 hours via your preferred contact method.'
                      : 'Expect a call or email from us shortly to discuss your move.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-yellow/10 rounded-xl p-6 mb-8 border border-yellow/30">
            <p className="text-white/80 mb-4">Need immediate assistance? Contact us directly:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={CONTACT_INFO.phoneHref}
                className="flex items-center justify-center gap-2 text-yellow hover:text-yellow/80 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">{CONTACT_INFO.phone}</span>
              </a>
              <a 
                href={CONTACT_INFO.emailHref}
                className="flex items-center justify-center gap-2 text-yellow hover:text-yellow/80 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">{CONTACT_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <Link href="/">
            <button 
              className="px-6 py-3 border border-white/30 text-white hover:bg-white/10 rounded-lg flex items-center justify-center mx-auto transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ThankYou() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-navy text-white">Loading...</div>}>
        <ThankYouContent />
      </Suspense>
    </>
  );
}