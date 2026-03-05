import { notFound } from 'next/navigation'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProjectBySlug, getAllProjects } from '@/lib/projects'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.title} — jackie tan yen` }
}

function getMdxContent(slug: string): string | null {
  const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.mdx`)
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return null
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const mdxContent = getMdxContent(slug)

  return (
    <main className="min-h-screen px-4 py-12 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-terminal-dim">
        <Link href="/" className="hover:text-terminal-text transition-colors duration-150">~/</Link>
        <Link href="/apps" className="hover:text-terminal-text transition-colors duration-150">apps/</Link>
        <span className="text-terminal-text">{project.slug}</span>
      </div>

      {/* Project header */}
      <TerminalWindow title={`${project.slug} — info`}>
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl text-terminal-text font-medium">{project.title}</h1>
            <StatusBadge variant="status" value={project.status} />
          </div>

          <p className="text-terminal-dim leading-relaxed">{project.shortDescription}</p>

          <div className="flex flex-wrap gap-2 pt-1">
            <StatusBadge variant="type"   value={project.type} />
            <StatusBadge variant="origin" value={project.origin} />
            {project.categories.map((cat) => (
              <span key={cat} className="text-xs border border-terminal-border text-terminal-dim rounded px-1.5 py-0.5">
                {cat}
              </span>
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
              className="inline-block text-sm border border-terminal-accent text-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg transition-all duration-150 rounded px-3 py-1.5"
            >
              launch app →
            </Link>
          )}
        </div>
      </TerminalWindow>

      {/* MDX writeup */}
      {mdxContent ? (
        <article className="mt-10 prose prose-invert prose-sm max-w-none
          prose-headings:font-mono prose-headings:text-terminal-text
          prose-p:text-terminal-dim prose-p:leading-relaxed
          prose-a:text-terminal-accent prose-a:no-underline hover:prose-a:underline
          prose-code:text-terminal-green prose-code:bg-terminal-surface prose-code:px-1 prose-code:rounded
          prose-pre:bg-terminal-surface prose-pre:border prose-pre:border-terminal-border
          prose-strong:text-terminal-text
          prose-hr:border-terminal-border
        ">
          <MDXRemote source={mdxContent} />
        </article>
      ) : (
        <div className="mt-10 text-terminal-dim text-sm border border-terminal-border rounded-lg p-6">
          no writeup yet.
        </div>
      )}
    </main>
  )
}
