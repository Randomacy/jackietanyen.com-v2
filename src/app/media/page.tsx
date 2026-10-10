import { mediaFeatures } from '@/data/media'
import { pageMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { PageHeader } from '@/components/layout/PageHeader'
import { MediaRow } from '@/components/media/MediaRow'

export const metadata = pageMetadata({
  title: 'Media, Talks & Press',
  description: 'Press features, interviews, talks, and panels featuring Jackie Tan Yen — Forbes 30 Under 30 Asia, TEDx, Tatler Gen.T, and more.',
  path: '/media',
})

export default function MediaPage() {
  const sorted = [...mediaFeatures].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="px-4 py-8 md:py-12 max-w-2xl mx-auto">
      <Breadcrumb items={[{ name: 'Media, Talks & Press', label: 'media', path: '/media' }]} />
      <PageHeader command="grep -r 'jackie' ./press/" title="media">
        press features, interviews, talks, and panels — newest first.
      </PageHeader>

      <ul className="border-t border-terminal-border">
        {sorted.map((feature) => (
          <li key={feature.slug}>
            <MediaRow feature={feature} />
          </li>
        ))}
      </ul>
    </main>
  )
}
