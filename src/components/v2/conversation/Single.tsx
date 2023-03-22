import { useStore } from '@nanostores/solid'
import { prompt, response } from '@/stores/prompt'

export default () => {
  const $prompt = useStore(prompt)
  const $response = useStore(response)
  return (
    <div class="flex flex-col h-full">
      <div class="flex-[1] border-b border-base px-6 py-4">
        {$prompt()}
      </div>
      <div class="flex-[2] px-6 py-4">
        {$response()}
      </div>
    </div>
  )
}
