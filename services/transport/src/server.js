process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const { addServerProcessHandlers } = require('@tralert/express-app');
const { logger } = require('@tralert/logger');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    logger.info(`Listening to port ${port}`);
});

addServerProcessHandlers(server);
