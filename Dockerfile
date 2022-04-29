FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm i --silent

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]