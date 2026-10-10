import { CONTACT_EMAIL, SITE_NAME, SOCIAL_LINKS } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-terminal-border mt-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-xs text-terminal-dim sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {SITE_NAME}</span>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} className="py-1 hover:text-terminal-accent transition-colors duration-150">
              email
            </a>
          </li>
          {SOCIAL_LINKS.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="py-1 hover:text-terminal-accent transition-colors duration-150"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
