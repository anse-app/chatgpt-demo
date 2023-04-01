import { createSignal } from 'solid-js'
import { convertReadableStreamToAccessor } from '@/logics/stream'
import type { Accessor } from 'solid-js'
import type { Message } from '@/types/message'

interface Props {
  messages: Accessor<Message[]>
}

export default ({ messages }: Props) => {
  const [inputText, setInputText] = createSignal('')
  const [outputText, setOutputText] = createSignal('')
  const messageInput = () => {
    if (!messages().length) {
      return ''
    } else {
      const content = messages()[0].content
      if (typeof content === 'string') {
        return content
      } else {
        convertReadableStreamToAccessor(content, inputText, setInputText)
        return inputText()
      }
    }
  }
  // const messageOutput = () => messages().length > 1 ? messages()[1].content : ''
  const messageOutput = () => {
    if (messages().length <= 1) {
      return ''
    } else {
      const content = messages()[1].content
      if (typeof content === 'string') {
        return content
      } else {
        convertReadableStreamToAccessor(content, outputText, setOutputText)
        return inputText()
      }
    }
  }
  return (
    <div class="flex flex-col h-full">
      <div class="flex-[1] border-b border-base p-6 break-all overflow-y-scroll">
        <div class="max-w-base">
          {messageInput()}
        </div>
      </div>
      <div class="flex-[2] p-6 break-all overflow-y-scroll">
        <div class="max-w-base">
          {messageOutput()}
        </div>
      </div>
    </div>
  )
}
