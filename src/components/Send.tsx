import { Show, createSignal, onMount } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { createShortcut } from '@solid-primitives/keyboard'
import { inputPrompt } from '@/stores/ui'
import { addConversation, conversationMap, currentConversationId } from '@/stores/conversation'
import { handlePrompt } from '@/logics/conversation'

export default () => {
  let inputRef: HTMLTextAreaElement
  const $conversationMap = useStore(conversationMap)
  const $currentConversationId = useStore(currentConversationId)
  const $inputPrompt = useStore(inputPrompt)
  const [focusState, setFocusState] = createSignal(false)
  const isEditing = () => $inputPrompt() || focusState()
  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }

  onMount(() => {
    createShortcut(['Meta', 'Enter'], () => {
      focusState() && handleSend()
    })
  })

  const stateClass = () => {
    if (isEditing())
      return 'h-40'
    else
      return 'h-14'
  }

  const EmptyState = () => (
    <div onClick={() => { setFocusState(true) && inputRef.focus() }} class="h-full px-6 hv-base">
      <div class="max-w-base flex flex-row items-center gap-2 h-full border border-transparent">
        <div class="flex-1 op-30">Enter Something...</div>
        <div class="i-carbon-send op-50 text-xl" />
      </div>
    </div>
  )

  const EditState = () => (
    <div class="h-full">
      <div class="h-full relative">
        <textarea
          ref={inputRef!}
          placeholder="Enter something..."
          autocomplete="off"
          onBlur={() => { setFocusState(false) }}
          onInput={() => { inputPrompt.set(inputRef.value) }}
          class="absolute inset-0 py-4 px-[calc(max(1.5rem,(100%-48rem)/2))] resize-none scroll-pa-4 input-base"
        />
        <div
          onClick={handleSend}
          class="absolute right-[calc(max(1.5rem,(100%-48rem)/2)-0.5rem)] bottom-3 bg-base-100 border border-base p-2 rounded-md hv-base"
        >
          <div class="i-carbon-send op-50 text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  )

  const handleSend = () => {
    if (!inputRef.value)
      return
    if (!currentConversation())
      addConversation()
    handlePrompt(currentConversation(), inputRef.value)
    inputPrompt.set('')
    inputRef.value = ''
    setFocusState(false)
  }

  return (
    <div class={`bg-base-100 border-t border-base transition-height ${stateClass()}`}>
      <Show when={!isEditing()}>
        <EmptyState />
      </Show>
      <Show when={isEditing()}>
        <EditState />
      </Show>
    </div>
  )
}
