'use client'

import { FilterPill } from './FilterPill'
import type { FilterState, ProjectType, ProjectStatus, ProjectOrigin } from '@/types/project'
import { toggleFilter } from '@/lib/filters'

type Props = {
  filters: FilterState
  categories: string[]
  onChange: (next: FilterState) => void
}

const TYPES:    { value: ProjectType;   label: string }[] = [
  { value: 'live',         label: 'live app' },
  { value: 'writeup-only', label: 'writeup only' },
]

const STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: 'live',     label: 'live' },
  { value: 'wip',      label: 'wip' },
  { value: 'archived',  label: 'archived' },
  { value: 'shut-down', label: 'shut down' },
  { value: 'acquired',  label: 'acquired' },
]

const ORIGINS:  { value: ProjectOrigin; label: string }[] = [
  { value: 'startup',   label: 'startup' },
  { value: 'prototype', label: 'prototype' },
  { value: 'hackathon',    label: 'hackathon' },
  { value: 'fun-project',  label: 'fun project' },
]

export function FilterBar({ filters, categories, onChange }: Props) {
  return (
    <div className="space-y-3 py-4 border-b border-terminal-border">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-terminal-dim w-16 shrink-0">type</span>
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map(({ value, label }) => (
            <FilterPill
              key={value}
              label={label}
              active={filters.types.includes(value)}
              onClick={() => onChange({ ...filters, types: toggleFilter(filters.types, value) })}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-terminal-dim w-16 shrink-0">status</span>
        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map(({ value, label }) => (
            <FilterPill
              key={value}
              label={label}
              active={filters.statuses.includes(value)}
              onClick={() => onChange({ ...filters, statuses: toggleFilter(filters.statuses, value) })}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-terminal-dim w-16 shrink-0">origin</span>
        <div className="flex flex-wrap gap-1.5">
          {ORIGINS.map(({ value, label }) => (
            <FilterPill
              key={value}
              label={label}
              active={filters.origins.includes(value)}
              onClick={() => onChange({ ...filters, origins: toggleFilter(filters.origins, value) })}
            />
          ))}
        </div>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-terminal-dim w-16 shrink-0">topic</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={filters.categories.includes(cat)}
                onClick={() => onChange({ ...filters, categories: toggleFilter(filters.categories, cat) })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
