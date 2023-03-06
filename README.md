# ChatGPT-API Demo

A demo repo based on [OpenAI GPT-3.5 Turbo API](https://platform.openai.com/docs/guides/chat).

## Run Locally

1. Setup & Install dependencies

    > First, you need [Node.js](https://nodejs.org/) installed.

    ```shell
    npm i
    ```

2. Make a copy of `.env.example`, then rename it to `.env`
3. Add your [OpenAI API key](https://platform.openai.com/account/api-keys) to `.env`
    ```
    OPENAI_API_KEY=sk-xxx...
    ```
4. Run the app
    ```shell
    npm run dev
    ```
    
## Deploy With Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fddiu8081%2Fchatgpt-demo&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20Key&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys)

## Creative Forked Versions

- [ourongxing/chatgpt-vercel](https://github.com/ourongxing/chatgpt-vercel)

## License

MIT
