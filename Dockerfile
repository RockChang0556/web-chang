# build stage
FROM node:14.17.4-alpine as build-stage

LABEL maintainer=peng0556@qq.com

EXPOSE 80

# 创建一个工作目录
WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

# production stage
FROM nginx:1.20.2-alpine as production-stage

COPY --from=build-stage /app/dist /home/nginx/chang

CMD ["nginx", "-g", "daemon off;"]