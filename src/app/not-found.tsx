import './globals.css'
import Link from 'next/link'
import { SiteShell } from '@/components/layout/SiteShell'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalLine } from '@/components/terminal/TerminalLine'
import { NAV_LINKS } from '@/lib/site'

export const metadata = {
  title: 'Not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <SiteShell>
    <main className="px-4 py-10 md:py-16">
      <div className="w-full max-w-2xl mx-auto">
        <TerminalWindow title="jackie@builder: ~">
          <div className="space-y-5">
            <section className="space-y-1">
              <TerminalPrompt command="cd ./this-page" />
              <h1 className="font-normal text-terminal-accent">404: no such file or directory</h1>
              <TerminalLine color="dim">the page you&apos;re looking for doesn&apos;t exist or has moved.</TerminalLine>
            </section>
            <nav aria-label="suggestions" className="space-y-1">
              <TerminalPrompt command="ls ~" />
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                <li><Link href="/" className="terminal-link inline-block py-1">home/</Link></li>
                {NAV_LINKS.map((l) => (
                  <li key={l.href}><Link href={l.href} className="terminal-link inline-block py-1">{l.label}/</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </TerminalWindow>
      </div>
    </main>
    </SiteShell>
  )
}
