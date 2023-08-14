import * as slider from '@zag-js/slider'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Accessor } from 'solid-js'
import '../slider.css'

interface Props {
  value: Accessor<number>
  min: number
  max: number
  step: number
  disabled?: boolean
  setValue: (v: number) => void
}

export const Slider = (selectProps: Props) => {
  const props = mergeProps({
    min: 0,
    max: 2,
    step: 0.01,
    disabled: false,
  }, selectProps)

  const formatSliderValue = (value: number) => {
    if (!value) return 0
    return Number.isInteger(value) ? value : parseFloat(value.toFixed(2))
  }

  const [state, send] = useMachine(slider.machine({
    id: createUniqueId(),
    value: props.value(),
    min: props.min,
    max: props.max,
    step: props.step,
    disabled: props.disabled,
    onChange: (details) => {
      details && details.value && props.setValue(formatSliderValue(details.value))
    },
  }))
  const api = createMemo(() => slider.connect(state, send, normalizeProps))
  return (
    <div {...api().rootProps}>
      <div class="text-xs op-50 fb items-center">
        <span>Temperature</span>
        <output {...api().outputProps}>{formatSliderValue(api().value)}</output>
      </div>
      <div class="mt-2" {...api().controlProps}>
        <div {...api().trackProps}>
          <div {...api().rangeProps} />
        </div>
        <div {...api().thumbProps}>
          <input {...api().hiddenInputProps} />
        </div>
      </div>
    </div>
  )
}
