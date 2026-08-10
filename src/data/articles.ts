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
    title: '3 Ways Running a Start Up is Like an RPG',
    publication: 'Medium',
    date: '2018-09-02',
    description: 'Drawing on Final Fantasy and Fire Emblem to frame the early-stage founder grind — leveling up, party composition, and playing the long game.',
    type: 'external',
    url: 'https://medium.com/@jackietanyen/3-ways-running-a-start-up-is-like-an-rpg-f04b209036ef',
    topics: ['startups', 'gaming', 'culture'],
  },
  {
    title: 'Fantastic Tech Co-founders and Where to Find Them',
    publication: 'Medium',
    date: '2018-04-30',
    description: 'Validate the idea first, then go looking — personal network, referrals, platforms like CoFoundersLab and BEAM, and hackathons.',
    type: 'external',
    url: 'https://medium.com/@jackietanyen/fantastic-tech-co-founders-and-where-to-find-them-18c6b64e08cb',
    topics: ['startups', 'co-founders', 'hackathons'],
  },
]
