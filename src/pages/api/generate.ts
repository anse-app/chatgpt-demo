import type { APIRoute } from 'astro'
import { generatePayload, parseOpenAIStream } from '@/utils/openAI'
// #vercel-disable-blocks
import { fetch, ProxyAgent } from 'undici'
// #vercel-end

const apiKey = import.meta.env.OPENAI_API_KEY
const https_proxy = import.meta.env.HTTPS_PROXY
const siteToken = import.meta.env.SITE_TOKEN

export const post: APIRoute = async (context) => {
  if (siteToken) {
    if (context.url.searchParams.get('token') !== siteToken) {
      return new Response('Unauthorized: \n\tinput "@token=YOUR_SITE_TOKEN" to authenticate,\n\tinput "@token=clear" to clear token')
    }
  }

  const body = await context.request.json()
  const messages = body.messages

  if (!messages) {
    return new Response('No input text')
  }
  const initOptions = generatePayload(apiKey, messages)
  // #vercel-disable-blocks
  if (https_proxy) {
    initOptions['dispatcher'] = new ProxyAgent(https_proxy)
  }
  // #vercel-end

  // @ts-ignore
  const response = await fetch('https://api.openai.com/v1/chat/completions', initOptions) as Response

  return new Response(parseOpenAIStream(response))
}
