FROM node:lts-alpine

RUN apk update && apk upgrade && apk add --no-cache curl vim bash

WORKDIR /app

COPY . ./

RUN yarn

EXPOSE 3001

ENTRYPOINT [ "./entrypoint.sh" ]
