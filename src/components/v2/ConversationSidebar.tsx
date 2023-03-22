import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { conversationListWithoutMessages } from '@/stores/conversation'
import ConversationSidebarItem from './ConversationSidebarItem'
import ConversationSidebarAdd from './ConversationSidebarAdd'

export default () => {
  const $conversationList = useStore(conversationListWithoutMessages)

  conversationListWithoutMessages.listen((list) => {
    console.log('conversationListWithoutMessages', list)
  })

  return (
    <div class="h-screen flex flex-col">
      <div class="h-12 border-b border-base flex px-4 items-center">
        Conversations
      </div>
      <div class="flex-1 overflow-auto">
        <For each={$conversationList()}>
          {item => (
            <ConversationSidebarItem instance={item} />
          )}
        </For>
        <ConversationSidebarAdd />
      </div>
    </div>
  )
}
