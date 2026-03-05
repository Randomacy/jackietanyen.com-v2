'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import type { Project, FilterState } from '@/types/project'
import { FilterBar } from '@/components/apps/FilterBar'
import { ProjectCard } from '@/components/apps/ProjectCard'
import { ProjectGrid } from '@/components/apps/ProjectGrid'
import { parseFiltersFromParams, serializeFiltersToParams } from '@/lib/filters'
import { filterProjects } from '@/lib/projects'

type Props = {
  projects: Project[]
  categories: string[]
}

export function AppsContent({ projects, categories }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filters = parseFiltersFromParams(new URLSearchParams(searchParams.toString()))

  const handleFilterChange = useCallback(
    (next: FilterState) => {
      const params = serializeFiltersToParams(next)
      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname)
    },
    [router, pathname]
  )

  const filtered = filterProjects(projects, filters)

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.statuses.length > 0 ||
    filters.origins.length > 0 ||
    filters.categories.length > 0

  return (
    <div>
      <FilterBar
        filters={filters}
        categories={categories}
        onChange={handleFilterChange}
      />

      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="text-terminal-dim text-sm py-12 text-center">
            no projects match the current filters.
            {hasActiveFilters && (
              <button
                onClick={() => handleFilterChange({ types: [], statuses: [], origins: [], categories: [] })}
                className="ml-2 text-terminal-accent hover:underline underline-offset-2"
              >
                clear filters
              </button>
            )}
          </div>
        ) : (
          <ProjectGrid>
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </ProjectGrid>
        )}
      </div>

      <div className="mt-6 text-xs text-terminal-dim">
        showing {filtered.length} of {projects.length} projects
        {hasActiveFilters && ' (filtered)'}
      </div>
    </div>
  )
}
