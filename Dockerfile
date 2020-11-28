FROM node:erbium-alpine3.9
RUN mkdir -p /breact
ADD . /breact
WORKDIR /breact
RUN npm install
RUN npm run build
