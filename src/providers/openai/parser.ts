import { createParser } from 'eventsource-parser'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'

export const parseStream = (rawResponse: Response) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const rb = rawResponse.body as ReadableStream

  const reader = rb.getReader()

  return new ReadableStream({
    async start(controller) {
      const streamParser = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }
      let done = false
      while (!done) {
        const { done: isDone, value } = await reader.read()
        if (isDone) {
          done = true
          controller.close()
          return
        }
        const parser = createParser(streamParser)
        parser.feed(decoder.decode(value))
      }
    },
  })
}
