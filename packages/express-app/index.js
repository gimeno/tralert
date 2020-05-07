const createServer = require('./server');
const { addCommonHeaders, addErrorHandlers } = require('./app');

module.exports = {
    createServer,
    addCommonHeaders,
    addErrorHandlers
};
