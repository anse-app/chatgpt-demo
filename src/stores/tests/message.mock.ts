
import type { MessageInstance } from '@/types/message'

const testMarkdown: MessageInstance[] = [
  { role: 'user', id: '0', content: 'Headings' },
  { role: 'assistant', id: '0', content: '# Heading level 1\n## Heading level 2\n### Heading level 3\n#### Heading level 4\n##### Heading level 5\n###### Heading level 6\ncontent' },
  { role: 'user', id: '0', content: 'Paragraphs' },
  { role: 'assistant', id: '0', content: 'I really like using Markdown.\n\nI think I\'ll use it to format all of my documents from now on.' },
  { role: 'user', id: '0', content: 'Emphasis' },
  { role: 'assistant', id: '0', content: 'This is *emphasized* text.\nThis is _emphasized_ text.\n\nThis is **strong** text.\nThis is __strong__ text.\n\nThis is ***emphasized and strong*** text.\nThis is ___emphasized and strong___ text.\n\nThis is ~~strikethrough~~ text.' },
  { role: 'assistant', id: '0', content: 'This is **bold** and _italic_ text.\nThis is __bold__ and *italic* text.\n\nThis is ***bold and italic*** text.\nThis is ___bold and italic___ text.' },
  { role: 'user', id: '0', content: 'Blockquotes' },
  { role: 'assistant', id: '0', content: '> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.' },
  { role: 'assistant', id: '0', content: '> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.' },
  { role: 'assistant', id: '0', content: '> #### The quarterly results look great!\n>\n> - Revenue was off the chart.\n> - Profits were higher than ever.\n>\n>  *Everything* is going according to **plan**.' },
  { role: 'user', id: '0', content: 'Lists' },
  { role: 'assistant', id: '0', content: '1. First item\n2. Second item\n3. Third item\n    - Indented item\n    - Indented item\n4. Fourth item' },
  { role: 'user', id: '0', content: 'Code' },
  { role: 'assistant', id: '0', content: 'At the command prompt, type `nano`.' },
  { role: 'assistant', id: '0', content: '```\nfunction test() {\n  console.log("notice the blank line before this function?");\n}\n```' },
  { role: 'user', id: '0', content: 'Links' },
  { role: 'assistant', id: '0', content: 'This is [an example](http://example.com/ "Title") inline link.\n\n[This link](http://example.net/) has no title attribute.' },
  { role: 'assistant', id: '0', content: 'I love supporting the **[Site](http://example.com)**.\nThis is the *[Site](http://example.com)*.\nSee the section on [`code`](#code).' },
  { role: 'user', id: '0', content: 'Tables' },
  { role: 'assistant', id: '0', content: 'First Header | Second Header\n------------ | -------------\nContent from cell 1 | Content from cell 2\nContent in the first column | Content in the second column' },
  { role: 'assistant', id: '0', content: '| Syntax      | Description |\n| ----------- | ----------- |\n| Header      | Title       |\n| Paragraph   | Text        |' },
  { role: 'assistant', id: '0', content: '| Syntax      | Description | Test Text     |\n| :---        |    :----:   |          ---: |\n| Header      | Title       | Here\'s this   |\n| Paragraph   | Text        | And more      |' },
  { role: 'user', id: '0', content: 'GFM Features' },
  { role: 'assistant', id: '0', content: '## Autolink literals\n\nwww.example.com, https://example.com, and contact@example.com.\n\n## Footnote\n\nA note[^1]\n\n[^1]: Big note.\n\n## Strikethrough\n\n~one~ or ~~two~~ tildes.\n\n## Table\n\n| a | b  |  c |  d  |\n| - | :- | -: | :-: |\n\n## Tag filter\n\n<plaintext>\n\n## Tasklist\n\n* [ ] to do\n* [x] done' },
]

export const conversationMessagesMapData = {
  test_markdown: testMarkdown,
}
