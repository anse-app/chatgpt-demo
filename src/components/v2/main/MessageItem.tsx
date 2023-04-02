import StreamableText from '../StreamableText'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  message: MessageInstance
}

export default ({ conversationId, message }: Props) => {
  const roleClass = {
    system: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    user: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    assistant: 'bg-gradient-to-b from-[#fccb90] to-[#d57eeb]',
  }

  return (
    <div
      class="p-6 break-all"
      classList={{
        'op-70 bg-darker': message.role === 'user',
      }}
    >
      <div class="max-w-base flex gap-4 overflow-hidden">
        <div class={`shrink-0 w-7 h-7 rounded-md op-80 ${roleClass[message.role]}`} />
        <StreamableText
          text={message.content}
          streamInfo={message.stream
            ? () => ({
                conversationId,
                messageId: message.id || '',
                stream: message.stream || null,
              })
            : undefined}
        />
      </div>
    </div>
  )
}
