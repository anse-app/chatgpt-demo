import * as slider from '@zag-js/slider'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Accessor, Setter } from 'solid-js'
import './index.css'

interface Props {
  value: Accessor<number>
  min: number
  max: number
  step: number
  label?: string
  disabled?: boolean
  desc?: string
  setValue: Setter<number>
}

export const Slider = (selectProps: Props) => {
  const props = mergeProps({
    min: 0,
    max: 10,
    step: 1,
    label: 'Slider Label',
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
        <label {...api().labelProps}>{ props.label }</label>
        <output {...api().outputProps}>{formatSliderValue(api().value)}</output>
      </div>
      {props.desc && !props.disabled && (
        <div class="mt-1 text-xs op-30">{props.desc}</div>
      )}
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
