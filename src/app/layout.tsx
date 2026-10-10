import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/site'

const mono = localFont({
  src: [
    { path: './fonts/jetbrains-mono-latin-wght-normal.woff2', weight: '100 800', style: 'normal' },
    { path: './fonts/jetbrains-mono-latin-wght-italic.woff2', weight: '100 800', style: 'italic' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['Fira Code', 'Consolas', 'monospace'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Serial Founder, PhD in Applied AI`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  formatDetection: { email: false, telephone: false, address: false },
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="bg-terminal-bg text-terminal-text font-mono antialiased text-sm md:text-[15px] flex flex-col">
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
      </body>
    </html>
  )
}
