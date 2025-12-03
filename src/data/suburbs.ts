import * as SUBURB_DATA from './suburbs.js';

export const suburbs = (SUBURB_DATA as any).regionCategories.flatMap((region: any) =>
  region.suburbs.map((suburb: any) => ({
    ...suburb,
    region: region.name,
    regionSlug: region.slug,
    description: suburb.description || ''
  }))
);
