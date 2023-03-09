<h1 align="center">ChatGPT-API Demo</h1>

<p align="center">
<strong>A demo repo based on <a href="https://platform.openai.com/docs/guides/chat">OpenAI GPT-3.5 Turbo API.</a></strong><br/>
<span> ⚠️ Notice: Our API Key limit has been exhausted. So the demo site is not available now.</span>
</p>

<p align="center">
<a href="https://chatgpt.ddiu.me/">🦖 Preview</a>
</p>

![chat-logo](https://cdn.staticaly.com/gh/yzh990918/static@master/chat-logo.webp)
 


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

## Installation

Before running this application, you will need to obtain an API key from OpenAI. You can sign up for an API key at https://beta.openai.com/signup/
Once you have an API key, make a copy of `.env.example`, then rename it to `.env` in the root of this project and add the following line:

```bash
OPENAI_API_KEY=sk-xxx...
```
Next, install the dependencies using npm or pnpm:

```bash
npm install
# pnpm 
pnpm install
```

Usage
To start the application, run the following command:

bash
npm start
This will start the server and open the application in your default web browser at http://localhost:3000/.

## Deploy With Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fddiu8081%2Fchatgpt-demo&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20Key&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys)

## Environment Variables

You can control the website through environment variables.

| Name | Description | Default |
| --- | --- | --- |
| `OPENAI_API_KEY` | Your API Key for OpenAI. | `null` |
| `HTTPS_PROXY` | Provide proxy for OpenAI API. e.g. `http://127.0.0.1:7890` | `null` |
| `OPENAI_API_BASE_URL` | Custom base url for OpenAI API. | `https://api.openai.com` |
| `HEAD_SCRIPTS` | Inject analytics or other scripts before `</head>` of the page | `null` |
| `SECRET_KEY` | Secret string for the project. Use for generating signatures for API calls | `null` |
| `SITE_PASSWORD` | Set password for site. If not set, site will be public | `null` |

## Creative Variant Versions

- [ourongxing/chatgpt-vercel](https://github.com/ourongxing/chatgpt-vercel)

## License

MIT
