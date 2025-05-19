FROM node:alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i --only=development
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm i --only=production
COPY . .
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
