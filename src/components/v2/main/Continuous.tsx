import { For } from 'solid-js'
import MessageItem from './MessageItem'
import type { Accessor } from 'solid-js'
import type { ConversationInstance } from '@/types/conversation'

interface Props {
  conversation: Accessor<ConversationInstance>
}

export default ({ conversation }: Props) => {
  const messages = () => conversation().messages
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
