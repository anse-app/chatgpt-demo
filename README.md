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
    
## Deploy With Netlify

Confirm branch switching before deployment `feat/netlify`, then configure the environment variables.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ddiu8081/chatgpt-demo&ref=feat/netlify&env[OPEN_API_KEY]=xxx)

## Creative Forked Versions

- [ourongxing/chatgpt-vercel](https://github.com/ourongxing/chatgpt-vercel)

## License

MIT
