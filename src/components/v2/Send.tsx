import { Show, createSignal } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { inputPrompt } from '@/stores/ui'
import { conversationMap, currentConversationId } from '@/stores/conversation'
import { handlePrompt } from './instance/ConversationInstance'

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

  const classTest = () => {
    if (isEditing())
      return 'h-40'
    else
      return 'h-14'
  }

  const EmptyState = () => (
    <div onClick={() => { setFocusState(true) && inputRef.focus() }} class="px-6 h-full flex flex-row items-center gap-2 hv-base">
      <div class="flex-1 op-30">Enter Something...</div>
      <div class="i-carbon-send op-50 text-xl" />
    </div>
  )

  const EditState = () => (
    <>
      <textarea
        ref={inputRef!}
        placeholder="Enter something..."
        autocomplete="off"
        onBlur={() => { setFocusState(false) }}
        onInput={() => { inputPrompt.set(inputRef.value) }}
        class="absolute inset-0 px-6 py-4 bg-darker-100 resize-none scroll-pa-4 input-base"
      />
      <div
        onClick={handleSend}
        class="absolute right-4 bottom-3 inline-flex p-2 items-center gap-1 rounded-md hv-base"
      >
        <div class="i-carbon-send op-50 text-xl cursor-pointer" />
      </div>
    </>
  )

  const handleSend = () => {
    handlePrompt(currentConversation(), inputRef.value)
    inputPrompt.set('')
    inputRef.value = ''
    setFocusState(false)
  }

  return (
    <div class={`absolute bottom-0 left-0 right-0 bg-base border-t border-base transition-height ${classTest()}`}>
      <Show when={!isEditing()}>
        <EmptyState />
      </Show>
      <Show when={isEditing()}>
        <EditState />
      </Show>
    </div>
  )
}
