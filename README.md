# Tralert

[![Build Status](https://travis-ci.org/gimeno/tralert.svg)](https://travis-ci.org/gimeno/tralert)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/gimeno/tralert)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/gimeno/tralert)
![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/gimeno/tralert)

Tralert is a web application that allows you to set alarms to let you know when a train will be available certain day for the limit price you set.

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

Then you can run these commands

-   `npm run dev` - Runs all services executing each `dev` command inside of each service with `lerna run`
-   `npm run <service> -- run dev` - Runs a single service

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
    AUTH0_CLIENT_ID
    AUTH0_CLIENT_SECRET

After that run `docker-compose up`, `docker-compose.yml` is configured to take the previous env variables and inject them into the appropriate container.

## License

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
