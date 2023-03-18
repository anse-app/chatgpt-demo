import { chatList } from '@/stores/chat'

export default () => {
  const handleAdd = () => {
    chatList.set([...chatList.get(), {
      id: `id_${Date.now()}`,
      type: 'single',
      name: 'Test New',
      avatar: '',
      messages: [],
    }])
  }

  return (
    <div
      class="flex items-center h-18 px-4 gap-4 border-b border-base hv-base"
      onClick={handleAdd}
    >
      <div class="i-carbon-add" />
      <div>Add</div>
    </div>
  )
}
