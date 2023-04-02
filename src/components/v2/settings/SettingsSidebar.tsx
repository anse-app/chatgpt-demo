import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { platformSettingsUIList } from '@/stores/ui'
import { providerSettingsMap, setSettingsByProviderId } from '@/stores/settings'
import ThemeToogle from '../ui/ThemeToogle'
import ProviderGlobalSettings from './ProviderGlobalSettings'
import GeneralSettings from './GeneralSettings'

export default () => {
  const $platformSettingsUIList = useStore(platformSettingsUIList)
  const $providerSettingsMap = useStore(providerSettingsMap)

  return (
    <div class="h-full flex flex-col">
      <header class="h-12 fi border-b border-base px-4 text-xs uppercase">
        Settings
      </header>
      <main class="flex-1 overflow-auto">
        {/* <GeneralSettings /> */}
        <For each={$platformSettingsUIList()}>
          {item => (
            <ProviderGlobalSettings
              config={item}
              settingsValue={() => $providerSettingsMap()[item.id] || {}}
              setSettings={v => setSettingsByProviderId(item.id, v)}
            />
          )}
        </For>
      </main>
      <footer class="p-4 fb items-center">
        <ThemeToogle />
        <div text-xs op-40>
          <a href="#" target="_blank" rel="noreferrer" class="op-70 hover:op-100">
            FAQ
          </a>
          <span class="px-1"> · </span>
          <a href="https://github.com/ddiu8081/chatgpt-demo" target="_blank" rel="noreferrer" class="op-70 hover:op-100">
            Github
          </a>
        </div>
      </footer>
    </div>
  )
}
