FROM node:10

USER root

WORKDIR /home/node/app
COPY --chown=root:root ./.docker-config/node/ /home/node/app

RUN npm_config_user=root npm install -g nodemon concurrently typescript react-scripts node-sass
RUN npm install

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true