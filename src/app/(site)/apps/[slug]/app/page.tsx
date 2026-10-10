import { notFound } from 'next/navigation'
import { getAllProjects, getProject } from '@/lib/content'
import { appComponents } from '@/apps/registry'
import { AppShell } from '@/components/apps/AppShell'
import { pageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return (await getAllProjects())
    .filter((p) => p.type === 'live')
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return pageMetadata({
    title: `${project.title} (app)`,
    description: project.shortDescription,
    path: `/apps/${project.slug}/app`,
    noIndex: true,
  })
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project || project.type !== 'live') notFound()

  const AppComponent = appComponents[project.slug]

  return (
    <AppShell projectTitle={project.title} projectSlug={project.slug}>
      {AppComponent ? (
        <AppComponent />
      ) : (
        <div className="flex items-center justify-center h-full text-terminal-dim text-sm">
          app component not yet registered for{' '}
          <span className="text-terminal-text ml-1">{project.slug}</span>
        </div>
      )}
    </AppShell>
  )
}
