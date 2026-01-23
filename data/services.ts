import residentialImg from '@/assets/residential-moving.jpg';
import officeImg from '@/assets/office-moving.jpg';
import packingImg from '@/assets/packing-service.jpg';
import storageImg from '@/assets/storage-solutions.jpg';
import furnitureImg from '@/assets/furniture-removal.jpg';
import interstateImg from '@/assets/interstate-moving.jpg';

export interface Service {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: any; // Next.js image object
  badge?: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  benefits: string[];
  reasons: string[];
  expectations: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    id: 1,
    slug: "residential-moving",
    title: "Residential Moving",
    shortDescription: "Complete house moving services for all property sizes across Sydney and beyond.",
    description: "Our residential moving service provides end-to-end moving solutions for homeowners. From small apartments to large family homes, we handle every aspect of your residential move with professionalism and care.",
    icon: "home",
    image: residentialImg,
    badge: "Most Popular",
    features: [
      "Full house packing and unpacking",
      "Furniture disassembly and reassembly",
      "Secure transport of all belongings",
      "Insurance coverage included",
      "Professional moving equipment",
      "Experienced residential movers"
    ],
    process: [
      { step: 1, title: "Free In-Home Quote", description: "We assess your property and provide an accurate moving quote" },
      { step: 2, title: "Move Planning", description: "Create a detailed timeline and moving plan for your house" },
      { step: 3, title: "Professional Packing", description: "Expert packing of all rooms with quality materials" },
      { step: 4, title: "Safe Transport", description: "Careful loading and secure transportation to new location" },
      { step: 5, title: "Setup & Unpack", description: "Unloading, unpacking, and setting up your new home" }
    ],
    benefits: [
      "Stress-free moving experience",
      "Protect your valuable possessions",
      "Fully insured and licensed",
      "Competitive house moving rates",
      "Available 7 days a week"
    ],
    reasons: [
      "Over 10 years of professional moving experience in Sydney",
      "Fully trained and police-checked professional movers",
      "Comprehensive insurance coverage for complete peace of mind",
      "Modern fleet of well-maintained moving trucks",
      "Transparent fixed-rate quotes with no hidden fees",
      "Available 7 days a week including public holidays"
    ],
    expectations: [
      { title: "Professional Team Arrival", description: "Our experienced movers arrive on time in uniform with all necessary equipment and materials ready to go." },
      { title: "Careful Item Protection", description: "Every item is wrapped, padded, and secured properly to prevent damage during transport using professional-grade materials." },
      { title: "Efficient Loading Process", description: "Strategic loading techniques maximize space and ensure safe transport, with heavier items secured first." },
      { title: "Safe Transportation", description: "Your belongings are transported using the most efficient routes with careful driving and regular safety checks." },
      { title: "Organized Unloading", description: "Items are unloaded systematically and placed in designated rooms according to your instructions." },
      { title: "Post-Move Support", description: "We ensure you're completely satisfied before leaving and address any concerns immediately." }
    ],
    faq: [
      {
        question: "How much does residential moving cost?",
        answer: "Residential moving costs depend on property size, distance, and services required. Contact us for a free, detailed quote tailored to your specific needs. We offer competitive rates with no hidden fees."
      },
      {
        question: "Do you provide packing materials for residential moves?",
        answer: "Yes, we supply all necessary packing materials including boxes, bubble wrap, tape, and furniture blankets. Materials can be purchased separately or included in a full packing service."
      },
      {
        question: "How far in advance should I book residential removalists?",
        answer: "We recommend booking 2-3 weeks in advance, especially during peak season (November-January). However, we also accommodate last-minute moves based on availability."
      }
    ]
  },
  {
    id: 2,
    slug: "office-relocation",
    title: "Office Relocation",
    shortDescription: "Professional office and commercial moving services with minimal business disruption.",
    description: "Our office relocation service is designed to minimize downtime and ensure your business is up and running quickly. We handle everything from IT equipment to furniture with precision and care.",
    icon: "building",
    image: officeImg,
    badge: "Business Moving",
    features: [
      "After-hours and weekend moves available",
      "IT equipment handling specialists",
      "Office furniture disassembly/reassembly",
      "Minimal business downtime",
      "Secure document handling",
      "Project management included"
    ],
    process: [
      { step: 1, title: "Site Assessment", description: "We evaluate your current and new office spaces to plan the move" },
      { step: 2, title: "Moving Plan", description: "Detailed timeline and logistics plan for minimal disruption" },
      { step: 3, title: "Packing & Labeling", description: "Systematic packing with clear labeling by department" },
      { step: 4, title: "Secure Transport", description: "Safe handling and transport of all office equipment" },
      { step: 5, title: "Setup & Configuration", description: "Unpack, setup furniture, and get your office operational" }
    ],
    benefits: [
      "Minimize business downtime",
      "Weekend and after-hours availability",
      "IT equipment specialists",
      "Comprehensive project management",
      "Competitive commercial rates"
    ],
    reasons: [
      "Experienced with businesses of all sizes from startups to corporations",
      "Specialized equipment for IT and sensitive electronics",
      "After-hours and weekend moves to minimize business disruption",
      "Project managers coordinate every aspect of your relocation",
      "Secure handling of confidential documents and data",
      "Efficient timeline management gets you operational quickly"
    ],
    expectations: [
      { title: "Detailed Planning Meeting", description: "We meet with your team to understand specific requirements, timelines, and critical equipment needs." },
      { title: "Department Coordination", description: "Color-coded labeling and department-by-department organization for efficient unpacking." },
      { title: "IT Equipment Care", description: "Specialized handling of computers, servers, and electronics with proper packing materials." },
      { title: "Furniture Handling", description: "Professional disassembly, transport, and reassembly of all office furniture." },
      { title: "Quick Setup", description: "Rapid unpacking and setup so your team can return to work with minimal delay." },
      { title: "Post-Move Support", description: "We stay until everything is in place and your office is fully operational." }
    ],
    faq: [
      {
        question: "Can you move our office over a weekend?",
        answer: "Yes! We specialize in weekend and after-hours office moves to minimize disruption to your business operations. We can have you fully operational by Monday morning."
      },
      {
        question: "How do you handle IT equipment during office moves?",
        answer: "Our team uses specialized packing materials for computers, servers, and electronics. We coordinate with your IT team and can arrange for equipment to be disconnected and reconnected."
      },
      {
        question: "How long does an office relocation take?",
        answer: "Office move duration depends on size and complexity. A small office (10-20 employees) typically takes 1-2 days, while larger offices may take 3-5 days. We provide a detailed timeline during planning."
      }
    ]
  },
  {
    id: 3,
    slug: "packing-services",
    title: "Packing Services",
    shortDescription: "Professional packing services - we pack everything safely and efficiently.",
    description: "Our professional packing service takes the stress out of moving. Our trained packers use quality materials and proven techniques to ensure all your belongings are protected for transport.",
    icon: "package",
    image: packingImg,
    badge: "Full Service",
    features: [
      "Professional packing techniques",
      "Quality packing materials included",
      "Fragile item specialists",
      "Kitchen and china packing",
      "Wardrobe box service",
      "Unpacking service available"
    ],
    process: [
      { step: 1, title: "Home Assessment", description: "Evaluate packing requirements for your home" },
      { step: 2, title: "Materials Delivery", description: "Bring all necessary boxes, wrap, and supplies" },
      { step: 3, title: "Systematic Packing", description: "Room-by-room professional packing" },
      { step: 4, title: "Labeling", description: "Clear labeling for easy unpacking" },
      { step: 5, title: "Ready for Moving", description: "Everything packed and ready for transport" }
    ],
    benefits: [
      "Save time and effort",
      "Professional protection for valuables",
      "Quality materials included",
      "Reduce risk of damage",
      "Perfect for busy families"
    ],
    reasons: [
      "Trained packing professionals with years of experience",
      "High-quality materials included in the service",
      "Specialized techniques for fragile and valuable items",
      "Room-by-room systematic approach",
      "Clear labeling makes unpacking easy",
      "Saves you days of packing time"
    ],
    expectations: [
      { title: "Packing Assessment", description: "We evaluate your belongings to determine materials and time needed for professional packing." },
      { title: "Quality Materials", description: "We arrive with boxes, bubble wrap, packing paper, tape, and specialty materials for fragile items." },
      { title: "Systematic Approach", description: "Our team packs room by room, keeping items organized for easy unpacking at your new home." },
      { title: "Fragile Item Care", description: "Extra attention and specialized wrapping for delicate items, glassware, and valuables." },
      { title: "Clear Labeling", description: "Every box clearly labeled with contents and destination room for efficient unpacking." },
      { title: "Optional Unpacking", description: "We offer unpacking services at your new location to complete your stress-free move." }
    ],
    faq: [
      {
        question: "What's included in the packing service?",
        answer: "Our packing service includes professional packers, all packing materials (boxes, bubble wrap, packing paper, tape), and systematic packing of your entire home. Unpacking service is also available."
      },
      {
        question: "How long does professional packing take?",
        answer: "Packing time depends on home size. A 2-bedroom apartment typically takes 3-4 hours, while a 4-bedroom house might take 6-8 hours with our professional team."
      },
      {
        question: "Can I choose which rooms to pack?",
        answer: "Absolutely! You can choose full-house packing or select specific rooms like the kitchen or fragile items only. We customize our service to your needs."
      }
    ]
  },
  {
    id: 4,
    slug: "furniture-assembly-disassembly",
    title: "Furniture Assembly/Disassembly",
    shortDescription: "Expert furniture assembly and disassembly services for safe moving and setup.",
    description: "Our furniture assembly and disassembly service ensures your furniture is properly taken apart for safe transport and expertly reassembled at your new location. Perfect for complex furniture, flat-pack assembly, and items that won't fit through doorways.",
    icon: "wrench",
    image: furnitureImg,
    badge: "Expert Assembly",
    features: [
      "Professional disassembly for moving",
      "Expert reassembly at destination",
      "IKEA and flat-pack assembly",
      "Bed frame and wardrobe specialists",
      "Office furniture setup",
      "All hardware carefully organized"
    ],
    process: [
      { step: 1, title: "Assessment", description: "Evaluate furniture requiring disassembly" },
      { step: 2, title: "Careful Disassembly", description: "Professional takedown with hardware organization" },
      { step: 3, title: "Safe Transport", description: "Secure packing of all components" },
      { step: 4, title: "Expert Reassembly", description: "Rebuild furniture at new location" },
      { step: 5, title: "Quality Check", description: "Ensure all items are sturdy and functional" }
    ],
    benefits: [
      "Prevents damage during moves",
      "Saves you time and frustration",
      "Professional tools and expertise",
      "Hardware never gets lost",
      "Perfect for complex furniture"
    ],
    reasons: [
      "Experienced with all furniture brands and types",
      "Professional tools for safe disassembly and assembly",
      "All screws, bolts, and hardware carefully labeled and organized",
      "Specialists in IKEA, flat-pack, and complex furniture",
      "Prevents damage to furniture and doorframes during moves",
      "Time-saving service for busy families and professionals"
    ],
    expectations: [
      { title: "Furniture Assessment", description: "We identify which items need disassembly and plan the best approach for each piece." },
      { title: "Organized Disassembly", description: "Careful takedown with all hardware labeled and bagged to prevent loss." },
      { title: "Component Protection", description: "All parts wrapped and protected for safe transport to your new location." },
      { title: "Expert Reassembly", description: "Professional rebuilding of all furniture using proper tools and techniques." },
      { title: "Stability Testing", description: "Each piece tested for stability and proper function after assembly." },
      { title: "Clean Finish", description: "All packaging removed and furniture positioned exactly where you want it." }
    ],
    faq: [
      {
        question: "What types of furniture can you assemble?",
        answer: "We handle all types including beds, wardrobes, desks, dining tables, bookshelves, IKEA furniture, and office furniture. If it has screws and bolts, we can assemble it."
      },
      {
        question: "Do you assemble new flat-pack furniture?",
        answer: "Yes! We offer standalone flat-pack assembly services for new IKEA and other brand furniture, even if you're not moving."
      },
      {
        question: "Is furniture assembly included in moving services?",
        answer: "Basic disassembly and reassembly is often included. Complex items or new flat-pack assembly may incur additional charges. We'll provide a clear quote upfront."
      }
    ]
  },
  {
    id: 5,
    slug: "storage-solutions",
    title: "Storage Solutions",
    shortDescription: "Secure storage facilities for short and long-term storage needs.",
    description: "Need temporary storage during your move? Our storage service provides secure, climate-controlled facilities perfect for settlement delays, renovations, or downsizing. Flexible terms and competitive rates.",
    icon: "warehouse",
    image: storageImg,
    badge: "Secure Storage",
    features: [
      "Climate-controlled storage",
      "24/7 security monitoring",
      "Flexible storage periods",
      "Direct delivery from storage",
      "Multiple unit sizes",
      "Inventory management"
    ],
    process: [
      { step: 1, title: "Consultation", description: "Determine storage needs and duration" },
      { step: 2, title: "Collection", description: "Professional packing and collection" },
      { step: 3, title: "Secure Storage", description: "Items stored in our secure facility" },
      { step: 4, title: "Flexible Access", description: "Access items when needed" },
      { step: 5, title: "Final Delivery", description: "Deliver to your new location when ready" }
    ],
    benefits: [
      "Flexible storage timelines",
      "Perfect for settlement delays",
      "Secure storage facilities",
      "Single provider convenience",
      "Competitive storage rates"
    ],
    reasons: [
      "Seamless integration of moving and storage services",
      "Climate-controlled and 24/7 monitored secure facilities",
      "Flexible storage periods from weeks to months",
      "Single provider for both services reduces complexity",
      "Competitive rates for combined moving and storage",
      "Professional inventory management and tracking"
    ],
    expectations: [
      { title: "Needs Assessment", description: "Detailed consultation to understand your storage duration and requirements." },
      { title: "Professional Packing", description: "Expert packing using quality materials suitable for storage conditions." },
      { title: "Secure Facility", description: "Your items stored in climate-controlled units with 24/7 security and monitoring." },
      { title: "Flexible Access", description: "Arrange access to your stored items when needed during the storage period." },
      { title: "Condition Maintenance", description: "Regular facility monitoring ensures your belongings remain in perfect condition." },
      { title: "Seamless Delivery", description: "Direct delivery from storage to your new location when you're ready." }
    ],
    faq: [
      {
        question: "How long can I store my items?",
        answer: "We offer flexible storage terms from one week to several months or longer. Monthly rates available for long-term storage needs."
      },
      {
        question: "Are my items insured in storage?",
        answer: "Basic insurance is included. We also offer comprehensive insurance coverage for valuable items. All storage facilities have 24/7 security monitoring."
      },
      {
        question: "Can I access my items while in storage?",
        answer: "Yes, you can arrange access to your stored items during business hours. We provide inventory lists to help you locate specific items."
      }
    ]
  },
  {
    id: 6,
    slug: "interstate-moves",
    title: "Interstate Moves",
    shortDescription: "Reliable interstate removalist services across Australia with door-to-door delivery.",
    description: "Moving interstate? Our interstate moving service provides comprehensive door-to-door relocation across Australia. From Sydney to Melbourne, Brisbane, Perth, Adelaide, and beyond - we handle your interstate move with care and precision.",
    icon: "map",
    image: interstateImg,
    badge: "Australia-Wide",
    features: [
      "Door-to-door interstate service",
      "All Australian capital cities",
      "Fixed-price interstate quotes",
      "Dedicated moving coordinator",
      "GPS tracking available",
      "Comprehensive transit insurance"
    ],
    process: [
      { step: 1, title: "Interstate Quote", description: "Get accurate fixed-price quote for your interstate move" },
      { step: 2, title: "Move Planning", description: "Detailed logistics planning for long-distance move" },
      { step: 3, title: "Professional Packing", description: "Secure packing for interstate transport" },
      { step: 4, title: "Interstate Transport", description: "Safe transport to your new state" },
      { step: 5, title: "Delivery & Setup", description: "Unloading and setup at your destination" }
    ],
    benefits: [
      "Fixed-price interstate quotes",
      "No hidden distance charges",
      "All major cities covered",
      "Dedicated move coordinator",
      "Full transit insurance included"
    ],
    reasons: [
      "Extensive experience with interstate relocations across Australia",
      "Fixed-price quotes with no hidden fees or distance charges",
      "Dedicated coordinator manages your entire interstate move",
      "Modern fleet suitable for long-distance transport",
      "Comprehensive insurance for peace of mind",
      "Regular routes to all Australian capital cities"
    ],
    expectations: [
      { title: "Fixed Price Quote", description: "Detailed interstate quote with no surprises - the price quoted is the price you pay." },
      { title: "Dedicated Coordinator", description: "Your personal move coordinator handles all logistics and keeps you informed." },
      { title: "Interstate Packing", description: "Extra secure packing methods designed for long-distance transport." },
      { title: "Professional Transport", description: "Experienced drivers familiar with interstate routes and regulations." },
      { title: "Tracking Updates", description: "Regular updates on your belongings' location during transport." },
      { title: "Complete Delivery", description: "Full unloading and placement service at your new interstate home." }
    ],
    faq: [
      {
        question: "Which interstate routes do you cover?",
        answer: "We cover all major routes including Sydney to Melbourne, Brisbane, Perth, Adelaide, Canberra, Darwin, and Hobart. We also service regional areas along these routes."
      },
      {
        question: "How long does an interstate move take?",
        answer: "Transit times vary by distance: Sydney to Melbourne is typically 2-3 days, Sydney to Brisbane 3-4 days, and Sydney to Perth 7-10 days. We provide specific timeframes with your quote."
      },
      {
        question: "Is insurance included for interstate moves?",
        answer: "Yes, comprehensive transit insurance is included with all interstate moves. We also offer additional coverage options for high-value items."
      }
    ]
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};