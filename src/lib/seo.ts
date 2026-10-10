import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, CONTACT_EMAIL, SOCIAL_LINKS, absoluteUrl } from './site'

type PageMetaInput = {
  title?: string
  description?: string
  path: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  noIndex?: boolean
  hasOwnImage?: boolean // true when the route has its own opengraph-image file
}

// Per-page metadata. Each page sets its own canonical URL and Open Graph block
// (Next.js replaces, rather than merges, a parent's openGraph object).
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  type = 'website',
  publishedTime,
  noIndex,
  hasOwnImage,
}: PageMetaInput): Metadata {
  const ogTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  // Pages without their own card fall back to the site-wide one.
  const images = hasOwnImage ? {} : { images: ['/opengraph-image'] }
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_SG',
      type,
      ...images,
      ...(type === 'article' && publishedTime
        ? { publishedTime, authors: [SITE_URL] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      ...images,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}

export const personJsonLd = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: SITE_URL,
  image: absoluteUrl('/assets/profile/profilepic.jpg'),
  email: `mailto:${CONTACT_EMAIL}`,
  jobTitle: 'Founder',
  description: SITE_DESCRIPTION,
  address: { '@type': 'PostalAddress', addressLocality: 'Singapore', addressCountry: 'SG' },
  knowsLanguage: ['English', 'Malay', 'Mandarin', 'Japanese', 'Cantonese'],
  knowsAbout: ['Startups', 'Artificial Intelligence', 'Machine Learning', 'Blockchain', 'Product Development', 'Venture Investing'],
  award: ['Forbes 30 Under 30 Asia', 'Gen.T List'],
  sameAs: SOCIAL_LINKS.map((s) => s.href),
}

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#person` },
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function articleJsonLd(a: {
  title: string
  description: string
  path: string
  date: string
  publication?: string
}) {
  return {
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    url: absoluteUrl(a.path),
    mainEntityOfPage: absoluteUrl(a.path),
    image: absoluteUrl(`${a.path}/opengraph-image`),
    author: { '@id': `${SITE_URL}/#person`, '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    ...(a.publication ? { publisher: { '@type': 'Organization', name: a.publication } } : {}),
  }
}
