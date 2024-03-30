# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY ./ ./
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 3000
