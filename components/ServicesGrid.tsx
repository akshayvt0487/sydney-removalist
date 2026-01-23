import Link from 'next/link';
import ServiceCard from './ServiceCard';
import { services } from '@/data/services';

const ServicesGrid = ({ limit }: { limit?: number }) => {
  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 bg-secondary/10 rounded-full">
            <span className="text-secondary font-semibold text-sm">OUR SERVICES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Professional Moving Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive moving services tailored to your specific needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.shortDescription}
              icon={service.icon}
              image={service.image}
              slug={service.slug}
              badge={service.badge}
            />
          ))}
        </div>
        
        {limit && services.length > limit && (
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="group inline-flex items-center bg-secondary text-secondary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              View All Services
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;