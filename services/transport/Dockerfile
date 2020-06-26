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

# Copy needed files
COPY package.json .
COPY lerna.json .
COPY packages ./packages
COPY services/transport ./services/transport

# Bootstrap dependencies
RUN npm install -g lerna
RUN npx lerna bootstrap --hoist --ignore-scripts -- --production --no-optional

CMD [ "npm", "--prefix", "services/transport", "start" ]
