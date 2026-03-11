import Image from 'next/image'
import Link from 'next/link'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalLine } from '@/components/terminal/TerminalLine'

export const metadata = {
  title: 'about — jackie tan yen',
}

export default function AboutPage() {
  const skills = [
    { label: 'built', items: ['product', 'full-stack', 'ai/ml', 'blockchain'] },
    { label: 'investing', items: ['pre-seed', 'art'] },
    { label: 'languages', items: ['english', 'malay', 'mandarin', 'japanese','cantonese'] },
  ]

  return (
    <main className="min-h-screen flex items-start justify-center px-4 py-16 md:py-24">
      <div className="w-full max-w-2xl space-y-2">
        <TerminalWindow title="jackie@builder: ~/about">
          <div className="space-y-8">

            {/* breadcrumb */}
            <div className="text-terminal-dim text-sm">
              <Link href="/" className="hover:text-terminal-accent transition-colors">~</Link>
              <span> / about</span>
            </div>

            {/* photo + bio */}
            <div className="space-y-1">
              <TerminalPrompt command="cat about.txt --full" />
              <div className="flex flex-col sm:flex-row gap-6 pt-1">
                {/* photo — replace public/avatar.jpg with your photo */}
                <div className="shrink-0">
                  <Image
                    src="/assets/profile/profilepic.jpg"
                    alt="jackie tan yen"
                    width={160}
                    height={160}
                    className="border border-terminal-border grayscale object-cover"
                    style={{ width: 160, height: 160 }}
                  />
                </div>

                {/* bio */}
                <div className="space-y-3">
                  <TerminalLine color="default">
                    jackie tan yen &mdash; 4x founder, 2x exit. phd. based in singapore.
                  </TerminalLine>
                  <TerminalLine color="default">
                    i&apos;ve spent the last decade building internet products across multiple verticals with varying successes. forbes 30 under 30. gen.t lister.
                  </TerminalLine>
                  <TerminalLine color="default">
                    still figuring out what&apos;s next.
                  </TerminalLine>
                </div>
              </div>
            </div>

            {/* skills */}
            <div className="space-y-1">
              <TerminalPrompt command="cat skills.txt" />
              <div className="space-y-2 pt-1">
                {skills.map(({ label, items }) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-terminal-dim w-24 shrink-0">{label}:</span>
                    <span className="text-terminal-text">
                      {items.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* blinking cursor */}
            <div>
              <TerminalPrompt command="" />
              <span
                className="inline-block w-2 h-4 bg-terminal-text align-middle animate-blink"
                aria-hidden="true"
              />
            </div>

          </div>
        </TerminalWindow>
      </div>
    </main>
  )
}
