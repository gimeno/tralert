# Tralert

[![Build Status](https://travis-ci.org/gimeno/tralert.svg)](https://travis-ci.org/gimeno/tralert)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/gimeno/tralert)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/gimeno/tralert)
![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/gimeno/tralert)

Tralert is a web application that allows you to set alarms to let you know when a train will be available certain day for the limit price you set.

This is primarily a learning project to brush up technologies that I use day to day as well as get to know new ones.

-   [Build with](#build-with)
-   [Getting started](#getting-started)
    -   [Local setup](#local-setup)
    -   [Installation](#installation)
    -   [Configure Auth0](#configure-auth0)
    -   [Development mode](#development-mode)
        -   [Docker dev environment](#docker-dev-environment)
            -   [Debug containers](#debug-containers)
    -   [Production mode](#production-mode)
-   [Testing](#testing)
    -   [Unit/integration testing](#unit-integration-testing)
    -   [Interact with the APIs](#interact-with-the-apis)
-   [License](#license)

## Build with

These are some of the tools to build the app

-   Lerna
-   Eslint/Prettier/EditorConfig
-   Husky/Lint-staged
-   Jest/Supertest/Enzyme
-   React/React-router
-   Material-UI
-   formik
-   i18next
-   Auth0
-   Express-Gateway
-   Express
-   MongoDB/Mongoose
-   Winston/Morgan/Sematext
-   @hapi/joi
-   Puppeteer/Cherio
-   Cron/Nodemailer
-   Travis CI
-   Codacy/Codeclimate
-   Depfu
-   Docker
-   Postman
-   Heroku

## Getting started

### Local setup

Configure VSCode

    {
        "files.eol": "\n",
        "editor.formatOnSave": true,
        "editor.foldingStrategy": "indentation",
        "eslint.alwaysShowStatus": true,
        "eslint.lintTask.enable": true,
        "eslint.run": "onSave",
        "eslint.workingDirectories": [
            {
                "directory": "packages",
                "changeProcessCWD": true
            },
            {
                "directory": "services",
                "changeProcessCWD": true
            }
        ]
    }

### Installation

Install dependencies

    npm install
    npm run bootstrap

### Configure Auth0

This system relies on Auth0 to handle Authentication, Authorization and manage the application users due to this you need to configure Auth0 first for development or production. To do that follow the steps on [Auth page](Auth.md).

### Development mode

Create an .env file in each service folder and set the needed env variables (Check README files inside each service to know the needed variables).

To be able to run the dev commands without problems, you'll need to have the following running in your local machine:

-   A MongoDB instance that runs in the default MongoDB port (27017)
-   Create a docker image based on Express-Gateway with the Dockerfile in `/services/gateway` and run it. To do that run the following commands from root folder in a bash terminal
    -   `cd services/gateway/`
    -   `./docker-build.sh`
    -   `./docker-run.sh`

Then you can run these commands

-   `npm run dev` - Runs all services executing each `dev` command inside of each service with `lerna run`. For the web service, you have to run `npm run web -- start` the reason for not running within lerna run is this [issue](https://github.com/facebook/create-react-app/issues/8685) in CRA
-   `npm run <service> -- run dev` - Runs a single service

#### Docker dev environment

A much quicker approach is to use Docker-compose to run your local dev env, this approach will take care of running any needed service. Simply run `docker-compose up`, `docker-compose.yml` is ready for development.

##### Debug containers

The service containers run the command `docker:dev` which runs the node process in inspect mode to allow debugging, but to be able to debug you'll need to add the below configuration in `./vscode/launch.json`

    {
        "name": "Docker: Transport service",
        "type": "node",
        "request": "attach",
        "port": 9229,
        "address": "localhost",
        "localRoot": "${workspaceFolder}",
        "remoteRoot": "/app",
        "protocol": "inspector",
        "restart": true
    },
    {
        "name": "Docker: Alert service",
        "type": "node",
        "request": "attach",
        "port": 9230,
        "address": "localhost",
        "localRoot": "${workspaceFolder}",
        "remoteRoot": "/app",
        "protocol": "inspector",
        "restart": true
    },
    {
        "name": "Docker: Auth service",
        "type": "node",
        "request": "attach",
        "port": 9231,
        "address": "localhost",
        "localRoot": "${workspaceFolder}",
        "remoteRoot": "/app",
        "protocol": "inspector",
        "restart": true
    }

With that once the containers are running, you can start debugging one of the services clicking on the play button on the run page in VSCode.

### Production mode

The `start` commands in each service are ready to start services as if their environment was production, if you want to run the whole system at the same time like in a production environment you can use **docker-compose**.

Firstly, setup these variables in an .env file

    # Common variables
    AUTH0_DOMAIN
    AUTH0_AUDIENCE

    # Transport service variables
    TRANSPORT_LOGS_TOKEN

    # Alert service variables
    ALERT_LOGS_TOKEN
    ALERT_AUTH0_CLIENT_ID
    ALERT_AUTH0_CLIENT_SECRET
    SMTP_HOST
    SMTP_PORT
    SMTP_USERNAME
    SMTP_PASSWORD
    EMAIL_FROM

    # Auth service variables
    AUTH_LOGS_TOKEN
    AUTH_AUTH0_CLIENT_ID
    AUTH_AUTH0_CLIENT_SECRET

    # Web service variables
    REACT_APP_AUTH0_CLIENT_ID

After that run `docker-compose -f docker-compose-prod.yml up`, `docker-compose-prod.yml` is configured to take the previous env variables and inject them into the appropriate container.

## Testing

### Unit/integration testing

After installing dependencies, to run tests, execute any of these commands:

-   `npm test`
-   `npm run test:watch`
-   `npm run coverage`

### Interact with the APIs

To send requests to the services with no UI, you can use Postman and import the collections that are in [tests-apis](./assets/tests-apis) folder.

Keep in mind that if you use the API Gateway collection you'll need to generate a valid JWT token from Auth0.

## License

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
