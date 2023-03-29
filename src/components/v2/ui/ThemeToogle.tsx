import { useDark } from 'solidjs-use'

export default () => {
  const [isDark, setIsDark] = useDark({
    storageKey: 'theme',
    valueDark: 'dark',
  })

  return (
    <div class="flex items-center justify-center w-10 h-10 rounded-md transition-colors hover:bg-slate/10 border-0 cursor-pointer" onClick={() => setIsDark(!isDark())}>
      <svg
        class="transition-transform duration-[0.5s] ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] rotate-90 dark:rotate-40"
        width="1.2em"
        height="1.2em"
        viewBox="0 0 24 24"
        color="#858585"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
      >
        <mask id="myMask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle class="transition-[r] duration-500" fill="black" cx={isDark() ? '50%' : '100%'} cy={isDark() ? '23%' : '0%'} r={isDark() ? 9 : 5} />
        </mask>
        <circle
          class="transition-[r] duration-[0.3s]"
          r={isDark() ? 9 : 5}
          cx="12"
          cy="12"
          fill="#858585"
          mask="url(#myMask)"
        />
        <g class="transition-opacity duration-[0.5s] opacity-100 dark:op-0" stroke="currentColor" opacity="1">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </div>
  )
}
