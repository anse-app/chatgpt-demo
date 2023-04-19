import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { conversationMapSortList } from '@/stores/conversation'
import ConversationSidebarItem from './ConversationSidebarItem'
import ConversationSidebarAdd from './ConversationSidebarAdd'

export default () => {
  const $conversationMapSortList = useStore(conversationMapSortList)

  return (
    <div class="h-full flex flex-col bg-sidebar">
      <div class="h-14 fi border-b border-base px-4 text-xs uppercase pl-6">
        Conversations
      </div>
      <div class="flex-1 overflow-auto">
        <For each={$conversationMapSortList()}>
          {instance => (
            <ConversationSidebarItem instance={instance} />
          )}
        </For>
        <ConversationSidebarAdd />
      </div>
    </div>
  )
}
