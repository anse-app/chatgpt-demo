import {onMount, Show} from 'solid-js'
import type { Accessor, Setter } from 'solid-js'
import IconEnv from './icons/Env'
import Key from "@/components/icons/Key";

interface Props {
  setKey: Setter<boolean>
  showKey: Accessor<boolean>
    currentKey:Accessor<string>
    setCurrentKey:Setter<string>
}

export default (props: Props) => {
    let keyRef: HTMLInputElement
    const onInput = () => {
        props.setCurrentKey(keyRef.value)
    }
  return (
    <div class="my-4">
          <span onClick={() => props.setKey(!props.showKey())} class="inline-flex items-center justify-center gap-1 text-sm text-slate bg-slate/20 px-2 py-1 rounded-md transition-colors cursor-pointer hover:bg-slate/50">
            <Key />
            <span>Set Key</span>
          </span>

      <Show when={props.showKey()}>
        <div>
          <p class="my-2 leading-normal text-slate text-sm op-60">Please fill in the OPENAI_API_KEY</p>
          <div>
             <input ref={keyRef!}
                          placeholder="OPENAI_API_KEY"
                          onInput={onInput}
                          value={props.currentKey()}
                          px-3 py-3
                          min-h-12
                          max-h-36
                          text-slate
                          rounded-sm
                          bg-slate
                          bg-op-15
                          resize-none
                          focus:bg-op-20
                          focus:ring-0
                          focus:outline-none
                          placeholder:text-slate-400
                          placeholder:op-30/>
          </div>

        </div>
      </Show>
    </div>
  )
}
