import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/render'

export const alt = 'Jackie Tan Yen — serial founder, PhD in applied AI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    path: '~',
    title: 'jackie tan yen',
    subtitle: '11 ventures, 4 startups, 2 exits · 17 hackathons, 9 wins. based in singapore.',
  })
}
