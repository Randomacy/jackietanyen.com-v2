# jackietanyen.com v2

Personal site. Projects, articles, media, and background.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and MDX.

## running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## structure

```
content/
  articles/       # MDX article writeups
  projects/       # MDX project writeups
src/
  app/            # Next.js app router pages
  components/     # React components
  data/           # Project, article, and media metadata (TypeScript)
  lib/            # Filtering and lookup utilities
  types/          # TypeScript type definitions
public/
  assets/         # Static images
```

## adding content

**New project:** add an entry to `src/data/projects.ts` and a corresponding MDX file at `content/projects/{slug}.mdx`.

**New article:** add an entry to `src/data/articles.ts`. If hosted on this site, also add `content/articles/{slug}.mdx`.

## commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run type-check` | TypeScript type check |
