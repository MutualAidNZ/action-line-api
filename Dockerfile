### BUILD -------------------------------------
FROM node:12-alpine AS build
RUN apk add --update --no-cache \
    python \
    make \
    g++
    
COPY . /src
WORKDIR /src

RUN npm ci
RUN npm run build
RUN npm prune --production

### RUNTIME ------------------------------------
FROM node:12-alpine
USER node

WORKDIR /opt/app
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/dist .

EXPOSE 8000
CMD ["node", "app.js"]