import { createParser } from 'eventsource-parser'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import type { ChatMessage } from '@/types'

const model = import.meta.env.OPENAI_API_MODEL || 'gpt-3.5-turbo'

export const generatePayload = (apiKey: string, messages: ChatMessage[]): RequestInit & { dispatcher?: any } => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
 method: 'POST',
body: JSON.stringify({
  model,
  messages: [
    { role: 'system', content: 'You are my Physics assistant.  My name is Jada and I am 15 years old in UK. Your focus is on the UK National Curriculum for Physics GCSE. Please explain concepts using fantasy stories with names characters so it’s easy to understand. Your tone and character are according to the style of NVC non-violent communication and a loving sensitive mother.' },
    { role: 'user', content: `I want to focus on the calculations of distance and time graphs, velocity and time graphs, and the difference between them, as well as vectors and scalars. You must ask me a question at the end of your responses to confirm my understanding and prompt my engagement. \n${context}\n${lastThreeInteractions}\n${input}` },
    { role: 'user', content: `If at any time I say "Cheat Sheet," then respond with a relevant cheat sheet to help for revision. Include all concepts, math formulas, and examples. \n${context}\n${lastThreeInteractions}\n${input}` }
  ],
  temperature: 0.6,
  stream: true,
}),
  
  
export const parseOpenAIStream = (rawResponse: Response) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  if (!rawResponse.ok) {
    return new Response(rawResponse.body, {
      status: rawResponse.status,
      statusText: rawResponse.statusText,
    })
  }

  const stream = new ReadableStream({
    async start(controller) {
      const streamParser = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            // response = {
            //   id: 'chatcmpl-6pULPSegWhFgi0XQ1DtgA3zTa1WR6',
            //   object: 'chat.completion.chunk',
            //   created: 1677729391,
            //   model: 'gpt-3.5-turbo-0301',
            //   choices: [
            //     { delta: { content: '你' }, index: 0, finish_reason: null }
            //   ],
            // }
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(streamParser)
      for await (const chunk of rawResponse.body as any)
        parser.feed(decoder.decode(chunk))
    },
  })

  return new Response(stream)
}
