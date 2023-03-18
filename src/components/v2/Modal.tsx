import { useStore } from '@nanostores/solid'
import type { JSXElement } from 'solid-js'
import type { WritableAtom } from 'nanostores'

interface Props {
  bindValue: WritableAtom
  direction: 'top' | 'bottom' | 'left' | 'right'
  children: JSXElement
}

export default (props: Props) => {
  const modelValue = useStore(props.bindValue)

  const containerBaseClass = {
    top: 'top-0 left-0 right-0 border-b',
    bottom: 'bottom-0 left-0 right-0 border-t',
    left: 'top-0 left-0 bottom-0 border-r',
    right: 'top-0 right-0 bottom-0 border-l',
  }[props.direction]

  const containerTransformClass = () => ({
    top: modelValue() ? 'translate-y-0' : '-translate-y-full',
    bottom: modelValue() ? 'translate-y-0' : 'translate-y-full',
    left: modelValue() ? 'translate-x-0' : '-translate-x-full',
    right: modelValue() ? 'translate-x-0' : 'translate-x-full',
  }[props.direction])

  return (
    <div class="fixed inset-0" classList={{ 'pointer-events-none': !modelValue() }}>
      <div
        class="bg-base absolute inset-0 transition-opacity ease-out"
        classList={{ 'opacity-50': modelValue(), 'opacity-0': !modelValue() }}
        onClick={() => props.bindValue.set(false)}
      />
      <div class={`bg-base absolute transition-transform ease-out max-w-screen max-h-screen overflow-auto border-base ${containerBaseClass} ${containerTransformClass()}`}>
        { props.children }
      </div>
    </div>
  )
}
