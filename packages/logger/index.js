const logger = require('./logger');
const { successHandler, errorHandler } = require('./morgan');

module.exports = {
    logger,
    loggerSuccessHandler: successHandler,
    loggerErrorHandler: errorHandler
};
