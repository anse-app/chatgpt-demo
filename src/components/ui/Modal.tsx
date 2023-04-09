import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { Show, createMemo, createUniqueId } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { Portal } from 'solid-js/web'
import type { JSXElement } from 'solid-js'
import type { WritableAtom } from 'nanostores'

interface Props {
  bindValue: WritableAtom<boolean>
  direction: 'top' | 'bottom' | 'left' | 'right'
  children: JSXElement
}

export default (props: Props) => {
  const [state, send] = useMachine(dialog.machine({
    id: createUniqueId(),
    initialFocusEl: null,
  }))
  const api = createMemo(() => dialog.connect(state, send, normalizeProps))

  const containerBaseClass = {
    top: 'top-0 left-0 right-0 border-b',
    bottom: 'bottom-0 left-0 right-0 border-t',
    left: 'top-0 left-0 bottom-0 border-r',
    right: 'top-0 right-0 bottom-0 border-l',
  }[props.direction]

  props.bindValue.subscribe((show) => {
    if (show)
      api().open()
    else
      api().close()
  })

  return (
    <Transition name={`slide-${props.direction}`}>
      <Show when={api().isOpen}>
        <div class="fixed inset-0 z-20">
          <Portal>
            <div class="fixed inset-0 bg-base opacity-50" {...api().backdropProps} />
          </Portal>
          <div {...api().containerProps}>
            <div {...api().contentProps} class={`bg-base absolute transition-transform ease-out max-w-screen max-h-screen overflow-auto border-base ${containerBaseClass}`}>
              <button class="absolute top-4 right-4" {...api().closeTriggerProps}>
                <div i-carbon-close class="text-xl" />
              </button>
              { props.children }
            </div>
          </div>
        </div>
      </Show>
    </Transition>
  )
}
