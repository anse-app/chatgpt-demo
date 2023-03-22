import { useStore } from '@nanostores/solid'
import { currentChat } from '@/stores/chat'

import SingleChat from '../chat/SingleChat'

export default () => {
  const $currentChat = useStore(currentChat)
  const chatType = () => $currentChat()?.type
  return (
    <>
      <pre>{JSON.stringify($currentChat(), null, 4)}</pre>
      { chatType() === 'single' && <SingleChat /> }
    </>
  )
}
