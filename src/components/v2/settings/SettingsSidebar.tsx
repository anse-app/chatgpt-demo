import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { platformSettingsList } from '@/stores/ui'
import ThemeToogle from '../ui/ThemeToogle'
import PlatformSettings from './PlatformSettings'
import GeneralSettings from './GeneralSettings'

export default () => {
  const $platformSettingsList = useStore(platformSettingsList)

  return (
    <div class="h-screen flex flex-col">
      <header class="h-12 fi border-b border-base px-4 text-xs uppercase">
        Settings
      </header>
      <main class="flex-1 overflow-auto">
        {/* <GeneralSettings /> */}
        <For each={$platformSettingsList()}>
          {item => <PlatformSettings config={item} />}
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
