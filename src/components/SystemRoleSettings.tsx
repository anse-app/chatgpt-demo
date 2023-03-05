import { createSignal, Show } from 'solid-js'
import type { Accessor, Setter } from 'solid-js'
import IconEnv from './icons/Env'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  systemRoleSettings: Accessor<string>
  setSystemRoleSettings: Setter<string>
}

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.isComposing || e.shiftKey) {
      return
    }
    if (e.key === 'Enter') {
      // handleButtonClick()
    }
  }

  const handleButtonClick = () => {
    props.setSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.systemRoleSettings()}>
          <div class="text-slate">
            <div class="flex items-center gap-1 op-60 text-slate">
              <IconEnv />
              <span>System Role:</span>
            </div>
            <div class="mt-1">
              { props.systemRoleSettings() }
            </div>
          </div>
        </Show>
        <Show when={!props.systemRoleSettings()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="inline-flex items-center justify-center gap-1 text-sm text-slate bg-slate/20 px-2 py-1 rounded-md transition-colors cursor-pointer hover:bg-slate/50">
            <IconEnv />
            <span>Add System Role</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="flex items-center gap-1 op-60 text-slate">
            <IconEnv />
            <span>System Role:</span>
          </div>
          <div>
            <textarea
              ref={systemInputRef!}
              onKeyDown={handleKeydown}
              placeholder="You are a helpful assistant..."
              autocomplete="off"
              autofocus
              rows="3"
              w-full
              px-3 py-3 my-1
              min-h-12
              max-h-36
              text-slate
              rounded-sm
              bg-slate
              bg-op-15
              focus:bg-op-20
              focus:ring-0
              focus:outline-none
              placeholder:text-slate-400
              placeholder:op-30
              overflow-hidden
              resize-none scroll-pa-8px
            />
          </div>
          <button onClick={handleButtonClick} h-12 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 text-slate rounded-sm>
            Set
          </button>
        </div>
      </Show>
    </div>
  )
}
