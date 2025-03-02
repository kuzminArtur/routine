FROM node:22.14-alpine3.20

RUN apk update

RUN apk add --no-cache openssl3

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN chown node:node -R /usr/src/app

USER node

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

ENTRYPOINT [ "docker-entrypoint" ]
