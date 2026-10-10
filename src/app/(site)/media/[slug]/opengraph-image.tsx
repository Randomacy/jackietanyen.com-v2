import { getAllMedia, getMediaFeature } from '@/lib/content'
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/render'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export async function generateStaticParams() {
  return (await getAllMedia()).map((m) => ({ slug: m.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feature = await getMediaFeature(slug)
  return renderOgImage({
    path: '~/media',
    title: feature?.title ?? slug,
    subtitle: feature ? `${feature.publication} — ${feature.description}` : undefined,
  })
}
