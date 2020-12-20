FROM node:erbium-alpine3.9 AS build
RUN mkdir -p /breact
ADD . /breact
WORKDIR /breact
RUN npm install
RUN npm run build

FROM httpd:2.4.46-alpine
COPY --from=build /breact/build/ /usr/local/apache2/htdocs/

