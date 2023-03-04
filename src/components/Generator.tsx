import { createSignal, For, Show } from 'solid-js'
import MessageItem from './MessageItem'
import IconClear from './icons/Clear'
import type { ChatMessage } from '@/types'

export default () => {
  let inputRef: HTMLInputElement
  const [messageList, setMessageList] = createSignal<ChatMessage[]>([])
  const [currentAssistantMessage, setCurrentAssistantMessage] = createSignal('')
  const [loading, setLoading] = createSignal(false)

  const handleButtonClick = async () => {
    const inputValue = inputRef.value
    if (!inputValue) {
      return
    }
    setLoading(true)
    // @ts-ignore
    if (window?.umami) umami.trackEvent('chat_generate')
    inputRef.value = ''
    setMessageList([
      ...messageList(),
      {
        role: 'user',
        content: inputValue,
      },
    ])

    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        messages: messageList(),
      }),
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = response.body
    if (!data) {
      throw new Error('No data')
    }
    const reader = data.getReader()
    const decoder = new TextDecoder('utf-8')
    let done = false

    while (!done) {
      const { value, done: readerDone } = await reader.read()
      if (value) {
        let char = decoder.decode(value)
        if (char === '\n' && currentAssistantMessage().endsWith('\n')) {
          continue
        }
        if (char) {
          setCurrentAssistantMessage(currentAssistantMessage() + char)
        }
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
      }
      done = readerDone
    }
    setMessageList([
      ...messageList(),
      {
        role: 'assistant',
        content: currentAssistantMessage(),
      },
    ])
    setCurrentAssistantMessage('')
    setLoading(false)
    inputRef.focus()
  }

  const clear = () => {
    inputRef.value = ''
    setMessageList([])
    setCurrentAssistantMessage('')
  }

  return (
    <div my-6>
      <For each={messageList()}>{(message) => <MessageItem role={message.role} message={message.content} />}</For>
      { currentAssistantMessage() && <MessageItem role="assistant" message={currentAssistantMessage} /> }
      <Show when={!loading()} fallback={() => <div class="h-12 my-4 flex items-center justify-center bg-slate bg-op-15 text-slate rounded-sm">AI is thinking...</div>}>
        <div class="my-4 flex items-center gap-2">
          <input
            ref={inputRef!}
            type="text"
            id="input"
            placeholder="Enter something..."
            autocomplete='off'
            autofocus
            disabled={loading()}
            onKeyDown={(e) => {
              e.key === 'Enter' && !e.isComposing && handleButtonClick()
            }}
            w-full
            px-4
            h-12
            text-slate
            rounded-sm
            bg-slate
            bg-op-15
            focus:bg-op-20
            focus:ring-0
            focus:outline-none
            placeholder:text-slate-400
            placeholder:op-30
          />
          <button onClick={handleButtonClick} disabled={loading()} h-12 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 text-slate rounded-sm>
            Send
          </button>
          <button title='Clear' onClick={clear} disabled={loading()} h-12 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 text-slate rounded-sm>
            <IconClear />
          </button>
        </div>
      </Show>
    </div>
  )
}
