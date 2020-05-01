FROM node:12.16.2-alpine

# Installs latest Chromium package
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

WORKDIR /app

# Install Lerna
COPY package.json .
RUN npm install -g lerna

# Copy packages and service code
COPY packages ./packages
COPY services/transport ./services/transport

# Bootstrap dependencies
COPY lerna.json .
RUN npx lerna bootstrap --hoist --ignore-scripts -- --production --no-optional

CMD [ "npm", "--prefix", "services/transport", "start" ]