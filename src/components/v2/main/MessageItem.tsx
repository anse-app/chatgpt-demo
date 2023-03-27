import MarkdownIt from 'markdown-it'
import type { ConversationMessage } from '@/types/conversation'
import type { Accessor } from 'solid-js'

interface Props {
  role: ConversationMessage['role']
  message: Accessor<string> | string
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
  const roleClass = {
    system: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    user: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    assistant: 'bg-gradient-to-b from-[#fccb90] to-[#d57eeb]',
  }
  const htmlString = () => {
    if (typeof props.message === 'function')
      return parseMarkdown(props.message())
    else if (typeof props.message === 'string')
      return parseMarkdown(props.message)

    return ''
  }

  return (
    <div
      class="p-6 break-all"
      classList={{
        'op-70 bg-darker': props.role === 'user',
      }}
    >
      <div class="max-w-base flex gap-4 overflow-hidden">
        <div class={`shrink-0 w-7 h-7 rounded-md op-80 ${roleClass[props.role]}`} />
        <div class="prose prose-neutral dark:prose-invert max-w-3xl" innerHTML={htmlString()} />
      </div>
    </div>
  )
}
