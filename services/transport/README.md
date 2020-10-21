# Transport service

## Features

-   Look trains in Renfe website by scrapping it

## Environment variables

These env variables are supported by the service.

| Variable        | Description                                                                                                                             | Default value |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `NODE_ENV`      | Environment where the service is running                                                                                                | `production`  |
| `PORT`          | Port where the service runs                                                                                                             | `5000`        |
| `LOGS_TOKEN`    | Token to connect to Sematext to be able to send logs                                                                                    |               |
| `CHROMIUM_PATH` | Chromium browser path, this is only used if the service runs in a docker container and it's automatically set when the image is created |               |

For development, you can create `.env` file with the following configuration

    NODE_ENV=development

For production, you need to set:

    LOGS_TOKEN
