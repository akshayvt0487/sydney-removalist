import Link from 'next/link';
// Make sure you have this file created (I'll ask for it next if you don't!)
import { locations } from '@/data/locations';

const AreasWeService = () => {
  // We just take the first 6 locations to display
  const featuredAreas = locations.slice(0, 6);

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Areas We Service</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Servicing all of Sydney and across NSW with reliable removalist services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featuredAreas.map((area, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 animate-fade-in-up hover:scale-105 hover:shadow-xl" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{area.name}</h3>
              </div>
              <p className="text-white/70 mb-4">{area.description}</p>
              
              <Link 
                href={`/locations#${area.slug}`} 
                className="text-accent hover:text-accent/80 font-semibold inline-flex items-center gap-2 group"
              >
                View Details
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/locations" 
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            View All Service Areas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AreasWeService;