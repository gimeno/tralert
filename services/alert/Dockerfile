FROM node:12.16.2-alpine

WORKDIR /app

# Install Lerna
COPY package.json .
RUN npm install -g lerna

# Copy packages and service code
COPY packages ./packages
COPY services/alert ./services/alert

# Bootstrap dependencies
COPY lerna.json .
RUN npx lerna bootstrap --hoist --ignore-scripts -- --production --no-optional

CMD [ "npm", "--prefix", "services/alert", "start" ]

