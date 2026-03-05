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
      <div className="flex items-center gap-2 px-4 py-3 border-b border-terminal-border bg-terminal-bg">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-terminal-dim">{title}</span>
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
