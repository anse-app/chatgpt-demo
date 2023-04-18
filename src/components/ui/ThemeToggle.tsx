import { useDark } from 'solidjs-use'
import { Show, onMount } from 'solid-js'

export default () => {
  // TODO: it created twice, optimize that
  const [isDark, setIsDark] = useDark({
    storageKey: 'theme',
    valueDark: 'dark',
  })

  onMount(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark() ? '#222222' : '#fafafa')
  })

  const handleDarkChanged = () => {
    console.log('handleDarkChanged')
    const dark = !isDark()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#222222' : '#fafafa')
    setIsDark(dark)
  }

  return (
    <div
      class="fi p-2 rounded-md cursor-pointer text-lg hv-base hv-foreground"
      onClick={handleDarkChanged}
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
