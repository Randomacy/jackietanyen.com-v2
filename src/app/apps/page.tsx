import { Suspense } from 'react'
import Link from 'next/link'
import { getAllProjects, getAllCategories } from '@/lib/projects'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { AppsContent } from './AppsContent'

export const metadata = {
  title: 'apps — jackie tan yen',
}

export default function AppsPage() {
  const projects = getAllProjects()
  const categories = getAllCategories()

  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="mb-8 space-y-2">
        <div className="text-terminal-dim text-sm">
          <Link href="/" className="hover:text-terminal-text transition-colors duration-150">~/</Link>
          <span className="text-terminal-text">apps</span>
        </div>
        <TerminalPrompt command="ls -la ./apps" />
      </div>

      {/* Filter + grid — needs Suspense for useSearchParams */}
      <Suspense fallback={
        <div className="text-terminal-dim text-sm py-8">loading...</div>
      }>
        <AppsContent projects={projects} categories={categories} />
      </Suspense>
    </main>
  )
}
