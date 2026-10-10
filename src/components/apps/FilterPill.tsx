'use client'

type Props = {
  label: string
  active: boolean
  onClick: () => void
}

export function FilterPill({ label, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        min-h-[28px] text-xs border rounded px-2.5 py-1 transition-colors duration-150
        ${active
          ? 'border-terminal-accent text-terminal-accent bg-terminal-accent/10'
          : 'border-terminal-border text-terminal-dim hover:border-terminal-text hover:text-terminal-text'
        }
      `}
    >
      {label}
    </button>
  )
}
