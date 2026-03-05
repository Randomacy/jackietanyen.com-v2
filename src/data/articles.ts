import type { Article } from '@/types/content'

export const articles: Article[] = [
  {
    slug: 'building-in-malaysia',
    title: 'Building Consumer Tech in Malaysia',
    publication: 'Personal Blog',
    date: '2024-09-15',
    description: 'Why building consumer internet products in Malaysia is harder than it looks — distribution, payments, and trust.',
    type: 'hosted',
    topics: ['malaysia', 'startups', 'consumer'],
  },
  {
    title: 'The Myth of the 10x Engineer',
    publication: 'Medium',
    date: '2024-05-02',
    description: 'What "10x" actually means in practice and why team leverage matters more than individual output.',
    type: 'external',
    url: 'https://medium.com',
    topics: ['engineering', 'teams', 'culture'],
  },
  {
    title: 'Why Southeast Asia Needs Its Own AI Stack',
    publication: 'Tech in Asia',
    date: '2023-11-20',
    description: 'A case for region-specific AI infrastructure — language, data, and regulatory considerations.',
    type: 'external',
    url: 'https://techinasia.com',
    topics: ['ai', 'sea', 'infrastructure'],
  },
]
