import { Show } from 'solid-js'
import type { Accessor, Setter } from 'solid-js'
import IconEnv from './icons/Env'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing() && props.canEdit()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div class="text-slate">
            <div class="flex items-center gap-1 op-60 text-slate">
              <IconEnv />
              <span>System Role:</span>
            </div>
            <div class="mt-1">
              { props.currentSystemRoleSettings() }
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings()}>
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
          <p class="my-2 leading-normal text-slate text-sm op-60">Gently instruct the assistant and set the behavior of the assistant.</p>
          <div>
            <textarea
              ref={systemInputRef!}
              placeholder="You are a helpful assistant, answer as concisely as possible...."
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
            { props.currentSystemRoleSettings() ? 'Set' : 'Cancel' }
          </button>
        </div>
      </Show>
    </div>
  )
}
