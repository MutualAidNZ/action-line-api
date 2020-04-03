FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build app
RUN ["npm", "run-script", "build"]

EXPOSE 8080

CMD [ "node", "dist/app.js" ]