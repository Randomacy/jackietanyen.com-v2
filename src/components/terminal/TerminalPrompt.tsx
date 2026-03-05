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
    <div className="flex items-start gap-0 leading-relaxed">
      <span className="text-terminal-green shrink-0">{user}@{host}</span>
      <span className="text-terminal-dim shrink-0">:</span>
      <span className="text-[#6699cc] shrink-0">{path}</span>
      <span className="text-terminal-dim shrink-0">$ </span>
      <span className="text-terminal-text">{command}</span>
    </div>
  )
}
