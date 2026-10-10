import type { FilterState, Project, ProjectType, ProjectStatus, ProjectOrigin } from '@/types/project'

const VALID_TYPES:    ProjectType[]   = ['live', 'writeup-only']
const VALID_STATUSES: ProjectStatus[] = ['live', 'wip', 'archived', 'shut-down', 'acquired']
const VALID_ORIGINS:  ProjectOrigin[] = ['startup', 'hackathon', 'fun-project', 'prototype']

function parseMulti<T extends string>(param: string | null, valid: T[]): T[] {
  if (!param) return []
  return param.split(',').filter((v): v is T => valid.includes(v as T))
}

export function parseFiltersFromParams(params: URLSearchParams): FilterState {
  return {
    types:      parseMulti(params.get('type'),     VALID_TYPES),
    statuses:   parseMulti(params.get('status'),   VALID_STATUSES),
    origins:    parseMulti(params.get('origin'),   VALID_ORIGINS),
    categories: (params.get('category') ?? '').split(',').filter(Boolean),
  }
}

export function serializeFiltersToParams(filters: FilterState): URLSearchParams {
  const p = new URLSearchParams()
  if (filters.types.length > 0)      p.set('type',     filters.types.join(','))
  if (filters.statuses.length > 0)   p.set('status',   filters.statuses.join(','))
  if (filters.origins.length > 0)    p.set('origin',   filters.origins.join(','))
  if (filters.categories.length > 0) p.set('category', filters.categories.join(','))
  return p
}

export function toggleFilter<T extends string>(current: T[], value: T): T[] {
  return current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value]
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

export type CategoryCount = { name: string; count: number }

// Categories ordered by how many projects use them, then alphabetically.
export function getCategoryCounts(projects: Project[]): CategoryCount[] {
  const counts = new Map<string, number>()
  for (const p of projects) {
    for (const c of p.categories) counts.set(c, (counts.get(c) ?? 0) + 1)
  }
  return Array.from(counts, ([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}
