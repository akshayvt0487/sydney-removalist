import QuoteModal from './QuoteModal';
import { CONTACT_INFO } from '@/data/contact';

const MovingMadeEasy = () => {
  const steps = [
    {
      number: '1',
      title: 'Available 24 hours & 7 days',
      description: 'We\'re always ready to help you move, any time of day or week that suits you best.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: '2',
      title: 'Pay half upfront & rest later',
      description: 'Flexible payment options to make your move more affordable and stress-free.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: '3',
      title: 'Heavy lifting',
      description: 'Our professional team handles all the heavy lifting so you don\'t have to.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Moving made easy!
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              We make your move stress-free with our professional services and dedicated team. 
              From packing to unpacking, we've got you covered every step of the way.
            </p>

            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4 animate-fade-in-up hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow rounded-full flex items-center justify-center text-charcoal font-bold text-xl">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <QuoteModal>
                <button className="inline-flex items-center justify-center px-8 py-4 bg-yellow text-charcoal font-semibold rounded-lg hover:bg-yellow/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get Free Quote
                </button>
              </QuoteModal>
              <a 
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-charcoal text-white font-semibold rounded-lg hover:bg-charcoal/90 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-up">
            {[
              {
                title: 'Available 24 hours & 7 days',
                description: 'Book your move at any time that suits your schedule, day or night.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Pay half upfront & rest later',
                description: 'Flexible payment terms to ease your budget concerns.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Heavy lifting',
                description: 'Professional movers handle all the heavy work safely.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <div key={index} className="bg-navy text-white p-6 rounded-xl flex gap-4 items-start hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingMadeEasy;
