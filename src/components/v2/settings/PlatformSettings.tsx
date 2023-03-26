import { For, createSignal } from 'solid-js'
import SettingsUIComponent from './SettingsUIComponent'
import type { SettingsUI } from '@/types/provider'

interface Props {
  config: {
    id: string
    name: string
    settings?: SettingsUI[]
  }
}

export default ({ config }: Props) => {
  const [editing, setEditing] = createSignal(false)

  const handleClick = () => {
    console.log('click')
    setEditing(false)
  }

  if (!config.settings) return null
  return (
    <div
      class="px-4 py-3 border-b border-base"
      classList={{
        'border border-amber/50': editing(),
      }}
    >
      <h3 class="mb-2 fi gap-2">
        <div class="flex-1 truncate">{config.name}</div>
        {!editing() && (
          <div onClick={() => setEditing(true)} class="p-1 inline-flex items-center rounded-md hv-base">
            <div class="i-carbon-edit" />
          </div>
        )}
        {editing() && (
          <>
            <div onClick={() => setEditing(false)} class="p-1 inline-flex items-center rounded-md hv-base">
              <div class="i-carbon-close" />
            </div>
            <div onClick={handleClick} class="p-1 inline-flex items-center rounded-md hv-base">
              <div class="i-carbon-checkmark" />
            </div>
          </>
        )}
      </h3>
      <For each={config.settings}>
        {item => (
          <SettingsUIComponent settings={item} editing={editing} />
        )}
      </For>
    </div>
  )
}
