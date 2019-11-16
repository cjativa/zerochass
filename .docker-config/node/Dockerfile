# First stage, compile our code
FROM node:10 AS development

USER root

WORKDIR /home/node/app
COPY --chown=root:root ./ /home/node/app

RUN npm_config_user=root npm install -g nodemon concurrently typescript react-scripts node-sass 
RUN npm install  
RUN npm run build

# Second stage, produces image for production
FROM node:10 AS production
WORKDIR /home/node/app
COPY --from=development ./home/node/app/dist ./dist
COPY package* ./
RUN npm install --production
