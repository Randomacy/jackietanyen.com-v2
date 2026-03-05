import type { ComponentType } from 'react'

export type ProjectType   = 'live' | 'writeup-only'
export type ProjectStatus = 'live' | 'wip' | 'archived' | 'shut-down' | 'acquired'
export type ProjectOrigin = 'startup' | 'hackathon' | 'fun-project' | 'prototype'

export type Project = {
  slug: string
  title: string
  shortDescription: string
  type: ProjectType
  status: ProjectStatus
  origin: ProjectOrigin
  categories: string[]
  builtAt?: string
  // Only for type='live' — dynamically imported app component
  appComponent?: ComponentType
}

export type FilterState = {
  types: ProjectType[]
  statuses: ProjectStatus[]
  origins: ProjectOrigin[]
  categories: string[]
}
