import { getAllProjects } from '@/lib/content'
import { getCategoryCounts } from '@/lib/filters'
import { pageMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { PageHeader } from '@/components/layout/PageHeader'
import { AppsContent } from './AppsContent'

export const metadata = pageMetadata({
  title: 'Projects & Apps',
  description: 'Startups, hackathon wins, prototypes, and side projects by Jackie Tan Yen — AI, fintech, web3, brain-computer interfaces, and more.',
  path: '/apps',
})

export default async function AppsPage() {
  const projects = await getAllProjects()
  const categories = getCategoryCounts(projects)

  return (
    <main className="px-4 py-8 md:py-12 max-w-5xl mx-auto">
      <Breadcrumb items={[{ name: 'Projects & Apps', label: 'apps', path: '/apps' }]} />
      <PageHeader command="ls -la ./apps" title="work/apps">
        startups, hackathon builds, prototypes, and side projects — {projects.length} in total.
      </PageHeader>

      <AppsContent projects={projects} categories={categories} />
    </main>
  )
}
