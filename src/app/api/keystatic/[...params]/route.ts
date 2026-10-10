import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '../../../../../keystatic.config'

// In production the editor needs the GitHub App credentials (see README).
// Until they are set on Vercel the API stays off instead of failing the build.
const githubConfigured = Boolean(
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  process.env.KEYSTATIC_SECRET
)

function notConfigured() {
  return new Response(
    'The content editor is not set up yet: add the Keystatic GitHub App environment variables in Vercel (see README).',
    { status: 503 }
  )
}

const handlers =
  process.env.NODE_ENV !== 'production' || githubConfigured
    ? makeRouteHandler({ config })
    : { GET: notConfigured, POST: notConfigured }

export const GET = handlers.GET
export const POST = handlers.POST
