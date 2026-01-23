// --- 1. Define Interfaces ---
export interface PricingPlan {
  id: number;
  name: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export interface AdditionalService {
  name: string;
}

export interface PriceGuarantee {
  title: string;
  description: string;
  terms: string[];
}

// --- 2. The Data ---
export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "1 Bedroom Home",
    description: "Studio or small apartment with enough items to fit in a small truck.",
    features: [
      "2 Removalists",
      "10-20 cubic meter",
      "4.5T Truck"
    ],
    popular: false,
    cta: "Get a Quote"
  },
  {
    id: 2,
    name: "2 Bedroom Home",
    description: "Big enough to transport a bachelor pad or a younger couple's home.",
    features: [
      "2 Removalists",
      "20-30 cubic meter",
      "6-8T Truck"
    ],
    popular: true,
    cta: "Get a Quote"
  },
  {
    id: 3,
    name: "3 Bedroom Home",
    description: "This truck is big enough for a small family home with a pet.",
    features: [
      "2 Removalists",
      "30-40 cubic meter",
      "10-12T Truck"
    ],
    popular: false,
    cta: "Get a Quote"
  },
  {
    id: 4,
    name: "3-4 Bedroom Home", // Note: You had two "3-4 Bedroom" entries, I kept them distinct by ID
    description: "This is for an average-sized family home removal.",
    features: [
      "2 Removalists",
      "45-55 cubic meter",
      "12-14T Truck"
    ],
    popular: false,
    cta: "Get a Quote"
  },
  {
    id: 5,
    name: "Large 4+ Bedroom Home", // Renamed slightly for clarity, feel free to revert
    description: "Ideal for families with three or so kids and lot of stuff.",
    features: [
      "3 Removalists",
      "45-55 cubic meter",
      "12-14T Truck"
    ],
    popular: false,
    cta: "Get a Quote"
  }
];

export const additionalServices: AdditionalService[] = [
  { name: "Packing Service" },
  { name: "Packing Materials Kit" },
  { name: "Piano Moving" },
  { name: "Heavy Items (>80kg)" },
  { name: "Storage (per week)" },
  { name: "Extra Insurance" },
  { name: "Weekend/Holiday Moves" }
];

export const priceGuarantee: PriceGuarantee = {
  title: "Best Price Match Guarantee",
  description: "Show us a comparable written quote and we'll match or beat it",
  terms: [
    "Quote must be from a licensed removalist company",
    "Services must be comparable in scope",
    "Subject to verification and availability",
    "Cannot be combined with other promotional offers"
  ]
};