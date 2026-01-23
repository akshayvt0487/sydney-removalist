import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { regionCategories } from '@/data/suburbs';

interface NearbyLocationsProps {
  currentSuburbSlug: string;
  regionSlug: string;
}

const NearbyLocations = ({ currentSuburbSlug, regionSlug }: NearbyLocationsProps) => {
  // Find the current region
  const region = regionCategories.find(r => r.slug === regionSlug);
  
  if (!region) return null;

  // Get nearby suburbs (same region, excluding current suburb)
  const nearbySuburbs = region.suburbs
    .filter(suburb => suburb.slug !== currentSuburbSlug)
    .slice(0, 10); // Show up to 10 nearby locations

  if (nearbySuburbs.length === 0) return null;

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-secondary" />
              <h2 className="text-4xl font-bold text-foreground">Nearby Locations</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Explore our professional removalist services in nearby areas
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
            {nearbySuburbs.map((suburb) => (
              <Link
                key={suburb.slug}
                href={`/locations/${regionSlug}/${suburb.slug}`}
                className="group relative block px-6 py-5 bg-gradient-to-br from-card to-card/80 border-2 border-border rounded-xl text-center hover:border-secondary hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-0.8rem)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/0 group-hover:from-secondary/5 group-hover:to-accent/5 transition-all" />
                <div className="relative">
                  <MapPin className="w-5 h-5 text-secondary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-base font-bold text-foreground group-hover:text-secondary transition-colors block">
                    {suburb.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbyLocations;