import type { APIRoute } from 'astro'
import { generatePayload, parseOpenAIStream } from '@/utils/openAI'
import { verifySignature } from '@/utils/auth'
// #vercel-disable-blocks
import { fetch, ProxyAgent } from 'undici'
// #vercel-end

const apiKey = import.meta.env.OPENAI_API_KEY
const https_proxy = import.meta.env.HTTPS_PROXY

export const post: APIRoute = async (context) => {
  const body = await context.request.json()
  const { sign, time, messages } = body
  if (!messages) {
    return new Response('No input text')
  }
  if (import.meta.env.PROD && !await verifySignature({ t: time, m: messages }, sign)) {
    return new Response('Invalid signature')
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
