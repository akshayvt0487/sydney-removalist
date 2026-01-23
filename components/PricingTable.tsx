import { Home, Building2, Users, Truck, Package, CheckCircle, Star } from 'lucide-react';
// I will ask for this file next!
import { pricingPlans } from '@/data/pricing'; 
import QuoteModal from './QuoteModal';

const planIcons = [
  <Home className="w-8 h-8" key="home" />,
  <Building2 className="w-8 h-8" key="building" />,
  <Users className="w-8 h-8" key="users" />,
  <Truck className="w-8 h-8" key="truck" />,
  <Package className="w-8 h-8" key="package" />
];

const PricingTable = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 fill-secondary" />
            <span className="font-medium text-sm">Moving Packages</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Our Moving Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the package that fits your needs. Get a personalized quote for accurate pricing.
          </p>
        </div>
        
        {/* 3-column grid with centered last row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`bg-card rounded-2xl shadow-lg overflow-hidden flex flex-col border border-border/50 hover:shadow-2xl hover:border-secondary/40 hover:-translate-y-1 transition-all duration-300 group ${
                index >= 3 ? 'lg:last:col-start-2' : ''
              }`}
            >
              <div className="p-6 flex flex-col flex-grow">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {planIcons[index] || <Package className="w-8 h-8" />}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-card-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>
                
                <div className="border-t border-border/50 pt-5 mt-auto">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-card-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <QuoteModal>
                  <button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                    Get a Quote
                  </button>
                </QuoteModal>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <p className="text-sm">All quotes include GST, fuel, and tolls</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;