const { addServerProcessHandlers } = require('@tralert/express-app');
const { logger } = require('@tralert/logger');
const { env, port } = require('./config/config');
const app = require('./app');

const server = app.listen(port, () => {
    logger.info(`Listening to port ${port} in ${env} mode`);
});

addServerProcessHandlers(server);
