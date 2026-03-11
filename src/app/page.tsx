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
    { label: 'about',        href: '/about',                        wip: false },
    { label: 'work/apps',    href: '/apps',                         wip: false },
    { label: 'articles',     href: '/articles',                     wip: true  },
    { label: 'media',        href: '/media',                        wip: true  },
    { label: 'contact',      href: 'mailto:jackietanyen@gmail.com', wip: false },
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
                jackie tan yen &mdash; 4x founder, 2x exit. phd in applied ai.
              </TerminalLine>
            </div>

            {/* cat stats.txt */}
            <div className="space-y-1">
              <TerminalPrompt command="cat stats.txt" />
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <span><span className="text-terminal-accent">11</span> <span className="text-terminal-dim">startups</span></span>
                <span><span className="text-terminal-accent">4</span> <span className="text-terminal-dim">real companies</span></span>
                <span><span className="text-terminal-accent">2</span> <span className="text-terminal-dim">exits</span></span>
                <span><span className="text-terminal-accent">13</span> <span className="text-terminal-dim">hackathons</span></span>
                <span><span className="text-terminal-accent">8</span> <span className="text-terminal-dim">wins</span></span>
              </div>
            </div>

            {/* cat about.txt */}
            <div className="space-y-1">
              <TerminalPrompt command="cat about.txt" />
              <TerminalLine color="default">
                i make things on the internet and spend a disproportionate amount of time thinking about what the next decade looks like.
              </TerminalLine>
              <TerminalLine color="default">
                previously: started 11 things, four became real companies, sold two. currently: figuring out what&apos;s next.
              </TerminalLine>
              <TerminalLine color="default">
                i&apos;m based in singapore. i build startups, compete in hackathons, write, and occasionally speak at things.
              </TerminalLine>
            </div>

            {/* ls ./links */}
            <div className="space-y-1">
              <TerminalPrompt command="ls ./links" />
              <div className="flex flex-wrap gap-x-6 gap-y-1 pl-0">
                {links.map((link) =>
                  link.wip ? (
                    <span
                      key={link.href}
                      className="text-terminal-dim cursor-default"
                    >
                      {link.label}/ <span className="text-xs opacity-50">(wip)</span>
                    </span>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[#6699cc] hover:text-terminal-accent transition-colors duration-150 hover:underline underline-offset-2"
                    >
                      {link.label}/
                    </Link>
                  )
                )}
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
