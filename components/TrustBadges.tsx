const TrustBadges = () => {
  const badges = [
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
      ),
      title: "Fully Licensed & Insured",
      subtitle: "Complete protection for your move"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ),
      title: "5-Star Rated",
      subtitle: "Hundreds of happy customers"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      title: "Best Price Guaranteed",
      subtitle: "We'll beat any quote by 5%"
    }
  ];

  return (
    <section className="py-8 bg-gradient-to-br from-yellow/50 via-yellow/10 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border border-yellow/20"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow via-accent to-yellow rounded-t-2xl"></div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-gradient-to-br from-yellow/20 to-accent/20 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-300">
                  {badge.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors">{badge.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;