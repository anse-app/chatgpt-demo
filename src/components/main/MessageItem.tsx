import StreamableText from '../StreamableText'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  message: MessageInstance
}

export default (props: Props) => {
  const roleClass = {
    system: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    user: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    assistant: 'bg-gradient-to-b from-[#fccb90] to-[#d57eeb]',
  }

  return (
    <div
      class="p-6 break-all"
      classList={{
        'op-70 bg-darker': props.message.role === 'user',
      }}
    >
      <div class="max-w-base flex gap-4 overflow-hidden">
        <div class={`shrink-0 w-7 h-7 rounded-md op-80 ${roleClass[props.message.role]}`} />
        <StreamableText
          text={props.message.content}
          streamInfo={props.message.stream
            ? () => ({
                conversationId: props.conversationId,
                messageId: props.message.id || '',
                stream: props.message.stream || null,
              })
            : undefined}
        />
      </div>
    </div>
  )
}
