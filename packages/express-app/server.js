const { logger } = require('@tralert/logger');

function addServerProcessHandlers(server) {
    const unexpectedErrorHandler = (error) => {
        logger.error('Unexpected error', { error });
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
        logger.info('SIGTERM received');
        if (server) {
            server.close();
        }
    });
}

module.exports = addServerProcessHandlers;
