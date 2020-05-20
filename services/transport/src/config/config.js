const commonConfig = require('@tralert/config');

module.exports = {
    ...commonConfig,
    port: process.env.PORT || 5000,
    chromiumPath: process.env.CHROMIUM_PATH || ''
};
