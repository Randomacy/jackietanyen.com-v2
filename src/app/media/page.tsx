import Link from 'next/link'
import { mediaFeatures } from '@/data/media'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { MediaRow } from '@/components/media/MediaRow'

export const metadata = {
  title: 'media — jackie tan yen',
}

export default function MediaPage() {
  const sorted = [...mediaFeatures].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="min-h-screen px-4 py-12 max-w-3xl mx-auto">
      <div className="mb-8 space-y-2">
        <div className="text-sm text-terminal-dim">
          <Link href="/" className="hover:text-terminal-text transition-colors duration-150">~/</Link>
          <span className="text-terminal-text">media</span>
        </div>
        <TerminalPrompt command="grep -r 'jackie' ./press/" />
      </div>

      <div>
        {sorted.map((feature, i) => (
          <MediaRow key={i} feature={feature} />
        ))}
      </div>
    </main>
  )
}
