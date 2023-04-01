import type { Accessor, Setter } from 'solid-js'

export const convertReadableStreamToAccessor = async(stream: ReadableStream, getter: Accessor<string>, setter: Setter<string>) => {
  const reader = stream.getReader()
  const decoder = new TextDecoder('utf-8')
  let done = false

  while (!done) {
    const { value, done: readerDone } = await reader.read()

    if (value) {
      const char = decoder.decode(value)
      console.log(char)
      // if (char === '\n' && currentAssistantMessage().endsWith('\n'))
      //   continue
      // if (char)
      //   setter(getter() + char)
    }
    done = readerDone
  }
}
