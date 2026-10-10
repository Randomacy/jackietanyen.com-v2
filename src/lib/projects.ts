import { projects } from '@/data/projects'
import type { Project, FilterState } from '@/types/project'

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export type CategoryCount = { name: string; count: number }

// Categories ordered by how many projects use them, then alphabetically.
export function getAllCategories(): CategoryCount[] {
  const counts = new Map<string, number>()
  for (const p of projects) {
    for (const c of p.categories) counts.set(c, (counts.get(c) ?? 0) + 1)
  }
  return Array.from(counts, ([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function filterProjects(all: Project[], filters: FilterState): Project[] {
  return all.filter((p) => {
    if (filters.types.length > 0 && !filters.types.includes(p.type)) return false
    if (filters.statuses.length > 0 && !filters.statuses.includes(p.status)) return false
    if (filters.origins.length > 0 && !filters.origins.includes(p.origin)) return false
    if (filters.categories.length > 0 && !p.categories.some((c) => filters.categories.includes(c))) return false
    return true
  })
}
