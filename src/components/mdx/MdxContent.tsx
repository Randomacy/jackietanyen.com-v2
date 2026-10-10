import path from 'path'
import Image from 'next/image'
import sharp from 'sharp'
import type { ComponentPropsWithoutRef } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

// Width of the reading column (max-w-2xl); images never render wider than this.
const COLUMN_WIDTH = 672

async function getLocalImageSize(src: string) {
  try {
    const file = path.join(process.cwd(), 'public', decodeURI(src))
    const { width, height } = await sharp(file).metadata()
    return width && height ? { width, height } : null
  } catch {
    return null
  }
}

// Markdown images (![alt](src)) go through next/image when local: resized per device,
// served as WebP/AVIF, and lazy-loaded. Remote or unreadable images fall back to a
// lazy <img>.
async function MdxImage({ src, alt }: ComponentPropsWithoutRef<'img'>) {
  const altText = alt ?? ''
  const size = typeof src === 'string' && src.startsWith('/') ? await getLocalImageSize(src) : null

  if (!size || typeof src !== 'string') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={typeof src === 'string' ? src : undefined} alt={altText} loading="lazy" decoding="async" />
  }

  return (
    <Image
      src={src}
      alt={altText}
      width={size.width}
      height={size.height}
      sizes={`(min-width: ${COLUMN_WIDTH + 32}px) ${COLUMN_WIDTH}px, calc(100vw - 32px)`}
      className="h-auto w-full rounded border border-terminal-border"
    />
  )
}

function youtubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/)
  return match ? match[1] : null
}

// <YouTube url="…" title="…" /> block from the editor.
function YouTube({ url, title }: { url: string; title?: string }) {
  const id = youtubeId(url)
  if (!id) return <a href={url} target="_blank" rel="noopener noreferrer">{title || url} ↗</a>
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title || 'YouTube video'}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="my-6 w-full aspect-video rounded border border-terminal-border"
    />
  )
}

// <Video src="…" /> block from the editor.
function Video({ src }: { src: string }) {
  return (
    <video
      src={src}
      controls
      preload="metadata"
      playsInline
      className="my-6 w-full rounded border border-terminal-border"
    />
  )
}

function MdxLink({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) {
  const external = /^https?:\/\//.test(href)
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    : <a href={href} {...props} />
}

const components = {
  img: MdxImage,
  a: MdxLink,
  YouTube,
  Video,
}

export function MdxContent({ source }: { source: string }) {
  return (
    <article
      className="prose prose-invert prose-sm md:text-[15px] max-w-none
        prose-headings:font-mono prose-headings:font-semibold prose-headings:text-terminal-text
        prose-h2:text-base md:prose-h2:text-lg prose-h2:mt-10 prose-h3:text-[15px] md:prose-h3:text-base
        prose-p:text-terminal-body prose-p:leading-relaxed
        prose-li:text-terminal-body prose-li:marker:text-terminal-dim
        prose-a:text-terminal-blue prose-a:underline-offset-2 hover:prose-a:text-terminal-accent
        prose-code:text-terminal-green prose-code:bg-terminal-surface prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-terminal-surface prose-pre:border prose-pre:border-terminal-border
        prose-strong:text-terminal-text
        prose-blockquote:border-terminal-border prose-blockquote:text-terminal-dim
        prose-hr:border-terminal-border
        prose-th:text-terminal-text prose-td:text-terminal-body prose-table:block prose-table:overflow-x-auto
        prose-img:my-6"
    >
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </article>
  )
}
