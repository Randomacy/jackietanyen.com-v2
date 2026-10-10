import type { ReactNode } from 'react'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'

type Props = {
  command: string
  title: string
  children?: ReactNode // short intro line under the title
}

// Header for section index pages (apps, articles, media).
export function PageHeader({ command, title, children }: Props) {
  return (
    <header className="mb-6 md:mb-8 space-y-2">
      <TerminalPrompt command={command} />
      <h1 className="text-lg md:text-xl text-terminal-text font-medium leading-snug">{title}</h1>
      {children && <p className="text-terminal-dim text-[13px] md:text-sm leading-relaxed max-w-2xl">{children}</p>}
    </header>
  )
}
