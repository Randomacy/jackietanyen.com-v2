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
      className="flex h-full flex-col border border-terminal-border bg-terminal-surface hover:border-terminal-accent/50 transition-colors duration-150 rounded-lg p-4 group"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="text-sm text-terminal-text group-hover:text-terminal-accent transition-colors duration-150 font-medium leading-snug">
          {project.title}
        </h2>
        <div className="shrink-0"><StatusBadge variant="status" value={project.status} /></div>
      </div>

      {/* Description */}
      <p className="text-terminal-dim text-xs md:text-[13px] leading-relaxed mb-3 line-clamp-4">
        {project.shortDescription}
      </p>

      {/* Footer row */}
      <div className="mt-auto flex flex-wrap items-center gap-1">
        <StatusBadge variant="origin" value={project.origin} />
        {project.type === 'live' && <StatusBadge variant="type" value={project.type} />}
        {project.categories.map((cat) => (
          <span key={cat} className="tag">{cat}</span>
        ))}
      </div>
    </Link>
  )
}
