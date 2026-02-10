import QuoteModal from './QuoteModal';
import { CONTACT_INFO } from '@/data/contact';

interface ServicePricingProps {
  serviceName: string;
}

const ServicePricing = ({ serviceName }: ServicePricingProps) => {

  const pricingFactors = [
    {
      title: 'Distance',
      description: 'The distance between your current and new location affects the overall cost.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: 'Volume & Weight',
      description: 'The amount and weight of items to be moved impacts pricing.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: 'Access & Stairs',
      description: 'Difficult access or multiple flights of stairs may affect the quote.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: 'Additional Services',
      description: 'Packing, unpacking, and special item handling add value to your move.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Understanding Your {serviceName} Cost
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide transparent pricing based on several key factors. Get an accurate quote tailored to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {pricingFactors.map((factor, index) => (
              <div 
                key={index}
                className="bg-muted p-6 rounded-lg hover:shadow-lg transition-all duration-300 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {factor.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{factor.title}</h3>
                    <p className="text-muted-foreground">{factor.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary to-secondary p-8 md:p-12 rounded-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get Your Free, No-Obligation Quote Today
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Our quotes are completely free with no hidden fees. We'll provide a detailed breakdown so you know exactly what to expect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Note: Ensure you have migrated QuoteModal.tsx as well! */}
              <QuoteModal>
                <button 
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Free Quote Now
                </button>
              </QuoteModal>
              <a
                href={CONTACT_INFO.phoneHref}
                className="bg-white hover:bg-white/90 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePricing;