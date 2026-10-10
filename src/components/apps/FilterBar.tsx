'use client'

import { useState } from 'react'
import { FilterPill } from './FilterPill'
import type { FilterState, ProjectType, ProjectStatus, ProjectOrigin } from '@/types/project'
import type { CategoryCount } from '@/lib/filters'
import { toggleFilter } from '@/lib/filters'

type Props = {
  filters: FilterState
  categories: CategoryCount[]
  onChange: (next: FilterState) => void
}

const TYPES:    { value: ProjectType;   label: string }[] = [
  { value: 'live',         label: 'live app' },
  { value: 'writeup-only', label: 'writeup only' },
]

const STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: 'live',      label: 'live' },
  { value: 'wip',       label: 'wip' },
  { value: 'archived',  label: 'archived' },
  { value: 'shut-down', label: 'shut down' },
  { value: 'acquired',  label: 'acquired' },
]

const ORIGINS:  { value: ProjectOrigin; label: string }[] = [
  { value: 'startup',     label: 'startup' },
  { value: 'prototype',   label: 'prototype' },
  { value: 'hackathon',   label: 'hackathon' },
  { value: 'fun-project', label: 'fun project' },
]

// Topics shown before "+ more"; the rest stay one click away.
const TOP_TOPICS = 12

export const EMPTY_FILTERS: FilterState = { types: [], statuses: [], origins: [], categories: [] }

export const activeCount = (filters: FilterState) =>
  filters.types.length + filters.statuses.length + filters.origins.length + filters.categories.length

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
      <span className="text-xs text-terminal-dim sm:w-14 sm:shrink-0 sm:pt-1.5">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

export function FilterBar({ filters, categories, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [allTopics, setAllTopics] = useState(false)
  const count = activeCount(filters)

  const visibleTopics = allTopics
    ? categories
    : categories.filter((c, i) => i < TOP_TOPICS || filters.categories.includes(c.name))
  const hiddenTopics = categories.length - visibleTopics.length

  return (
    <div className="border-y border-terminal-border">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="flex-1 flex items-center gap-2 py-3 text-xs text-terminal-dim hover:text-terminal-text text-left"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="project-filters"
        >
          <span aria-hidden="true">{open ? '▾' : '▸'}</span>
          <span>filter</span>
          {count > 0 && <span className="text-terminal-accent">({count} active)</span>}
        </button>
        {count > 0 && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="py-3 text-xs text-terminal-accent hover:underline underline-offset-2"
          >
            clear
          </button>
        )}
      </div>

      <div id="project-filters" className={`space-y-3 pb-4 ${open ? 'block' : 'hidden'}`}>
        <Row label="type">
          {TYPES.map(({ value, label }) => (
            <FilterPill
              key={value}
              label={label}
              active={filters.types.includes(value)}
              onClick={() => onChange({ ...filters, types: toggleFilter(filters.types, value) })}
            />
          ))}
        </Row>

        <Row label="status">
          {STATUSES.map(({ value, label }) => (
            <FilterPill
              key={value}
              label={label}
              active={filters.statuses.includes(value)}
              onClick={() => onChange({ ...filters, statuses: toggleFilter(filters.statuses, value) })}
            />
          ))}
        </Row>

        <Row label="origin">
          {ORIGINS.map(({ value, label }) => (
            <FilterPill
              key={value}
              label={label}
              active={filters.origins.includes(value)}
              onClick={() => onChange({ ...filters, origins: toggleFilter(filters.origins, value) })}
            />
          ))}
        </Row>

        {categories.length > 0 && (
          <Row label="topic">
            {visibleTopics.map(({ name }) => (
              <FilterPill
                key={name}
                label={name}
                active={filters.categories.includes(name)}
                onClick={() => onChange({ ...filters, categories: toggleFilter(filters.categories, name) })}
              />
            ))}
            {(hiddenTopics > 0 || allTopics) && (
              <button
                type="button"
                onClick={() => setAllTopics((v) => !v)}
                className="min-h-[28px] text-xs px-2 py-1 text-terminal-blue hover:text-terminal-accent"
              >
                {allTopics ? '− fewer' : `+ ${hiddenTopics} more`}
              </button>
            )}
          </Row>
        )}
      </div>
    </div>
  )
}
