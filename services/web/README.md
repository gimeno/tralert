# Web Service

This is a web a web application created using `create-react-app`. As this is a monorepo, the following adjustments have been done to the default CRA app:

-   Create `jest.config.js` file to be able to run tests from root
-   `setupTests` is configured to allow using `Enzyme` on the tests
-   Extend the default `ESLint` configuration in the root with react specific lint configuration

## Features

-   Look for transports
-   Manage alerts
-   Manage account through Auth0

## Environment variables

`CRA` supports the env variables defined on this [page](https://create-react-app.dev/docs/advanced-configuration). You can define new variables as it's explained [here](https://create-react-app.dev/docs/adding-custom-environment-variables/).

This web app expects to have defined the following variables

| Variable                    | Description                                                                           | Default value |
| --------------------------- | ------------------------------------------------------------------------------------- | ------------- |
| `PORT`                      | Allows you to set a port where the app runs                                           | `3000`        |
| `EXTEND_ESLINT`             | This allows the web dev server to take into account the extended ESLint configuration |               |
| `REACT_APP_AUTH0_DOMAIN`    | AUTH0 Domain to connect to the Auth0 application                                      |               |
| `REACT_APP_AUTH0_CLIENT_ID` | AUTH0 Client id to connect to the Auth0 application                                   |               |

For development, you can create `.env` file with the following configuration

    PORT=4000
    EXTEND_ESLINT=true
    REACT_APP_AUTH0_DOMAIN=<YOUR AUTH0 DOMAIN>
    REACT_APP_AUTH0_CLIENT_ID=<YOUR AUTH0 CLIENT ID>

For production, you need to set:

    REACT_APP_AUTH0_DOMAIN
    REACT_APP_AUTH0_CLIENT_ID
