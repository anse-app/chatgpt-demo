import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { conversationMap } from '@/stores/conversation'
import ConversationSidebarItem from './ConversationSidebarItem'
import ConversationSidebarAdd from './ConversationSidebarAdd'

export default () => {
  const $conversationMap = useStore(conversationMap)

  return (
    <div class="h-full flex flex-col">
      <div class="h-12 fi border-b border-base px-4 text-xs uppercase pl-6">
        Conversations
      </div>
      <div class="flex-1 overflow-auto">
        <For each={Object.values($conversationMap())}>
          {instance => (
            <ConversationSidebarItem instance={instance} />
          )}
        </For>
        <ConversationSidebarAdd />
      </div>
    </div>
  )
}
