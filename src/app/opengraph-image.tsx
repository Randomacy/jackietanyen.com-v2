import { getProjectStats } from '@/lib/content'
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/render'

export const alt = 'Jackie Tan Yen — serial founder, PhD in applied AI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  const stats = await getProjectStats()
  return renderOgImage({
    path: '~',
    title: 'jackie tan yen',
    subtitle: `${stats.startups} startups, ${stats.exits} exits · ${stats.hackathons} hackathons, ${stats.wins} wins. based in singapore.`,
  })
}
