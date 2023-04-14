import * as tooltip from '@zag-js/tooltip'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { Show, children, createEffect, createMemo, createUniqueId } from 'solid-js'
import { Dynamic, spread } from 'solid-js/web'
import type { JSX, JSXElement } from 'solid-js'

interface Props {
  tip: string | JSXElement
  children: JSX.Element
  openDelay?: number
  closeDelay?: number
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
}

export const Tooltip = (props: Props) => {
  // TODO Official demo type error
  const [state, send] = useMachine(
    tooltip.machine({
      id: createUniqueId(),
      openDelay: props.openDelay ?? 300,
      closeDelay: props.closeDelay ?? 300,
      positioning: {
        placement: props.placement ?? 'top',
      },
    }),
  )

  const api = createMemo(() => tooltip.connect(state, send, normalizeProps))

  const resolvedChild = () => {
    const child = children(() => props.children)
    createEffect(() => {
      spread(child() as Element, { ...api().triggerProps })
    })
    return child
  }

  return (
    <div>
      <Dynamic component={resolvedChild} />
      <Show when={api().isOpen}>
        <div {...api().positionerProps} class="transition-opacity duration-300">
          <div {...api().contentProps} class="px-2 py-1 text-sm text-white bg-dark-600 dark-bg-zinc-900 rounded-md shadow-sm op-80">{ props.tip }</div>
        </div>
      </Show>
    </div>
  )
}
