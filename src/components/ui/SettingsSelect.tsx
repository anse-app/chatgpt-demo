import { Select } from '../ui/base'
import SettingsNotDefined from './SettingsNotDefined'
import type { SettingsUI, SettingsUISelect } from '@/types/provider'
import type { Accessor } from 'solid-js'

interface Props {
  settings: SettingsUI
  editing: Accessor<boolean>
  value: Accessor<string>
  setValue: (v: string) => void
}

export default ({ settings, editing, value, setValue }: Props) => {
  if (!settings.name || !settings.type) return null
  const selectSettings = settings as SettingsUISelect

  return (
    <div>
      {editing() && (
        <Select value={value} setValue={setValue} options={selectSettings.options} />
      )}
      {!editing() && value() && (
        <div>{value()}</div>
      )}
      {!editing() && !value() && (
        <SettingsNotDefined />
      )}
    </div>
  )
}
