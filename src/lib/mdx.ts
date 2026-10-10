import fs from 'fs'
import path from 'path'

type Collection = 'projects' | 'articles' | 'media'

// Reads an MDX file from content/{collection}/{slug}.mdx. A leading "# title"
// line is dropped because every page already renders the title as its <h1>.
export function getMdxContent(collection: Collection, slug: string): string | null {
  const filePath = path.join(process.cwd(), 'content', collection, `${slug}.mdx`)
  try {
    const source = fs.readFileSync(filePath, 'utf-8')
    return source.replace(/^\s*# [^\n]*\n/, '')
  } catch {
    return null
  }
}
