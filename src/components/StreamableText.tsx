import { createEffect, createSignal } from 'solid-js'
import MarkdownIt from 'markdown-it'
import { convertReadableStreamToAccessor } from '@/logics/stream'
import { updateMessage } from '@/stores/messages'

interface Props {
  class?: string
  text: string
  streamInfo?: () => {
    conversationId: string
    messageId: string
    stream: ReadableStream | null
  }
}

const parseMarkdown = (raw: string) => {
  // TODO: use micromark or remark + shiki
  // const result = micromark(raw, {
  //   extensions: [gfm()],
  //   htmlExtensions: [gfmHtml()],
  // })
  // return result
  const md = MarkdownIt({
    linkify: true,
    breaks: true,
  })
  return md.render(raw)
}

export default (props: Props) => {
  const [localText, setLocalText] = createSignal('')

  createEffect(async() => {
    const text = props.text
    if (props.text) {
      setLocalText(text)
    } else if (props.streamInfo) {
      const streamInfo = props.streamInfo()
      if (streamInfo.messageId && streamInfo.stream) {
        const finalText = await convertReadableStreamToAccessor(streamInfo.stream, setLocalText)
        setLocalText(finalText)
        updateMessage(streamInfo.conversationId, streamInfo.messageId, {
          content: finalText,
        })
      }
    } else {
      setLocalText('')
    }
  })

  const htmlString = () => parseMarkdown(localText())

  return (
    <div
      class={`prose prose-neutral dark:prose-invert max-w-3xl ${props.class ?? ''}`}
      innerHTML={htmlString()}
      class={`prose prose-neutral dark:prose-invert max-w-3xl -my-4 ${props.class ?? ''}`}
    />
  )
}
