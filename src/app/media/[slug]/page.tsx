import { notFound } from 'next/navigation'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mediaFeatures } from '@/data/media'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return mediaFeatures.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const feature = mediaFeatures.find((m) => m.slug === slug)
  if (!feature) return {}
  return { title: `${feature.title} — jackie tan yen` }
}

function getMdxContent(slug: string): string | null {
  const filePath = path.join(process.cwd(), 'content', 'media', `${slug}.mdx`)
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return null
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function MediaFeaturePage({ params }: Props) {
  const { slug } = await params
  const feature = mediaFeatures.find((m) => m.slug === slug)
  if (!feature) notFound()

  const mdxContent = getMdxContent(slug)
  if (!mdxContent) notFound()

  return (
    <main className="min-h-screen px-4 py-12 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-terminal-dim">
        <Link href="/" className="hover:text-terminal-text transition-colors duration-150">~/</Link>
        <Link href="/media" className="hover:text-terminal-text transition-colors duration-150">media/</Link>
        <span className="text-terminal-text">{feature.slug}</span>
      </div>

      {/* Header */}
      <div className="mb-10 space-y-3 pb-6 border-b border-terminal-border">
        <h1 className="text-2xl text-terminal-text font-medium leading-tight">
          {feature.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-terminal-dim">
          <span>{feature.publication}</span>
          <span>{formatDate(feature.date)}</span>
          <div className="flex flex-wrap gap-1">
            {feature.topics.map((t) => (
              <span key={t} className="border border-terminal-border rounded px-1.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MDX summary */}
      <article className="prose prose-invert prose-sm max-w-none
        prose-headings:font-mono prose-headings:text-terminal-text
        prose-p:text-terminal-dim prose-p:leading-relaxed
        prose-a:text-terminal-accent prose-a:no-underline hover:prose-a:underline
        prose-code:text-terminal-green prose-code:bg-terminal-surface prose-code:px-1 prose-code:rounded
        prose-pre:bg-terminal-surface prose-pre:border prose-pre:border-terminal-border
        prose-strong:text-terminal-text
        prose-hr:border-terminal-border
      ">
        <MDXRemote source={mdxContent} />
      </article>

      {/* Original source */}
      <div className="mt-10 pt-6 border-t border-terminal-border">
        <a
          href={feature.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-terminal-dim hover:text-terminal-accent transition-colors duration-150"
        >
          read the original at {feature.publication} ↗
        </a>
      </div>
    </main>
  )
}
