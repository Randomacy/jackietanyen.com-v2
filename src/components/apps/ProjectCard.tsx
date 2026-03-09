import Link from 'next/link'
import type { Project } from '@/types/project'
import { StatusBadge } from '@/components/layout/StatusBadge'

type Props = {
  project: Project
}

export function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/apps/${project.slug}`}
      className="block border border-terminal-border bg-terminal-surface hover:border-terminal-accent/50 hover:bg-terminal-surface/80 transition-all duration-150 rounded-lg p-5 group"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h2 className="text-terminal-text group-hover:text-terminal-accent transition-colors duration-150 font-medium leading-tight">
          {project.title}
        </h2>
        <StatusBadge variant="status" value={project.status} />
      </div>

      {/* Description */}
      <p className="text-terminal-dim text-sm leading-relaxed mb-4">
        {project.shortDescription}
      </p>

      {/* Footer row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((cat) => (
            <span key={cat} className="text-xs text-terminal-dim border border-terminal-border rounded px-1.5 py-0.5">
              {cat}
            </span>
          ))}
        </div>
        <div className="flex gap-1.5">
          <StatusBadge variant="origin" value={project.origin} />
          {project.type === 'live' && (
            <StatusBadge variant="type" value={project.type} />
          )}
        </div>
      </div>
    </Link>
  )
}
