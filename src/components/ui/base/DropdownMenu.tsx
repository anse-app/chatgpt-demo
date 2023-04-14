import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { Show, children, createEffect, createMemo, createUniqueId } from 'solid-js'
import { Dynamic, For, Portal, spread } from 'solid-js/web'
import type { JSX, JSXElement } from 'solid-js'

export interface MenuItem {
  id: string
  label: string | JSXElement
  icon?: string
  // TODO: nested menu
  children?: MenuItem[]
}

interface Props {
  children: JSX.Element
  menuList: MenuItem[]
}

export const DropDownMenu = (props: Props) => {
  const [state, send] = useMachine(
    menu.machine({
      id: createUniqueId(),
      onSelect(details) {
        console.log(details)
      },
    }),
  )

  const api = createMemo(() => menu.connect(state, send, normalizeProps))

  const resolvedChild = () => {
    const child = children(() => props.children)
    createEffect(() => {
      spread(child() as Element, { ...api().triggerProps })
    })
    return child
  }

  createEffect(() => {
    // https://github.com/chakra-ui/zag/issues/595
    api().setPositioning({})
  })

  return (
    <div>
      <Dynamic component={resolvedChild} />
      <Show when={api().isOpen}>
        <Portal>
          <div {...api().positionerProps} z-20>
            <div {...api().contentProps} class=" bg-white dark-bg-zinc-900 flex flex-col space-y-1 rounded-md shadow-md">
              <Show when={api().isOpen}>
                <For each={props.menuList}>
                  {item => (<div class="px-3 py-2 flex items-center space-x-2 hv-base" {...api().getItemProps({ id: item.id })}>{item.icon && <div class={item.icon} />}<div>{item.label}</div></div>)}
                </For>
              </Show>
            </div>
          </div>
        </Portal>
      </Show>
    </div>
  )
}
