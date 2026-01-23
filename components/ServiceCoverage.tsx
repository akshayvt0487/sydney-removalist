import Link from 'next/link';

const ServiceCoverage = () => {
  const coverageAreas = [
    { name: 'Sydney CBD', icon: '🏙️' },
    { name: 'Western Sydney', icon: '🏘️' },
    { name: 'Eastern Suburbs', icon: '🌊' },
    { name: 'Northern Beaches', icon: '🏖️' },
    { name: 'Inner West', icon: '🏡' },
    { name: 'South Sydney', icon: '🌳' },
    { name: 'North Shore', icon: '🌉' },
    { name: 'Hills District', icon: '⛰️' },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Service Coverage Areas
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide professional moving services across all Sydney metropolitan areas and beyond.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {coverageAreas.map((area, index) => (
              <div 
                key={index}
                className="bg-background p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 border border-border"
              >
                <div className="text-4xl mb-3">{area.icon}</div>
                <h3 className="font-semibold text-foreground">{area.name}</h3>
              </div>
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