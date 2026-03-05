import Link from 'next/link'
import { articles } from '@/data/articles'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { ArticleRow } from '@/components/articles/ArticleRow'

export const metadata = {
  title: 'articles — jackie tan yen',
}

export default function ArticlesPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="min-h-screen px-4 py-12 max-w-3xl mx-auto">
      <div className="mb-8 space-y-2">
        <div className="text-sm text-terminal-dim">
          <Link href="/" className="hover:text-terminal-text transition-colors duration-150">~/</Link>
          <span className="text-terminal-text">articles</span>
        </div>
        <TerminalPrompt command="cat articles.log | sort -r" />
      </div>

      <div>
        {sorted.map((article, i) => (
          <ArticleRow key={article.slug ?? `external-${i}`} article={article} />
        ))}
      </div>
    </main>
  )
}
