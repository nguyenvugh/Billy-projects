FROM node:16-alpine AS development

# NODE_ENV can control yarn install only devDependencies but we use --production=false for clear.
ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --production=false

COPY . .

RUN yarn build

EXPOSE 5000

# CMD [ "yarn", "start:debug" ]


FROM node:16-alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Need root permission to install pm2 global
# RUN npm install -g pm2

# RUN chown -R node:node /app

# USER node

# COPY --chown=node:node . .

COPY package.json ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]

# dist/main if we not config typeorm yet, or not it will be dist/src/main
# CMD ["pm2-runtime", "ecosystem.config.js"]

# New test
# WORKDIR /app

# COPY . .

# RUN npm install && npm install -g pm2

# CMD ["pm2-runtime", "ecosystem.config.js"]
