'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Project, FilterState } from '@/types/project'
import type { CategoryCount } from '@/lib/projects'
import { FilterBar, EMPTY_FILTERS, activeCount } from '@/components/apps/FilterBar'
import { ProjectCard } from '@/components/apps/ProjectCard'
import { ProjectGrid } from '@/components/apps/ProjectGrid'
import { parseFiltersFromParams, serializeFiltersToParams } from '@/lib/filters'
import { filterProjects } from '@/lib/projects'

type Props = {
  projects: Project[]
  categories: CategoryCount[]
}

// The server renders every project (so crawlers and no-JS visitors see the
// full list); filters from the URL are applied once the page hydrates.
export function AppsContent({ projects, categories }: Props) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS)

  useEffect(() => {
    const sync = () => setFilters(parseFiltersFromParams(new URLSearchParams(window.location.search)))
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const handleFilterChange = useCallback((next: FilterState) => {
    setFilters(next)
    const qs = serializeFiltersToParams(next).toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [])

  const filtered = filterProjects(projects, filters)
  const hasActiveFilters = activeCount(filters) > 0

  return (
    <div>
      <FilterBar
        filters={filters}
        categories={categories}
        onChange={handleFilterChange}
      />

      <p className="mt-4 mb-3 text-xs text-terminal-dim" aria-live="polite">
        showing {filtered.length} of {projects.length} projects
        {hasActiveFilters && ' (filtered)'}
      </p>

      {filtered.length === 0 ? (
        <div className="text-terminal-dim text-sm py-12 text-center">
          no projects match the current filters.
          <button
            type="button"
            onClick={() => handleFilterChange(EMPTY_FILTERS)}
            className="ml-2 text-terminal-accent hover:underline underline-offset-2"
          >
            clear filters
          </button>
        </div>
      ) : (
        <ProjectGrid>
          {filtered.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ProjectGrid>
      )}
    </div>
  )
}
