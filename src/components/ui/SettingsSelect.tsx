import { Select } from '../ui/base/Select'
import SettingsNotDefined from './SettingsNotDefined'
import type { SettingsUI, SettingsUISelect } from '@/types/provider'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  settings: SettingsUI
  editing: Accessor<boolean>
  value: Accessor<string>
  setValue: Setter<string>
}

export default ({ settings, editing, value, setValue }: Props) => {
  if (!settings.name || !settings.type) return null
  const selectSettings = settings as SettingsUISelect

  return (
    <div>
      <div class="text-xs op-50">{selectSettings.name}</div>
      {editing() && selectSettings.description && <div class="mt-1 text-xs op-30">{selectSettings.description}</div>}
      <div class="mt-1 text-sm">
        {editing() && (
          <Select value={value} setValue={setValue} options={selectSettings.options} />
        )}
        {!editing() && value() && (
          <Select value={value} setValue={setValue} options={selectSettings.options} readonly />
        )}
        {!editing() && !value() && (
        <SettingsNotDefined />
        )}
      </div>
    </div>
  )
}
