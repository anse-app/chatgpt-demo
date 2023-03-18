import {
  showConversationSidebar,
  showSettingsSidebar,
} from '@/stores/ui'
import ConversationSidebar from '@/components/v2/ConversationSidebar'
import SettingsSidebar from '@/components/v2/SettingsSidebar'
import Modal from './Modal'

export default () => {
  return (
    <>
      <Modal bindValue={showConversationSidebar} direction="left">
        <div class="w-[70vw] max-w-[300px] h-full">
          <ConversationSidebar />
        </div>
      </Modal>
      <Modal bindValue={showSettingsSidebar} direction="right">
        <div class="w-[70vw] max-w-[300px] h-full">
          <SettingsSidebar />
        </div>
      </Modal>
    </>
  )
}
