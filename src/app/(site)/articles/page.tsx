import { getAllArticles } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { PageHeader } from '@/components/layout/PageHeader'
import { ArticleRow } from '@/components/articles/ArticleRow'

export const metadata = pageMetadata({
  title: 'Articles',
  description: 'Writing by Jackie Tan Yen on startups, founding teams, and building tech products in Southeast Asia.',
  path: '/articles',
})

export default async function ArticlesPage() {
  const sorted = await getAllArticles()

  return (
    <main className="px-4 py-8 md:py-12 max-w-2xl mx-auto">
      <Breadcrumb items={[{ name: 'Articles', label: 'articles', path: '/articles' }]} />
      <PageHeader command="cat articles.log | sort -r" title="articles">
        writing on startups, founding teams, and building in southeast asia.
      </PageHeader>

      <ul className="border-t border-terminal-border">
        {sorted.map((article) => (
          <li key={article.slug}>
            <ArticleRow article={article} />
          </li>
        ))}
      </ul>
    </main>
  )
}
