import type { FilterState, ProjectType, ProjectStatus, ProjectOrigin } from '@/types/project'

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
