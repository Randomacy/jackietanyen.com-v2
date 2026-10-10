import { getAllArticles, getHostedArticle } from '@/lib/content'
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/render'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export async function generateStaticParams() {
  return (await getAllArticles())
    .filter((a) => a.type === 'hosted')
    .map((a) => ({ slug: a.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getHostedArticle(slug)
  return renderOgImage({
    path: '~/articles',
    title: article?.title ?? slug,
    subtitle: article?.description,
  })
}
