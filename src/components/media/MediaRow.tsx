import Link from 'next/link'
import type { MediaFeature } from '@/types/content'
import { formatDate } from '@/lib/format'

type Props = {
  feature: MediaFeature
}

export function MediaRow({ feature }: Props) {
  return (
    <Link
      href={`/media/${feature.slug}`}
      className="block group py-4 border-b border-terminal-border hover:border-terminal-accent/30 transition-colors duration-150"
    >
      <h2 className="text-sm md:text-[15px] text-terminal-text group-hover:text-terminal-accent transition-colors duration-150 leading-snug mb-1">
        {feature.title}
        <span className="ml-2 text-terminal-dim text-xs" aria-hidden="true">→</span>
      </h2>
      <p className="text-terminal-dim text-xs md:text-[13px] leading-relaxed mb-2">
        {feature.description}
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] md:text-xs text-terminal-dim">
        <span className="text-terminal-text/80">{feature.publication}</span>
        <time dateTime={feature.date}>{formatDate(feature.date)}</time>
        <div className="flex flex-wrap gap-1">
          {feature.topics.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
