type Props = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

// Renders schema.org structured data. Multiple nodes are wrapped in an @graph.
export function JsonLd({ data }: Props) {
  const payload = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : { '@context': 'https://schema.org', ...data }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, '\\u003c') }}
    />
  )
}
