import { readFile } from 'fs/promises'
import path from 'path'
import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const fontDir = path.join(process.cwd(), 'src', 'lib', 'og')

type Props = {
  path: string      // shown in the terminal prompt, e.g. "~/apps/bloop"
  title: string
  subtitle?: string
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : cut.length).replace(/[\s,;:—-]+$/, "")}…`
}

// Terminal-styled social card shared by every page's opengraph-image.
export async function renderOgImage({ path: promptPath, title, subtitle }: Props) {
  const [regular, bold] = await Promise.all([
    readFile(path.join(fontDir, 'jetbrains-mono-latin-400-normal.woff')),
    readFile(path.join(fontDir, 'jetbrains-mono-latin-700-normal.woff')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0d0d0d',
          padding: 48,
          fontFamily: 'JetBrains Mono',
          textTransform: 'lowercase',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: '2px solid #2a2a2a',
            borderRadius: 16,
            background: '#141414',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 28px', borderBottom: '2px solid #2a2a2a', background: '#0d0d0d' }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: '#ff5f57' }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, background: '#febc2e' }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, background: '#28c840' }} />
            <div style={{ marginLeft: 12, fontSize: 24, color: '#999999' }}>jackietanyen.com</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '44px 56px', gap: 28 }}>
            <div style={{ display: 'flex', fontSize: 30 }}>
              <span style={{ color: '#22c55e' }}>jackie@builder</span>
              <span style={{ color: '#999999' }}>:</span>
              <span style={{ color: '#6699cc' }}>{promptPath}</span>
              <span style={{ color: '#999999' }}>$</span>
            </div>
            <div style={{ display: 'flex', fontSize: title.length > 40 ? 52 : 64, fontWeight: 700, color: '#d4d4d4', lineHeight: 1.15 }}>
              {truncate(title, 90)}
            </div>
            {subtitle && (
              <div style={{ display: 'flex', fontSize: 28, color: '#999999', lineHeight: 1.45 }}>
                {truncate(subtitle, 150)}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 56px 36px', fontSize: 26 }}>
            <span style={{ color: '#d4d4d4' }}>jackie tan yen</span>
            <span style={{ color: '#e53e3e' }}>serial founder · phd in applied ai</span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'JetBrains Mono', data: regular, weight: 400, style: 'normal' },
        { name: 'JetBrains Mono', data: bold, weight: 700, style: 'normal' },
      ],
    }
  )
}
