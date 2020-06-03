# Tralert

[![Build Status](https://travis-ci.org/gimeno/tralert.svg)](https://travis-ci.org/gimeno/tralert)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/gimeno/tralert)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/gimeno/tralert)
![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/gimeno/tralert)

Tralert is a web application that allows you to set alarms to let you know when a train will be available certain day for the limit price you set.

-   [Build with](#build-with)
-   [Getting started](#getting-started)
    -   [Local setup](#local-setup)
    -   [Installation](#installation)
    -   [Development mode](#development-mode)
        -   [Docker dev environment](#docker-dev-environment)
    -   [Production mode](#production-mode)
-   [Interact with the APIs](#interact-with-the-apis)
-   [License](#license)

## Build with

These are some of the tools to build the app

-   Lerna
-   Eslint/Prettier/EditorConfig
-   Husky/Lint-staged
-   Jest/Supertest
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
-   Auth0
-   Postman
-   Express-Gateway
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

### Development mode

Create an .env file in each service folder and set the needed env variables (Check README files inside each service to know the needed variables).

To be able to run the dev commands without problems, you'll need to have the following running in your local machine:

-   A MongoDB instance
-   Create a docker image based on Express-Gateway with the Dockerfile in `/services/gateway`. To do that execute the below commands in a bash terminal.

```bash
cd services/gateway/
./docker-build.sh
./docker-run.sh
```

Then you can run these commands

-   `npm run dev` - Runs all services executing each `dev` command inside of each service with `lerna run`
-   `npm run <service> -- run dev` - Runs a single service

#### Docker dev environment

A much quicker approach is to use Docker-compose to run your local dev env, this approach will take care of running any needed service. Simply run `docker-compose up`, `docker-compose.yml` is ready for development.

### Production mode

The `start` commands in each service are ready to start services as if their environment was production, if you want to run the whole system at the same time like in a production environment you can use **docker-compose**.

Firstly, setup these variables in an .env file

    TRANSPORT_LOGS_TOKEN
    ALERT_LOGS_TOKEN
    SMTP_HOST
    SMTP_PORT
    SMTP_USERNAME
    SMTP_PASSWORD
    EMAIL_FROM
    AUTH0_DOMAIN
    AUTH0_AUDIENCE
    AUTH0_CLIENT_ID
    AUTH0_CLIENT_SECRET

After that run `docker-compose -f docker-compose-prod.yml up`, `docker-compose-prod.yml` is configured to take the previous env variables and inject them into the appropriate container.

## Interact with the APIs

To send requests to the services with no UI, you can use Postman and import the collections that are in [tests-apis](./tests-apis) folder.

Keep in mind that if you use the API Gateway collection you'll need to generate a valid JWT token from Auth0.

## License

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
