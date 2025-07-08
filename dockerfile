# Etapa 1: Build
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Runtime
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY package-lock.json ./
RUN npm install --only=production

EXPOSE 8080
CMD ["node", "dist/index.js"]
