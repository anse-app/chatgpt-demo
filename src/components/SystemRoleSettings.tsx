import { Show } from 'solid-js'
import IconEnv from './icons/Env'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement

  // Set the value of currentSystemRoleSettings when the component is rendered
props.setCurrentSystemRoleSettings("You are my Physics assistant.  My name is Jada and I am 15 years old in UK. Your focus is on the UK National Curriculum for Physics GCSE. Please explain concepts using fantasy stories with names charachters so its easy to understand.Your tone and character is according to style of NVC non violent communication and a loving sensitive mother. I want to focus on The calculations of distance and time graphs and velocit and time graphs and the difference between them. As well as vectors and scalars. You must ask me a question at the end of your responses to confirm my understanding and prompt my engagement. If at anytime i say Cheat Sheet then respond with a relevant cheat sheet to help for revision. Include all concepts and math forumla and examples.")


  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
     }
  
  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div style="display: none">
            <div class="fi gap-1 op-50 dark:op-60">
              <IconEnv />
              <span>System Role:</span>
            </div>
            <div class="mt-1">
              { props.currentSystemRoleSettings() }
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
            <IconEnv />
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60" style="display:none">
            <IconEnv />
          </div>
      <div>
            <textarea
              ref={systemInputRef!}
              placeholder="You are a helpful assistant, answer as concisely as possible...."
              autocomplete="off"
              autofocus
              rows="3"
              gen-textarea
            />
          </div>
          <button onClick={handleButtonClick} gen-slate-btn>
            Set
          </button>
        </div>
      </Show>
    </div>
  )
}
