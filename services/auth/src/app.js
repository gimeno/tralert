const express = require('express');
const { addCommonHeaders, addErrorHandlers } = require('@tralert/express-app');
const routes = require('./routes');

const app = express();
addCommonHeaders(express, app);

// Api routes
app.use(routes);

addErrorHandlers(app);

module.exports = app;
