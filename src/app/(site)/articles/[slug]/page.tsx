import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllArticles, getArticleContent, getHostedArticle } from '@/lib/content'
import { formatDate } from '@/lib/format'
import { articleJsonLd, pageMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { JsonLd } from '@/components/JsonLd'
import { MdxContent } from '@/components/mdx/MdxContent'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return (await getAllArticles())
    .filter((a) => a.type === 'hosted')
    .map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = await getHostedArticle(slug)
  if (!article) return {}
  return pageMetadata({
    hasOwnImage: true,
    title: article.title,
    description: article.description,
    path: `/articles/${slug}`,
    type: 'article',
    publishedTime: article.date,
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getHostedArticle(slug)
  if (!article) notFound()

  const mdxContent = await getArticleContent(slug)

  const path = `/articles/${slug}`

  return (
    <main className="px-4 py-8 md:py-12 max-w-2xl mx-auto">
      <Breadcrumb
        items={[
          { name: 'Articles', label: 'articles/', path: '/articles' },
          { name: article.title, label: slug, path },
        ]}
      />
      <JsonLd data={articleJsonLd({ ...article, path })} />

      {/* Header */}
      <header className="mb-8 space-y-3 pb-6 border-b border-terminal-border">
        <h1 className="text-xl md:text-2xl text-terminal-text font-medium leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] md:text-xs text-terminal-dim">
          {article.publication && <span>{article.publication}</span>}
          <time dateTime={article.date}>{formatDate(article.date, 'long')}</time>
          <div className="flex flex-wrap gap-1">
            {article.topics.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
        <p className="text-terminal-dim text-[13px] md:text-sm leading-relaxed">{article.description}</p>
      </header>

      {mdxContent && <MdxContent source={mdxContent} />}

      <div className="mt-12 pt-6 border-t border-terminal-border flex flex-col gap-3 text-[13px] sm:flex-row sm:justify-between">
        <Link href="/articles" className="terminal-link inline-block py-1">← all articles</Link>
        {/* Original source, if this is an archived copy of a piece published elsewhere */}
        {article.url && (
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="terminal-link inline-block py-1">
            read the original at {article.publication} ↗
          </a>
        )}
      </div>
    </main>
  )
}
