import Image from 'next/image';
import removalistHero from '@/assets/removalist/03.webp';

const StatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Sydney's Top Reviewed Removalist
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by hundreds of satisfied customers across Sydney
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image side with rating badge */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[400px] group">
              <Image
                src={removalistHero}
                alt="Professional Sydney removalist team"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating rating badge */}
            <div className="absolute -top-4 -right-4 bg-yellow rounded-2xl p-6 shadow-xl z-10 border-4 border-white">
              <div className="text-center">
                <div className="text-4xl font-bold text-charcoal mb-1">4.9</div>
                <div className="flex gap-1 justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-charcoal fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <div className="text-xs font-semibold text-charcoal">Star Rating</div>
              </div>
            </div>
          </div>

          {/* Stats side */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Main review card */}
            <div className="bg-yellow rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-6xl md:text-7xl font-bold text-charcoal mb-2">224</div>
              <div className="text-xl font-semibold text-charcoal mb-4">Reviews on Google</div>
              <div className="flex items-center justify-center gap-2 text-charcoal/80">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Verified Reviews</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative bg-navy text-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg overflow-hidden group">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow/50 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-3 bg-yellow/20 rounded-xl group-hover:bg-yellow/30 transition-colors">
                      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <div className="text-sm text-white/90">Satisfaction</div>
                </div>
              </div>

              <div className="relative bg-navy text-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg overflow-hidden group">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/2 left-0 w-24 h-24 bg-yellow rounded-full -translate-y-1/2 -translate-x-1/2"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 bg-yellow/60 rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-3 bg-yellow/20 rounded-xl group-hover:bg-yellow/30 transition-colors">
                      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-white/90">Support</div>
                </div>
              </div>

              <div className="relative bg-navy text-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg overflow-hidden group">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-yellow rounded-full translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute top-0 left-1/2 w-14 h-14 bg-yellow/70 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-3 bg-yellow/20 rounded-xl group-hover:bg-yellow/30 transition-colors">
                      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">15+</div>
                  <div className="text-sm text-white/90">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;