import Image from 'next/image';
import removalistHero from '@/assets/removalist-hero.jpg';

const StatsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Top Reviewed Removalist
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Image side */}
          <div className="relative animate-fade-in">
            <div className="bg-muted rounded-2xl overflow-hidden relative h-[400px] w-full">
              <Image 
                src={removalistHero} 
                alt="Professional Sydney removalist holding moving box with confidence" 
                fill
                className="object-cover"
                placeholder="blur"
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -top-4 -right-4 bg-accent rounded-full p-6 shadow-lg z-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-accent-foreground fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <div className="text-xs text-primary mt-1">Ave. Star Rating</div>
              </div>
            </div>
          </div>

          {/* Stats side */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-accent rounded-2xl p-8 text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">207</div>
              <div className="text-lg text-primary font-medium">of reviews on Google</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-2xl font-bold text-foreground">100%</span>
                </div>
                <div className="text-sm text-muted-foreground">Satisfaction Guaranteed</div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-2xl font-bold text-foreground">24/7</span>
                </div>
                <div className="text-sm text-muted-foreground">Customer Support</div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center col-span-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-2xl font-bold text-foreground">15+</span>
                </div>
                <div className="text-sm text-muted-foreground">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;