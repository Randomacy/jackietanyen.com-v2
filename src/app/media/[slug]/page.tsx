import { notFound } from 'next/navigation'
import Link from 'next/link'
import { mediaFeatures } from '@/data/media'
import { getMdxContent } from '@/lib/mdx'
import { formatDate } from '@/lib/format'
import { pageMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { MdxContent } from '@/components/mdx/MdxContent'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return mediaFeatures.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const feature = mediaFeatures.find((m) => m.slug === slug)
  if (!feature) return {}
  return pageMetadata({
    hasOwnImage: true,
    title: feature.title,
    description: feature.description,
    path: `/media/${slug}`,
    type: 'article',
    publishedTime: feature.date,
  })
}

export default async function MediaFeaturePage({ params }: Props) {
  const { slug } = await params
  const feature = mediaFeatures.find((m) => m.slug === slug)
  if (!feature) notFound()

  const mdxContent = getMdxContent('media', slug)
  if (!mdxContent) notFound()

  return (
    <main className="px-4 py-8 md:py-12 max-w-2xl mx-auto">
      <Breadcrumb
        items={[
          { name: 'Media, Talks & Press', label: 'media/', path: '/media' },
          { name: feature.title, label: feature.slug, path: `/media/${feature.slug}` },
        ]}
      />

      {/* Header */}
      <header className="mb-8 space-y-3 pb-6 border-b border-terminal-border">
        <h1 className="text-xl md:text-2xl text-terminal-text font-medium leading-tight">
          {feature.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] md:text-xs text-terminal-dim">
          <span>{feature.publication}</span>
          <time dateTime={feature.date}>{formatDate(feature.date, 'long')}</time>
          <div className="flex flex-wrap gap-1">
            {feature.topics.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </header>

      <MdxContent source={mdxContent} />

      <div className="mt-12 pt-6 border-t border-terminal-border flex flex-col gap-3 text-[13px] sm:flex-row sm:justify-between">
        <Link href="/media" className="terminal-link inline-block py-1">← all media</Link>
        {feature.url && (
          <a href={feature.url} target="_blank" rel="noopener noreferrer" className="terminal-link inline-block py-1">
            read the original at {feature.publication} ↗
          </a>
        )}
      </div>
    </main>
  )
}
