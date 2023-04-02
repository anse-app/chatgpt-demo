import type { Setter } from 'solid-js'

export const convertReadableStreamToAccessor = async(stream: ReadableStream, setter: Setter<string>) => {
  const reader = stream.getReader()
  const decoder = new TextDecoder('utf-8')
  let done = false
  let text = ''
  while (!done) {
    const { value, done: readerDone } = await reader.read()
    if (value) {
      const char = decoder.decode(value)
      if (char) {
        text += char
        setter(text)
      }
    }
    done = readerDone
  }
  return text
}
