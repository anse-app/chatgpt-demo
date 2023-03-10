FROM node:alpine
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY . /usr/src
RUN npm install
RUN npm run build
EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
CMD node dist/server/entry.mjs
