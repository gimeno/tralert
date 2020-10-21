const commonConfig = require('@tralert/config');

module.exports = {
    ...commonConfig,
    port: process.env.PORT || 5002,
    auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET
    }
};
