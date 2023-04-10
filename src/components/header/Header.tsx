import { showConversationSidebar, showSettingsSidebar } from '@/stores/ui'
import ConversationHeaderInfo from './ConversationHeaderInfo'
import ConversationMessageClearButton from './ConversationMessageClearButton'

export default () => {
  const handleDoubleClick = () => {
    const element = document.getElementsByClassName('scroll-list')[0]
    element?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header onDblClick={handleDoubleClick} class="absolute top-0 left-0 right-0 fi justify-between bg-base border-b border-base h-14 px-6">
      <div class="fi gap-4 overflow-hidden">
        <div
          i-carbon-menu
          class="fc px-2 rounded-md text-xl hv-foreground md:hidden"
          onClick={() => showConversationSidebar.set(true)}
        />
        <ConversationHeaderInfo />
      </div>
      <div class="fi gap-4 overflow-hidden">
        <ConversationMessageClearButton />
        <div
          i-carbon-settings
          class="fc px-2 rounded-md text-xl hv-foreground lg:hidden"
          onClick={() => showSettingsSidebar.set(true)}
        />
      </div>
    </header>
  )
}
