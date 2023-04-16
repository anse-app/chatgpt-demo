import { For } from 'solid-js'
import SettingsUIComponent from './SettingsUIComponent'
import type { Accessor } from 'solid-js'
import type { GeneralSettings } from '@/types/app'

interface Props {
  settingsValue: Accessor<GeneralSettings>
  updateSettings: (v: Partial<GeneralSettings>) => void
}

const settingsUIList = [
  {
    key: 'requestWithBackend',
    name: 'Request With Backend',
    type: 'toggle',
  },
] as const

export default (props: Props) => {
  return (
    <div class="px-4 py-3 transition-colors border-b border-base">
      <h3 class="fi gap-2">
        <div class="flex-1 fi gap-1.5 overflow-hidden">
          <div class="i-carbon-settings" />
          <div class="flex-1 text-sm truncate">General</div>
        </div>
      </h3>
      <div class="mt-2 flex flex-col">
        <For each={settingsUIList}>
          {(item) => {
            return (
              <SettingsUIComponent
                settings={item}
                editing={() => true}
                value={() => props.settingsValue()[item.key] || false}
                setValue={(v) => {
                  props.updateSettings({ [item.key]: v as boolean })
                }}
              />
            )
          }}
        </For>
      </div>
    </div>
  )
}
