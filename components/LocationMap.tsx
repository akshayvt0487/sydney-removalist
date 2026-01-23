interface LocationMapProps {
  locationName: string;
  embedUrl?: string;
}

const LocationMap = ({ locationName, embedUrl }: LocationMapProps) => {
  // Use simple iframe embed without API key
  // Fixed the URL structure to ensure it renders correctly in Next.js (HTTPS)
  const query = encodeURIComponent(`${locationName}, Sydney, NSW, Australia`);
  const mapSrc = embedUrl || `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-foreground text-center">
            Service Area: {locationName}
          </h2>
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={mapSrc}
              width="600"
              height="450"
              style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${locationName}`}
            />
          </div>
          <p className="text-center text-muted-foreground mt-6">
            We provide professional removalist services to and from {locationName} and surrounding areas
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;