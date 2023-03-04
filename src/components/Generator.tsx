import { createSignal, For, Show, Index } from 'solid-js'
import MessageItem from './MessageItem'
import IconClear from './icons/Clear'
import type { ChatMessage } from '@/types'

export default () => {
  let inputRef: HTMLTextAreaElement
  const [messageList, setMessageList] = createSignal<ChatMessage[]>([{"role":"user","content":"你好！"},{"role":"assistant","content":"\n\n你好！我是AI助手，有什么可以帮助你的吗？"},{"role":"user","content":"给我讲一个故事"},{"role":"assistant","content":"好的，这是一个叫做《勇士和怪兽》的故事：\n\n在一个遥远的国度里，有一个勇士，他的名字叫做杰克。他是这个国度最勇敢的战士，因为他曾经打败了一只凶猛的巨龙。杰克有一个朋友叫做汤姆，他是一个年轻的牧羊人。\n\n有一天，这个国度遭到了一只可怕的怪兽的攻击，这只怪兽是一个巨大的狮子。它每天晚上都会来到村庄，抓走一些羊和小孩。人们都非常害怕，因为他们不知道该怎么办。\n\n杰克听到了这个消息，他知道他必须要做些什么来帮助这个国度。他决定去打败这只怪兽，但他也知道这不是一件容易的事情。\n\n汤姆知道杰克的计划，他决定和杰克一起去。他知道他不能让杰克一个人去面对这个怪兽。于是，杰克和汤姆一起出发了。\n\n他们走了很长时间，终于来到了怪兽的巢穴。他们看到了那只巨大的狮子，它看起来非常凶猛。\n\n杰克和汤姆决定一起攻击怪兽。他们使用了各种武器，但是怪兽非常强大，他们一直无法打败它。他们都感到非常沮丧，但是他们不想放弃。\n\n最终，他们想到了一个计划。他们决定将怪兽引诱到一个陷阱里，然后用巨石砸死它。这个计划非常危险，但他们决定还是要试一试。\n\n他们开始引诱怪兽，怪兽跟着他们走，最终掉进了陷阱里。杰克和汤姆立刻用巨石砸向怪兽，最终成功地打败了它。\n\n人们听到了这个消息，他们非常高兴。他们感谢杰克和汤姆，因为他们的勇气和智慧，拯救了整个国度。\n\n故事告诉我们勇气和智慧的重要性，只有勇敢地面对困难，才能获得胜利。"}])
  const [currentAssistantMessage, setCurrentAssistantMessage] = createSignal('')
  const [loading, setLoading] = createSignal(false)
  const [controller, setController] = createSignal<AbortController>(null)

  const handleButtonClick = async () => {
    const inputValue = inputRef.value
    if (!inputValue) {
      return
    }
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
    requestWithLatestMessage()
  }

  const requestWithLatestMessage = async () => {
    setLoading(true)
    setCurrentAssistantMessage('')
    try {
      const controller = new AbortController()
      setController(controller)
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          messages: messageList(),
        }),
        signal: controller.signal,
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
    } catch (e) {
      console.error(e)
      setLoading(false)
      setController(null)
      return
    }
    archiveCurrentMessage()
  }

  const archiveCurrentMessage = () => {
    if (currentAssistantMessage()) {
      setMessageList([
        ...messageList(),
        {
          role: 'assistant',
          content: currentAssistantMessage(),
        },
      ])
      setCurrentAssistantMessage('')
      setLoading(false)
      setController(null)
      inputRef.focus()
    }
  }

  const clear = () => {
    inputRef.value = ''
    setMessageList([])
    setCurrentAssistantMessage('')
  }

  const stopStreamFetch = () => {
    if (controller()) {
      controller().abort()
      archiveCurrentMessage()
    }
  }

  const retryLastFetch = () => {
    if (messageList().length > 0) {
      const lastMessage = messageList()[messageList().length - 1]
      console.log(lastMessage)
      if (lastMessage.role === 'assistant') {
        setMessageList(messageList().slice(0, -1))
        requestWithLatestMessage()
      }
    }
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.isComposing || e.shiftKey) {
      return
    }
    if (e.key === 'Enter') {
      handleButtonClick()
    }
  }

  return (
    <div my-6>
      <Index each={messageList()}>
        {(message, index) => (
          <MessageItem
            role={message().role}
            message={message().content}
            showRetry={() => (message().role === 'assistant' && index === messageList().length - 1)}
            onRetry={retryLastFetch}
          />
        )}
      </Index>
      {currentAssistantMessage() && (
        <MessageItem
          role="assistant"
          message={currentAssistantMessage}
        />
      )}
      <Show
        when={!loading()}
        fallback={() => (
          <div class="h-12 my-4 flex gap-4 items-center justify-center bg-slate bg-op-15 text-slate rounded-sm">
            <span>AI is thinking...</span>
            <div class="px-2 py-0.5 border border-slate text-slate rounded-md text-sm op-70 cursor-pointer hover:bg-slate/10" onClick={stopStreamFetch}>Stop</div>
          </div>
        )}
      >
        <div class="my-4 flex items-center gap-2">
          <textarea
            ref={inputRef!}
            disabled={loading()}
            onKeyDown={handleKeydown}
            placeholder="Enter something..."
            autocomplete="off"
            autofocus
            disabled={loading()}
            onKeyDown={handleKeydown}
            onInput={() => {
              inputRef.style.height = 'auto';
              inputRef.style.height = inputRef.scrollHeight + 'px';
            }}
            rows="1"
            autofocus
            w-full
            px-3 py-3
            min-h-12
            max-h-36
            text-slate
            rounded-sm
            bg-slate
            bg-op-15
            focus:bg-op-20
            focus:ring-0
            focus:outline-none
            placeholder:text-slate-400
            placeholder:op-30
            overflow-hidden
          />
          <button onClick={handleButtonClick} disabled={loading()} h-12 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 text-slate rounded-sm>
            Send
          </button>
          <button title="Clear" onClick={clear} disabled={loading()} h-12 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 text-slate rounded-sm>
            <IconClear />
          </button>
        </div>
      </Show>
    </div>
  )
}
