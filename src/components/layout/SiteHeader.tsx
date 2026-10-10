'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/site'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-terminal-border bg-terminal-bg/90 backdrop-blur supports-[backdrop-filter]:bg-terminal-bg/75">
      <nav
        aria-label="main"
        className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 h-12 text-[13px]"
      >
        <Link
          href="/"
          className="shrink-0 -ml-2 px-2 py-2 min-w-[32px] text-terminal-green hover:text-terminal-accent transition-colors duration-150"
          aria-label="jackie tan yen — home"
        >
          <span aria-hidden="true">~</span>
          <span className="hidden sm:inline">/jackie</span>
        </Link>

        <ul className="flex items-center gap-0.5 sm:gap-2">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block px-2 py-2 transition-colors duration-150 ${
                    active
                      ? 'text-terminal-accent'
                      : 'text-terminal-dim hover:text-terminal-text'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
