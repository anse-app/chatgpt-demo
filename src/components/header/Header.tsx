import { showConversationSidebar, showSettingsSidebar } from '@/stores/ui'
import ConversationHeaderInfo from './ConversationHeaderInfo'
import ConversationMessageClearButton from './ConversationMessageClearButton'

export default () => {
  return (
    <header class="absolute top-0 left-0 right-0 fi justify-between bg-base border-b border-base h-14 px-6">
      <div class="fi gap-4 overflow-hidden">
        <div
          class="i-carbon-menu fc px-2 rounded-md cursor-pointer text-xl op-70 md:hidden"
          onClick={() => showConversationSidebar.set(true)}
        />
        <ConversationHeaderInfo />
      </div>
      <div class="fi gap-4 overflow-hidden">
        <ConversationMessageClearButton />
        <div
          class="i-carbon-settings fc px-2 rounded-md cursor-pointer text-xl op-70 lg:hidden"
          onClick={() => showSettingsSidebar.set(true)}
        />
      </div>
    </header>
  )
}
