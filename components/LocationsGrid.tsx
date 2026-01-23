import Link from 'next/link';
import { locations } from '@/data/locations';

const LocationsGrid = ({ limit }: { limit?: number }) => {
  const displayLocations = limit ? locations.slice(0, limit) : locations;

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Areas We Serve</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional removalist services across Greater Sydney and beyond
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayLocations.map((location) => (
            <div key={location.id} className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-3">
                <svg className="w-6 h-6 text-secondary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-xl font-bold text-card-foreground">{location.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{location.description}</p>
              <div className="text-sm text-muted-foreground">
                {location.areas.slice(0, 3).map((area, index) => (
                  <span key={index}>
                    {area}
                    {index < Math.min(location.areas.length, 3) - 1 ? ', ' : ''}
                  </span>
                ))}
                {location.areas.length > 3 && ' + more'}
              </div>
            </div>
          ))}
        </div>
        {limit && locations.length > limit && (
          <div className="text-center mt-12">
            <Link
              href="/locations"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-md font-semibold hover:bg-secondary/90 transition-colors inline-block"
            >
              View All Locations
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationsGrid;