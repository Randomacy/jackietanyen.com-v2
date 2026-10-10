type Props = {
  command: string
  user?: string
  host?: string
  path?: string
}

export function TerminalPrompt({
  command,
  user = 'jackie',
  host = 'builder',
  path = '~',
}: Props) {
  return (
    <div className="flex flex-wrap items-start leading-relaxed" aria-hidden={command === '' ? true : undefined}>
      <span className="text-terminal-green shrink-0">{user}@{host}</span>
      <span className="text-terminal-dim shrink-0">:</span>
      <span className="text-terminal-blue shrink-0">{path}</span>
      <span className="text-terminal-dim shrink-0 pr-[1ch]">$</span>
      <span className="text-terminal-text min-w-0 break-words">{command}</span>
    </div>
  )
}
