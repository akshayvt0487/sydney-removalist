export const pricingPlans = [
  {
    id: 1,
    name: "1 Bedroom Home",
    price: "$60",
    period: "per 1/2 hr + GST",
    description: "Studio or small apartment with enough items to fit in a small truck.",
    features: [
      "2 Removalists",
      "10-20 cubic meter",
      "4.5T Truck"
    ],
    popular: false,
    cta: "Book Now"
  },
  {
    id: 2,
    name: "2 Bedroom Home",
    price: "$65",
    period: "per 1/2 hr + GST",
    description: "Big enough to transport a bachelor pad or a younger couple's home.",
    features: [
      "2 Removalists",
      "20-30 cubic meter",
      "6-8T Truck"
    ],
    popular: true,
    cta: "Book Now"
  },
  {
    id: 3,
    name: "3 Bedroom Home",
    price: "$70",
    period: "per 1/2 hr + GST",
    description: "This truck is big enough for a small family home with a pet.",
    features: [
      "2 Removalists",
      "30-40 cubic meter",
      "10-12T Truck"
    ],
    popular: false,
    cta: "Book Now"
  },
  {
    id: 4,
    name: "3-4 Bedroom Home",
    price: "$75",
    period: "per 1/2 hr + GST",
    description: "This is for an average-sized family home removal.",
    features: [
      "2 Removalists",
      "45-55 cubic meter",
      "12-14T Truck"
    ],
    popular: false,
    cta: "Book Now"
  },
  {
    id: 5,
    name: "3-4 Bedroom Home",
    price: "$100",
    period: "per 1/2 hr + GST",
    description: "Ideal for families with three or so kids and lot of stuff.",
    features: [
      "3 Removalists",
      "45-55 cubic meter",
      "12-14T Truck"
    ],
    popular: false,
    cta: "Book Now"
  }
];

export const additionalServices = [
  { name: "Packing Service", price: "$40-60/hour per packer" },
  { name: "Packing Materials Kit", price: "$120-280" },
  { name: "Piano Moving", price: "$180-450" },
  { name: "Heavy Items (>80kg)", price: "$80-250" },
  { name: "Storage (per week)", price: "$25-70" },
  { name: "Extra Insurance", price: "$40-120" },
  { name: "Weekend/Holiday Surcharge", price: "+15%" }
];

export const priceGuarantee = {
  title: "Best Price Match Guarantee",
  description: "Show us a comparable written quote and we'll match or beat it",
  terms: [
    "Quote must be from a licensed removalist company",
    "Services must be comparable in scope",
    "Subject to verification and availability",
    "Cannot be combined with other promotional offers"
  ]
};
