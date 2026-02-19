FROM node:25.6.1-alpine3.22 AS deps
WORKDIR /app
COPY package.json package-lock.json .
RUN npm i

FROM node:25.6.1-alpine3.22 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
COPY .vitepress .vitepress
COPY src src
RUN npx vitepress build

FROM nginx:1.29.5-alpine3.23-slim
WORKDIR app
COPY nginx.conf.template .
COPY --from=builder /app/.vitepress/dist /usr/share/nginx/html
EXPOSE 38458
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "/app/entrypoint.sh" ]
