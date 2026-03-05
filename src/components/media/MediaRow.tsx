import Link from 'next/link'
import type { MediaFeature } from '@/types/content'

type Props = {
  feature: MediaFeature
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function MediaRow({ feature }: Props) {
  return (
    <Link
      href={feature.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group py-4 border-b border-terminal-border hover:border-terminal-accent/30 transition-colors duration-150"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-terminal-text group-hover:text-terminal-accent transition-colors duration-150 leading-snug">
              {feature.title}
            </span>
            <span className="text-terminal-dim text-xs shrink-0">↗</span>
          </div>
          <p className="text-terminal-dim text-sm leading-relaxed mb-2">
            {feature.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-terminal-dim">
            <span className="text-terminal-text/70">{feature.publication}</span>
            <span>{formatDate(feature.date)}</span>
            <div className="flex flex-wrap gap-1">
              {feature.topics.map((t) => (
                <span key={t} className="border border-terminal-border rounded px-1.5 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
