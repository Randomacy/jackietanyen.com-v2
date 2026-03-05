import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  projectTitle: string
  projectSlug: string
  children: ReactNode
}

export function AppShell({ projectTitle, projectSlug, children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-terminal-border bg-terminal-surface shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href={`/apps/${projectSlug}`}
            className="text-terminal-dim hover:text-terminal-text transition-colors duration-150 text-sm"
          >
            ← back
          </Link>
          <span className="text-terminal-border">|</span>
          <span className="text-terminal-text text-sm">{projectTitle}</span>
        </div>
        <Link
          href="/apps"
          className="text-terminal-dim hover:text-terminal-text transition-colors duration-150 text-xs"
        >
          all apps
        </Link>
      </div>

      {/* App content */}
      <div className="flex-1 overflow-auto bg-terminal-bg">
        {children}
      </div>
    </div>
  )
}
