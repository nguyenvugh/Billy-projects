FROM node:16-alpine AS development

# NODE_ENV can control yarn install only devDependencies but we use --production=false for clear.
ENV NODE_ENV development

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn build

EXPOSE 5000

# CMD [ "yarn", "start:debug" ]


FROM node:16-alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Need root permission to install pm2 global
# RUN npm install -g pm2

# RUN chown -R node:node /app

# USER node

# COPY --chown=node:node . .

COPY package*.json yarn.lock ./

RUN yarn install --production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/src/main"]
# CMD ["pm2-runtime", "ecosystem.config.js"]


# New test
# WORKDIR /app

# COPY . .

# RUN npm install && npm install -g pm2

# CMD ["pm2-runtime", "ecosystem.config.js"]
