import { useDark } from 'solidjs-use'
import { Show } from 'solid-js'

export default () => {
  const [isDark, setIsDark] = useDark({
    storageKey: 'theme',
    valueDark: 'dark',
  })

  return (
    <div
      class="fi p-2 rounded-md cursor-pointer text-lg hv-base hv-foreground"
      onClick={() => setIsDark(!isDark())}
    >
      <Show when={isDark()} >
        <div i-carbon-moon />
      </Show>
      <Show when={!isDark()}>
        <div i-carbon-light />
      </Show>
    </div>
  )
}
