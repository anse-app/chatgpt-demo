import { Match, Switch } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { conversationMap, currentConversationId } from '@/stores/conversation'
import { conversationMessagesMap } from '@/stores/messages'
import { loadingStateMap, streamsMap } from '@/stores/streams'
import Welcome from './Welcome'
import Continuous from './Continuous'
import Single from './Single'
import Image from './Image'

export default () => {
  const $conversationMap = useStore(conversationMap)
  const $conversationMessagesMap = useStore(conversationMessagesMap)
  const $currentConversationId = useStore(currentConversationId)
  const $streamsMap = useStore(streamsMap)
  const $loadingStateMap = useStore(loadingStateMap)

  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }
  const currentConversationMessages = () => {
    return $conversationMessagesMap()[$currentConversationId()] || []
  }
  const isStreaming = () => !!$streamsMap()[$currentConversationId()]
  const isLoading = () => !!$loadingStateMap()[$currentConversationId()]

  return (
    <Switch
      fallback={(
        <Welcome />
      )}
    >
      <Match when={currentConversation()?.conversationType === 'continuous'}>
        <Continuous
          conversationId={$currentConversationId()}
          messages={currentConversationMessages}
        />
      </Match>
      <Match when={currentConversation()?.conversationType === 'single'}>
        <Single
          conversationId={$currentConversationId()}
          messages={currentConversationMessages}
        />
      </Match>
      <Match when={currentConversation()?.conversationType === 'image'}>
        <Image
          // conversationId={$currentConversationId()}
          messages={currentConversationMessages}
          // fetching={isLoading() || !isStreaming()}
        />
      </Match>
    </Switch>
  )
}
