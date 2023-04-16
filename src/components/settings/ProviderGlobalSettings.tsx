import { For, createSignal } from 'solid-js'
import SettingsUIComponent from './SettingsUIComponent'
import type { Accessor } from 'solid-js'
import type { SettingsPayload, SettingsUI } from '@/types/provider'

interface Props {
  config: {
    id: string
    icon?: string
    name: string
    settingsUI?: SettingsUI[]
  }
  settingsValue: Accessor<SettingsPayload>
  setSettings: (v: SettingsPayload) => void
}

export default ({ config, settingsValue, setSettings }: Props) => {
  const [editing, setEditing] = createSignal(false)
  const [editFormData, setEditFormData] = createSignal<SettingsPayload>({})
  const formData = () => ({
    ...settingsValue(),
    ...editFormData(),
  })

  const handleDismiss = () => {
    setEditFormData({})
    setEditing(false)
  }

  const handleClick = () => {
    console.log('providerGlobalSetting set', editFormData())
    setSettings(formData())
    setEditing(false)
  }

  if (!config.settingsUI) return null
  return (
    <div
      class="px-4 py-3 border transition-colors"
      classList={{
        'border border-amber/50 bg-amber/2': editing(),
        'border border-b-base border-l-transparent border-r-transparent border-t-transparent': !editing(),
      }}
    >
      <h3 class="fi gap-2">
        <div class="flex-1 fi gap-1.5 overflow-hidden">
          {config.icon && <div class={config.icon} />}
          <div class="flex-1 text-sm truncate">{config.name}</div>
        </div>
        {!editing() && (
          <div onClick={() => setEditing(true)} class="p-1 inline-flex items-center rounded-md hv-base hv-foreground">
            <div class="i-carbon-edit" />
          </div>
        )}
        {editing() && (
          <>
            <div onClick={handleDismiss} class="p-1 inline-flex items-center rounded-md hv-base hv-foreground">
              <div class="i-carbon-close" />
            </div>
            <div onClick={handleClick} class="p-1 inline-flex items-center rounded-md hv-base hv-foreground">
              <div class="i-carbon-checkmark" />
            </div>
          </>
        )}
      </h3>
      <div class="mt-2 flex flex-col">
        <For each={config.settingsUI}>
          {(item) => {
            return (
              <SettingsUIComponent
                settings={item}
                editing={editing}
                value={() => formData()[item.key] || ''}
                setValue={(v) => {
                  setEditFormData({ ...formData(), [item.key]: v })
                }}
              />
            )
          }}
        </For>
      </div>
    </div>
  )
}
