export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  moveType: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  fiveStarPercentage: number;
  recommendationRate: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Bondi to Manly",
    rating: 5,
    text: "Absolutely fantastic service! The team was professional, careful with our belongings, and made what could have been a stressful day so easy. They even assembled our furniture at the new place. Highly recommend!",
    date: "2 weeks ago",
    moveType: "Residential"
  },
  {
    id: 2,
    name: "James Chen",
    location: "Office Move - North Sydney",
    rating: 5,
    text: "We needed to relocate our entire office over a weekend to minimize business disruption. Sydney Removalist handled everything perfectly - from packing our IT equipment to setting up the new space. Professional team, great value.",
    date: "1 month ago",
    moveType: "Commercial"
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "Sydney to Melbourne",
    rating: 5,
    text: "Interstate move was seamless! Regular updates during transit, everything arrived on time and in perfect condition. The price was very competitive compared to other quotes we received. Thank you for making our big move stress-free!",
    date: "3 weeks ago",
    moveType: "Interstate"
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    location: "Parramatta to Castle Hill",
    rating: 5,
    text: "Best removalists I've used in 20 years! The guys were strong, efficient, and treated our antique furniture with such care. Completed the move faster than estimated. 10/10 would use again.",
    date: "1 week ago",
    moveType: "Residential"
  },
  {
    id: 5,
    name: "Lucy Anderson",
    location: "Newtown to Surry Hills",
    rating: 5,
    text: "From quote to completion, everything was professional and transparent. No hidden fees, arrived on time, and very reasonable pricing. The team was friendly and worked really hard. Couldn't be happier!",
    date: "2 months ago",
    moveType: "Residential"
  },
  {
    id: 6,
    name: "David Patel",
    location: "Mosman",
    rating: 5,
    text: "Needed urgent packing and storage services before an overseas move. Sydney Removalist accommodated us at short notice, packed everything carefully, and stored our items securely. Outstanding customer service throughout!",
    date: "3 weeks ago",
    moveType: "Packing & Storage"
  }
];

export const reviewStats: ReviewStats = {
  averageRating: 4.9,
  totalReviews: 207,
  fiveStarPercentage: 96,
  recommendationRate: 98
};