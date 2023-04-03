import { useStore } from '@nanostores/solid'
import { currentConversationId } from '@/stores/conversation'
import { clearMessagesByConversationId } from '@/stores/messages'

export default () => {
  const $currentConversationId = useStore(currentConversationId)

  return (
    <>
      { $currentConversationId() && (
        <div
          class="i-carbon-clean fc px-2 rounded-md cursor-pointer text-xl op-70 md:hidden"
          onClick={() => clearMessagesByConversationId($currentConversationId())}
        />
      )}
    </>
  )
}
