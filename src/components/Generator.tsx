import { createSignal, For, Show } from 'solid-js'
import MessageItem from './MessageItem'
import IconClear from './icons/Clear'
import type { ChatMessage } from '../types'

export default () => {
  let inputRef: HTMLInputElement
  const [messageList, setMessageList] = createSignal<ChatMessage[]>([
    { role: 'user', content: '你好！' },
    { role: 'assistant', content: '你好！有什麼我可以為您效勞的嗎？\n你好！有什麼我可以為您效勞的嗎？\n你好！有什麼我可以為您效勞的嗎？' },
    { role: 'user', content: '接下来的对话，请帮我把内容翻译成英语。' },
    { role: 'assistant', content: '好的，请问您需要翻译的对话内容是什么？' },
  ])
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
          const textWithoutNewline = char.replace(/^\n+/, '')
          setCurrentAssistantMessage(currentAssistantMessage() + textWithoutNewline)
        }
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
            disabled={loading()}
            onKeyDown={(e) => {
              e.key === 'Enter' && handleButtonClick()
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
          <button onClick={clear} disabled={loading()} h-12 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 text-slate rounded-sm>
            <IconClear />
          </button>
        </div>
      </Show>
    </div>
  )
}
