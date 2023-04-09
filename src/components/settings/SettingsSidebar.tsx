import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { platformSettingsUIList } from '@/stores/ui'
import { providerSettingsMap, setSettingsByProviderId } from '@/stores/settings'
import ThemeToggle from '../ui/ThemeToggle'
import ProviderGlobalSettings from './ProviderGlobalSettings'
// import GeneralSettings from './GeneralSettings'

export default () => {
  const $platformSettingsUIList = useStore(platformSettingsUIList)
  const $providerSettingsMap = useStore(providerSettingsMap)

  return (
    <div class="h-full flex flex-col">
      <header class="h-14 fi border-b border-base px-4 text-xs uppercase">
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
      <footer class="h-14 fi justify-between px-3">
        <ThemeToggle />
        <div text-xs op-40 px-2>
          <a href="#" target="_blank" rel="noreferrer" class="hv-foreground">
            FAQ
          </a>
          <span class="px-1"> · </span>
          <a href="https://github.com/ddiu8081/chatgpt-demo" target="_blank" rel="noreferrer" class="hv-foreground">
            Github
          </a>
        </div>
      </footer>
    </div>
  )
}
