FROM golang:1.18-alpine AS builder

WORKDIR /usr/src/app

COPY server .

RUN go build server/main.go




FROM node:16.15-alpine

WORKDIR /usr/src/app

EXPOSE 8080

COPY client/package*.json .

RUN npm install

COPY client client

COPY --from=builder /usr/src/app server

RUN npm run build

#ENTRYPOINT ./main
