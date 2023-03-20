import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { chatListWithoutMessages } from '@/stores/chat'
import ConversationSidebarItem from './ConversationSidebarItem'
import ConversationSidebarAdd from './ConversationSidebarAdd'

export default () => {
  const $chatList = useStore(chatListWithoutMessages)

  return (
    <div class="h-screen flex flex-col">
      <div class="h-12 border-b border-base flex px-4 items-center">
        Conversations
      </div>
      <div class="flex-1 overflow-auto">
        <For each={$chatList()}>
          {item => (
            <ConversationSidebarItem instance={item} />
          )}
        </For>
        <ConversationSidebarAdd />
      </div>
    </div>
  )
}
