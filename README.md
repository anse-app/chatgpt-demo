# ChatGPT-API Demo v2

[![](https://cloud-upyun.ddiu.site/picture/2023/04/15/xAe0dY.png)](https://v2.chatgpt.ddiu.me)

**🍿 Live preview**: https://v2.chatgpt.ddiu.me

> We are working on V2 Version! Preview & more info on https://github.com/ddiu8081/chatgpt-demo/discussions/247.

## Features

- **🚀 Powerful Plugin System** - Powered by `Provider plugin` , easy to extend AI platforms such as [OpenAI](https://ai.com/), [Bing ChatGPT](https://dub.sh/NUB7OHp), and also supports custom model parameters.
- **💬 Session Record Saving** - We use `IndexDB` to store local data, it will not be uploaded to the server, security issues are guaranteed.
- **🎉 Multiple Session Modes** - Provides different conversations modes，support `Single Conversation`, `Continuous Conversation`, `OpenAI Image Generation`、`Stable Diffusion` and more.
- **💎 Improved UI Experience** - We have refactored the website UI for the previous version, optimized a lot of details, and also adapted to `mobile end` and `dark mode`.
- **🌈 One-Click Deployment** Support one-click deployment, abandoned use environment variables, you can refer to our documentation to deploy the website to [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), `Docker`, `Node` and other platforms.
## Running Locally

### Pre environment
1. **Node**: Check that both your development environment and deployment environment are using `Node v18` or later. You can use [nvm](https://github.com/nvm-sh/nvm) to manage multiple `node` versions locally。
   ```bash
    node -v
   ```
2. **PNPM**: We recommend using [pnpm](https://pnpm.io/) to manage dependencies. If you have never installed pnpm, you can install it with the following command:
   ```bash
    npm i -g pnpm
   ```
3. **OPENAI_API_KEY**: Before running this application, you need to obtain the API key from OpenAI. You can register the API key at [https://beta.openai.com/signup](https://beta.openai.com/signup).

### Getting Started

1. Install dependencies
   ```bash
    pnpm install
   ```
2. Run the application, the local project runs on `http://localhost:3000/`
   ```bash
    pnpm run dev
   ```
3. add your [OpenAI API key](https://platform.openai.com/account/api-keys) to the settings panel, then enjoy it!

## Deploy

### Deploy With Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ddiu8081/chatgpt-demo/tree/feat/v2)


![image](https://cdn.staticaly.com/gh/yzh990918/static@master/20230425/image.6tk44v12tocg.webp)

### Deploy With Netlify

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?branch=feat/v2&repository=https://github.com/ddiu8081/chatgpt-demo)

**Step-by-step deployment tutorial:**

1. [Fork](https://github.com/ddiu8081/chatgpt-demo/fork) this project，Go to [https://app.netlify.com/start](https://app.netlify.com/start) new Site, select the project you `forked` done, and connect it with your `GitHub` account.

![image](https://cdn.staticaly.com/gh/yzh990918/static@master/20230425/image.7307jjzdj1q8.webp)

![image](https://cdn.staticaly.com/gh/yzh990918/static@master/20230425/image.3klsl2viyqkg.webp)


2. Select the `feat/v2` branch, select the default build command and output directory, Click the `Deploy Site` button to start deploying the site。

![image](https://cdn.staticaly.com/gh/yzh990918/static@master/20230425/image.6lqb6wjkqjcw.webp)


### Deploy with Docker

Environment variables refer to the documentation below. [Docker Hub address](https://hub.docker.com/r/ddiu8081/chatgpt-demo).

**Direct run**
```bash
docker run -p 3000:3000 -d ddiu8081/chatgpt-demo-v2:latest
```

**Docker compose**
```yml
version: '3'
services:
  chatgpt-demo:
    image: ddiu8081/chatgpt-demo-v2:latest
    container_name: chatgpt-demo-v2
    restart: always
    ports:
      - '3000:3000'
```

```bash
# start
docker compose up -d
# down
docker-compose down
```

### Deploy on more servers

Please refer to the official deployment documentation：https://docs.astro.build/en/guides/deploy

## Frequently Asked Questions

Q: TypeError: fetch failed (can't connect to OpenAI Api)

A: Reference: https://github.com/ddiu8081/chatgpt-demo/issues/34

Q: throw new TypeError(`${context}` is not a ReadableStream.)

A: The Node version needs to be `v18` or later，reference: https://github.com/ddiu8081/chatgpt-demo/issues/65

Q: Accelerate domestic access without the need for proxy deployment tutorial?

A: You can refer to this tutorial: https://github.com/ddiu8081/chatgpt-demo/discussions/270

Q: `PWA` is not working?

A: Current `PWA` does not support deployment on Netlify, you can choose vercel or node deployment.
## Contributing

This project exists thanks to all those who contributed.

Thank you to all our supporters!🙏

[![img](https://contributors.nn.ci/api?repo=ddiu8081/chatgpt-demo)](https://github.com/ddiu8081/chatgpt-demo/graphs/contributors)

## License

MIT © [ddiu8081](https://github.com/ddiu8081/chatgpt-demo/blob/main/LICENSE)
