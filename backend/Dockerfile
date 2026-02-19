FROM golang:1.26.0-bookworm AS deps
WORKDIR /app
COPY go.mod go.sum .
RUN go mod download

FROM golang:1.26.0-bookworm AS builder
WORKDIR /app
COPY --from=deps /go /go
COPY . .
RUN GOOS=linux go build -o main .

FROM debian:12.13-slim
COPY --from=builder /app/main /app/main
EXPOSE 14536
CMD [ "/app/main" ]
