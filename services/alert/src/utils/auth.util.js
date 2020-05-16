const { ManagementClient } = require('auth0');
const { logger } = require('@tralert/logger');

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

let authManagementClient;

const getAuthClient = () => {
    if (!authManagementClient) {
        authManagementClient = new ManagementClient({
            domain: AUTH0_DOMAIN,
            clientId: AUTH0_CLIENT_ID,
            clientSecret: AUTH0_CLIENT_SECRET
        });
    }
    return authManagementClient;
};

const getUserEmail = async (userId) => {
    try {
        const user = await getAuthClient().getUser({ id: userId });
        return user.email;
    } catch (err) {
        logger.error(`Error trying to get user's email: ${err}`);
        return undefined;
    }
};

module.exports = {
    getUserEmail
};
