import { schemaToJson } from '@/lib/seo-schema';

interface SchemaMarkupProps {
  schema: object | object[];
}

/**
 * Component to render JSON-LD Schema Markup
 * Usage: <SchemaMarkup schema={generateOrganizationSchema()} />
 */
export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: schemaToJson(schema)
      }}
    />
  );
}
