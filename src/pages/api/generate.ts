import type { APIRoute } from 'astro'
import { generatePayload, parseOpenAIStream } from '@/utils/openAI'
// #vercel-disable-blocks
import { fetch, ProxyAgent } from 'undici'
// #vercel-end

const apiKey = import.meta.env.OPENAI_API_KEY
const https_proxy = import.meta.env.HTTPS_PROXY
var base_url = import.meta.env.OPENAI_API_BASE_URL /* Provide Reverse Proxy for OpenAI API. */
if(!base_url) base_url = 'https://api.openai.com';
base_url = base_url.trim().replace(/\/$/,'');

export const post: APIRoute = async (context) => {
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
  const response = await fetch(base_url + '/v1/chat/completions', initOptions) as Response

  return new Response(parseOpenAIStream(response))
}
