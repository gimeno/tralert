const { ManagementClient } = require('auth0');
const { logger } = require('@tralert/logger');
const { auth0 } = require('../config/config');

let authManagementClient;

const getAuthClient = () => {
    if (!authManagementClient) {
        authManagementClient = new ManagementClient({
            domain: auth0.domain,
            clientId: auth0.clientId,
            clientSecret: auth0.clientSecret
        });
    }
    return authManagementClient;
};

const getUserEmail = async (userId) => {
    try {
        const user = await getAuthClient().getUser({ id: userId });
        return user.email;
    } catch (error) {
        logger.error("Error trying to get user's email", { error });
        return undefined;
    }
};

module.exports = {
    getUserEmail
};
