import { Show } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { inputPrompt } from '@/strores/ui'

const EmptyState = () => (
  <div class="h-14 px-6 border-t border-base flex flex-row items-center gap-2 transition-colors cursor-pointer hover:bg-darker">
    <div class="flex-1 op-30">Enter Something...</div>
    <div class="i-carbon-send op-50 text-xl" />
  </div>
)

export default () => {
  const $inputPrompt = useStore(inputPrompt)
  return (
    <>
      <Show when={!$inputPrompt()}>
        <EmptyState />
      </Show>
    </>
  )
}
