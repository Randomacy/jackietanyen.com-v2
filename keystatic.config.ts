import { config, collection, fields, singleton } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'

// In production the editor at /keystatic signs in with GitHub and every save
// is a commit to the repo, which triggers a Vercel rebuild. Locally
// (`npm run dev`) edits are written straight to the files on disk; set
// NEXT_PUBLIC_KEYSTATIC_STORAGE=github to use GitHub mode locally instead.
const useGithub =
  process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === 'github'

const storage = useGithub
  ? ({ kind: 'github', repo: 'Randomacy/jackietanyen.com-v2' } as const)
  : ({ kind: 'local' } as const)

// Custom blocks available in every write-up. They are rendered by the
// matching components in src/components/mdx/MdxContent.tsx.
const contentComponents = {
  YouTube: block({
    label: 'YouTube video',
    schema: {
      url: fields.url({ label: 'YouTube link', validation: { isRequired: true } }),
      title: fields.text({ label: 'Title (for screen readers)' }),
    },
  }),
  Video: block({
    label: 'Video file',
    schema: {
      src: fields.text({
        label: 'Video path',
        description: 'Path to an .mp4 in public/, e.g. /assets/projects/my-project/demo.mp4',
        validation: { length: { min: 1 } },
      }),
    },
  }),
}

function writeup(label: string, assetFolder: string) {
  return fields.mdx({
    label,
    options: {
      image: {
        directory: `public/assets/${assetFolder}`,
        publicPath: `/assets/${assetFolder}/`,
      },
    },
    components: contentComponents,
  })
}

const topics = (label: string) =>
  fields.array(fields.text({ label: 'Topic' }), {
    label,
    description: 'Lowercase, reuse existing topics where possible (they power the filters).',
    itemLabel: (props) => props.value || 'new topic',
  })

export default config({
  storage,
  ui: {
    brand: { name: 'jackietanyen.com' },
    navigation: {
      Content: ['projects', 'articles', 'media'],
      Settings: ['projectOrder'],
    },
  },

  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'status', 'builtAt'],
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'URL slug', description: 'The page lives at /apps/{slug}' },
        }),
        shortDescription: fields.text({
          label: 'Short description',
          description: 'Shown on the project card and used as the Google snippet and link preview.',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Live', value: 'live' },
            { label: 'WIP', value: 'wip' },
            { label: 'Archived', value: 'archived' },
            { label: 'Shut down', value: 'shut-down' },
            { label: 'Acquired', value: 'acquired' },
          ],
          defaultValue: 'archived',
        }),
        origin: fields.select({
          label: 'Origin',
          options: [
            { label: 'Startup', value: 'startup' },
            { label: 'Prototype', value: 'prototype' },
            { label: 'Hackathon', value: 'hackathon' },
            { label: 'Fun project', value: 'fun-project' },
          ],
          defaultValue: 'hackathon',
        }),
        type: fields.select({
          label: 'Type',
          description: '"Live app" only works for projects with an app component registered in code.',
          options: [
            { label: 'Writeup only', value: 'writeup-only' },
            { label: 'Live app', value: 'live' },
          ],
          defaultValue: 'writeup-only',
        }),
        categories: topics('Topics'),
        builtAt: fields.text({ label: 'Built (year)', description: 'e.g. 2026' }),
        award: fields.text({
          label: 'Award / placing',
          description: 'e.g. "1st place — SingHacks 2025". Shown as a badge, and counted as a win in the homepage stats. Leave empty if it didn\'t place.',
        }),
        content: writeup('Write-up', 'projects'),
      },
    }),

    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'content/articles/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'URL slug', description: 'The page lives at /articles/{slug}' },
        }),
        description: fields.text({
          label: 'Description',
          description: 'Shown in the article list and used as the Google snippet and link preview.',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        date: fields.date({ label: 'Published', validation: { isRequired: true } }),
        publication: fields.text({ label: 'Publication', description: 'e.g. Medium, Personal Blog' }),
        type: fields.select({
          label: 'Type',
          description: 'Hosted articles get a page on this site. External ones link straight to the URL below.',
          options: [
            { label: 'Hosted on this site', value: 'hosted' },
            { label: 'External link only', value: 'external' },
          ],
          defaultValue: 'hosted',
        }),
        url: fields.url({
          label: 'Original URL',
          description: 'For external articles, or the original source of a hosted copy.',
        }),
        topics: topics('Topics'),
        content: writeup('Article', 'articles'),
      },
    }),

    media: collection({
      label: 'Media, talks & press',
      slugField: 'title',
      path: 'content/media/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'URL slug', description: 'The page lives at /media/{slug}' },
        }),
        publication: fields.text({
          label: 'Publication / event',
          validation: { length: { min: 1 } },
        }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        description: fields.text({
          label: 'Description',
          description: 'Shown in the media list and used as the Google snippet and link preview.',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        topics: topics('Topics'),
        url: fields.url({
          label: 'Original URL',
          description: 'Shown as "read the original" at the end of the page. Leave empty for talks with no public link.',
        }),
        content: writeup('Summary', 'media'),
      },
    }),
  },

  singletons: {
    projectOrder: singleton({
      label: 'Project order',
      path: 'content/settings/project-order',
      format: { data: 'yaml' },
      schema: {
        order: fields.array(
          fields.relationship({ label: 'Project', collection: 'projects', validation: { isRequired: true } }),
          {
            label: 'Order on the homepage and /apps',
            description: 'Drag to reorder. The first three appear on the homepage. Projects not in this list are shown first.',
            itemLabel: (props) => props.value ?? 'pick a project',
          }
        ),
      },
    }),
  },
})
