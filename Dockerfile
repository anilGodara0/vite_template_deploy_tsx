# --- Build Stage ---
FROM node:18-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install

COPY . .


RUN pnpm run build


FROM nginx:stable-alpine


COPY --from=builder /app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 8001

CMD ["nginx", "-g", "daemon off;"]
