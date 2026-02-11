import { Package, Layers, Wrench, Power, Archive } from 'lucide-react';
import QuoteModal from './QuoteModal';

const ServicesQuickAccess = () => {
  const services = [
    { icon: Package, label: 'Packing' },
    { icon: Layers, label: 'Wraps' },
    { icon: Wrench, label: 'Dismantle' },
    { icon: Power, label: 'Reassemble' },
    { icon: Archive, label: 'Storage' }
  ];

  return (
    <section className="py-6 md:py-8 bg-gradient-to-r from-primary via-navy to-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Glassmorphism container */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-full shadow-2xl p-3 md:p-4">
            {/* Mobile: Grid Layout */}
            <div className="grid grid-cols-2 gap-2 md:hidden">
              {services.map((service, index) => (
                <button
                  key={index}
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-background border-2 border-border rounded-full hover:border-secondary hover:bg-secondary/5 transition-all group touch-manipulation"
                >
                  <service.icon className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="font-semibold text-foreground text-sm">{service.label}</span>
                </button>
              ))}
              <QuoteModal>
                <button className="col-span-2 flex items-center justify-center gap-2 px-6 py-4 bg-accent text-primary font-bold rounded-full hover:bg-accent/90 transition-all active:scale-95 shadow-lg touch-manipulation">
                  GET PRICES
                </button>
              </QuoteModal>
            </div>

            {/* Desktop: Flex Layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {services.map((service, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 px-6 py-3 bg-background border-2 border-border rounded-full hover:border-secondary hover:bg-secondary/5 transition-all group flex-shrink-0"
                >
                  <service.icon className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-foreground whitespace-nowrap">{service.label}</span>
                </button>
              ))}
              <QuoteModal>
                <button className="flex items-center gap-2 px-8 py-4 bg-accent text-primary font-bold rounded-full hover:bg-accent/90 transition-all hover:scale-105 shadow-lg whitespace-nowrap flex-shrink-0">
                  GET PRICES
                </button>
              </QuoteModal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesQuickAccess;