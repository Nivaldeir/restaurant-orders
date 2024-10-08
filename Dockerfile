# Etapa de Build
FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Executa a migração
CMD ["npm", "run", "start"]
