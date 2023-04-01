import { useDark } from 'solidjs-use'
import { Show } from 'solid-js'

export default () => {
  const [isDark, setIsDark] = useDark({
    storageKey: 'theme',
    valueDark: 'dark',
  })

  return (
    <div class="flex items-center justify-center w-10 h-10 rounded-md transition-colors hover:bg-slate/10 border-0 cursor-pointer group" onClick={() => setIsDark(!isDark())}>
      <div class="icon-base">
        <Show when={isDark()} >
          <div i-line-md-moon class="icon-base icon--off text-neutral-400" />
          <div i-line-md-moon-twotone-loop class="icon-base icon--on text-neutral-400" />
        </Show>
        <Show when={!isDark()}>
          <div i-line-md-sunny-outline class="icon-base icon--off text-slate-600" />
          <div i-line-md-sunny-outline-loop class="icon-base icon--on text-slate-600" />
        </Show>
      </div>
    </div>
  )
}
