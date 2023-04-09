import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

interface Props {
  class?: string
  text: string
}

const parseMarkdown = (raw: string) => {
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
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
