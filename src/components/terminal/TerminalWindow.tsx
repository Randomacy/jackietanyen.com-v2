import type { ReactNode } from 'react'

type Props = {
  title?: string
  children: ReactNode
  className?: string
}

export function TerminalWindow({ title = 'terminal', children, className = '' }: Props) {
  return (
    <div className={`rounded-lg border border-terminal-border bg-terminal-surface overflow-hidden ${className}`}>
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 border-b border-terminal-border bg-terminal-bg" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] md:text-xs text-terminal-dim truncate">{title}</span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  )
}
