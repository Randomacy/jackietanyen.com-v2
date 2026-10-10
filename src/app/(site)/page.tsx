import Link from 'next/link'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalLine } from '@/components/terminal/TerminalLine'
import { BlinkingCursor } from '@/components/terminal/BlinkingCursor'
import { JsonLd } from '@/components/JsonLd'
import { getAllProjects } from '@/lib/content'
import { pageMetadata, personJsonLd, websiteJsonLd } from '@/lib/seo'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata = pageMetadata({ path: '/' })

const linkClass = 'text-terminal-blue hover:text-terminal-accent transition-colors duration-150 hover:underline underline-offset-2'

export default async function HomePage() {
  const projects = await getAllProjects()
  const previewProjects = projects.slice(0, 3)
  const remaining = projects.length - previewProjects.length

  const links = [
    { label: 'about',     href: '/about' },
    { label: 'work/apps', href: '/apps' },
    { label: 'articles',  href: '/articles' },
    { label: 'media',     href: '/media' },
    { label: 'contact',   href: `mailto:${CONTACT_EMAIL}` },
  ]

  return (
    <main className="px-4 py-10 md:py-16">
      <JsonLd data={[personJsonLd, websiteJsonLd]} />
      <div className="w-full max-w-2xl mx-auto">
        <TerminalWindow title="jackie@builder: ~">
          <div className="space-y-5 md:space-y-6">

            {/* whoami */}
            <section className="space-y-1">
              <TerminalPrompt command="whoami" />
              <h1 className="font-normal text-terminal-text leading-relaxed">
                jackie tan yen &mdash; serial founder. phd in applied ai.
              </h1>
              <TerminalLine color="dim">
                11 ventures, 4 startups, 2 exits &middot; 17 hackathons, 9 wins
              </TerminalLine>
            </section>

            {/* cat about.txt */}
            <section className="space-y-1">
              <TerminalPrompt command="cat about.txt" />
              <TerminalLine color="default">
                i make things on the internet and spend a disproportionate amount of time thinking about what the next decade looks like.
              </TerminalLine>
              <TerminalLine color="default">
                i&apos;m based in singapore. i build startups, compete in hackathons, write, and occasionally speak at things.
              </TerminalLine>
              <TerminalLine color="default">
                <span className="text-terminal-accent">currently:</span> building{' '}
                <Link href="/apps/mind-interface-company" className={linkClass}>mind interface company</Link>
                {' '}&mdash; a brain-computer interface that gives people who can&apos;t speak or move their voice back.
              </TerminalLine>
            </section>

            {/* ls ./links */}
            <nav aria-label="sections" className="space-y-1">
              <TerminalPrompt command="ls ./links" />
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={`${linkClass} inline-block py-1`}>
                      {link.label}/
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ls ./apps | head -3 */}
            <section className="space-y-1">
              <TerminalPrompt command={`ls ./apps | head -${previewProjects.length}`} />
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {previewProjects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/apps/${p.slug}`} className={`${linkClass} inline-block py-1`}>
                      {p.slug}/
                    </Link>
                  </li>
                ))}
              </ul>
              {remaining > 0 && (
                <TerminalLine color="dim">
                  and {remaining} more &mdash;{' '}
                  <Link href="/apps" className={linkClass}>cd ./apps</Link>
                  {' '}to see all
                </TerminalLine>
              )}
            </section>

            <BlinkingCursor />

          </div>
        </TerminalWindow>
      </div>
    </main>
  )
}
