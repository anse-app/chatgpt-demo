import * as zagSwitch from '@zag-js/switch'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Accessor } from 'solid-js'

interface Props {
  value: Accessor<boolean>
  setValue: (v: boolean) => void
  readOnly?: boolean
}

export const Toggle = (inputProps: Props) => {
  const props = mergeProps({}, inputProps)
  let hack_FirstTimeRender = true
  const [state, send] = useMachine(zagSwitch.machine({
    id: createUniqueId(),
    readOnly: props.readOnly,
    value: props.value(),
    onChange({ checked }) {
      if (hack_FirstTimeRender) {
        hack_FirstTimeRender = false
        return
      }
      props.setValue(!checked)
    },
  }))

  const api = createMemo(() => zagSwitch.connect(state, send, normalizeProps))

  // TODO: remove this hack. It's here because the state machine is not ready
  setTimeout(() => {
    api().setChecked(props.value())
  }, 200)

  return (
    <label {...api().rootProps}>
      <input {...api().inputProps} type="checkbox" />
      <div {...api().controlProps} class="track">
        <span {...api().thumbProps} />
      </div>
    </label>
  )
}
