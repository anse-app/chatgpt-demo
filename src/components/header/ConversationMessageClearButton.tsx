import { useStore } from '@nanostores/solid'
import { currentConversationId } from '@/stores/conversation'
import { clearMessagesByConversationId } from '@/stores/messages'

export default () => {
  const $currentConversationId = useStore(currentConversationId)

  return (
    <>
      { $currentConversationId() && (
        <div
          i-carbon-clean
          class="fc px-2 rounded-md cursor-pointer text-xl hv-foreground"
          onClick={() => clearMessagesByConversationId($currentConversationId())}
        />
      )}
    </>
  )
}
