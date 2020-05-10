process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const mongoose = require('mongoose');
const { addServerProcessHandlers } = require('@tralert/express-app');
const { logger } = require('@tralert/logger');
const { cronService } = require('./services');
const app = require('./app');

const port = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alerts';
const cronPattern = process.env.CRON_PATTERN || '0 */30 * * * *';

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(MONGODB_URI, options).then(() => {
    logger.info('Connected to MongoDB');
    const server = app.listen(port, () => {
        logger.info(`Listening to port ${port}`);
    });

    addServerProcessHandlers(server);

    const job = cronService.createCronJob(cronPattern);
    job.start();
});
