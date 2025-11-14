/**
 * SchemaMarkup Component
 * Renders Schema.org JSON-LD structured data for SEO
 */

interface SchemaMarkupProps {
  schema: object | object[];
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  // Handle both single schema and array of schemas
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s)
          }}
        />
      ))}
    </>
  );
}
