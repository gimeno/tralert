# Transport service

## Features

-   Look trains in Renfe website

## Environment variables

These env variables are supported by the service.

| Variable        | Description                                                                      | Default value |
| --------------- | -------------------------------------------------------------------------------- | ------------- |
| `NODE_ENV`      | Environment where the service is running                                         | `production`  |
| `PORT`          | Port where the service runs                                                      | `5000`        |
| `LOGS_TOKEN`    | Token to connect to Sematext to be able to send logs, it's mainly for production |               |
| `CHROMIUM_PATH` | Chromium browser path, this is used by the docker container                      |               |

For development, you can create `.env` file with the following configuration

    NODE_ENV=development
