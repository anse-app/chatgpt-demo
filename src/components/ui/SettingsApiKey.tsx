import { createSignal } from 'solid-js'
import { useClipboard } from 'solidjs-use'
import SettingsNotDefined from './SettingsNotDefined'
import type { Accessor } from 'solid-js'
import type { SettingsUI } from '@/types/provider'

interface Props {
  settings: SettingsUI
  editing: Accessor<boolean>
  value: Accessor<string>
  setValue: (v: string) => void
}

export default ({ settings, editing, value, setValue }: Props) => {
  if (!settings.name || !settings.type) return null
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <div>
      {editing() && (
        <div class="fcc relative border border-base focus-within:border-darker transition-colors-200">
          <input
            type={isOpen() ? 'text' : 'password'}
            value={value()}
            class="w-full mt-1 bg-transparent pl-2 py-1 pr-8 input-base focus:border-darker"
            onChange={e => setValue(e.currentTarget.value)}
          />
          <div class="absolute top-0 right-0 bottom-0 fcc p-1 w-8 box-border bg-transparent cursor-pointer" onClick={() => { setIsOpen(!isOpen()) }}>
            <div class={`${isOpen() ? 'i-carbon-view' : 'i-carbon-view-off'} text-sm`} />
          </div>
        </div>
      )}
      {!editing() && value() && (
        <ApiKeyMaskText key={value} />
      )}
      {!editing() && !value() && (
        <SettingsNotDefined />
      )}
    </div>
  )
}

// const Usage = () => {
//   return (
//     <div class="relative h-1 w-[60px] bg-darker rounded-full overflow-hidden">
//       <div class="absolute top-0 bottom-0 left-0 w-[70%] bg-emerald-600 bg-op-60 rounded-full" />
//     </div>
//   )
// }

const ApiKeyMaskText = (props: {
  key: Accessor<string>
}) => {
  const { copy } = useClipboard({ source: props.key() })

  if (!props.key)
    return <div>unknown</div>
  return (
    <div class="fi">
      <div>{props.key().slice(0, 3)}</div>
      <div>****</div>
      <div>{props.key().slice(-4)}</div>
      <div class="i-carbon-copy text-sm cursor-pointer ml-1" onClick={() => copy()} />
    </div>
  )
}
