export type ArticleType = 'external' | 'hosted'

export type Article = {
  slug?: string           // only for hosted articles (used as route param)
  title: string
  publication?: string    // where it was published (e.g. "Medium", "The Star")
  date: string            // ISO date string for sorting
  description: string
  type: ArticleType
  url?: string            // for external articles
  topics: string[]
}

export type MediaFeature = {
  slug: string
  title: string
  publication: string
  date: string
  description: string
  topics: string[]
  url: string             // link to the original source, shown at the end of the summary page
}
