import { projects } from '@/data/projects'
import type { Project, FilterState } from '@/types/project'

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllCategories(): string[] {
  const cats = new Set<string>()
  for (const p of projects) {
    for (const c of p.categories) cats.add(c)
  }
  return Array.from(cats).sort()
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
