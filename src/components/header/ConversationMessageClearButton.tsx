import { useStore } from '@nanostores/solid'
import { currentConversationId } from '@/stores/conversation'
import { clearMessagesByConversationId } from '@/stores/messages'

export default () => {
  const $currentConversationId = useStore(currentConversationId)

  return (
    <>
      { $currentConversationId() && (
        <div
          class="fcc p-2 rounded-md text-xl hv-foreground"
          onClick={() => clearMessagesByConversationId($currentConversationId())}
        >
          <div i-carbon-clean />
        </div>
      )}
    </>
  )
}
