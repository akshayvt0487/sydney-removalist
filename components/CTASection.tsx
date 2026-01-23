import QuoteModal from './QuoteModal';
import { CONTACT_INFO } from '@/data/contact';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-navy to-royal-blue text-primary-foreground relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Ready to Move with Sydney's Best?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-95">
            Get your free, no-obligation quote today and experience stress-free moving
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            
            {/* The QuoteModal handles the interactivity (Client Component) */}
            <QuoteModal>
              <button className="group bg-accent text-accent-foreground px-10 py-5 rounded-lg font-bold text-xl hover:bg-accent/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
                Get Free Quote
                <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </QuoteModal>

            <a
              href={CONTACT_INFO.phoneHref}
              className="group bg-primary-foreground text-primary px-10 py-5 rounded-lg font-bold text-xl hover:bg-primary-foreground/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {CONTACT_INFO.phone}
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 text-sm opacity-90">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free quotes
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No hidden fees
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Available 7 days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;