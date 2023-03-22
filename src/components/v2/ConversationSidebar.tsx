import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { conversationMap } from '@/stores/conversation'
import ConversationSidebarItem from './ConversationSidebarItem'
import ConversationSidebarAdd from './ConversationSidebarAdd'

export default () => {
  const $conversationMap = useStore(conversationMap)

  return (
    <div class="h-screen flex flex-col">
      <div class="h-12 border-b border-base flex px-4 items-center">
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
