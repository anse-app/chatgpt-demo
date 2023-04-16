import * as zagSwitch from '@zag-js/switch'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'

interface Props {
  value: boolean
  setValue: (v: boolean) => void
  readOnly?: boolean
}

export const Toggle = (inputProps: Props) => {
  const props = mergeProps({}, inputProps)
  console.log('Checkbox', props.value)
  const [state, send] = useMachine(zagSwitch.machine({
    id: createUniqueId(),
    readOnly: props.readOnly,
    checked: props.value,
    onChange({ checked }) {
      props.setValue(!checked)
    },
  }))

  const api = createMemo(() => zagSwitch.connect(state, send, normalizeProps))

  return (
    <label {...api().rootProps}>
      <input {...api().inputProps} type="checkbox" />
      <div {...api().controlProps} class="track">
        <span {...api().thumbProps} />
      </div>
    </label>
  )
}
