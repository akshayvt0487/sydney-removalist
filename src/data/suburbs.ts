import { regionCategories } from './suburbs.js';

export { regionCategories };

export const suburbs = regionCategories.flatMap(region =>
  region.suburbs.map(suburb => ({
    ...suburb,
    region: region.name,
    regionSlug: region.slug,
    description: suburb.description || ''
  }))
);
