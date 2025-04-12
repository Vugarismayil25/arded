# Build aşaması
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Production aşaması
FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
