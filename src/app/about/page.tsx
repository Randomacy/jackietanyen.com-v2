import Image from 'next/image'
import Link from 'next/link'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalLine } from '@/components/terminal/TerminalLine'
import { BlinkingCursor } from '@/components/terminal/BlinkingCursor'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { JsonLd } from '@/components/JsonLd'
import { pageMetadata, personJsonLd } from '@/lib/seo'
import { CONTACT_EMAIL, SITE_URL, SOCIAL_LINKS } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'About',
  description: 'About Jackie Tan Yen — 4x founder with 2 exits, PhD, Forbes 30 Under 30 Asia and Tatler Gen.T honouree, based in Singapore.',
  path: '/about',
  type: 'profile',
})

export default function AboutPage() {
  const skills = [
    { label: 'built', items: ['product', 'full-stack', 'ai/ml', 'blockchain'] },
    { label: 'investing', items: ['pre-seed', 'art'] },
    { label: 'languages', items: ['english', 'malay', 'mandarin', 'japanese', 'cantonese'] },
  ]

  return (
    <main className="px-4 py-8 md:py-12">
      <JsonLd
        data={{
          '@type': 'ProfilePage',
          url: `${SITE_URL}/about`,
          mainEntity: personJsonLd,
        }}
      />
      <div className="w-full max-w-2xl mx-auto">
        <Breadcrumb items={[{ name: 'About', label: 'about', path: '/about' }]} />
        <TerminalWindow title="jackie@builder: ~/about">
          <div className="space-y-6 md:space-y-8">

            {/* photo + bio */}
            <section className="space-y-2">
              <TerminalPrompt command="cat about.txt --full" />
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-1">
                <Image
                  src="/assets/profile/profilepic.jpg"
                  alt="portrait of jackie tan yen"
                  width={128}
                  height={128}
                  priority
                  className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 border border-terminal-border grayscale object-cover"
                />

                <div className="space-y-3">
                  <h1 className="font-normal text-terminal-text leading-relaxed">
                    jackie tan yen &mdash; 4x founder, 2x exit. phd. based in singapore.
                  </h1>
                  <TerminalLine color="default">
                    i&apos;ve spent the last decade building internet products across multiple verticals with varying successes. forbes 30 under 30. gen.t lister.
                  </TerminalLine>
                  <TerminalLine color="default">
                    still figuring out what&apos;s next.
                  </TerminalLine>
                </div>
              </div>
            </section>

            {/* skills */}
            <section className="space-y-2">
              <TerminalPrompt command="cat skills.txt" />
              <dl className="space-y-2 pt-1">
                {skills.map(({ label, items }) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="text-terminal-dim sm:w-24 shrink-0">{label}:</dt>
                    <dd className="text-terminal-text">{items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* links */}
            <section className="space-y-2">
              <TerminalPrompt command="ls ./elsewhere" />
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                <li><a href={`mailto:${CONTACT_EMAIL}`} className="terminal-link inline-block py-1">email/</a></li>
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer me" className="terminal-link inline-block py-1">{s.label} ↗</a>
                  </li>
                ))}
                <li><Link href="/media" className="terminal-link inline-block py-1">press/</Link></li>
              </ul>
            </section>

            <BlinkingCursor />

          </div>
        </TerminalWindow>
      </div>
    </main>
  )
}
