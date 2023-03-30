import { For } from 'solid-js'
import MessageItem from './MessageItem'
import type { Accessor } from 'solid-js'
import type { Message } from '@/types/message'

interface Props {
  messages: Accessor<Message[]>
}

export default ({ messages }: Props) => {
  return (
    <div class="flex flex-col h-full overflow-y-scroll">
      <For each={messages()}>
        {message => (
          <div class="border-b border-lighter">
            <MessageItem
              role={message.role}
              message={message.content}
            />
          </div>
        )}
      </For>
    </div>
  )
}
