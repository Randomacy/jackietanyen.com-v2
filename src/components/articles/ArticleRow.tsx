import Link from 'next/link'
import type { Article } from '@/types/content'
import { formatDate } from '@/lib/format'

type Props = {
  article: Article
}

export function ArticleRow({ article }: Props) {
  const isExternal = article.type === 'external'
  const href = isExternal ? article.url ?? '#' : `/articles/${article.slug}`

  const body = (
    <>
      <h2 className="text-sm md:text-[15px] text-terminal-text group-hover:text-terminal-accent transition-colors duration-150 leading-snug mb-1">
        {article.title}
        <span className="ml-2 text-terminal-dim text-xs" aria-hidden="true">{isExternal ? '↗' : '→'}</span>
      </h2>
      <p className="text-terminal-dim text-xs md:text-[13px] leading-relaxed mb-2">
        {article.description}
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] md:text-xs text-terminal-dim">
        {article.publication && <span>{article.publication}</span>}
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <div className="flex flex-wrap gap-1">
          {article.topics.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </>
  )

  const className = 'block group py-4 border-b border-terminal-border hover:border-terminal-accent/30 transition-colors duration-150'

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{body}</a>
  ) : (
    <Link href={href} className={className}>{body}</Link>
  )
}
