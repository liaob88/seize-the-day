FROM node:10.19.0-alpine3.9
WORKDIR /usr/src/angular-app
COPY package.json .
RUN npm install -g @angular/cli@8.3.21
RUN yarn
EXPOSE 4200
