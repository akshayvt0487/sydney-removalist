import Link from 'next/link';
import Image from 'next/image';
import teamMovers from '@/assets/removalist/015 copy.webp';

const WhyPickUs = () => {
  const reasons = [
    '✓ Fully licensed and insured',
    '✓ Experienced professional movers',
    '✓ Modern fleet of trucks',
    '✓ Free quotes with no obligations',
    '✓ Competitive pricing',
    '✓ 7 days a week service',
    '✓ Careful handling of your belongings',
    '✓ On-time guaranteed'
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-yellow/90 to-yellow">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative animate-scale-in">
            <div className="rounded-2xl shadow-2xl overflow-hidden h-[500px] w-full relative">
              <Image 
                src={teamMovers} 
                alt="Professional Sydney removalist team loading moving truck with boxes" 
                fill
                
                className="object-cover"
                placeholder="blur"
              />
            </div>
          </div>

          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-5">
              Why pick Sydney Removalist?
            </h2>
            <p className="text-charcoal/80 mb-8 text-lg">
              We're not just another moving company. We're your trusted partner in making 
              your relocation smooth, efficient, and stress-free.
            </p>

            <div className="grid grid-cols-1 gap-3 mb-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-charcoal font-medium text-lg">{reason.replace('✓ ', '')}</span>
                </div>
              ))}
            </div>

            <Link 
              href="/about" 
              className="inline-flex items-center justify-center px-8 py-4 bg-charcoal text-white font-semibold rounded-lg hover:bg-charcoal/90 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPickUs;