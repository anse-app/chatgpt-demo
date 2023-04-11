import type { JSXElement } from 'solid-js'

interface Props {
  type?: 'normal' | 'error'
  height?: string
  class?: string
  onClick?: () => void
  children?: JSXElement
}

export default (props: Props) => {
  const containerClass = () => {
    const stateType = props.type || 'normal'
    if (stateType === 'normal')
      return `bg-base-100 ${props.onClick ? 'hv-base' : ''}`
    else if (stateType === 'error')
      return 'bg-red'
    return ''
  }

  return (
    <div
      class={`px-6 transition-all ${containerClass()}`}
      style={{ height: props.height ?? 'auto' }}
      onClick={props.onClick}
    >
      <div class={`h-full max-w-base ${props.class ?? ''}`}>
        { props.children }
      </div>
    </div>
  )
}
