import { useStore } from '@nanostores/solid'
import { currentChatId } from '@/stores/chat'
import type { ChatInstance } from '@/stores/chat'

interface Props {
  instance: ChatInstance
}

export default ({ instance }: Props) => {
  const $currentChatId = useStore(currentChatId)

  const handleClick = () => {
    currentChatId.set(instance.id)
  }
  const highlightClass = () => $currentChatId() === instance.id ? 'border-l-emerald-500' : 'border-l-transparent'

  return (
    <div
      class={[
        'flex items-center h-18 px-4 gap-4 border-b border-l-4 border-b-base hv-base',
        highlightClass(),
      ].join(' ')}
      onClick={handleClick}
    >
      <div class="w-8 h-8 rounded-full bg-white/50" />
      <div>{ instance.name }</div>
    </div>
  )
}
