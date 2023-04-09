import * as select from '@zag-js/select'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Accessor } from 'solid-js'

interface Props {
  options: {
    label: string
    value: string
  }[]
  value: Accessor<string>
  setValue: (v: string) => void
  placeholder?: string
  readonly?: boolean
}

export const Select = (inputProps: Props) => {
  const props = mergeProps({
    placeholder: 'Select option',
  }, inputProps)
  const [state, send] = useMachine(select.machine({
    id: createUniqueId(),
    selectedOption: props.options.find(o => o.value === props.value()),
    readOnly: props.readonly,
    onChange: (details) => {
      details && props.setValue(details.value)
    },
  }))

  const api = createMemo(() => select.connect(state, send, normalizeProps))

  // api().setSelectedOption(props.options[0])

  return (
    <div class="z-10">
      <div>
        <button
          class="fi justify-between w-full px-2 py-1 border border-base hv-base"
          {...api().triggerProps}
        >
          <span>{api().selectedOption?.label ?? props.placeholder}</span>
          <div i-carbon-caret-down />
        </button>
      </div>
      <div class="w-$reference-width -mt-2 z-100 shadow-md" {...api().positionerProps}>
        <ul {...api().contentProps}>
          {props.options.map(({ label, value }) => (
            <li
              class="fi justify-between w-full px-2 py-1 bg-base border border-base hv-base"
              {...api().getOptionProps({ label, value })}
            >
              <span>{label}</span>
              {value === api().selectedOption?.value && (
                <div i-carbon-checkmark />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
