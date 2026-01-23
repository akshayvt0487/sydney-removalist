interface ServiceExpectationsProps {
  expectations: Array<{
    title: string;
    description: string;
  }>;
}

const ServiceExpectations = ({ expectations }: ServiceExpectationsProps) => {
  return (
    <section className="py-16 bg-gradient-to-br from-muted to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What to Expect From Our Service
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We maintain the highest standards throughout every step of your moving experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {expectations.map((item, index) => (
              <div 
                key={index}
                className="bg-background p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-background p-8 rounded-lg border-2 border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  100% Satisfaction Guarantee
                </h3>
                <p className="text-muted-foreground">
                  We're committed to delivering exceptional service. If you're not completely satisfied, we'll make it right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceExpectations;