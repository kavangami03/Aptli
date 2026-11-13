/**
 * Renders JSON-LD the way the Next 16 docs recommend: a plain <script> in the
 * page/layout, with `<` escaped to prevent XSS via injected strings.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
