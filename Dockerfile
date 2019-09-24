FROM node:10 as react-build
WORKDIR /app
COPY . ./
RUN yarn
EXPOSE 3000
EXPOSE 3001
CMD yarn dev




