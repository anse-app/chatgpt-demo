import { useStore } from '@nanostores/solid'
import { currentConversationId, currentEditingConversationId, deleteConversationById } from '@/stores/conversation'
import { showConversationEditModal, showConversationSidebar } from '@/stores/ui'
import type { Conversation } from '@/types/conversation'

interface Props {
  instance: Omit<Conversation, 'messages'> & {
    current?: boolean
  }
}

export default ({ instance }: Props) => {
  const $currentConversationId = useStore(currentConversationId)
  const isTouchDevice = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0

  const handleClick = () => {
    currentConversationId.set(instance.id)
    showConversationSidebar.set(false)
  }
  const handleDelete = (e: MouseEvent, conversationId: string) => {
    e.stopPropagation()
    deleteConversationById(conversationId)
    currentConversationId.set('')
  }
  const handleEdit = (e: MouseEvent, conversationId: string) => {
    e.stopPropagation()
    currentEditingConversationId.set(conversationId)
    showConversationEditModal.set(true)
  }

  return (
    <div
      class={[
        'group fi h-16 px-4 gap-3 border-b border-l-4 border-b-base hv-base',
        instance.id === $currentConversationId() ? 'border-l-emerald-600' : 'border-l-transparent',
      ].join(' ')}
      onClick={handleClick}
    >
      <div class="fcc w-8 h-8 rounded-full text-xl shrink-0">
        <div class={instance.icon || 'i-carbon-chat'} />
      </div>
      <div class="flex-1 truncate">{ instance.name || 'Untitled' }</div>
      <div class={isTouchDevice ? '' : 'hidden group-hover:block'}>
        <div
          class="inline-flex p-2 items-center gap-1 rounded-md hv-base"
          onClick={e => handleEdit(e, instance.id)}
        >
          <div class="i-carbon-edit" />
        </div>
        <div
          class="inline-flex p-2 items-center gap-1 rounded-md hv-base"
          onClick={e => handleDelete(e, instance.id)}
        >
          <div class="i-carbon-close" />
        </div>
      </div>
    </div>
  )
}
