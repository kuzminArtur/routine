FROM node:23-alpine3.20

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

WORKDIR /usr/src/app
RUN chown node:node -R /usr/src/app

USER node

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

ENTRYPOINT [ "docker-entrypoint" ]
