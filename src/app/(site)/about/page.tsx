import Image from 'next/image'
import Link from 'next/link'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalLine } from '@/components/terminal/TerminalLine'
import { BlinkingCursor } from '@/components/terminal/BlinkingCursor'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { JsonLd } from '@/components/JsonLd'
import { pageMetadata, personJsonLd } from '@/lib/seo'
import { getProjectStats } from '@/lib/content'
import { CONTACT_EMAIL, SITE_URL, SOCIAL_LINKS } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'About',
  description: 'About Jackie Tan Yen — serial founder with 2 exits, PhD in applied AI, former NTU associate professor, Forbes 30 Under 30 Asia and Tatler Gen.T honouree, based in Singapore.',
  path: '/about',
  type: 'profile',
})

export default async function AboutPage() {
  const stats = await getProjectStats()
  const skills = [
    { label: 'built', items: ['product', 'full-stack', 'ai/ml', 'brain-computer interfaces', 'blockchain'] },
    { label: 'investing', items: ['pre-seed', 'art'] },
    { label: 'languages', items: ['english', 'malay', 'mandarin', 'japanese', 'cantonese'] },
  ]

  // Roles and dates as told in the project write-ups on this site.
  const experience = [
    { years: '2026–', role: 'founder & ceo, mind interface company', href: '/apps/mind-interface-company' },
    { years: '2025', role: 'product lead, circles' },
    { years: '2024–25', role: 'co-founder, thirdlyr — maritime cross-border payments', href: '/apps/thirdlyr' },
    { years: '2023–24', role: 'co-founder & ceo, borderdollar — antler sg15', href: '/apps/borderdollar' },
    { years: '2022–23', role: 'head of tribe academy, then head of product at angelhack (tribe)', href: '/apps/developer-terminal' },
    { years: '2020–24', role: 'associate professor, biomedical data science programme, ntu' },
    { years: '2019–22', role: 'co-founder, uplevel — acquired by tribe', href: '/apps/uplevel' },
    { years: '2019', role: 'chief academic officer, upcode academy' },
    { years: '2017–18', role: 'head of business development, infocorp technologies', href: '/apps/neste-hackathon' },
    { years: '2016–19', role: 'co-founder, fundmylife — acquired by dollarsandsense', href: '/apps/fundmylife-startup' },
  ]

  const credentials = [
    { text: 'phd (applied ai), school of biological sciences, ntu' },
    { text: 'b.sc. life sciences, nus — university scholars programme' },
    { text: 'forbes 30 under 30 asia 2018 — finance & venture capital', href: '/media/forbes-30u30-2018' },
    { text: 'tatler gen.t list 2023', href: '/media/tatler-gent-2023' },
    { text: 'tedx speaker — tedxnus 2019, tedxnewton 2022', href: '/media' },
  ]

  return (
    <main className="px-4 py-8 md:py-12">
      <JsonLd
        data={{
          '@type': 'ProfilePage',
          url: `${SITE_URL}/about`,
          mainEntity: personJsonLd,
        }}
      />
      <div className="w-full max-w-2xl mx-auto">
        <Breadcrumb items={[{ name: 'About', label: 'about', path: '/about' }]} />
        <TerminalWindow title="jackie@builder: ~/about">
          <div className="space-y-6 md:space-y-8">

            {/* photo + bio */}
            <section className="space-y-2">
              <TerminalPrompt command="cat about.txt --full" />
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-1">
                <Image
                  src="/assets/profile/profilepic.jpg"
                  alt="portrait of jackie tan yen"
                  width={128}
                  height={128}
                  priority
                  className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 border border-terminal-border grayscale object-cover"
                />

                <div className="space-y-3">
                  <h1 className="font-normal text-terminal-text leading-relaxed">
                    jackie tan yen &mdash; {stats.startups} startups, {stats.exits} exits, {stats.wins} hackathon wins. phd in applied ai. based in singapore.
                  </h1>
                  <TerminalLine color="default">
                    i&apos;ve spent the last decade building internet products across multiple verticals with varying successes. forbes 30 under 30. gen.t lister.
                  </TerminalLine>
                  <TerminalLine color="default">
                    now: founder &amp; ceo of{' '}
                    <Link href="/apps/mind-interface-company" className="terminal-link">mind interface company</Link>
                    , building a non-invasive brain-computer interface that turns thoughts into text for people who can&apos;t speak or move.
                  </TerminalLine>
                </div>
              </div>
            </section>

            {/* skills */}
            <section className="space-y-2">
              <TerminalPrompt command="cat skills.txt" />
              <dl className="space-y-2 pt-1">
                {skills.map(({ label, items }) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="text-terminal-dim sm:w-24 shrink-0">{label}:</dt>
                    <dd className="text-terminal-text">{items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* experience */}
            <section className="space-y-2">
              <TerminalPrompt command="cat experience.log" />
              <ol className="space-y-2 pt-1">
                {experience.map(({ years, role, href }) => (
                  <li key={role} className="flex flex-col sm:flex-row sm:gap-3">
                    <span className="text-terminal-dim sm:w-24 shrink-0">{years}</span>
                    {href ? (
                      <Link href={href} className="terminal-link">{role}</Link>
                    ) : (
                      <span className="text-terminal-text">{role}</span>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            {/* education + recognition */}
            <section className="space-y-2">
              <TerminalPrompt command="cat credentials.txt" />
              <ul className="space-y-1 pt-1">
                {credentials.map(({ text, href }) => (
                  <li key={text} className="text-terminal-text">
                    {href ? <Link href={href} className="terminal-link">{text}</Link> : text}
                  </li>
                ))}
              </ul>
            </section>

            {/* links */}
            <section className="space-y-2">
              <TerminalPrompt command="ls ./elsewhere" />
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                <li><a href={`mailto:${CONTACT_EMAIL}`} className="terminal-link inline-block py-1">email/</a></li>
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer me" className="terminal-link inline-block py-1">{s.label} ↗</a>
                  </li>
                ))}
                <li><Link href="/media" className="terminal-link inline-block py-1">press/</Link></li>
              </ul>
            </section>

            <BlinkingCursor />

          </div>
        </TerminalWindow>
      </div>
    </main>
  )
}
