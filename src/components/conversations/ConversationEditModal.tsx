import { For, createSignal, onMount } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { Select } from '@/components/ui/base'
import {
  addConversation,
  currentEditingConversation,
  updateConversationById,
} from '@/stores/conversation'
import { showConversationEditModal } from '@/stores/ui'
import { providerMetaList } from '@/stores/provider'
import type { ConversationType } from '@/types/conversation'

const typeSelectList = [
  {
    value: 'continuous' as const,
    label: 'Continuous Conversation',
    icon: 'i-carbon-edt-loop',
  },
  {
    value: 'single' as const,
    label: 'Single Conversation',
    icon: 'i-carbon-connect',
  },
  {
    value: 'image' as const,
    label: 'Image Generation',
    icon: 'i-carbon-image',
  },
]
const iconList = [
  'i-carbon-chat',
  'i-carbon-chat-bot',
  'i-carbon-basketball',
  'i-carbon-game-console',
  'i-carbon-palm-tree',
  'i-carbon-asleep',
  'i-carbon-cafe',
  'i-carbon-calculation',
  'i-carbon-color-palette',
  'i-carbon-fish',
  'i-carbon-idea',
  'i-carbon-music',
  'i-carbon-parameter',
]

export default () => {
  let inputRef: HTMLInputElement
  const $currentEditingConversation = useStore(currentEditingConversation)
  const [currentEditingId, setCurrentEditingId] = createSignal('')
  const [selectConversationType, setSelectConversationType] = createSignal<ConversationType>('continuous')
  const [selectIcon, setSelectIcon] = createSignal('i-carbon-chat')
  const [selectProviderId, setSelectProviderId] = createSignal(providerMetaList[0]?.id)
  const selectProvider = () => providerMetaList.find(item => item.id === selectProviderId()) || null

  const handleProviderChange = (id: string) => {
    setSelectProviderId(id)
    setSelectConversationType(selectProvider()?.supportConversationType[0] || 'continuous')
  }

  onMount(() => {
    const current = currentEditingConversation.get()
    if (current?.id) {
      setCurrentEditingId(current.id)
      const { name, icon, conversationType } = current
      inputRef.value = name
      setSelectProviderId(current.providerId)
      setSelectConversationType(conversationType)
      setSelectIcon(icon || 'i-carbon-chat')
    } else {
      setCurrentEditingId('')
      inputRef.value = ''
      setSelectProviderId(providerMetaList[0]?.id)
      setSelectConversationType('continuous')
      setSelectIcon('i-carbon-chat')
    }
  })

  const handleAdd = () => {
    const currentId = currentEditingId()
    const payload = {
      providerId: selectProviderId(),
      conversationType: selectConversationType(),
      name: inputRef.value || '',
      icon: selectIcon(),
    }
    if (currentId)
      updateConversationById(currentId, payload)
    else
      addConversation(payload)

    showConversationEditModal.set(false)
    inputRef.value = ''
  }

  return (
    <div class="p-6">
      <header class="mb-4">
        <h1 class="font-bold">Edit Conversation</h1>
      </header>
      <main class="flex flex-col gap-3">
        <input
          ref={inputRef!}
          type="text"
          placeholder="Untitled"
          class="w-full bg-transparent border border-base px-2 py-1 input-base focus:border-darker"
        />
        <Select
          options={providerMetaList.map(item => ({ value: item.id, label: item.name, icon: item.icon }))}
          value={selectProviderId}
          setValue={handleProviderChange}
          readonly={!!$currentEditingConversation()}
        />
        <div>
          <For each={typeSelectList.filter(item => selectProvider()?.supportConversationType.includes(item.value))}>
            {item => (
              <div
                class="flex items-center gap-2 p-2 border border-base"
                classList={{
                  'border-emerald-600! text-emerald-600': selectConversationType() === item.value,
                  'op-50': !!$currentEditingConversation(),
                  'hv-base': !$currentEditingConversation(),
                }}
                onClick={() => { !$currentEditingConversation() && setSelectConversationType(item.value) }}
              >
                <div class={item.icon} />
                <div>{item.label}</div>
              </div>
            )}
          </For>
        </div>
        <div class="flex flex-wrap">
          <For each={iconList}>
            {item => (
              <div
                class="fcc w-10 h-10 border border-base hv-base"
                classList={{ 'border-emerald-600! text-emerald-600': selectIcon() === item }}
                onClick={() => { setSelectIcon(item) }}
              >
                <div class={item} />
              </div>
            )}
          </For>
        </div>
      </main>
      <div class="fcc px-2 py-2 bg-darker border border-base mt-4 hv-base hover:border-darker" onClick={handleAdd}>Save</div>
    </div>
  )
}
