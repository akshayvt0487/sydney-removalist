import QuoteModal from './QuoteModal';
import { CONTACT_INFO } from '@/data/contact';
import { Clock, Shield, Dumbbell } from 'lucide-react';

const MovingMadeEasy = () => {
  // Left side - numbered steps
  const steps = [
    {
      number: '1',
      title: 'Request a Free Quote',
      description: 'Get an instant estimate for your move with no obligations or hidden fees.'
    },
    {
      number: '2',
      title: 'Schedule Your Move',
      description: 'Choose a date and time that works best for you - we offer flexible scheduling.'
    },
    {
      number: '3',
      title: 'Relax & Let Us Handle It',
      description: 'Our experienced team takes care of everything from packing to delivery.'
    }
  ];

  // Right side - feature cards
  const features = [
    {
      title: 'Available 24/7',
      description: 'We\'re always ready to help you move, any time of day or week that suits you best.',
      icon: <Clock className="w-8 h-8" />
    },
    {
      title: 'Fully Insured Moves',
      description: 'Complete peace of mind with comprehensive insurance coverage for all your belongings.',
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: 'Professional Team',
      description: 'Our trained experts handle all the heavy lifting and ensure safe transport of your items.',
      icon: <Dumbbell className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Text & List */}
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

          {/* Right Column: Cards */}
          <div className="space-y-6 animate-fade-in-up">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-navy text-white p-6 rounded-xl flex gap-4 items-start hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex-shrink-0 text-yellow">
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