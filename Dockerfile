# ---- Dependencies ----
FROM node:19.7.0 AS dependencies
WORKDIR /app
COPY package.json /app
RUN npm install

# ---- RUN ----
FROM dependencies AS RUN
WORKDIR /app
COPY . /app
COPY .env.example /app/.env
ENV PORT=3000
VOLUME ["./env"]
CMD [ "npm", "run", "dev", "--", "--port", "3000", "--host", "0.0.0.0"]