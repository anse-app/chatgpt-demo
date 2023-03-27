import type { ConversationInstance } from '@/types/conversation'

const testMarkdown: ConversationInstance = {
  id: 'test_markdown',
  providerId: 'provider-openai',
  conversationType: 'continuous',
  name: 'Test Markdown',
  icon: '',
  messages: [
    { role: 'user', content: 'Headings' },
    { role: 'assistant', content: '# Heading level 1\n## Heading level 2\n### Heading level 3\n#### Heading level 4\n##### Heading level 5\n###### Heading level 6\ncontent' },
    { role: 'user', content: 'Paragraphs' },
    { role: 'assistant', content: 'I really like using Markdown.\n\nI think I\'ll use it to format all of my documents from now on.' },
    { role: 'user', content: 'Emphasis' },
    { role: 'assistant', content: 'This is *emphasized* text.\nThis is _emphasized_ text.\n\nThis is **strong** text.\nThis is __strong__ text.\n\nThis is ***emphasized and strong*** text.\nThis is ___emphasized and strong___ text.\n\nThis is ~~strikethrough~~ text.' },
    { role: 'assistant', content: 'This is **bold** and _italic_ text.\nThis is __bold__ and *italic* text.\n\nThis is ***bold and italic*** text.\nThis is ___bold and italic___ text.' },
    { role: 'user', content: 'Blockquotes' },
    { role: 'assistant', content: '> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.' },
    { role: 'assistant', content: '> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.' },
    { role: 'assistant', content: '> #### The quarterly results look great!\n>\n> - Revenue was off the chart.\n> - Profits were higher than ever.\n>\n>  *Everything* is going according to **plan**.' },
    { role: 'user', content: 'Lists' },
    { role: 'assistant', content: '1. First item\n2. Second item\n3. Third item\n    - Indented item\n    - Indented item\n4. Fourth item' },
    { role: 'user', content: 'Code' },
    { role: 'assistant', content: 'At the command prompt, type `nano`.' },
    { role: 'assistant', content: '```\nfunction test() {\n  console.log("notice the blank line before this function?");\n}\n```' },
    { role: 'user', content: 'Links' },
    { role: 'assistant', content: 'This is [an example](http://example.com/ "Title") inline link.\n\n[This link](http://example.net/) has no title attribute.' },
    { role: 'assistant', content: 'I love supporting the **[Site](http://example.com)**.\nThis is the *[Site](http://example.com)*.\nSee the section on [`code`](#code).' },
    { role: 'user', content: 'Tables' },
    { role: 'assistant', content: 'First Header | Second Header\n------------ | -------------\nContent from cell 1 | Content from cell 2\nContent in the first column | Content in the second column' },
    { role: 'assistant', content: '| Syntax      | Description |\n| ----------- | ----------- |\n| Header      | Title       |\n| Paragraph   | Text        |' },
    { role: 'assistant', content: '| Syntax      | Description | Test Text     |\n| :---        |    :----:   |          ---: |\n| Header      | Title       | Here\'s this   |\n| Paragraph   | Text        | And more      |' },
    { role: 'user', content: 'GFM Features' },
    { role: 'assistant', content: '## Autolink literals\n\nwww.example.com, https://example.com, and contact@example.com.\n\n## Footnote\n\nA note[^1]\n\n[^1]: Big note.\n\n## Strikethrough\n\n~one~ or ~~two~~ tildes.\n\n## Table\n\n| a | b  |  c |  d  |\n| - | :- | -: | :-: |\n\n## Tag filter\n\n<plaintext>\n\n## Tasklist\n\n* [ ] to do\n* [x] done' },
  ],
}

export const conversationMapData = {
  test_markdown: testMarkdown,
}
