const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const { env } = require('@tralert/config');
const { loggerSuccessHandler, loggerErrorHandler } = require('@tralert/logger');
const { error } = require('@tralert/middlewares');

function addCommonHeaders(express, app) {
    if (env !== 'test') {
        app.use(loggerSuccessHandler);
        app.use(loggerErrorHandler);
    }

    // set security HTTP headers
    app.use(helmet());

    // parse json request body
    app.use(express.json());

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));

    // sanitize request data
    app.use(xss());

    // gzip compression
    app.use(compression());

    // enable CORS - Cross Origin Resource Sharing
    app.use(cors());
    app.options('*', cors());

    app.use('/ok', (req, res) => {
        res.send('Working');
    });
}

function addErrorHandlers(app) {
    // catch 404 and forward to error handler
    app.use(error.routeNotFound);

    // convert error to ApiError, if needed
    app.use(error.converter);

    // handle error
    app.use(error.handler);
}

module.exports = {
    addCommonHeaders,
    addErrorHandlers
};
