# jackietanyen.com v2

Personal site. Projects, articles, media, and background.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and MDX.

## running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## pages

| Route | What's there |
|---|---|
| `/` | Home |
| `/about` | Background |
| `/apps` | Projects, filterable by type, status, origin, and category |
| `/apps/{slug}` | Project writeup |
| `/apps/{slug}/app` | Embedded app (only for projects with `type: 'live'`) |
| `/articles` | Articles, hosted and external |
| `/articles/{slug}` | Hosted article |
| `/media` | Press, interviews, talks, and panels, newest first |
| `/media/{slug}` | Summary of a media feature or talk |

## structure

```
content/
  articles/       # MDX article writeups
  media/          # MDX summaries of press features and talks
  projects/       # MDX project writeups
src/
  app/            # Next.js app router pages
  components/     # React components
  data/           # Project, article, and media metadata (TypeScript)
  lib/            # Filtering and lookup utilities
  types/          # TypeScript type definitions
public/
  assets/         # Static images and videos
  reference/      # Downloadable slides, decks, and source archives
```

## adding content

**New project:** add an entry to `src/data/projects.ts` and a corresponding MDX file at `content/projects/{slug}.mdx`.

**New article:** add an entry to `src/data/articles.ts`. If hosted on this site, also add `content/articles/{slug}.mdx`.

**New media feature or talk:** add an entry to `src/data/media.ts` and a summary at `content/media/{slug}.mdx`. Set `url` to the original source; it's shown as a "read the original" link at the end of the summary page. Leave `url` out for talks with no public link. Tag talks and panels with the `speaking` topic. Put images in `public/assets/media/` and slides in `public/reference/`.

## seo and sharing

- `src/lib/site.ts` holds the site URL, name, description, nav links, and public profiles. Edit it to add a profile (e.g. LinkedIn); it feeds the footer and the structured data.
- Each page sets its own title, description, and canonical URL via `pageMetadata()` in `src/lib/seo.ts`. Project, article, and media pages pull these from their entries in `src/data/`, so a good `shortDescription` / `description` doubles as the Google snippet.
- `sitemap.xml` and `robots.txt` are generated from `src/app/sitemap.ts` and `src/app/robots.ts`; new content is picked up automatically.
- Social preview cards (`opengraph-image`) are generated at build time for every project, article, and media page.
- Images in MDX written as `![alt](/assets/...)` are resized and lazy-loaded automatically; always give them alt text. For raw `<iframe>` or `<video>` tags, add `loading="lazy"` / `preload="metadata"` yourself.

## commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run type-check` | TypeScript type check |
