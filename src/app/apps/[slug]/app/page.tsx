import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjects } from '@/lib/projects'
import { AppShell } from '@/components/apps/AppShell'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjects()
    .filter((p) => p.type === 'live')
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.title} (app) — jackie tan yen` }
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project || project.type !== 'live') notFound()

  const AppComponent = project.appComponent

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
