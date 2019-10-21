FROM node:10
WORKDIR /app
COPY . ./
RUN yarn
EXPOSE 3001
# RUN apt-get update
# RUN apt-get -y install vim
ENTRYPOINT [ "node", "server.js" ]




