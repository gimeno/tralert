const addServerProcessHandlers = require('./server');
const { addCommonHeaders, addErrorHandlers } = require('./app');

module.exports = {
    addServerProcessHandlers,
    addCommonHeaders,
    addErrorHandlers
};
