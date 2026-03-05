import { notFound } from 'next/navigation'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { articles } from '@/data/articles'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles
    .filter((a) => a.type === 'hosted' && a.slug)
    .map((a) => ({ slug: a.slug! }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return { title: `${article.title} — jackie tan yen` }
}

function getMdxContent(slug: string): string | null {
  const filePath = path.join(process.cwd(), 'content', 'articles', `${slug}.mdx`)
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article || article.type !== 'hosted') notFound()

  const mdxContent = getMdxContent(slug)
  if (!mdxContent) notFound()

  return (
    <main className="min-h-screen px-4 py-12 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-terminal-dim">
        <Link href="/" className="hover:text-terminal-text transition-colors duration-150">~/</Link>
        <Link href="/articles" className="hover:text-terminal-text transition-colors duration-150">articles/</Link>
        <span className="text-terminal-text">{article.slug}</span>
      </div>

      {/* Header */}
      <div className="mb-10 space-y-3 pb-6 border-b border-terminal-border">
        <h1 className="text-2xl text-terminal-text font-medium leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-terminal-dim">
          {article.publication && <span>{article.publication}</span>}
          <span>{formatDate(article.date)}</span>
          <div className="flex flex-wrap gap-1">
            {article.topics.map((t) => (
              <span key={t} className="border border-terminal-border rounded px-1.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-terminal-dim leading-relaxed">{article.description}</p>
      </div>

      {/* MDX content */}
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
    </main>
  )
}
