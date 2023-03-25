import type { Accessor } from 'solid-js'
import type { ConversationInstance } from '@/stores/conversation'

interface Props {
  conversation: Accessor<ConversationInstance>
}

export default ({ conversation }: Props) => {
  const messages = () => conversation().messages
  return (
    <div class="flex flex-col h-full">
      <div class="flex-[1] border-b border-base px-6 py-4">
        {messages()?.[0]?.content}
      </div>
      <div class="flex-[2] px-6 py-4">
        {messages()?.[1]?.content}
      </div>
    </div>
  )
}
