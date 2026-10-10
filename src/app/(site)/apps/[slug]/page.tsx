import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllProjects, getProject, getProjectContent } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { MdxContent } from '@/components/mdx/MdxContent'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return (await getAllProjects()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return pageMetadata({
    hasOwnImage: true,
    title: project.title,
    description: project.shortDescription,
    path: `/apps/${project.slug}`,
  })
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const mdxContent = await getProjectContent(slug)

  return (
    <main className="px-4 py-8 md:py-12 max-w-2xl mx-auto">
      <Breadcrumb
        items={[
          { name: 'Projects & Apps', label: 'apps/', path: '/apps' },
          { name: project.title, label: project.slug, path: `/apps/${project.slug}` },
        ]}
      />

      {/* Project header */}
      <TerminalWindow title={`${project.slug} — info`}>
        <div className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-lg md:text-xl text-terminal-text font-medium leading-snug">{project.title}</h1>
            <StatusBadge variant="status" value={project.status} />
          </div>

          <p className="text-terminal-body text-[13px] md:text-sm leading-relaxed">{project.shortDescription}</p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <StatusBadge variant="type"   value={project.type} />
            <StatusBadge variant="origin" value={project.origin} />
            {project.categories.map((cat) => (
              <span key={cat} className="tag">{cat}</span>
            ))}
          </div>

          {project.builtAt && (
            <div className="text-xs text-terminal-dim">
              built: {project.builtAt}
            </div>
          )}

          {project.type === 'live' && (
            <Link
              href={`/apps/${project.slug}/app`}
              className="inline-block text-sm border border-terminal-accent text-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg transition-colors duration-150 rounded px-3 py-1.5"
            >
              launch app →
            </Link>
          )}
        </div>
      </TerminalWindow>

      {/* MDX writeup */}
      <div className="mt-8 md:mt-10">
        {mdxContent ? (
          <MdxContent source={mdxContent} />
        ) : (
          <div className="text-terminal-dim text-sm border border-terminal-border rounded-lg p-6">
            no writeup yet.
          </div>
        )}
      </div>

      <div className="mt-12 pt-6 border-t border-terminal-border text-[13px]">
        <Link href="/apps" className="terminal-link inline-block py-1">← all projects</Link>
      </div>
    </main>
  )
}
