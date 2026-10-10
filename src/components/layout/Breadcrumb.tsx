import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbJsonLd } from '@/lib/seo'

type Crumb = {
  name: string   // human-readable name, used in structured data
  label: string  // what is shown, e.g. "apps/"
  path: string
}

type Props = {
  items: Crumb[] // excludes home; the last item is the current page
}

export function Breadcrumb({ items }: Props) {
  const all = [{ name: 'Home', label: '~/', path: '/' }, ...items]

  return (
    <>
      <nav aria-label="breadcrumb" className="mb-6 text-xs md:text-[13px] text-terminal-dim">
        <ol className="flex flex-wrap items-center">
          {all.map((c, i) =>
            i === all.length - 1 ? (
              <li key={c.path} aria-current="page" className="text-terminal-text break-all">
                {c.label}
              </li>
            ) : (
              <li key={c.path}>
                <Link href={c.path} className="inline-block py-1 hover:text-terminal-accent transition-colors duration-150">
                  {c.label}
                </Link>
              </li>
            )
          )}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all.map((c) => ({ name: c.name, path: c.path })))} />
    </>
  )
}
