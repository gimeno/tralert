FROM node:12.16.2-alpine

WORKDIR /app

# Copy code
COPY services/web .

# install and cache app dependencies
RUN npm install --production
RUN npm install -g serve

# build react app
RUN npm run build

# start app
RUN chmod +x ./entrypoint.sh
CMD [ "sh", "./entrypoint.sh" ]
