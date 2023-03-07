import type { APIRoute } from 'astro'

const realPassword = import.meta.env.SITE_PASSWORD

export const post: APIRoute = async (context) => {
  const body = await context.request.json()

  const { pass } = body
  return new Response(JSON.stringify({
    real: realPassword,
    input: pass,
  }))
}
