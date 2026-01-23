import Image from 'next/image';
import phoneContactScreen from '@/assets/phone-contact-screen.jpg';
import QuoteModal from './QuoteModal';
import { CONTACT_INFO } from '@/data/contact';

const CallToActionPhone = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-navy via-navy to-secondary text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Phone Image Container */}
          <div className="relative animate-scale-in">
            <div className="relative z-10 mx-auto max-w-xs">
              <div className="bg-charcoal rounded-[3rem] p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="aspect-[9/19] bg-charcoal flex items-center justify-center relative w-full h-full">
                    {/* Next.js Optimized Image */}
                    <Image 
                      src={phoneContactScreen} 
                      alt="Sydney Removalist contact page showing free quote and support options"
                      width={300}
                      height={600}
                      className="w-full h-full object-cover"
                      placeholder="blur" // Nice loading effect
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Give Us a Call Today!
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Ready to move? Our friendly team is standing by to answer your questions 
              and provide you with a free, no-obligation quote. Call us now or request 
              a quote online!
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Call Us Now</div>
                  <a href={CONTACT_INFO.phoneHref} className="text-2xl font-bold hover:text-yellow transition-all duration-300 hover:scale-105 inline-block">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Email Us</div>
                  <a href={CONTACT_INFO.emailHref} className="text-lg hover:text-yellow transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <QuoteModal>
                <button className="inline-flex items-center justify-center px-8 py-4 bg-yellow text-charcoal font-semibold rounded-lg hover:bg-yellow/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  Get Free Quote
                </button>
              </QuoteModal>
              <a 
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-navy font-semibold rounded-lg hover:bg-white/90 transition-colors border-2 border-white"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionPhone;