import type { APIRoute } from 'astro'

const baseUrl = (import.meta.env.OPENAI_API_BASE_URL || 'https://api.openai.com').trim().replace(/\/$/, '')
const sitePassword = import.meta.env.SITE_PASSWORD

export const post: APIRoute = async(context) => {
  const body = await context.request.json()
  const { key: apiKey, pass } = body
  if (sitePassword && sitePassword !== pass) {
    return new Response(JSON.stringify({
      error: {
        message: 'Invalid password.',
      },
    }), { status: 401 })
  }

  const rawResponse = await fetch(`${baseUrl}/dashboard/billing/credit_grants`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }).catch((err: Error) => {
    console.error(err)
    return new Response(JSON.stringify({
      error: {
        code: err.name,
        message: err.message,
      },
    }), { status: 500 })
  })
  const response = await rawResponse.json()

  return new Response(JSON.stringify(response))
}
