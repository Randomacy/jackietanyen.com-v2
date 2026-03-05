import Link from 'next/link'
import type { Article } from '@/types/content'

type Props = {
  article: Article
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function ArticleRow({ article }: Props) {
  const href =
    article.type === 'hosted'
      ? `/articles/${article.slug}`
      : article.url ?? '#'

  const isExternal = article.type === 'external'

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="block group py-4 border-b border-terminal-border hover:border-terminal-accent/30 transition-colors duration-150"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-terminal-text group-hover:text-terminal-accent transition-colors duration-150 leading-snug">
              {article.title}
            </span>
            <span className="text-terminal-dim text-xs shrink-0">
              {isExternal ? '↗' : '→'}
            </span>
          </div>
          <p className="text-terminal-dim text-sm leading-relaxed mb-2">
            {article.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-terminal-dim">
            {article.publication && (
              <span>{article.publication}</span>
            )}
            <span>{formatDate(article.date)}</span>
            <div className="flex flex-wrap gap-1">
              {article.topics.map((t) => (
                <span key={t} className="border border-terminal-border rounded px-1.5 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
