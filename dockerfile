FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

CMD npm run dev

EXPOSE 8080
