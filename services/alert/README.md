# Alert service

## Features

-   Create new alerts
-   Fetch existing alerts
-   Edit alerts
-   Delete alerts
-   Run cron job to execute alerts and send alerts if a new transport is found

## Environment variables

These env variables are supported by the service.

| Variable                | Description                                          | Default value                      |
| ----------------------- | ---------------------------------------------------- | ---------------------------------- |
| `NODE_ENV`              | Environment where the service is running             | `production`                       |
| `PORT`                  | Port where the service runs                          | `5001`                             |
| `TRANSPORT_SERVICE_URL` | URL to send requests to get transport data           |                                    |
| `MONGODB_URI`           | Mongo db where alerts are stored                     | `mongodb://127.0.0.1:27017/alerts` |
| `CRON_PATTERN`          | Indicates how often the cron job is executed         | `0 */30 * * * *`                   |
| `LOGS_TOKEN`            | Token to connect to Sematext to be able to send logs |                                    |
| `AUTH0_DOMAIN`          | Auth0 domain to get user information                 |                                    |
| `AUTH0_CLIENT_ID`       | Auth0 client id to get user information              |                                    |
| `AUTH0_CLIENT_SECRET`   | Auth0 client secret to get user information          |                                    |
| `SMTP_HOST`             | SMTP Host server to be able to send emails           |                                    |
| `SMTP_PORT`             | SMTP Port to be able to send emails                  |                                    |
| `SMTP_USERNAME`         | Username of the SMTP server                          |                                    |
| `SMTP_PASSWORD`         | Password of the SMTP server                          |                                    |
| `EMAIL_FROM`            | Email from what the email alert is sent              |                                    |

For development, you can create `.env` file with the following configuration

    NODE_ENV=development
    TRANSPORT_SERVICE_URL=http://localhost:5000
    CRON_PATTERN=*/30 * * * * *
    AUTH0_DOMAIN=<YOUR AUTH0 DOMAIN>
    AUTH0_CLIENT_ID=<YOUR AUTH0 CLIENT ID>
    AUTH0_CLIENT_SECRET=<YOUR AUTH0 CLIENT SECRET>
    # For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
    SMTP_HOST
    SMTP_PORT
    SMTP_USERNAME
    SMTP_PASSWORD
    EMAIL_FROM

For production, you need to set:

    LOGS_TOKEN
    TRANSPORT_SERVICE_URL
    MONGODB_URI
    AUTH0_DOMAIN
    AUTH0_CLIENT_ID
    AUTH0_CLIENT_SECRET
    SMTP_HOST
    SMTP_PORT
    SMTP_USERNAME
    SMTP_PASSWORD
    EMAIL_FROM

## Cron workflow

Here you can see a diagram of what the cron job does for every alert.

![Cron workflow](images/cron-workflow.png?raw=true)
