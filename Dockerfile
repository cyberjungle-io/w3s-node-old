FROM node:latest
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn && mv node_modules ../
COPY . .
RUN yarn


CMD ["node", "app"]
