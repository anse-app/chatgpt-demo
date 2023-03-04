import type { APIRoute } from 'astro'
import { generatePayload, parseOpenAIStream } from '@/utils/openAI'
// #vercel-disable-blocks
import { fetch, ProxyAgent } from 'undici'
// #vercel-end

const apiKey = import.meta.env.OPENAI_API_KEY
const https_proxy = import.meta.env.HTTPS_PROXY

export const post: APIRoute = async (context) => {
  const body = await context.request.json()
  const messages = body.messages

  if (!messages) {
    return new Response('No input text')
  }
  const initOptions = generatePayload(apiKey, messages)
  if (ProxyAgent && https_proxy) {
    initOptions['dispatcher'] = new ProxyAgent(https_proxy)
  }

  // @ts-ignore
  const response = await fetch('https://api.openai.com/v1/chat/completions', initOptions) as Response

  return new Response(parseOpenAIStream(response))
}
