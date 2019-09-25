FROM node:10 as react-build
WORKDIR /app
COPY . ./
RUN yarn
EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]




