import 'server-only'
import { cache } from 'react'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'
import type { Project } from '@/types/project'
import type { Article, MediaFeature } from '@/types/content'

// All site content lives in content/ and is edited through Keystatic
// (/keystatic). Pages read it at build time through this module.
const reader = createReader(process.cwd(), keystaticConfig)

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()

// ── projects ────────────────────────────────────────────────────────────────

// Projects in the order set under "Project order" in the editor. Projects
// missing from that list (e.g. just added) come first.
export const getAllProjects = cache(async (): Promise<Project[]> => {
  const [entries, settings] = await Promise.all([
    reader.collections.projects.all(),
    reader.singletons.projectOrder.read(),
  ])

  const order = (settings?.order ?? []).filter((s): s is string => Boolean(s))
  const rank = new Map(order.map((slug, i) => [slug, i]))

  return entries
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      shortDescription: entry.shortDescription,
      type: entry.type,
      status: entry.status,
      origin: entry.origin,
      categories: [...entry.categories],
      builtAt: entry.builtAt || undefined,
      award: entry.award || undefined,
    }))
    .sort((a, b) => (rank.get(a.slug) ?? -1) - (rank.get(b.slug) ?? -1) || a.title.localeCompare(b.title))
})

// Headline numbers for the homepage, derived from the projects themselves:
// startups are projects with origin "startup", exits are those acquired,
// hackathons are hackathon projects plus any other project that won an award
// at one (e.g. a startup that came out of a hackathon), and wins are projects
// with an award.
export async function getProjectStats() {
  const projects = await getAllProjects()
  return {
    startups: projects.filter((p) => p.origin === 'startup').length,
    exits: projects.filter((p) => p.status === 'acquired').length,
    hackathons: projects.filter((p) => p.origin === 'hackathon' || p.award).length,
    wins: projects.filter((p) => p.award).length,
  }
}

export async function getProject(slug: string) {
  return (await getAllProjects()).find((p) => p.slug === slug)
}

export async function getProjectContent(slug: string): Promise<string | null> {
  const entry = await reader.collections.projects.read(slug)
  return entry ? (await entry.content()).trim() || null : null
}

// ── articles ────────────────────────────────────────────────────────────────

export const getAllArticles = cache(async (): Promise<Article[]> => {
  const entries = await reader.collections.articles.all()
  return entries
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      description: entry.description,
      date: entry.date ?? '',
      publication: entry.publication || undefined,
      type: entry.type,
      url: entry.url || undefined,
      topics: [...entry.topics],
    }))
    .sort(byDateDesc)
})

export async function getHostedArticle(slug: string) {
  return (await getAllArticles()).find((a) => a.slug === slug && a.type === 'hosted')
}

export async function getArticleContent(slug: string): Promise<string | null> {
  const entry = await reader.collections.articles.read(slug)
  return entry ? (await entry.content()).trim() || null : null
}

// ── media ───────────────────────────────────────────────────────────────────

export const getAllMedia = cache(async (): Promise<MediaFeature[]> => {
  const entries = await reader.collections.media.all()
  return entries
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      publication: entry.publication,
      date: entry.date ?? '',
      description: entry.description,
      topics: [...entry.topics],
      url: entry.url || undefined,
    }))
    .sort(byDateDesc)
})

export async function getMediaFeature(slug: string) {
  return (await getAllMedia()).find((m) => m.slug === slug)
}

export async function getMediaContent(slug: string): Promise<string | null> {
  const entry = await reader.collections.media.read(slug)
  return entry ? (await entry.content()).trim() || null : null
}
