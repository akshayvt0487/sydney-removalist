import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSuburbDetails } from '@/data/suburbs';

// Define the Params Type
type Props = {
  params: Promise<{
    region: string;
    suburb: string;
  }>;
};

// This creates a redirect page to the canonical URL
// Google sees this as a 301 redirect to /{region}/{suburb}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params;
  const suburbDetails = getSuburbDetails(suburb);

  if (!suburbDetails) {
    return { title: 'Redirecting...' };
  }

  return {
    title: `Removalist in ${suburbDetails.name} | Sydney Removalist | Professional Moving`,
    description: `Professional removalist in ${suburbDetails.name}, ${suburbDetails.region}. Trusted moving services.`,
  };
}

// Redirect all /locations/[region]/[suburb] to /[region]/[suburb]
// This sends a 307 (temporary) redirect which Google treats appropriately
export default async function LocationsRedirectPage({ params }: Props) {
  const { region, suburb } = await params;
  const suburbDetails = getSuburbDetails(suburb);

  // Validate the suburb exists
  if (!suburbDetails) {
    redirect('/locations'); // Redirect to main locations page if invalid
  }

  // Validate region matches
  if (suburbDetails.regionSlug !== region) {
    redirect('/locations');
  }

  // Redirect to the canonical URL at /[region]/[suburb]
  redirect(`/${region}/${suburb}`);
}
