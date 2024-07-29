FROM node:14

WORKDIR /

COPY package*.json ./app

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
