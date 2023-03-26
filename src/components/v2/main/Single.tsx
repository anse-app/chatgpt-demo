import type { Accessor } from 'solid-js'
import type { ConversationInstance } from '@/types/conversation'

interface Props {
  conversation: Accessor<ConversationInstance>
}

export default ({ conversation }: Props) => {
  const messages = () => conversation().messages
  const messageInput = () => messages().length > 0 ? messages()[0].content : ''
  const messageOutput = () => messages().length > 1 ? messages()[1].content : ''
  return (
    <div class="flex flex-col h-full">
      <div class="flex-[1] border-b border-base p-6 break-all overflow-y-scroll">
        <div class="max-w-base">
          {messageInput()}
        </div>
      </div>
      <div class="flex-[2] p-6 break-all overflow-y-scroll">
        <div class="max-w-base">
          {messageOutput()}
        </div>
      </div>
    </div>
  )
}
