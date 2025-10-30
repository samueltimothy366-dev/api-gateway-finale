FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY ./src ./src
COPY .env .
EXPOSE 8000

CMD ["npx", "nodemon", "--legacy-watch", "src/api.js"]
