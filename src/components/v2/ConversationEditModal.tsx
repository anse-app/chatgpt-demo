import { For, createSignal } from 'solid-js'
import {
  addConversation,
  currentEditingConversation,
  updateConversationById,
} from '@/stores/conversation'
import { showConversationEditModal } from '@/stores/ui'
import type { ConversationType } from '@/types/conversation'

export default () => {
  let inputRef: HTMLInputElement
  let currentId = ''
  const [selectType, setSelectType] = createSignal<ConversationType>('single')
  const [selectIcon, setSelectIcon] = createSignal<string>('bg-emerald')
  const typeSelectList = [
    {
      value: 'single' as const,
      label: 'Single Conversation',
      icon: 'i-carbon-connect',
    },
    {
      value: 'continuous' as const,
      label: 'Continuous Conversation',
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
    const conversationName = inputRef.value || 'Untitled'
    const payload = {
      id: currentId,
      type: selectType(),
      name: conversationName,
      icon: selectIcon(),
      messages: [],
    }
    if (currentEditingConversation.get()?.id)
      updateConversationById(currentId, payload)
    else
      addConversation(payload)

    showConversationEditModal.set(false)
    inputRef.value = ''
  }

  showConversationEditModal.listen((showModal) => {
    if (showModal) {
      // inputRef.focus()
      if (currentEditingConversation.get()?.id) {
        currentId = currentEditingConversation.get().id
        const { name, icon, type } = currentEditingConversation.get()
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
        <h1 class="font-bold">Edit Conversation</h1>
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
