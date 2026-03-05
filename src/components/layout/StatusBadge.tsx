import type { ProjectStatus, ProjectOrigin, ProjectType } from '@/types/project'

type Variant = 'status' | 'origin' | 'type'

type Props =
  | { variant: 'status'; value: ProjectStatus }
  | { variant: 'origin'; value: ProjectOrigin }
  | { variant: 'type';   value: ProjectType }

const statusStyles: Record<ProjectStatus, string> = {
  live:     'text-terminal-green border-terminal-green/30 bg-terminal-green/10',
  wip:      'text-terminal-yellow border-terminal-yellow/30 bg-terminal-yellow/10',
  archived:    'text-terminal-gray  border-terminal-gray/30  bg-terminal-gray/10',
  'shut-down': 'text-terminal-gray    border-terminal-gray/30    bg-terminal-gray/10',
  'acquired':  'text-terminal-green  border-terminal-green/30  bg-terminal-green/10',
}

const originStyles: Record<ProjectOrigin, string> = {
  'startup':   'text-[#c084fc] border-[#c084fc]/30 bg-[#c084fc]/10',
  'prototype': 'text-[#f472b6] border-[#f472b6]/30 bg-[#f472b6]/10',
  'hackathon':    'text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/10',
  'fun-project':  'text-[#fb923c] border-[#fb923c]/30 bg-[#fb923c]/10',
}

const typeStyles: Record<ProjectType, string> = {
  'live':         'text-terminal-accent border-terminal-accent/30 bg-terminal-accent/10',
  'writeup-only': 'text-terminal-dim   border-terminal-dim/30   bg-terminal-dim/10',
}

export function StatusBadge(props: Props) {
  let style: string
  if (props.variant === 'status') style = statusStyles[props.value]
  else if (props.variant === 'origin') style = originStyles[props.value]
  else style = typeStyles[props.value]

  return (
    <span className={`inline-block text-xs border rounded px-1.5 py-0.5 ${style}`}>
      {props.value}
    </span>
  )
}
