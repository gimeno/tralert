# Auth service

## Features

-   Allows to update user's email

## Environment variables

These env variables are supported by the service.

| Variable              | Description                                          | Default value |
| --------------------- | ---------------------------------------------------- | ------------- |
| `NODE_ENV`            |                                                      | `production`  |
| `PORT`                |                                                      | `5002`        |
| `LOGS_TOKEN`          | Token to connect to Sematext to be able to send logs |               |
| `AUTH0_DOMAIN`        | Auth0 domain to get user information                 |               |
| `AUTH0_CLIENT_ID`     | Auth0 client id to get user information              |               |
| `AUTH0_CLIENT_SECRET` | Auth0 client secret to get user information          |               |

For development, you can create `.env` file with the following configuration

    NODE_ENV=development
    AUTH0_DOMAIN=<YOUR AUTH0 DOMAIN>
    AUTH0_CLIENT_ID=<YOUR AUTH0 CLIENT ID>
    AUTH0_CLIENT_SECRET=<YOUR AUTH0 CLIENT SECRET>

For production, you need to set:

    LOGS_TOKEN
    AUTH0_DOMAIN
    AUTH0_CLIENT_ID
    AUTH0_CLIENT_SECRET
