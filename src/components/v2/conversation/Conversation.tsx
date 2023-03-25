import { useStore } from '@nanostores/solid'
import { conversationMap, currentConversationId } from '@/stores/conversation'
import Single from './Single'

export default () => {
  const $conversationMap = useStore(conversationMap)
  const $currentConversationId = useStore(currentConversationId)
  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }

  return (
    <>
      {/* <pre class="text-xs border-b border-base">{JSON.stringify(currentConversation(), null, 4)}</pre>
      <pre class="text-xs border-b border-base">{currentConversation()?.conversationType}</pre> */}
      { currentConversation()?.conversationType === 'single' && <Single conversation={currentConversation} /> }
    </>
  )
}
