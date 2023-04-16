import { Show } from 'solid-js'
import StreamableText from '../StreamableText'
import type { Accessor } from 'solid-js'
import type { MessageInstance } from '@/types/message'

interface Props {
  // conversationId: string
  messages: Accessor<MessageInstance[]>
  // fetching: boolean
}

export default (props: Props) => {
  const messageInput = () => props.messages().length > 0 ? props.messages()[0] : null
  const messageOutput = () => props.messages().length > 1 ? props.messages()[1] : null
  return (
    <div class="flex flex-col h-full">
      <div class="min-h-16 max-h-40 fi px-6 py-4 border-b border-base break-all overflow-y-scroll">
        <StreamableText
          class="w-full"
          text={messageInput()?.content || ''}
        />
      </div>
      <div class="flex-1 fcc overflow-y-auto px-6">
        <Show when={messageOutput()?.content}>
          <img
            class="w-full max-w-[400px] aspect-1"
            src={messageOutput()?.content}
            alt={messageInput()?.content || ''}
            onError={e => e.currentTarget.classList.add('hidden')}
          />
        </Show>
      </div>
    </div>
  )
}
