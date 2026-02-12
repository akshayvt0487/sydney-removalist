import Link from 'next/link';
import Image from 'next/image';

// Assets
import stepQuote from '@/assets/removalist/022.webp';
import stepBooking from '@/assets/removalist/024.webp';
import stepMoving from '@/assets/removalist/08.webp';

const HowItWorksSteps = () => {
  const steps = [
    {
      title: 'Get a Free Quote',
      description: 'Fill out our simple quote form or give us a call. We\'ll provide you with a transparent, competitive quote with no hidden fees.',
      image: stepQuote
    },
    {
      title: 'Book Your Move',
      description: 'Choose your preferred date and time. We\'re flexible and work around your schedule, including weekends and holidays.',
      image: stepBooking
    },
    {
      title: 'We Handle Everything',
      description: 'Our professional team arrives on time, carefully packs and loads your belongings, and delivers them safely to your new location.',
      image: stepMoving
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Moving with us is simple and straightforward. Here's how we make it happen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative mb-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg relative">
                  <Image 
                    src={step.image} 
                    alt={`Step ${index + 1}: ${step.title} - Professional removalist service process`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-10">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors shadow-md hover:shadow-lg"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSteps;