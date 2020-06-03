# API Gateway

## Features

-   Uses Express-Gateway docker image
-   Acts as proxy to connect client and services
-   Enables authorization at a early stage and avoids the need of handling it in each service, for this it uses the `express-gateway-plugin-jwks`

## Environment variables

These env variables are supported by the service.

| Variable                | Description                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `LOG_LEVEL`             | Sets the logs level in the gateway                                                   |
| `DEBUG`                 | Set value `express-gateway-plugin-jwks:jwks-policy` if you want to debug jwks plugin |
| `TRANSPORT_SERVICE_URL` | URL of Transport service                                                             |
| `ALERT_SERVICE_URL`     | URL of Alert service                                                                 |
| `AUTH0_DOMAIN`          | AUTH0 Domain to validate JWT token                                                   |
| `AUTH0_AUDIENCE`        | AUTH0 Audience to validate JWT token                                                 |

For development, you can create `.env` file with the following configuration

    LOG_LEVEL=debug
    DEBUG=express-gateway-plugin-jwks:jwks-policy

    TRANSPORT_SERVICE_URL=http://<YOUR_URL>:5000/
    ALERT_SERVICE_URL=http://<YOUR_URL>:5001/

    AUTH0_DOMAIN=<YOUR AUTH0 DOMAIN>
    AUTH0_AUDIENCE=<YOUR AUTH0 AUDIENCE>
