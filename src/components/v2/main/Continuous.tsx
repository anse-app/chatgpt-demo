import { For } from 'solid-js'
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
          <div class="border-b border-lighter p-6 break-all">
            <div class="max-w-base">
              {message.content}
            </div>
          </div>
        )}
      </For>
    </div>
  )
}
