import { For, createSignal } from 'solid-js'
import {
  addChat,
  currentChatId,
  currentEditingChat,
  updateChatById,
} from '@/stores/chat'
import { showChatEditModal } from '@/stores/ui'
import type { ChatType } from '@/types'

export default () => {
  let inputRef: HTMLInputElement
  let currentId = ''
  const [selectType, setSelectType] = createSignal<ChatType>('single')
  const [selectIcon, setSelectIcon] = createSignal<string>('bg-emerald')
  const typeSelectList = [
    {
      value: 'single' as const,
      label: 'Single Chat',
      icon: 'i-carbon-connect',
    },
    {
      value: 'continuous' as const,
      label: 'Continuous Chat',
      icon: 'i-carbon-edt-loop',
    },
    {
      value: 'image' as const,
      label: 'Image Generation',
      icon: 'i-carbon-image',
    },
  ]
  const iconList = [
    'i-carbon-chat',
    'i-carbon-basketball',
    'i-carbon-game-console',
    'i-carbon-palm-tree',
  ]

  const handleAdd = () => {
    const chatName = inputRef.value || 'Untitled'
    const payload = {
      id: currentId,
      type: selectType(),
      name: chatName,
      icon: selectIcon(),
      messages: [],
    }
    if (currentEditingChat.get()?.id) {
      updateChatById(currentId, payload)
    } else {
      addChat(payload)
      currentChatId.set(currentId)
    }
    showChatEditModal.set(false)
    inputRef.value = ''
  }

  showChatEditModal.listen((showModal) => {
    if (showModal) {
      // inputRef.focus()
      if (currentEditingChat.get()?.id) {
        currentId = currentEditingChat.get().id
        const { name, icon, type } = currentEditingChat.get()
        inputRef.value = name
        setSelectType(type)
        setSelectIcon(icon || 'i-carbon-chat')
      } else {
        currentId = `id_${Date.now()}`
        inputRef.value = ''
        setSelectType('single')
        setSelectIcon('i-carbon-chat')
      }
    }
  })

  return (
    <div class="p-6">
      <header class="mb-4">
        <h1 class="font-bold">Add Chat</h1>
      </header>
      <main class="flex flex-col gap-4">
        <input
          ref={inputRef!}
          type="text"
          placeholder="Untitled"
          class="w-full bg-transparent border border-base px-4 py-3 input-base focus:border-darker"
        />
        <div>
          <For each={typeSelectList}>
            {item => (
              <div
                class="flex items-center gap-3 p-4 border border-base hv-base"
                classList={{ 'border-emerald-500 text-emerald': selectType() === item.value }}
                onClick={() => { setSelectType(item.value) }}
              >
                <div class={`text-xl ${item.icon}`} />
                <div>{item.label}</div>
              </div>
            )}
          </For>
        </div>
        <div class="flex flex-wrap gap-2">
          <For each={iconList}>
            {item => (
              <div
                class="fcc w-12 h-12 border border-base hv-base"
                classList={{ 'border-emerald-500 text-emerald': selectIcon() === item }}
                onClick={() => { setSelectIcon(item) }}
              >
                <div class={`text-xl ${item}`} />
              </div>

            )}
          </For>
        </div>
      </main>
      <div class="fcc p-4 border border-base mt-8 hv-base" onClick={handleAdd}>OK</div>
    </div>
  )
}
