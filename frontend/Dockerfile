# syntax=docker/dockerfile:1
# escape=`

ARG build_profile="production"


# Stage 1: Build
FROM node:22 AS build
ARG build_profile
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN ng build --configuration ${build_profile:-production}


# Stage 2: Production
FROM nginx:alpine
COPY --from=build app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
