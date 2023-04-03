import SettingsNotDefined from './SettingsNotDefined'
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
            type="password"
            value={value()}
            class="w-full mt-1 bg-transparent border border-base px-2 py-1 input-base focus:border-darker"
            onChange={e => setValue(e.currentTarget.value)}
          />
        )}
        {!editing() && value() && (
          <div class="fi justify-between gap-2">
            <ApiKeyMaskText key={value} />
            <Usage />
          </div>
        )}
        {!editing() && !value() && (
          <SettingsNotDefined />
        )}
      </div>
    </div>
  )
}

const Usage = () => {
  return (
    <div class="relative h-1 w-[60px] bg-darker rounded-full overflow-hidden">
      <div class="absolute top-0 bottom-0 left-0 w-[70%] bg-emerald-600 bg-op-60 rounded-full" />
    </div>
  )
}

const ApiKeyMaskText = (props: {
  key: Accessor<string>
}) => {
  if (!props.key)
    return <div>unknown</div>
  return (
    <div class="fi">
      <div>{props.key().slice(0, 3)}</div>
      <div>****</div>
      <div>{props.key().slice(-4)}</div>
    </div>
  )
}
