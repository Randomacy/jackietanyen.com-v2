import { TerminalPrompt } from './TerminalPrompt'

export function BlinkingCursor() {
  return (
    <div className="flex items-center" aria-hidden="true">
      <TerminalPrompt command="" />
      <span className="inline-block w-[0.55em] h-[1.1em] bg-terminal-text animate-blink" />
    </div>
  )
}
