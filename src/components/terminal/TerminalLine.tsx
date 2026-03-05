import type { ReactNode } from 'react'

type Color = 'default' | 'dim' | 'green' | 'yellow' | 'red' | 'blue'

type Props = {
  children: ReactNode
  color?: Color
  indent?: boolean
  className?: string
}

const colorMap: Record<Color, string> = {
  default: 'text-terminal-text',
  dim:     'text-terminal-dim',
  green:   'text-terminal-green',
  yellow:  'text-terminal-yellow',
  red:     'text-terminal-accent',
  blue:    'text-[#6699cc]',
}

export function TerminalLine({ children, color = 'default', indent = false, className = '' }: Props) {
  return (
    <div className={`leading-relaxed ${colorMap[color]} ${indent ? 'pl-4' : ''} ${className}`}>
      {children}
    </div>
  )
}
