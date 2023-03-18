import { useStore } from '@nanostores/solid'
import { chatList, currentChatId } from '@/stores/chat'

import SingleChat from '../chat/SingleChat'

export default () => {
  // const $currentChat = useStore(currentChat)
  const $currentChatId = useStore(currentChatId)
  const $chatList = useStore(chatList)
  const currentChat = () => {
    return $chatList().find(chat => chat.id === $currentChatId())
  }
  const chatType = () => currentChat()?.type
  return (
    <>
      <pre>{JSON.stringify(currentChat(), null, 4)}</pre>
      { chatType() === 'single' && <SingleChat /> }
    </>
  )
}
