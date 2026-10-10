import type { ReactNode } from 'react'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

// Header, main area and footer shared by every public page.
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-terminal-bg text-terminal-text font-mono antialiased text-sm md:text-[15px]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-terminal-surface focus:border focus:border-terminal-accent focus:px-3 focus:py-2 focus:rounded"
      >
        skip to content
      </a>
      <SiteHeader />
      <div id="main" className="flex-1">
        {children}
      </div>
      <SiteFooter />
    </div>
  )
}
