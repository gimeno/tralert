FROM node:12.16.2-alpine

WORKDIR /app

# Copy needed files
COPY package.json .
COPY lerna.json .
COPY .eslintrc.js .
COPY .prettierrc.js .
COPY services/web ./services/web

# Bootstrap dependencies
RUN npm install -g lerna
RUN npx lerna bootstrap --hoist 

# Install serve
RUN npm install -g serve --silent

RUN chmod +x ./services/web/entrypoint.sh
CMD [ "sh", "./services/web/entrypoint.sh" ]
