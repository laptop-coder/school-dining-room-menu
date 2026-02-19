FROM node:25.6.1-alpine3.22 AS deps
WORKDIR /app
COPY package.json package-lock.json .
RUN npm i

FROM node:25.6.1-alpine3.22 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
COPY vite.config.ts tsconfig.json index.html .
COPY src src
RUN npx vite build

FROM nginx:1.29.5-alpine3.23-slim
WORKDIR app
COPY nginx.conf.template .
COPY assets /usr/share/nginx/html/storage/assets
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 29157
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "/app/entrypoint.sh" ]
