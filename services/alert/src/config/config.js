const commonConfig = require('@tralert/config');

const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alerts';

module.exports = {
    ...commonConfig,
    port: process.env.PORT || 5001,
    mongoose: {
        url: `${mongoUrl}${process.env.NODE_ENV === 'test' ? '-test' : ''}`,
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    cronPattern: process.env.CRON_PATTERN || '0 */30 * * * *',
    auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET
    },
    email: {
        smtp: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        },
        from: process.env.EMAIL_FROM
    },
    transportServiceUrl: process.env.TRANSPORT_SERVICE_URL
};
