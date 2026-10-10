import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/render'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  return renderOgImage({
    path: `~/apps/${slug}`,
    title: project?.title ?? slug,
    subtitle: project?.shortDescription,
  })
}
