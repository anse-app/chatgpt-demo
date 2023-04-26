import SettingsNotDefined from './SettingsNotDefined'
import type { SettingsUI } from '@/types/provider'
import type { Accessor } from 'solid-js'

interface Props {
  settings: SettingsUI
  editing: Accessor<boolean>
  value: Accessor<string>
  setValue: (v: string) => void
}

export default ({ settings, editing, value, setValue }: Props) => {
  if (!settings.name || !settings.type) return null
  return (
    <div>
      {editing() && (
        <input
          type="text"
          value={value()}
          class="w-full mt-1 bg-transparent border border-base px-2 py-1  focus:border-darker transition-colors-200"
          onChange={e => setValue(e.currentTarget.value)}
        />
      )}
      {!editing() && value() && (
        <div class="truncate">{value()}</div>
      )}
      {!editing() && !value() && (
        <SettingsNotDefined />
      )}
    </div>
  )
}
