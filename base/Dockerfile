FROM node:lts-gallium
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ARG SERVER_VERSION
ENV SERVER_VERSION=${SERVER_VERSION}

CMD [ "npm", "run", "start" ]
