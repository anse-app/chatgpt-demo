import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { platformSettingsList } from '@/stores/ui'

export default () => {
  const $platformSettingsList = useStore(platformSettingsList)

  return (
    <div class="h-screen flex flex-col">
      <div class="h-12 border-b border-base flex px-4 items-center">
        Settings
      </div>
      <div class="flex-1 overflow-auto">
        <For each={$platformSettingsList()}>
          {item => (
            <div>{item.name}</div>
          )}
        </For>
      </div>
    </div>
  )
}
