import { useStore } from '@nanostores/solid'
import { currentConversation } from '@/stores/conversation'

import Single from './Single'

export default () => {
  const $currentConversation = useStore(currentConversation)
  const conversationType = () => $currentConversation()?.conversationType
  return (
    <>
      <pre class="text-xs border-b border-base">{JSON.stringify($currentConversation(), null, 4)}</pre>
      { conversationType() === 'single' && <Single /> }
    </>
  )
}
