import type { ComponentType } from 'react'

// Interactive apps embedded at /apps/{slug}/app. A project marked "Live app"
// in the editor needs its component registered here, keyed by slug.
export const appComponents: Record<string, ComponentType> = {}
