
// #vercel-end
import { generatePayload, parseOpenAIStream } from '@/utils/openAI'

import type { APIRoute } from 'astro'


const baseUrl = 'https://api.openai.com'


export const post: APIRoute = async(context) => {
  const body = await context.request.json()
  const { apiKey, messages } = body
  if (!messages) {
    return new Response(JSON.stringify({
      error: {
        message: 'No input text.',
      },
    }), { status: 400 })
  }
  
  const initOptions = generatePayload(apiKey, messages)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const response = await fetch(`${baseUrl}/v1/chat/completions`, initOptions).catch((err: Error) => {
    console.error(err)
    return new Response(JSON.stringify({
      error: {
        code: err.name,
        message: err.message,
      },
    }), { status: 500 })
  }) as Response

  return parseOpenAIStream(response) as Response
}
