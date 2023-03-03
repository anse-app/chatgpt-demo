FROM node:lts-alpine

COPY . /app
WORKDIR /app

RUN npm install astro

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]