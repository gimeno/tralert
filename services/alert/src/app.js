const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const { addCommonHeaders, addErrorHandlers } = require('@tralert/express-app');
const routes = require('./routes');

const app = express();
addCommonHeaders(express, app);

app.use(mongoSanitize());

// Api routes
app.use(routes);

addErrorHandlers(app);

module.exports = app;
