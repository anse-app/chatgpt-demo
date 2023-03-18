import { createSignal } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { prompt, response } from '@/strores/prompt'
import { generateSignature } from '@/utils/auth'
import type { WritableAtom } from 'nanostores'

const fetchResponse = async(prompt: string, controller: AbortController, responseAtom: WritableAtom<string>) => {
  try {
    const timestamp = Date.now()
    const response = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: 'prompt',
        }],
        time: timestamp,
        pass: '123',
        sign: await generateSignature({
          t: timestamp,
          m: prompt,
        }),
      }),
      signal: controller.signal,
    })
    if (!response.ok)
      throw new Error(response.statusText)

    const data = response.body
    if (!data)
      throw new Error('No data')

    const reader = data.getReader()
    const decoder = new TextDecoder('utf-8')
    let done = false

    while (!done) {
      const { value, done: readerDone } = await reader.read()
      if (value) {
        const char = decoder.decode(value)
        if (char === '\n' && responseAtom.get().endsWith('\n'))
          continue

        if (char)
          responseAtom.set(responseAtom.get() + char)
      }
      done = readerDone
    }
  } catch (e) {
    console.error(e)
  }
}

export default () => {
  const $prompt = useStore(prompt)
  const [controller, setController] = createSignal<AbortController>(null)

  setController(new AbortController())
  fetchResponse($prompt(), controller(), response)

  return null
}
