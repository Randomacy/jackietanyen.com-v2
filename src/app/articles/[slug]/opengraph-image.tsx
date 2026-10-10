import { articles } from '@/data/articles'
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/render'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return articles
    .filter((a) => a.type === 'hosted' && a.slug)
    .map((a) => ({ slug: a.slug! }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  return renderOgImage({
    path: '~/articles',
    title: article?.title ?? slug,
    subtitle: article?.description,
  })
}
