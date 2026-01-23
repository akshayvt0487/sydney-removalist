// File: data/suburbs.ts

export type Suburb = {
  name: string;
  slug: string;
};

export type RegionCategory = {
  id: string;
  name: string;
  slug: string;
  suburbs: Suburb[];
};

export type InterstateDestination = {
  name: string;
  slug: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  description: string;
};

// Suburbs organized by regions
export const regionCategories: RegionCategory[] = [
  {
    id: 'western-sydney',
    name: 'Western Sydney',
    slug: 'western-sydney',
    suburbs: [
      { name: 'Parramatta', slug: 'parramatta' },
      { name: 'Penrith', slug: 'penrith' },
      { name: 'Liverpool', slug: 'liverpool' },
      { name: 'Blacktown', slug: 'blacktown' },
      { name: 'Auburn', slug: 'auburn' },
      { name: 'Westmead', slug: 'westmead' },
      { name: 'Merrylands', slug: 'merrylands' },
      { name: 'Mount Druitt', slug: 'mount-druitt' }
    ]
  },
  {
    id: 'inner-sydney',
    name: 'Inner Sydney',
    slug: 'inner-sydney',
    suburbs: [
      { name: 'Sydney CBD', slug: 'sydney-cbd' },
      { name: 'Surry Hills', slug: 'surry-hills' },
      { name: 'Redfern', slug: 'redfern' },
      { name: 'Chippendale', slug: 'chippendale' },
      { name: 'Ultimo', slug: 'ultimo' },
      { name: 'Pyrmont', slug: 'pyrmont' },
      { name: 'The Rocks', slug: 'the-rocks' },
      { name: 'Barangaroo', slug: 'barangaroo' }
    ]
  },
  {
    id: 'south-sydney',
    name: 'South Sydney',
    slug: 'south-sydney',
    suburbs: [
      { name: 'Marrickville', slug: 'marrickville' },
      { name: 'Newtown', slug: 'newtown' },
      { name: 'Erskineville', slug: 'erskineville' },
      { name: 'Alexandria', slug: 'alexandria' },
      { name: 'Waterloo', slug: 'waterloo' },
      { name: 'Zetland', slug: 'zetland' },
      { name: 'Rosebery', slug: 'rosebery' },
      { name: 'Mascot', slug: 'mascot' }
    ]
  },
  {
    id: 'sutherland-shire',
    name: 'Sutherland Shire',
    slug: 'sutherland-shire',
    suburbs: [
      { name: 'Sutherland', slug: 'sutherland' },
      { name: 'Miranda', slug: 'miranda' },
      { name: 'Cronulla', slug: 'cronulla' },
      { name: 'Caringbah', slug: 'caringbah' },
      { name: 'Engadine', slug: 'engadine' },
      { name: 'Menai', slug: 'menai' },
      { name: 'Sylvania', slug: 'sylvania' },
      { name: 'Gymea', slug: 'gymea' }
    ]
  },
  {
    id: 'eastern-suburbs',
    name: 'Eastern Suburbs',
    slug: 'eastern-suburbs',
    suburbs: [
      { name: 'Bondi', slug: 'bondi' },
      { name: 'Bondi Beach', slug: 'bondi-beach' },
      { name: 'Coogee', slug: 'coogee' },
      { name: 'Randwick', slug: 'randwick' },
      { name: 'Maroubra', slug: 'maroubra' },
      { name: 'Double Bay', slug: 'double-bay' },
      { name: 'Woollahra', slug: 'woollahra' },
      { name: 'Paddington', slug: 'paddington' }
    ]
  },
  {
    id: 'north-shore',
    name: 'North Shore',
    slug: 'north-shore',
    suburbs: [
      { name: 'Chatswood', slug: 'chatswood' },
      { name: 'Mosman', slug: 'mosman' },
      { name: 'Neutral Bay', slug: 'neutral-bay' },
      { name: 'North Sydney', slug: 'north-sydney' },
      { name: 'Cremorne', slug: 'cremorne' },
      { name: 'Lane Cove', slug: 'lane-cove' },
      { name: 'Willoughby', slug: 'willoughby' },
      { name: 'St Leonards', slug: 'st-leonards' }
    ]
  },
  {
    id: 'inner-west',
    name: 'Inner West',
    slug: 'inner-west',
    suburbs: [
      { name: 'Leichhardt', slug: 'leichhardt' },
      { name: 'Balmain', slug: 'balmain' },
      { name: 'Glebe', slug: 'glebe' },
      { name: 'Annandale', slug: 'annandale' },
      { name: 'Rozelle', slug: 'rozelle' },
      { name: 'Lilyfield', slug: 'lilyfield' },
      { name: 'Haberfield', slug: 'haberfield' },
      { name: 'Ashfield', slug: 'ashfield' }
    ]
  },
  {
    id: 'northern-beaches',
    name: 'Northern Beaches',
    slug: 'northern-beaches',
    suburbs: [
      { name: 'Manly', slug: 'manly' },
      { name: 'Dee Why', slug: 'dee-why' },
      { name: 'Mona Vale', slug: 'mona-vale' },
      { name: 'Avalon', slug: 'avalon' },
      { name: 'Freshwater', slug: 'freshwater' },
      { name: 'Collaroy', slug: 'collaroy' },
      { name: 'Narrabeen', slug: 'narrabeen' },
      { name: 'Brookvale', slug: 'brookvale' }
    ]
  }
];

// Interstate destinations
export const interstateDestinations: InterstateDestination[] = [
  {
    name: 'Sydney to Melbourne',
    slug: 'sydney-to-melbourne',
    from: 'Sydney',
    to: 'Melbourne',
    distance: '877 km',
    duration: '9-10 hours',
    description: 'Professional interstate removalists for Sydney to Melbourne moves'
  },
  {
    name: 'Sydney to Brisbane',
    slug: 'sydney-to-brisbane',
    from: 'Sydney',
    to: 'Brisbane',
    distance: '923 km',
    duration: '10-11 hours',
    description: 'Reliable interstate moving service from Sydney to Brisbane'
  },
  {
    name: 'Sydney to Canberra',
    slug: 'sydney-to-canberra',
    from: 'Sydney',
    to: 'Canberra',
    distance: '286 km',
    duration: '3-4 hours',
    description: 'Fast and efficient Sydney to Canberra removalist services'
  },
  {
    name: 'Sydney to Adelaide',
    slug: 'sydney-to-adelaide',
    from: 'Sydney',
    to: 'Adelaide',
    distance: '1,417 km',
    duration: '15-16 hours',
    description: 'Long-distance removals from Sydney to Adelaide'
  },
  {
    name: 'Sydney to Gold Coast',
    slug: 'sydney-to-gold-coast',
    from: 'Sydney',
    to: 'Gold Coast',
    distance: '849 km',
    duration: '9-10 hours',
    description: 'Quality moving services between Sydney and Gold Coast'
  }
];

// Get all suburbs as a flat array
export const getAllSuburbs = () => {
  return regionCategories.flatMap(region => 
    region.suburbs.map(suburb => ({
      ...suburb,
      region: region.name,
      regionSlug: region.slug
    }))
  );
};

// Get suburbs by region
export const getSuburbsByRegion = (regionSlug: string) => {
  const region = regionCategories.find(r => r.slug === regionSlug);
  return region ? region.suburbs : [];
};

// Get suburb details
export const getSuburbDetails = (suburbSlug: string) => {
  for (const region of regionCategories) {
    const suburb = region.suburbs.find(s => s.slug === suburbSlug);
    if (suburb) {
      return {
        ...suburb,
        region: region.name,
        regionSlug: region.slug
      };
    }
  }
  return null;
};