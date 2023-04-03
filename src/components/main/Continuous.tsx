import { For } from 'solid-js'
import MessageItem from './MessageItem'
import type { Accessor } from 'solid-js'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  messages: Accessor<MessageInstance[]>
}

export default ({ conversationId, messages }: Props) => {
  return (
    <div class="flex flex-col h-full overflow-y-scroll">
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
  )
}
