import { useStore } from '@nanostores/solid'
import { conversationMap, currentConversationId } from '@/stores/conversation'

export default () => {
  const $conversationMap = useStore(conversationMap)
  const $currentConversationId = useStore(currentConversationId)
  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }

  return (
    <div class="max-w-40vw overflow-hidden text-sm">
      {!currentConversation() && null}
      {currentConversation() && (
        <div class="px-2 truncate">
          {currentConversation() ? (currentConversation().name || 'Untitled') : ''}
        </div>
      )}
    </div>
  )
}
