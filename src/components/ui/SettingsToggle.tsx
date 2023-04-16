import { Toggle } from '../ui/base'
import type { SettingsUI } from '@/types/provider'
import type { Accessor } from 'solid-js'

interface Props {
  settings: SettingsUI
  editing: Accessor<boolean>
  value: Accessor<boolean>
  setValue: (v: boolean) => void
}

export default (props: Props) => {
  if (!props.settings.name || !props.settings.type) return null

  return (
    <div>
      {props.editing() && (
        <Toggle value={props.value} setValue={props.setValue} />
      )}
      {!props.editing() && (
        <div>{props.value() ? 'Yes' : 'No'}</div>
      )}
    </div>
  )
}
