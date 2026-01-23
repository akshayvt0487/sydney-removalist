import { renderSchema } from '@/lib/seo-schema';

interface SchemaMarkupProps {
  schema: object | object[];
}

/**
 * Component to render JSON-LD Schema Markup
 * Usage: <SchemaMarkup schema={generateOrganizationSchema()} />
 */
export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return renderSchema(schema);
}
