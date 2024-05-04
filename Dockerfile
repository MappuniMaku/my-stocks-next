# syntax=docker/dockerfile:1

FROM node:20.12.1-alpine3.18
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./
RUN yarn generate
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 3000
