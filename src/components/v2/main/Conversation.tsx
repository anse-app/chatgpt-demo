import { Match, Switch } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { conversationMap, currentConversationId } from '@/stores/conversation'
import { conversationMessagesMap } from '@/stores/messages'
import Single from './Single'
import Continuous from './Continuous'

export default () => {
  const $conversationMap = useStore(conversationMap)
  const $conversationMessagesMap = useStore(conversationMessagesMap)
  const $currentConversationId = useStore(currentConversationId)
  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }
  const currentConversationMessages = () => {
    return $conversationMessagesMap()[$currentConversationId()] || []
  }

  return (
    <Switch>
      <Match when={currentConversation()?.conversationType === 'single'}>
        <Single messages={currentConversationMessages} />
      </Match>
      <Match when={currentConversation()?.conversationType === 'continuous'}>
        <Continuous messages={currentConversationMessages} />
      </Match>
    </Switch>
  )
}
