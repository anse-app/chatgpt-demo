import { For, Show, createEffect, createSignal } from 'solid-js'
import { createScrollPosition } from '@solid-primitives/scroll'
import MessageItem from './MessageItem'
import type { Accessor } from 'solid-js'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  messages: Accessor<MessageInstance[]>
}

export default ({ conversationId, messages }: Props) => {
  const [isScrollBottom, setIsScrollBottom] = createSignal(false)
  let scrollRef: HTMLDivElement
  const scroll = createScrollPosition(() => scrollRef)
  createEffect(() => {
    setIsScrollBottom(scroll.y + scrollRef.clientHeight >= scrollRef.scrollHeight - 100)
  })

  return (
    <>
      <div class="scroll-list relative flex flex-col h-full overflow-y-scroll" ref={scrollRef!}>
        <For each={messages()}>
          {message => (
            <div class="border-b border-lighter">
              <MessageItem
                conversationId={conversationId}
                message={message}
              />
            </div>
          )}
        </For>
      </div>
      <Show when={!isScrollBottom()}>
        <div
          class="absolute bottom-0 left-0 right-0 border-t border-base bg-blur hv-base hover:bg-base-200"
          onClick={() => scrollRef!.scrollTo({ top: scrollRef.scrollHeight, behavior: 'smooth' })}
        >
          <div class="fcc h-8 max-w-base text-xs op-20 gap-1">
            <div>Scroll to bottom</div>
            <div i-carbon-arrow-down />
          </div>
        </div>
      </Show>
    </>
  )
}
