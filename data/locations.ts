// Define the shape of our Location data
export interface Location {
  id: number;
  name: string;
  slug: string; // Added this field so your links work!
  areas: string[];
  description: string;
}

export const locations: Location[] = [
  {
    id: 1,
    name: "Sydney CBD",
    slug: "sydney-cbd",
    areas: ["Circular Quay", "The Rocks", "Barangaroo", "Darling Harbour"],
    description: "Full service coverage across Sydney's central business district"
  },
  {
    id: 2,
    name: "Eastern Suburbs",
    slug: "eastern-suburbs",
    areas: ["Bondi", "Coogee", "Randwick", "Maroubra", "Double Bay", "Woollahra"],
    description: "Comprehensive moving services throughout Sydney's eastern suburbs"
  },
  {
    id: 3,
    name: "Inner West",
    slug: "inner-west",
    areas: ["Newtown", "Marrickville", "Leichhardt", "Balmain", "Glebe", "Annandale"],
    description: "Expert removalist services across the inner west"
  },
  {
    id: 4,
    name: "North Shore",
    slug: "north-shore",
    areas: ["Chatswood", "Mosman", "Neutral Bay", "North Sydney", "Cremorne", "Lane Cove"],
    description: "Professional moving solutions for the north shore"
  },
  {
    id: 5,
    name: "Northern Beaches",
    slug: "northern-beaches",
    areas: ["Manly", "Dee Why", "Mona Vale", "Avalon", "Freshwater", "Collaroy"],
    description: "Reliable removals to and from the northern beaches"
  },
  {
    id: 6,
    name: "Western Suburbs",
    slug: "western-suburbs",
    areas: ["Parramatta", "Penrith", "Liverpool", "Blacktown", "Campbelltown", "Auburn"],
    description: "Complete moving services for western Sydney"
  },
  {
    id: 7,
    name: "Southern Suburbs",
    slug: "southern-suburbs",
    areas: ["Sutherland", "Miranda", "Cronulla", "Hurstville", "Kogarah", "Brighton"],
    description: "Quality removalist services in southern Sydney"
  },
  {
    id: 8,
    name: "Hills District",
    slug: "hills-district",
    areas: ["Castle Hill", "Baulkham Hills", "Rouse Hill", "Kellyville", "Bella Vista"],
    description: "Trusted moving solutions for the hills district"
  },
  {
    id: 9,
    name: "South West",
    slug: "south-west",
    areas: ["Bankstown", "Fairfield", "Cabramatta", "Macquarie Fields", "Ingleburn"],
    description: "Affordable and efficient moves in south western Sydney"
  },
  {
    id: 10,
    name: "Central Coast",
    slug: "central-coast",
    areas: ["Gosford", "Wyong", "Terrigal", "The Entrance", "Woy Woy"],
    description: "Extended services to the Central Coast region"
  },
  {
    id: 11,
    name: "Blue Mountains",
    slug: "blue-mountains",
    areas: ["Katoomba", "Penrith", "Springwood", "Blackheath", "Leura"],
    description: "Specialized moving for the Blue Mountains area"
  },
  {
    id: 12,
    name: "Interstate",
    slug: "interstate",
    areas: ["Melbourne", "Brisbane", "Canberra", "Newcastle", "Wollongong"],
    description: "Interstate moving services across Australia"
  }
];

export const serviceAreas = {
  title: "Areas We Serve",
  subtitle: "Professional removalist services across Greater Sydney and beyond",
  description: "We provide comprehensive moving services throughout Sydney, the Central Coast, Blue Mountains, and interstate destinations. No matter where you're moving, our experienced team is ready to help.",
  coverage: "All suburbs in Greater Sydney, Central Coast, Blue Mountains, and major interstate routes"
};