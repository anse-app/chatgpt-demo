import { createEffect, createSignal, on } from 'solid-js'
import { convertReadableStreamToAccessor } from '@/logics/stream'
import { updateMessage } from '@/stores/messages'
import { deleteStreamById, getStreamByConversationId } from '@/stores/streams'
import Markdown from './Markdown'

interface Props {
  class?: string
  text: string
  streamInfo?: () => {
    conversationId: string
    messageId: string
    handleStreaming?: () => void
  }
}

export default (props: Props) => {
  const [localText, setLocalText] = createSignal('')

  createEffect(on(localText, () => {
    if (props.streamInfo && props.streamInfo()?.handleStreaming)
      props.streamInfo().handleStreaming!()
  }, { defer: true }))

  createEffect(async() => {
    const text = props.text
    if (props.text) {
      setLocalText(text)
    } else if (props.streamInfo) {
      const streamInfo = props.streamInfo()
      const streamInstance = getStreamByConversationId(streamInfo.conversationId)
      if (streamInfo.messageId && streamInstance?.messageId === streamInfo.messageId) {
        const finalText = await convertReadableStreamToAccessor(streamInstance.stream, setLocalText)
        setLocalText(finalText)
        updateMessage(streamInfo.conversationId, streamInfo.messageId, {
          content: finalText,
          stream: false,
        })
      }
      deleteStreamById(streamInfo.conversationId)
    } else {
      setLocalText('')
    }
  })

  return (
    <Markdown
      class={`prose prose-neutral dark:prose-invert fg-base! max-w-3xl -my-4 ${props.class ?? ''}`}
      text={localText()}
    />
  )
}
