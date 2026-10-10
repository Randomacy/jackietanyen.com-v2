# jackietanyen.com v2

Personal site. Projects, articles, media, and background.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and MDX. Content is edited through [Keystatic](https://keystatic.com) at `/keystatic`.

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
| `/keystatic` | Content editor (not indexed) |

## structure

```
keystatic.config.ts  # Content schema for the editor
content/
  articles/       # One .mdx per article: fields in the frontmatter, body below
  media/          # One .mdx per press feature or talk
  projects/       # One .mdx per project
  settings/       # Project order
src/
  app/(site)/     # Public pages
  app/keystatic/  # Editor UI; app/api/keystatic is its API
  apps/           # Components for "live app" projects, keyed by slug
  components/     # React components
  lib/content.ts  # Reads content/ (via the Keystatic reader) for the pages
  lib/            # SEO, filtering, and formatting utilities
  types/          # TypeScript type definitions
public/
  assets/         # Static images and videos
  reference/      # Downloadable slides, decks, and source archives
```

## editing content

Go to **jackietanyen.com/keystatic** (laptop or phone), sign in with GitHub, and add, edit, or delete projects, articles, and media. Each save is a commit to `master`; Vercel rebuilds and the change is live in about a minute.

- **Projects**: title, URL slug, short description, status, origin, topics, year, and the write-up. New projects appear first; drag them into place under **Settings → Project order** (the first three show on the homepage).
- **Articles**: set the type to *external link only* for pieces that live elsewhere; *hosted* articles get their own page.
- **Media, talks & press**: set the original URL to show a "read the original" link. Tag talks and panels with the `speaking` topic.
- Write-ups support headings, lists, tables, links, code, and images (uploaded into `public/assets/{collection}/{slug}/`), plus **YouTube video** and **Video file** blocks from the `+` menu.

Locally, `npm run dev` and open `http://localhost:3000/keystatic`: edits are written straight to the files in `content/`, no sign-in needed. The files can also be edited by hand.

### one-time setup for editing on the live site

The editor signs in through a GitHub App you own. Until its keys are set in Vercel, `/keystatic` shows but can't sign in; the rest of the site is unaffected.

1. On GitHub, go to **Settings → Developer settings → GitHub Apps → New GitHub App**.
   - **Name**: e.g. `jackietanyen-keystatic`
   - **Homepage URL**: `https://jackietanyen.com/keystatic`
   - **Callback URL**: `https://jackietanyen.com/api/keystatic/github/oauth/callback`
   - Leave **Expire user authorization tokens** checked. Untick **Webhook → Active**.
   - **Repository permissions**: Contents *Read and write*, Metadata *Read-only*, Pull requests *Read-only*.
   - **Where can this app be installed?**: *Only on this account*.
2. Create the app, then on its page click **Generate a new client secret**. Note the **Client ID**, the secret, and the app's URL name (the slug in `github.com/apps/<slug>`).
3. Click **Install App** and install it on the `jackietanyen.com-v2` repository only.
4. In Vercel → the project → **Settings → Environment Variables**, add these for Production:
   - `KEYSTATIC_GITHUB_CLIENT_ID`: the Client ID
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`: the client secret
   - `KEYSTATIC_SECRET`: any long random string (e.g. from `openssl rand -hex 32`)
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`: the app's URL name
5. Redeploy (Deployments → ⋯ → Redeploy), then open `https://jackietanyen.com/keystatic`.

## seo and sharing

- `src/lib/site.ts` holds the site URL, name, description, nav links, and public profiles. Edit it to add a profile (e.g. LinkedIn); it feeds the footer and the structured data.
- Each page sets its own title, description, and canonical URL via `pageMetadata()` in `src/lib/seo.ts`. Project, article, and media pages pull these from their entries in `content/`, so a good short description doubles as the Google snippet.
- `sitemap.xml` and `robots.txt` are generated from `src/app/sitemap.ts` and `src/app/robots.ts`; new content is picked up automatically.
- Social preview cards (`opengraph-image`) are generated at build time for every project, article, and media page.
- Images in write-ups are resized and lazy-loaded automatically; always give them alt text.

## commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run type-check` | TypeScript type check |
