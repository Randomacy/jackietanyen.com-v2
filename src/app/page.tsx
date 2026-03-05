import Link from 'next/link'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalLine } from '@/components/terminal/TerminalLine'
import { getAllProjects } from '@/lib/projects'

export default function HomePage() {
  const projects = getAllProjects()
  const previewProjects = projects.slice(0, 3)
  const remaining = projects.length - previewProjects.length

  const links = [
    { label: 'about',        href: '/about' },
    { label: 'work/apps',    href: '/apps' },
    { label: 'articles',     href: '/articles' },
    { label: 'media',        href: '/media' },
    { label: 'contact',      href: 'mailto:jackie@example.com' },
  ]

  return (
    <main className="min-h-screen flex items-start justify-center px-4 py-16 md:py-24">
      <div className="w-full max-w-2xl space-y-2">
        <TerminalWindow title="jackie@builder: ~">
          <div className="space-y-6">

            {/* whoami */}
            <div className="space-y-1">
              <TerminalPrompt command="whoami" />
              <TerminalLine color="default">
                jackie tan yen &mdash; 4x founder, 2x exit. phd.
              </TerminalLine>
            </div>

            {/* cat about.txt */}
            <div className="space-y-1">
              <TerminalPrompt command="cat about.txt" />
              <TerminalLine color="default">
                i build internet products and invest in early-stage startups in southeast asia.
              </TerminalLine>
              <TerminalLine color="default">
                previously: founded two companies, worked at three others. currently: figuring out what&apos;s next.
              </TerminalLine>
              <TerminalLine color="default">
                i&apos;m based in kuala lumpur. i write, hack, and occasionally speak at things.
              </TerminalLine>
            </div>

            {/* ls ./links */}
            <div className="space-y-1">
              <TerminalPrompt command="ls ./links" />
              <div className="flex flex-wrap gap-x-6 gap-y-1 pl-0">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#6699cc] hover:text-terminal-accent transition-colors duration-150 hover:underline underline-offset-2"
                  >
                    {link.label}/
                  </Link>
                ))}
              </div>
            </div>

            {/* ls ./apps | head -3 */}
            <div className="space-y-1">
              <TerminalPrompt command={`ls ./apps | head -${previewProjects.length}`} />
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {previewProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/apps/${p.slug}`}
                    className="text-terminal-text hover:text-terminal-accent transition-colors duration-150"
                  >
                    {p.slug}/
                  </Link>
                ))}
              </div>
              {remaining > 0 && (
                <TerminalLine color="dim">
                  and {remaining} more &mdash;{' '}
                  <Link href="/apps" className="text-[#6699cc] hover:text-terminal-accent transition-colors duration-150 hover:underline underline-offset-2">
                    cd ./apps
                  </Link>
                  {' '}to see all
                </TerminalLine>
              )}
            </div>

            {/* blinking cursor */}
            <div className="space-y-0">
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
