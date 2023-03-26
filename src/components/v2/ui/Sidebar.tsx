import type { JSXElement } from 'solid-js'

interface Props {
  direction: 'left' | 'right'
  class?: string
  children: JSXElement
}

export default (props: Props) => {
  const containerBaseClass = {
    left: 'w-[300px] h-screen border-r',
    right: 'w-[300px] h-screen border-l',
  }[props.direction]

  return (
    <aside
      class={[
        'border-base overflow-hidden shrink-0',
        containerBaseClass,
        props.class || '',
      ].join(' ')}
    >
      { props.children }
    </aside>
  )
}
