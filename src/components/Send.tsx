import { Match, Switch, createSignal, onMount } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { createShortcut } from '@solid-primitives/keyboard'
import { currentErrorMessage, isSendBoxFocus, scrollController } from '@/stores/ui'
import { addConversation, conversationMap, currentConversationId } from '@/stores/conversation'
import { loadingStateMap, streamsMap } from '@/stores/streams'
import { handlePrompt } from '@/logics/conversation'

export default () => {
  let inputRef: HTMLTextAreaElement
  const $conversationMap = useStore(conversationMap)
  const $currentConversationId = useStore(currentConversationId)
  const $isSendBoxFocus = useStore(isSendBoxFocus)
  const $currentErrorMessage = useStore(currentErrorMessage)
  const $streamsMap = useStore(streamsMap)
  const $loadingStateMap = useStore(loadingStateMap)
  const [controller, setController] = createSignal<AbortController>()

  const [inputPrompt, setInputPrompt] = createSignal('')
  const isEditing = () => inputPrompt() || $isSendBoxFocus()
  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }
  const isStreaming = () => !!$streamsMap()[$currentConversationId()]
  const isLoading = () => !!$loadingStateMap()[$currentConversationId()]

  onMount(() => {
    createShortcut(['Control', 'Enter'], () => {
      $isSendBoxFocus() && handleSend()
    })
  })

  const stateType = () => {
    if ($currentErrorMessage())
      return 'error'
    else if (isLoading() || isStreaming())
      return 'loading'
    else if (isEditing())
      return 'editing'
    else
      return 'normal'
  }

  const EmptyState = () => (
    <div
      class="max-w-base h-full fi flex-row gap-2"
      onClick={() => {
        isSendBoxFocus.set(true)
        inputRef.focus()
      }}
    >
      <div class="flex-1 op-30">Enter Something...</div>
      <div class="i-carbon-send op-50 text-xl" />
    </div>
  )

  const EditState = () => (
    <div class="h-full relative">
      <textarea
        ref={inputRef!}
        placeholder="Enter something..."
        autocomplete="off"
        onBlur={() => { isSendBoxFocus.set(false) }}
        onInput={() => { setInputPrompt(inputRef.value) }}
        onKeyDown={(e) => {
          e.key === 'Enter' && !e.isComposing && !e.shiftKey && handleSend()
        }}
        class="absolute inset-0 py-4 px-[calc(max(1.5rem,(100%-48rem)/2))] resize-none scroll-pa-4 input-base"
      />
      <div
        onClick={handleSend}
        class={`absolute right-[calc(max(1.5rem,(100%-48rem)/2)-0.5rem)] bottom-3 bg-base-100 border border-base p-2 rounded-md hv-base ${inputPrompt() && 'bg-teal-600 dark:bg-teal-700 b-none hover:bg-teal-700 dark:hover:bg-teal-800 text-white'}`}
      >
        <div class="i-carbon-send op-80 dark:op-70 text-xl cursor-pointer" />
      </div>
    </div>
  )

  const ErrorState = () => (
    <div class="max-w-base h-full flex items-end flex-col justify-between gap-8 sm:(flex-row items-center) py-4 text-error text-sm">
      <div class="flex-1 w-full">
        <div class="fi gap-0.5 mb-1">
          <span i-carbon-warning />
          <span class="font-semibold">{$currentErrorMessage()?.code}</span>
        </div>
        <div>{$currentErrorMessage()?.message}</div>
      </div>
      <div
        class="border border-error px-2 py-1 rounded-md hv-base hover:bg-white"
        onClick={() => { currentErrorMessage.set(null) }}
      >
        Dismiss
      </div>
    </div>
  )

  const clearPrompt = () => {
    setInputPrompt('')
    inputRef.value = ''
    isSendBoxFocus.set(false)
  }

  const handleAbortFetch = () => {
    controller()!.abort()
    clearPrompt()
  }

  const LoadingState = () => (
    <div class="max-w-base h-full fi flex-row gap-2">
      <div class="flex-1 op-50">Thinking...</div>
      <div
        class="border border-darker px-2 py-1 rounded-md text-sm op-40 hv-base hover:bg-white"
        onClick={() => { handleAbortFetch() }}
      >
        Abort
      </div>
    </div>
  )

  const handleSend = () => {
    if (!inputRef.value)
      return
    if (!currentConversation())
      addConversation()

    const controller = new AbortController()
    setController(controller)
    handlePrompt(currentConversation(), inputRef.value, controller.signal)
    clearPrompt()
    scrollController().scrollToBottom()
  }

  const stateRootClass = () => {
    if (stateType() === 'normal')
      return 'bg-base-100 hv-base'
    else if (stateType() === 'error')
      return 'bg-red/8'
    else if (stateType() === 'loading')
      return 'loading-anim bg-base-100'
    else if (stateType() === 'editing')
      return 'bg-base-100'
    return ''
  }

  const stateHeightClass = () => {
    if (stateType() === 'normal')
      return 'px-6 h-14'
    else if (stateType() === 'error')
      return 'px-6'
    else if (stateType() === 'loading')
      return 'px-6 h-14'
    else if (stateType() === 'editing')
      return 'h-40'
    return ''
  }

  return (
    <div class={`relative shrink-0 border-t border-base pb-[env(safe-area-inset-bottom)] transition transition-colors duration-300 ${stateRootClass()}`}>
      <div class={`relative transition transition-height duration-240 ${stateHeightClass()}`}>
        <Switch fallback={<EmptyState />}>
          <Match when={stateType() === 'error'}>
            <ErrorState />
          </Match>
          <Match when={stateType() === 'loading'}>
            <LoadingState />
          </Match>
          <Match when={stateType() === 'editing'}>
            <EditState />
          </Match>
        </Switch>
      </div>
    </div>
  )
}
