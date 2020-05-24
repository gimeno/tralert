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

### Auth0 vars

Auth0 configuration options to get access to user's contact data, these are required otherwise the app will throw exception.

-   `AUTH0_DOMAIN`
-   `AUTH0_CLIENT_ID`
-   `AUTH0_CLIENT_SECRET`

### SMTP vars

SMTP configuration options to send alerts by email, if they are not present a warning is triggered and no emails will be sent.

-   `SMTP_HOST`
-   `SMTP_PORT`
-   `SMTP_USERNAME`
-   `SMTP_PASSWORD`
-   `EMAIL_FROM`

For development, you can create `.env` file with the following configuration

    NODE_ENV=development
    LOGS_TOKEN="CREATE YOUR OWN TOKEN (NO REQUIRED FOR DEVELOPMENT)"
    TRANSPORT_SERVICE_URL=http://localhost:5000
    MONGODB_URI=mongodb://127.0.0.1:27017/alerts
    CRON_PATTERN=*/30 * * * * *

    AUTH0_DOMAIN="YOUR AUTH0 DOMAIN"
    AUTH0_CLIENT_ID="YOUR AUTH0 CLIENT ID"
    AUTH0_CLIENT_SECRET="YOUR AUTH0 CLIENT SECRET"

    # For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
    SMTP_HOST
    SMTP_PORT
    SMTP_USERNAME
    SMTP_PASSWORD
    EMAIL_FROM

## Cron workflow

Here you can see a diagram of what the cron job does for every alert.

![Cron workflow](./assets/images/cron-workflow.png)
