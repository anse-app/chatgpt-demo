import { Show } from 'solid-js'
import StreamableText from '../StreamableText'
import type { Accessor } from 'solid-js'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  messages: Accessor<MessageInstance[]>
}

export default ({ conversationId, messages }: Props) => {
  const messageInput = () => messages().length > 0 ? messages()[0] : null
  const messageOutput = () => messages().length > 1 ? messages()[1] : null
  return (
    <div class="flex flex-col h-full">
      <div class="h-16 fi px-6 border-b border-base truncate overflow-y-scroll">
        <StreamableText
          class="mx-auto w-full"
          text={messageInput()?.content || ''}
        />
      </div>
      <div class="flex-1 fcc overflow-y-scroll p-6">
        <Show when={messageOutput()?.content}>
          <img
            class="max-w-[400px]"
            src={messageOutput()?.content}
            alt={messageInput()?.content || ''}
          />
        </Show>
      </div>
    </div>
  )
}
