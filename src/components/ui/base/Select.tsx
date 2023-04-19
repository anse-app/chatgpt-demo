import { createEffect, createMemo, createUniqueId, mergeProps, on } from 'solid-js'
import * as select from '@zag-js/select'
import { normalizeProps, useMachine } from '@zag-js/solid'
import type { SelectOptionType } from '@/types/provider'
import type { Accessor } from 'solid-js'

interface Props {
  options: SelectOptionType[]
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

  createEffect(on(props.value, () => {
    const option = props.options.find(o => o.value === props.value())
    option && api().setSelectedOption(option)
  }))

  return (
    <div class="z-10">
      <div>
        <button
          class={`fi justify-between w-full px-2 py-1 border border-base ${props.readonly ? '' : 'hv-base'}`}
          {...api().triggerProps}
        >
          <div class="fi gap-2">
            {(api().selectedOption as SelectOptionType)?.icon && <div class={(api().selectedOption as SelectOptionType)?.icon} />}
            <div>{api().selectedOption?.label ?? props.placeholder}</div>
          </div>
          {!props.readonly && <div i-carbon-caret-down />}
        </button>
      </div>
      <div class="w-$reference-width -mt-2 z-100 shadow-md" {...api().positionerProps}>
        <ul class="bg-base" {...api().contentProps}>
          {props.options.map(({ label, value, icon }) => (
            <li
              class="fi justify-between w-full px-2 py-1 border-b border-b-base hv-base"
              {...api().getOptionProps({ label, value })}
            >
              <div class="fi gap-2">
                {icon && <div class={icon} />}
                <div>{label}</div>
              </div>
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
