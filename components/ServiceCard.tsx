import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  image: any; // Accepts static import or string url
  slug: string;
  badge?: string;
}

const ServiceCard = ({ title, description, image, slug, badge }: ServiceCardProps) => {
  return (
    <Link 
      href={`/services/${slug}`} 
      className="group block h-full animate-fade-in-up"
    >
      <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full border border-border group-hover:-translate-y-2 group-hover:scale-[1.02] flex flex-col">
        <div className="relative h-56 overflow-hidden flex-shrink-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"></div>
          
          <Image
            src={image}
            alt={`${title} service`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            placeholder="blur"
          />
          
          <div className="absolute bottom-4 left-4 z-20">
            <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
              {badge || 'Professional Service'}
            </div>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold mb-3 text-card-foreground group-hover:text-secondary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mb-6 line-clamp-2 flex-grow">
            {description}
          </p>
          <span className="text-secondary font-bold inline-flex items-center group-hover:gap-3 gap-2 transition-all mt-auto">
            Learn More
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ServiceCard;