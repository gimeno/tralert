const mongoose = require('mongoose');
const { addServerProcessHandlers } = require('@tralert/express-app');
const { logger } = require('@tralert/logger');
const config = require('./config/config');
const { cronService } = require('./services');
const app = require('./app');

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
    const server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port} in ${config.env} mode`);
    });

    addServerProcessHandlers(server);

    const job = cronService.createCronJob(config.cronPattern);
    job.start();
});
