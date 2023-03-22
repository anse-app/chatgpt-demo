import { useStore } from '@nanostores/solid'
import { adaptorSettingsUIList } from '@/stores/ui'
import { settings, settingsKey } from '@/stores/settings'
import type { SettingProps, SettingsPropsKey } from '@/stores/settings'

export default () => {
  const $currentKey = useStore(settingsKey)
  const $currentSettings = useStore(settings)
  const $adaptorSettingsUIList = useStore(adaptorSettingsUIList)

  const toogleCurrentKey = (key: SettingsPropsKey) => {
    settingsKey.set(key)
  }

  const getCurrentSettings = () => {
    const key = $currentKey().toLowerCase() as keyof SettingProps
    return $currentSettings()[key]
  }

  return (
    <>
      <div class="h-12 border-b border-base fb px-4 items-center ">
        <p class="font-bold text-lg">{`${$currentKey()} Settings`}</p>
        <div class="gpt-toggle-wrapper">
          <button
            onClick={() => toogleCurrentKey('Client')}
            class={`gpt-toggle-item ${$currentKey() === 'Client' ? 'gpt-toggle-active' : ''}`}
          >
            Client
          </button>
          <button
            onClick={() => toogleCurrentKey('GPT')}
            class={`gpt-toggle-item ${$currentKey() === 'GPT' ? 'gpt-toggle-active' : ''}`}
          >
            GPT
          </button>
        </div>
      </div>
      {
          $adaptorSettingsUIList().map(item => (
            <div>{item.name}</div>
          ))
        }
      {
        <pre>{JSON.stringify(getCurrentSettings(), null, 4)}</pre>
      /* <div class="p-4 rounded">
        <div class="gpt-settiongs-item">
          <p class="font-bold text-lg">Client Options</p>
        </div>
        <div class="gpt-settiongs-item">
          <p class="font-bold text-lg">GPT Options</p>
        </div>
      </div> */}
    </>
  )
}
