import { Show, createSignal } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { inputPrompt } from '@/stores/ui'
import { prompt } from '@/stores/prompt'

export default () => {
  let inputRef: HTMLTextAreaElement
  const $inputPrompt = useStore(inputPrompt)
  const [focusState, setFocusState] = createSignal(false)
  const isEditing = () => $inputPrompt() || focusState()

  const classTest = () => {
    if (isEditing())
      return 'h-40'
    else
      return 'h-14'
  }

  const EmptyState = () => (
    <div onClick={() => { setFocusState(true) }} class="px-6 h-full flex flex-row items-center gap-2 hv-base">
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
        autofocus
        onBlur={() => { setFocusState(false) }}
        onInput={() => { inputPrompt.set(inputRef.value) }}
        class="absolute inset-0 px-6 py-4 bg-darker-100 resize-none scroll-pa-4 placeholder:op-50 dark:placeholder:op-30 focus:(ring-0 outline-none)"
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
    prompt.set(inputRef.value)
    inputPrompt.set('')
    inputRef.value = ''
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
