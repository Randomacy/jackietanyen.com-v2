import { articles } from '@/data/articles'
import { pageMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { PageHeader } from '@/components/layout/PageHeader'
import { ArticleRow } from '@/components/articles/ArticleRow'

export const metadata = pageMetadata({
  title: 'Articles',
  description: 'Writing by Jackie Tan Yen on startups, founding teams, and building tech products in Southeast Asia.',
  path: '/articles',
})

export default function ArticlesPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="px-4 py-8 md:py-12 max-w-2xl mx-auto">
      <Breadcrumb items={[{ name: 'Articles', label: 'articles', path: '/articles' }]} />
      <PageHeader command="cat articles.log | sort -r" title="articles">
        writing on startups, founding teams, and building in southeast asia.
      </PageHeader>

      <ul className="border-t border-terminal-border">
        {sorted.map((article, i) => (
          <li key={article.slug ?? `external-${i}`}>
            <ArticleRow article={article} />
          </li>
        ))}
      </ul>
    </main>
  )
}
