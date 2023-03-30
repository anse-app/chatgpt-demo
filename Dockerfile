FROM node:alpine
WORKDIR /usr/src
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
ARG OPENAI_API_KEY
RUN if [ -n "$OPENAI_API_KEY" ]; then \
        echo -e "\nOPENAI_API_KEY=\"$OPENAI_API_KEY\"\n" >> /usr/src/.env; \
    fi
ARG HTTPS_PROXY
RUN if [ -n "$HTTPS_PROXY" ]; then \
        echo -e "\nHTTPS_PROXY=\"$HTTPS_PROXY\"\n" >> /usr/src/.env; \
    fi
ARG OPENAI_API_BASE_URL
RUN if [ -n "$OPENAI_API_BASE_URL" ]; then \
        echo -e "\nOPENAI_API_BASE_URL=\"$OPENAI_API_BASE_URL\"\n" >> /usr/src/.env; \
    fi
ARG HEAD_SCRIPTS
RUN if [ -n "$HEAD_SCRIPTS" ]; then \
        echo -e "\nHEAD_SCRIPTS=\"$HEAD_SCRIPTS\"\n" >> /usr/src/.env; \
    fi
ARG SECRET_KEY
RUN if [ -n "$SECRET_KEY" ]; then \
        echo -e "\nSECRET_KEY=\"$SECRET_KEY\"\n" >> /usr/src/.env; \
    fi
ARG SITE_PASSWORD
RUN if [ -n "$SITE_PASSWORD" ]; then \
        echo -e "\nSITE_PASSWORD=\"$SITE_PASSWORD\"\n" >> /usr/src/.env; \
    fi
ARG OPENAI_API_MODEL
RUN if [ -n "$OPENAI_API_MODEL" ]; then \
        echo -e "\nOPENAI_API_MODEL=\"$OPENAI_API_MODEL\"\n" >> /usr/src/.env; \
    fi
RUN pnpm run build
ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production
EXPOSE $PORT
CMD ["node", "dist/server/entry.mjs"]
