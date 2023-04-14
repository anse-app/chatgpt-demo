import { leading, throttle } from '@solid-primitives/scheduled'
import StreamableText from '../StreamableText'
import type { Accessor } from 'solid-js'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  messages: Accessor<MessageInstance[]>
}

export default ({ conversationId, messages }: Props) => {
  let scrollRef: HTMLDivElement
  const messageInput = () => messages().length > 0 ? messages()[0] : null
  const messageOutput = () => messages().length > 1 ? messages()[1] : null

  const instantScrollToBottomThrottle = leading(throttle, (element: HTMLDivElement) => element.scrollTo({ top: element.scrollHeight }), 250)

  const handleStreamableTextUpdate = () => {
    instantScrollToBottomThrottle(scrollRef)
  }

  return (
    <div class="flex flex-col h-full">
      <div class="flex-[1] border-b border-base p-6 break-all overflow-y-scroll">
        <StreamableText
          class="mx-auto"
          text={messageInput()?.content || ''}
        />
      </div>
      <div class="scroll-list flex-[2] p-6 break-all overflow-y-scroll" ref={scrollRef!}>
        <StreamableText
          class="mx-auto"
          text={messageOutput()?.content || ''}
          streamInfo={messageOutput()?.stream
            ? () => ({
                conversationId,
                messageId: messageOutput()?.id || '',
                handleStreaming: handleStreamableTextUpdate,
              })
            : undefined}
        />
      </div>
    </div>
  )
}
