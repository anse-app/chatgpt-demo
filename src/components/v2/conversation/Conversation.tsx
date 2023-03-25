import { useStore } from '@nanostores/solid'
import { conversationMap, currentConversationId } from '@/stores/conversation'
import Single from './Single'
import Continuous from './Continuous'

export default () => {
  const $conversationMap = useStore(conversationMap)
  const $currentConversationId = useStore(currentConversationId)
  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }

  return (
    <>
      <div />
      { currentConversation()?.conversationType === 'single' && <Single conversation={currentConversation} /> }
      { currentConversation()?.conversationType === 'continuous' && <Continuous conversation={currentConversation} /> }
    </>
  )
}
