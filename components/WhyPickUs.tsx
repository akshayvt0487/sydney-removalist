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
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-yellow/90 to-yellow">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
          <div className="relative animate-scale-in order-2 md:order-1">
            <div className="rounded-2xl shadow-2xl overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] w-full relative">
              <Image
                src={teamMovers}
                alt="Professional Sydney removalist team loading moving truck with boxes"
                fill
                className="object-cover"
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="animate-fade-in-up order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-4 md:mb-6 leading-tight">
              Why pick Sydney Removalist?
            </h2>
            <p className="text-charcoal/80 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
              We're not just another moving company. We're your trusted partner in making your relocation smooth, efficient, and stress-free.
            </p>

            <div className="grid grid-cols-1 gap-2 md:gap-3 mb-6 md:mb-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-charcoal font-medium text-base md:text-lg">{reason.replace('✓ ', '')}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-charcoal text-white font-semibold rounded-lg hover:bg-charcoal/90 transition-colors touch-manipulation"
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