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
  closeBtnClass?: string
}

export default (props: Props) => {
  const [state, send] = useMachine(dialog.machine({
    id: createUniqueId(),
    // TODO: set it to true will cause the modal closes exceptionally
    // https://github.com/chakra-ui/zag/issues/596
    closeOnOutsideClick: false,
  }))
  const api = createMemo(() => dialog.connect(state, send, normalizeProps))

  const containerBaseClass = {
    top: 'absolute top-0 left-0 right-0 border-b rounded-b-xl sm:(relative w-[400px] max-h-[60vh] border rounded-lg)',
    bottom: 'absolute bottom-0 left-0 right-0 border-t rounded-t-xl pb-[env(safe-area-inset-bottom)] sm:(relative w-[400px] max-h-[60vh] pb-0 border rounded-lg)',
    left: 'absolute top-0 left-0 bottom-0 border-r pb-[env(safe-area-inset-bottom)]',
    right: 'absolute top-0 right-0 bottom-0 border-l pb-[env(safe-area-inset-bottom)]',
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
        <div class="fixed inset-0 z-20 fcc">
          <Portal>
            <div {...api().backdropProps} class="fixed inset-0 bg-base opacity-60" />
          </Portal>
          <div {...api().containerProps}>
            <div {...api().contentProps} class={`bg-base-100 transition-transform ease-out max-w-screen max-h-screen overflow-auto border-base ${containerBaseClass}`}>
              <button {...api().closeTriggerProps} class={`absolute p-1 rounded-md top-4 right-4 hv-base hv-foreground ${props.closeBtnClass || ''}`}>
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
