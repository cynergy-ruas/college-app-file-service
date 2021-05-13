FROM node:14 as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:14-alpine3.13
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY --from=builder app/build ./build
CMD npm start
EXPOSE 8082