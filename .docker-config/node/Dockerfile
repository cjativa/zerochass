# First stage, compile our code
FROM node:12 AS development

WORKDIR /home/node/app
COPY  ./ /home/node/app

RUN npm install -g next react react-dom sass pm2@latest 
RUN npm install  

# Second stage, produces image for production
FROM node:12 AS production
WORKDIR /home/node/app
COPY --from=development ./home/node/app/.next .next
COPY package* ./
RUN npm install -g next react react-dom sass pm2@latest 
RUN npm install --production
