import { For, Show } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { conversationMapSortList, currentConversationId } from '@/stores/conversation'
import { showConversationEditModal } from '@/stores/ui'

export default () => {
  const $conversationMapSortList = useStore(conversationMapSortList)

  return (
    <div class="fcc h-full">
      <div class="flex flex-col gap-4 w-full max-w-md mx-12 sm:mx-18 overflow-hidden">
        <div class="px-6 py-4 bg-base-100 border border-base rounded-lg">
          <h2 class="text-xs op-30 uppercase my-2">Recents</h2>
          <div class="flex flex-col items-start">
            <For each={$conversationMapSortList().slice(0, 3)}>
              {instance => (
                <div class="fi gap-2 h-8 max-w-full text-sm hv-foreground" onClick={() => currentConversationId.set(instance.id)}>
                  <div class={instance.icon || 'i-carbon-chat'} />
                  <div class="flex-1 truncate">{instance.name || 'Untitled'}</div>
                </div>
              )}
            </For>
            <Show when={!$conversationMapSortList().length}>
              <div class="fi gap-2 h-8 text-sm op-20">No Recents</div>
            </Show>
          </div>
        </div>
        <div
          class="fcc gap-2 p-6 bg-base-100 hv-base border border-base rounded-lg"
          onClick={() => showConversationEditModal.set(true)}
        >
          <div class="i-carbon-add" />
          <div class="flex-1 text-sm truncate">New Conversation</div>
        </div>
      </div>
    </div>
  )
}
