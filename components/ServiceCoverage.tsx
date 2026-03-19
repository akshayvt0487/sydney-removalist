import Link from 'next/link';

const ServiceCoverage = () => {
  // Featured suburbs with actual page links for Google to crawl
  const featuredSuburbs = [
    { name: 'Bondi', slug: 'bondi', regionSlug: 'eastern-suburbs', region: 'Eastern Suburbs' },
    { name: 'Manly', slug: 'manly', regionSlug: 'northern-beaches', region: 'Northern Beaches' },
    { name: 'Parramatta', slug: 'parramatta', regionSlug: 'western-sydney', region: 'Western Sydney' },
    { name: 'Chatswood', slug: 'chatswood', regionSlug: 'north-shore', region: 'North Shore' },
    { name: 'Marrickville', slug: 'marrickville', regionSlug: 'inner-west', region: 'Inner West' },
    { name: 'Rosebery', slug: 'rosebery', regionSlug: 'south-sydney', region: 'South Sydney' },
    { name: 'Penrith', slug: 'penrith', regionSlug: 'western-sydney', region: 'Western Sydney' },
    { name: 'Castle Hill', slug: 'castle-hill', regionSlug: 'hills-district', region: 'Hills District' },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Service Coverage - Popular Suburbs
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional removalist services across Sydney's most requested areas. Servicing 105+ suburbs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {featuredSuburbs.map((suburb, index) => (
              <Link
                key={suburb.slug}
                href={`/${suburb.regionSlug}/${suburb.slug}`}
                className="bg-background p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 border border-border hover:border-primary group"
              >
                <div className="text-2xl mb-2 font-bold text-primary">📍</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{suburb.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{suburb.region}</p>
              </Link>
            ))}
          </div>

          <div className="bg-background p-8 rounded-lg border border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Interstate Moving Available
                </h3>
                <p className="text-muted-foreground">
                  We also provide reliable interstate moving services to Melbourne, Brisbane, Canberra, and other major cities across Australia.
                </p>
              </div>
              <Link 
                href="/locations" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                View All Locations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCoverage;