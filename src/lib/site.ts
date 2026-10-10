export const SITE_URL = 'https://jackietanyen.com'

export const SITE_NAME = 'Jackie Tan Yen'

export const SITE_TAGLINE = 'serial founder. phd in applied ai.'

export const SITE_DESCRIPTION =
  'Jackie Tan Yen is a Singapore-based serial founder (4 startups, 2 exits) with a PhD in applied AI. Projects, hackathon builds, writing, talks, and press.'

export const CONTACT_EMAIL = 'jackietanyen@gmail.com'

// Public profiles, used for the footer and for structured data (schema.org sameAs)
export const SOCIAL_LINKS = [
  { label: 'github', href: 'https://github.com/Randomacy' },
  { label: 'medium', href: 'https://medium.com/@jackietanyen' },
]

export const NAV_LINKS = [
  { label: 'about',    href: '/about' },
  { label: 'apps',     href: '/apps' },
  { label: 'articles', href: '/articles' },
  { label: 'media',    href: '/media' },
]

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}
