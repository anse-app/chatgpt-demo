import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import 'katex/dist/katex.min.css'
import './prose.css'

interface Props {
  class?: string
  text: string
}

const parseMarkdown = (raw: string) => {
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .processSync(raw)
  // const str = processor.runSync(processor.parse(raw))
  // console.log(String(file))
  return String(file)
}

export default (props: Props) => {
  const htmlString = () => parseMarkdown(props.text)

  return (
    <div
      class={props.class ?? ''}
      innerHTML={htmlString()}
    />
  )
}
