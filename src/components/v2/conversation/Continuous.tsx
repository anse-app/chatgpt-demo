import { For } from 'solid-js'
import type { Accessor } from 'solid-js'
import type { ConversationInstance } from '@/stores/conversation'

interface Props {
  conversation: Accessor<ConversationInstance>
}

export default ({ conversation }: Props) => {
  const messages = () => conversation().messages
  return (
    <div class="flex flex-col h-full">
      <For each={messages()}>
        {message => (
          <div class="border-b border-base px-6 py-4">
            {message.content}
          </div>
        )}
      </For>
    </div>
  )
}
