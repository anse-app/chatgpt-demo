import type { SettingsUI, SettingsUIInput } from '@/types/provider'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  settings: SettingsUI
  editing: Accessor<boolean>
  value: Accessor<string>
  setValue: Setter<string>
}

export default ({ settings, editing, value, setValue }: Props) => {
  if (!settings.name || !settings.type) return null
  const inputSettings = settings as SettingsUIInput
  return (
    <div>
      <div class="text-xs op-50">{inputSettings.name}</div>
      {editing() && inputSettings.description && <div class="mt-1 text-xs op-30">{inputSettings.description}</div>}
      <div class="mt-1 text-sm">
        {editing() && (
          <input
            type="text"
            value={value()}
            class="w-full mt-1 bg-transparent border border-base px-2 py-1 input-base focus:border-darker"
            onChange={e => setValue(e.currentTarget.value)}
          />
        )}
        {!editing() && (
          <div>{value()}</div>
        )}
      </div>
    </div>
  )
}
