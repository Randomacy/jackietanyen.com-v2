import { mediaFeatures } from '@/data/media'
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/render'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return mediaFeatures.map((m) => ({ slug: m.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feature = mediaFeatures.find((m) => m.slug === slug)
  return renderOgImage({
    path: '~/media',
    title: feature?.title ?? slug,
    subtitle: feature ? `${feature.publication} — ${feature.description}` : undefined,
  })
}
