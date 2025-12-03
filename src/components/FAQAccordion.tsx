"use client";
import { useState } from 'react';
import Link from 'next/link';
import { faqData } from '@/data/faq';

interface FAQAccordionProps {
  limit?: number;
  items?: typeof faqData;
}

const FAQAccordion = ({ limit, items }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const displayFAQs = items || (limit ? faqData.slice(0, limit) : faqData);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {displayFAQs.map((faq, index) => (
            <div key={faq.id} className="bg-card rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-card-foreground pr-8">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-secondary flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-muted/30">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {limit && faqData.length > limit && (
          <div className="text-center mt-8">
            <Link href="/contact" className="text-secondary font-semibold hover:underline">
              Have more questions? Contact us →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQAccordion;
