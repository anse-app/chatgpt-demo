import { currentConversationId, deleteConversationById } from '@/stores/conversation'
import { currentEditingConversationId, showConversationEditModal } from '@/stores/ui'
import type { ConversationInstance } from '@/stores/conversation'

interface Props {
  instance: Omit<ConversationInstance, 'messages'> & {
    current?: boolean
  }
}

export default ({ instance }: Props) => {
  const handleClick = () => {
    console.log('click', instance)
    currentConversationId.set(instance.id)
  }
  const handleDelete = (conversationId: string) => {
    deleteConversationById(conversationId)
  }
  const handleEdit = (conversationId: string) => {
    currentEditingConversationId.set(conversationId)
    showConversationEditModal.set(true)
  }

  return (
    <div
      class={[
        'group fi h-16 px-4 gap-3 border-b border-l-4 border-b-base hv-base',
        instance.current ? 'border-l-emerald-500' : 'border-l-transparent',
      ].join(' ')}
      onClick={handleClick}
    >
      <div class="fcc w-8 h-8 rounded-full bg-emerald/10 text-emerald text-xl">
        <div class={instance.icon || 'i-carbon-chat'} />
      </div>
      <div class="flex-1">{ instance.name }</div>
      <div class="hidden group-hover:block">
        <div
          class="inline-flex p-2 items-center gap-1 rounded-md hv-base"
          onClick={() => handleEdit(instance.id)}
        >
          <div class="i-carbon-edit" />
        </div>
        <div
          class="inline-flex p-2 items-center gap-1 rounded-md hv-base"
          onClick={() => handleDelete(instance.id)}
        >
          <div class="i-carbon-close" />
        </div>
      </div>
    </div>
  )
}
