const { ManagementClient } = require('auth0');
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

const updateUserEmail = async (userId, email) => {
    const user = await getAuthClient().updateUser({ id: userId }, { email, email_verified: true });
    return user;
};

module.exports = {
    updateUserEmail
};
