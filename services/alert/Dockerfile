FROM node:12.16.2-alpine

WORKDIR /app

# Copy needed files
COPY package.json .
COPY lerna.json .
COPY packages ./packages
COPY services/alert ./services/alert

# Bootstrap dependencies
RUN npm install -g lerna
RUN npx lerna bootstrap --hoist --ignore-scripts -- --production --no-optional

CMD [ "npm", "--prefix", "services/alert", "start" ]

