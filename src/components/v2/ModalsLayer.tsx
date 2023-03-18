import {
  showChatEditModal,
  showConversationSidebar,
  showSettingsSidebar,
} from '@/stores/ui'
import ConversationSidebar from '@/components/v2/ConversationSidebar'
import SettingsSidebar from '@/components/v2/SettingsSidebar'
import ChatEditModal from '@/components/v2/ChatEditModal'
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
      <Modal bindValue={showChatEditModal} direction="bottom">
        <div class="max-h-[70vh] w-full">
          <ChatEditModal />
        </div>
      </Modal>
    </>
  )
}
