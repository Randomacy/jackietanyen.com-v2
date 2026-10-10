import type { MetadataRoute } from 'next'
import { getAllArticles, getAllMedia, getAllProjects } from '@/lib/content'
import { absoluteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allProjects, articles, mediaFeatures] = await Promise.all([
    getAllProjects(),
    getAllArticles(),
    getAllMedia(),
  ])

  const sections: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'),         changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/about'),    changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/apps'),     changeFrequency: 'weekly',  priority: 0.9 },
    { url: absoluteUrl('/articles'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/media'),    changeFrequency: 'monthly', priority: 0.7 },
  ]

  const projects: MetadataRoute.Sitemap = allProjects.map((p) => ({
    url: absoluteUrl(`/apps/${p.slug}`),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  const hostedArticles: MetadataRoute.Sitemap = articles
    .filter((a) => a.type === 'hosted')
    .map((a) => ({
      url: absoluteUrl(`/articles/${a.slug}`),
      lastModified: a.date,
      changeFrequency: 'yearly',
      priority: 0.6,
    }))

  const media: MetadataRoute.Sitemap = mediaFeatures.map((m) => ({
    url: absoluteUrl(`/media/${m.slug}`),
    lastModified: m.date,
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...sections, ...projects, ...hostedArticles, ...media]
}
